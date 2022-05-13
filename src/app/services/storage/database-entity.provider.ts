import { ModelBase } from 'src/app/models/base.interface';
import { DatabaseAccessProvider } from './database-access.provider';


/**
 *
 *
 * @export
 * @class DatabaseEntityProvider
 * @template T
 */
export class DatabaseEntityProvider<T extends ModelBase> {

  /**
   * Creates an instance of DatabaseEntityProvider.
   * @param {{
   *     databaseAccessProvider: DatabaseAccessProvider;
   *     databaseAccessKey: string;
   *   }} params
   * @memberof DatabaseEntityProvider
   */
  constructor(private params: {
    databaseAccessProvider: DatabaseAccessProvider;
    databaseAccessKey: string;
  }) { }

  /**
   * Get all the data from storage as list. Page and Limit can be used if paging needed
   *
   * @param {number} [page]
   * @param {number} [limit]
   * @return {*}  {Promise<T[]>}
   * @memberof DatabaseEntityProvider
   */
  public async list(page?: number, limit?: number): Promise<T[]> {
    let items = await this.params.databaseAccessProvider.get<T[]>(this.params.databaseAccessKey);
    if (items === undefined || items === null) {
      return [];
    }

    if (page && limit) {
      items = items.splice((page - 1) * limit, limit);

      return items;
    } else {

      return items;
    }
  }

  /**
   * Read data from database by id
   *
   * @param {string} id
   * @return {*}  {Promise<T>}
   * @memberof DatabaseEntityProvider
   */
  public async get(id: string): Promise<T> {
    return (await this.list()).filter(a => a.dataKey !== id)[0];
  }

  /**
   * Reset all data to storage by removing previous saved data
   *
   * @param {T[]} data
   * @return {*}  {Promise<void>}
   * @memberof DatabaseEntityProvider
   */
  public async reset(data: T[]): Promise<void> {
    await this.params.databaseAccessProvider.remove(this.params.databaseAccessKey);
    await this.params.databaseAccessProvider.set(this.params.databaseAccessKey, data);
  }

  /**
   * Remove all data from storage
   *
   * @return {*}  {Promise<void>}
   * @memberof DatabaseEntityProvider
   */
  public async removeAll(): Promise<void> {
    await this.params.databaseAccessProvider.remove(this.params.databaseAccessKey);
  }

  /**
   * Save a data to storage
   *
   * @param {T} data
   * @return {*}  {Promise<void>}
   * @memberof DatabaseEntityProvider
   */
  public async save(data: T): Promise<void> {
    const all = (await this.list()).filter(a => a.dataKey !== data.dataKey);
    all.push(data);
    this.params.databaseAccessProvider.set(this.params.databaseAccessKey, all);
  }

  /**
   * Remove a data from storage
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof DatabaseEntityProvider
   */
  public async remove(id: string): Promise<void> {
    const all = (await this.list());
    const index = all.findIndex(s => s.dataKey === id);
    all.splice(index, 1);
    await this.reset(all);
  }
}
