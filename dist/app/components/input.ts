
import {Component, EventEmitter} from "angular2/core";

@Component({
  selector: "chat-input",
  events: ["doSendMessage: message"],
  template: `
  <div class="entry">
    <input #message (keyup)="keyPress($event, message)" placeholder="Type message here" />
    <button (click)="sendMessage(message)">Send</button>
  </div>
  `
})
export class ChatInput {
  doSendMessage = new EventEmitter();

  sendMessage(input) {
    this.doSendMessage.next(input.value);
    input.value = "";
  }

  keyPress(event: KeyboardEvent, input) {
    if (event.keyCode === 13)
      this.sendMessage(input);
  }
}
