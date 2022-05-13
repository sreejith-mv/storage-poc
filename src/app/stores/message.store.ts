import { Injectable } from '@angular/core';
import { action, observable } from 'mobx';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class MessageStore {

  @observable messages: Message[] = [];

  constructor(private messageSrv: MessageService) {
    this.getMessages();
  }

  @action
  public async getMessages() {
    this.messages = await this.messageSrv.getMessages();
  }

  @action
  public async getMessagesFromDb() {
    this.messages = await this.messageSrv.getMessagesFromDB();
  }

  @action
  public async getMessageById(dataKey: string) {
    await this.messageSrv.getMessageById(dataKey);
    this.getMessagesFromDb();
  }

  @action
  public async updateMessage(message: Message) {
    await this.messageSrv.updateMessage(message);
    this.getMessagesFromDb();
  }

  @action
  public async removeMessage(message: Message) {
    await this.messageSrv.removeMessage(message.dataKey);
    this.getMessagesFromDb();
  }

  @action
  public async clearMessage() {
    await this.messageSrv.clearMessage();
    this.getMessagesFromDb();
  }
}
