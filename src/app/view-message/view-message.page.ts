import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message: Message;

  constructor(
    private data: MessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const dataKey = this.activatedRoute.snapshot.paramMap.get('id');
    this.message = await this.data.getMessageById(dataKey);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
