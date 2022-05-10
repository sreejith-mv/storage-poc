import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { EncryptionKeyProvider } from '../../utils/encryption-key.service';
import { AES256 } from '@awesome-cordova-plugins/aes-256/ngx';
import { CommonUtilService } from '../../utils/common-util.service';
import { EncryptionKeyType } from 'src/app/app.constants';

/**
 * DatabaseAccessProvider provides a generic way to get or set data in
 * storage after encrypting or decrypting data.
 *
 * @export
 * @class DatabaseAccessProvider
 */
@Injectable()
export class DatabaseAccessProvider {

  private secureKey = '';
  private secureIV = '';

  /**
   * Creates an instance of DatabaseAccessProvider.
   * @param {Storage} storage
   * @param {EncryptionKeyProvider} encryptionKeyProvider
   * @param {AES256} aes256
   * @param {CommonUtilService} commonUtil
   * @memberof DatabaseAccessProvider
   */
  constructor(
    private storage: Storage,
    private encryptionKeyProvider: EncryptionKeyProvider,
    private aes256: AES256,
    private commonUtil: CommonUtilService
  ) {
    this.init();
  }


  /**
   * Initializing database and generating secure key and secure
   * initialization vector(IV) for data encryption and decryption.
   *
   * @memberof DatabaseAccessProvider
   */
  public async init() {
    await this.storage.create();
    if (this.commonUtil.isDevice()) {
      this.secureKey = await this.encryptionKeyProvider.getEncryptionKey(EncryptionKeyType.KEY);
      this.secureIV = await this.encryptionKeyProvider.getEncryptionKey(EncryptionKeyType.IV);
    }
  }

  /**
   * Get data from storage filter by id
   *
   * @template T
   * @param {string} key
   * @return {*}  {Promise<T>}
   * @memberof DatabaseAccessProvider
   */
  public async get<T>(key: string): Promise<T> {
    const val = await this.storage.get(key);
    if (this.commonUtil.isDevice()) {
      const decryptedVal = await this.aes256.decrypt(this.secureKey, this.secureIV, val);

      return (JSON.parse(decryptedVal)) as T;
    } else {

      return val as T;
    }

  }


  /**
   * Remove all data from storage for a key
   *
   * @param {string} key - storage key
   * @return {*}  {Promise<boolean>}
   * @memberof DatabaseAccessProvider
   */
  public async remove(key: string): Promise<boolean> {
    await this.storage.remove(key);

    return true;
  }

  /**
   * Setting value to storage for a key after encrypting data.
   * Encryption can be done only if app is running in device.
   *
   * @param {string} key - storage key
   * @param {*} val - value to be stored
   * @return {*}  {Promise<boolean>}
   * @memberof DatabaseAccessProvider
   */
  public async set(key: string, val: any): Promise<boolean> {
    if (this.commonUtil.isDevice()) {
      val = await this.aes256.encrypt(this.secureKey, this.secureIV, JSON.stringify(val));
    }

    return await this.storage.set(key, val);
  }

}
