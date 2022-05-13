import { Component } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';
import { MessageStore } from '../stores/message.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public store: MessageStore) { }

  async refresh(ev) {
    await this.store.getMessages();
    ev.detail.complete();
  }
}
