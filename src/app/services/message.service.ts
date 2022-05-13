import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Network } from '@capacitor/network';
import { MessageApiProvider, MessageDbProvider } from './data-providers/message.provider';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: Message[] = [];

  constructor(private messageApiProvider: MessageApiProvider, private messageDbProvider: MessageDbProvider) { }

  public async getMessages(): Promise<Message[]> {
    const status = await Network.getStatus();
    if (status.connected) {
      return new Promise(resolve => {
        this.messageApiProvider.list().subscribe(async reapData => {
          await this.messageDbProvider.reset(reapData);
          resolve(reapData);
        }, async () => {
          const data = await this.messageDbProvider.list();
          resolve(data);
        });
      });
    }
    return this.messageDbProvider.list();
  }

  public async getMessagesFromDB(): Promise<Message[]> {
    return await this.messageDbProvider.list();
  }

  public async getMessageById(dataKey: string): Promise<Message> {
    return await this.messageDbProvider.get(dataKey);
  }

  public async updateMessage(message: Message): Promise<void> {
    return await this.messageDbProvider.save(message);
  }

  public async removeMessage(dataKey: string): Promise<void> {
    return await this.messageDbProvider.remove(dataKey);
  }

  public async clearMessage(): Promise<void> {
    return await this.messageDbProvider.removeAll();
  }
}
