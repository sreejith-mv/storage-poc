import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';
import { MessageStore } from '../stores/message.store';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private navCtrl: NavController, public store: MessageStore) { }

  ngOnInit() { }

  async gotoDetailPage(message: Message) {
    message.read = true;
    await this.store.updateMessage(message);
    this.navCtrl.navigateForward(`/message/${message.id}`);
  }

  async unread(message: Message) {
    message.read = false;
    await this.store.updateMessage(message);
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
