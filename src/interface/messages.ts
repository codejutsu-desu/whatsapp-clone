export interface Sender {
  name: string;
  color: string;
}

export interface Message {
  sender: Sender | null;
  message: string;
  time: string;
  isSent: boolean;
}
