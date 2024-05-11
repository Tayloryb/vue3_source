import { io, Socket } from "socket.io-client";

export class SocketIo {
  url: string;
  socket: Socket | null;
  message: string;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
    this.message = '';
  }

  connect(): void {
    console.log('this.url :>> ', this.url);
    this.socket = io(this.url, {
      // withCredentials: true,
      // retries: 3,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
  }

  on(event: string, callback: (msg: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
