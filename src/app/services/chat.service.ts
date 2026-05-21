import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class ChatService {

  // ⬇️ შენი n8n Production Webhook URL ჩაწერე აქ
  private webhookUrl = 'https://YOUR_N8N_INSTANCE/webhook/hotel-chatbot-webhook-001/chat';

  private sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = this.getOrCreateSessionId();
  }

  sendMessage(message: string): Observable<{ output: string }> {
    return this.http.post<{ output: string }>(this.webhookUrl, {
      chatInput: message,
      sessionId: this.sessionId
    });
  }

  private getOrCreateSessionId(): string {
    let id = sessionStorage.getItem('hotel_chat_session');
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem('hotel_chat_session', id);
    }
    return id;
  }
}
