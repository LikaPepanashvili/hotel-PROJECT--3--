import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ChatWidget } from './chat-widget/chat-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ChatWidget],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hotelProject');
}
