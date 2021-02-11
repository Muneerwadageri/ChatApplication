import { Component, NgZone } from '@angular/core';
import { Message } from '../models/Message';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  dataObj= [
    {
      name:'Muneer',
      message:'10',
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    },
    {
      name : 'green',
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    },
    {
      name: "blue",
      message:'5',
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    },
    {
      name: "cyan",
      message:'8',
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    },
    {
      name: "magenta",
      message:'9',
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    },
    {
      name: "yellow",
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    },
    {
      name: "black",
      message:'2',
      src:"https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7"
    }
  ];


  public show:boolean = false;
  showbutton:boolean = true;

  txtMessage: string = '';
  txtMessanger:string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  messanger = new Array<Message>();
  message = new Message();
  constructor(private chatService: ChatService,private _ngZone: NgZone) 
  {
    this.subscribeToEvents();
    this.subscribe_ToEvents();
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });
  }

  send_Messanger(): void {
    if (this.txtMessanger) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessanger;
      this.message.date = new Date();
      this.messanger.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessanger = '';
    }
  }

  private subscribe_ToEvents(): void {

    this.chatService.message_Received.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messanger.push(message);
        }
      });
    });
  }


  chat_Toggle() {
    this.show = !this.show;

    if(this.show)  
      this.showbutton = false;
    else
      this.showbutton = true;
  }

  cancel()
  {
    this.show = !this.show;
    if(this.show)  
      this.showbutton = true;
    else
      this.showbutton = true;
  }
}
