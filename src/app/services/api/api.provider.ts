/* eslint-disable @typescript-eslint/member-delimiter-style */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ModelBase } from '../../models/base.interface';
import { map } from 'rxjs/operators';

/**
 *ApiProvider is an interface to get or post data from server
 *
 * @export
 * @class ApiProvider
 * @template T
 */
@Injectable({
  providedIn: 'root'
})
export class ApiProvider<T extends ModelBase> {

  /**
   * Creates an instance of ApiProvider.
   * @param {{
   *     httpClient: HttpClient;
   *     endpoint: string;
   *     serializer: ModelBase;
   *   }} params
   * @memberof ApiProvider
   */
  constructor(@Inject({})
  private params: {
    httpClient: HttpClient;
    endpoint: string;
    serializer: ModelBase;
  }) { }


  /**
   * Post data to server
   *
   * @param {T} item
   * @return {*}  {Observable<T>}
   * @memberof ApiProvider
   */
  public post(item: T): Observable<T> {
    return this.params.httpClient
      .post<T>(`${environment.baseUrl}${this.params.endpoint}`, this.params.serializer.toJson(item))
      .pipe(
        map(data => this.params.serializer.fromJson(data) as T),
      );
  }


  /**
   * Get data filtered by id
   *
   * @param {number} id
   * @return {*}  {Observable<T>}
   * @memberof ApiProvider
   */
  public read(id: number): Observable<T> {
    return this.params.httpClient
      .get(`${environment.baseUrl}${this.params.endpoint}/list`)
      .pipe(
        map((data: any) => this.params.serializer.fromJson(data) as T),
      );
  }

  /**
   * Get all data from server
   *
   * @return {*}  {Observable<T[]>}
   * @memberof ApiProvider
   */
  public list(): Observable<T[]> {
    return this.params.httpClient
      .get(`${environment.baseUrl}${this.params.endpoint}/list`)
      .pipe(
        map((data: any) => this.convertData(data)),
      );
  }
  private convertData(data: any): T[] {
    return data.map(item => this.params.serializer.fromJson(item));
  }
}
