import { Injectable } from '@angular/core';
import { DatabaseEntityProvider } from '../storage/database-entity.provider';
import { DatabaseAccessProvider } from '../storage/database-access.provider';
import { ApiProvider } from '../api/api.provider';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/message.model';
import { APP_CONSTANTS } from 'src/app/app.constants';

@Injectable()
export class MessageDbProvider extends DatabaseEntityProvider<Message>{

  constructor(databaseAccessProvider: DatabaseAccessProvider) {

    super({
      databaseAccessProvider,
      databaseAccessKey: APP_CONSTANTS.DATA_ACCESS_KEYS.MESSAGE
    });
  }

}

@Injectable()
export class MessageApiProvider extends ApiProvider<Message> {
  constructor(httpClient: HttpClient) {
    super(
      {
        httpClient,
        endpoint: APP_CONSTANTS.API_END_POINTS.MESSAGE,
        serializer: new Message()
      }
    );
  }
}
