/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { CommonUtilService } from './common-util.service';
import { AES256 } from '@awesome-cordova-plugins/aes-256/ngx';
import { environment } from '../../environments/environment';
import { EncryptionKeyType } from 'src/app/app.constants';


/**
 * Create and save encryption keys for storage in device secure storage
 *
 * @export
 * @class EncryptionKeyProvider
 */
@Injectable({
  providedIn: 'root'
})
export class EncryptionKeyProvider {

  constructor(private aes256: AES256) { }


  /**
   * Return and encryption key according to the type if key asked.
   * It creates new key return is one is not available in device storage
   *
   * @param {EncryptionKeyType} keyType
   * @return {*}  {Promise<string>}
   * @memberof EncryptionKeyProvider
   */
  public async getEncryptionKey(keyType: EncryptionKeyType): Promise<string> {
    const keyName = keyType === EncryptionKeyType.KEY ? environment.encryption.secureKey : environment.encryption.secureIV;

    return Storage.get({ key: keyName })
      .then(key => {
        console.log('Key retrieved from secure storage');

        return key.value;
      })
      .catch(() => {
        console.log('No key found in secure storage. Resolving missing key.');

        return this.setEncryptionKey(keyName, keyType);
      });
  }

  /**
   * Set encryption key to device storage with key
   * name according to the key type passed
   *
   * @private
   * @param {string} keyName
   * @param {EncryptionKeyType} keyType
   * @return {*}  {Promise<string>}
   * @memberof EncryptionKeyProvider
   */
  private async setEncryptionKey(keyName: string, keyType: EncryptionKeyType): Promise<string> {
    const hashKey = CommonUtilService.getKey();
    let key = '';
    if (keyType === EncryptionKeyType.KEY) {
      key = await this.aes256.generateSecureKey(hashKey);
    } else {
      key = await this.aes256.generateSecureIV(hashKey);
    }
    await Storage.set({ key: keyName, value: key });

    return key;
  }
}
