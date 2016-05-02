import {Component} from 'angular2/core';
import {NgFor, NgSwitch, NgSwitchWhen} from "angular2/common";

import {ChatMessage} from "./components/message";
import {ChatLogin} from "./components/login";
import {ChatInput} from "./components/input";

import {ChatMessageRecord} from "./interfaces";

declare var Horizon: any;

@Component({
    selector: 'my-app',
    template: `
    <div class="inner" [ngSwitch]="username == undefined">
      <template [ngSwitchWhen]="true">
        <chat-login (login)="onLogin($event)"></chat-login>
      </template>
      <template [ngSwitchWhen]="false">
        <div class="messages">
          <chat-message *ngFor="#m of messages" [message]="m"></chat-message>
        </div>
        <chat-input (message)="onMessage($event)"></chat-input>
      </template>
    </div>
    `,
    directives: [
      NgSwitch, NgSwitchWhen, NgFor,
      ChatMessage, ChatInput, ChatLogin]
})
export class ChatApp {
  username: string
  messages: Array<ChatMessageRecord> = [];

  horizon = Horizon();
  collection = this.horizon("messages");

  onMessage(message: string) {
    this.collection.store({
      user: this.username,
      text: message,
      time: new Date(),
    }).forEach(output => console.log("Wrote message:", output));
  }

  onLogin(username: string) {
    this.username = username;
    this.collection
        .order("time", "descending")
        .limit(20).watch()
        .forEach(messages => {
          this.messages = [...messages].reverse()
        });
  }
}
