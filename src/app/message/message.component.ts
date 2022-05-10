import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private navCtrl: NavController, private messageSrv: MessageService) { }

  ngOnInit() { }

  async gotoDetailPage(message: Message) {
    message.read = true;
    await this.messageSrv.updateMessage(message);
    this.navCtrl.navigateForward(`/message/${message.id}`);
  }

  async delete(message: Message) {
    await this.messageSrv.removeMessage(message);
  }

  async unread(message: Message) {
    message.read = false;
    await this.messageSrv.updateMessage(message);
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
