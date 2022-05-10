/* eslint-disable @typescript-eslint/member-ordering */

import { CommonUtilService } from '../utils/common-util.service';
import { ModelBase } from './base.interface';

export class Message implements ModelBase {
  dataKey: string;
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
  message: string;

  public fromJson(json: any): Message {
    const message = new Message();
    message.dataKey = CommonUtilService.getKey();
    message.id = json.id;
    message.date = json.date;
    message.fromName = json.fromName;
    message.read = json.read;
    message.subject = json.subject;
    message.message = json.message;

    return message;
  }

  public toJson(message: Message) {
    return {
      id: message.id,
      date: message.date,
      fromName: message.fromName,
      read: message.read,
      subject: message.subject,
      message: message.message
    };
  }
}
