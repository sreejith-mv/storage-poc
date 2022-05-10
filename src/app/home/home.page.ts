import { Component } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public messages: Message[] = [];

  constructor(private messageSrv: MessageService) {
    this.messageSrv.getMessages().then(data => {
      this.messages = data;
    });
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async getMessages() {

  }

}
