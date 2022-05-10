import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  constructor(private platform: Platform) { }

  /**
   *Generate a new GUID
   *
   * @return {*}  {string}
   * @memberof CommonUtilService
   */
  public static getKey(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,  (c) => {
      // eslint-disable-next-line no-bitwise
      const r = Math.random() * 16 | 0;
      // eslint-disable-next-line no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }


  /**
   * Check platforms is a device os web
   *
   * @return {*}  {boolean}
   * @memberof CommonUtilService
   */
  public isDevice(): boolean {
    return this.platform.is('capacitor');
  }
}
