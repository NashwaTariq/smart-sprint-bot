import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../core/services/agent.service';
import { APP_CONSTANTS } from '../../app-constants';
import { RoleType } from '../../app-enums';
import { ThemeService } from '../../core/services/theme.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container" [class.dark-theme]="isDarkMode">
      <div class="chat-messages" #messageContainer>
        @for (message of messages; track message.timestamp) {
          <div class="message" [class.user-message]="message.role === 'user'">
            <div class="message-content">
              {{ message.content }}
            </div>
            <div class="message-timestamp">
              {{ message.timestamp | date:'short' }}
            </div>
          </div>
        }
        @if (isLoading) {
          <div class="message assistant-message">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        }
      </div>
      <div class="chat-input">
        <input 
          type="text" 
          [(ngModel)]="newMessage" 
          (keyup.enter)="sendMessage()"
          placeholder="Ask JIRA assistant..."
          [disabled]="isLoading">
        <button 
          (click)="sendMessage()" 
          [disabled]="isLoading || !newMessage.trim()">
          Send
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 100px);
      background-color: #f5f5f5;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .chat-container.dark-theme {
      background-color: #1a1a1a;
      color: #ffffff;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      max-width: 80%;
      padding: 1rem;
      border-radius: 8px;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dark-theme .message {
      background-color: #2d2d2d;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .user-message {
      align-self: flex-end;
      background-color: #008080;
      color: #ffffff;
    }

    .dark-theme .user-message {
      background-color: #008080;
    }

    .message-content {
      margin-bottom: 0.5rem;
      white-space: pre-wrap;
    }

    .message-timestamp {
      font-size: 0.75rem;
      color: #999;
      text-align: right;
    }

    .dark-theme .message-timestamp {
      color: #999;
    }

    .dark-theme .user-message .message-timestamp {
      color: #ccc;
    }

    .chat-input {
      padding: 1rem;
      background-color: #ffffff;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 1rem;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .dark-theme .chat-input {
      background-color: #2d2d2d;
      border-top-color: #404040;
    }

    input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 1rem;
      background-color: #ffffff;
      color: #333;
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    .dark-theme input {
      background-color: #404040;
      border-color: #505050;
      color: #ffffff;
    }

    input:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    .dark-theme input:disabled {
      background-color: #333333;
    }

    button {
      padding: 0.75rem 1.5rem;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .dark-theme button:disabled {
      background-color: #404040;
    }

    .typing-indicator {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background-color: #666;
      border-radius: 50%;
      animation: typing 1s infinite ease-in-out;
    }

    .dark-theme .typing-indicator span {
      background-color: #999;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `]
})
export class HomeComponent {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  isDarkMode = false;
  agentService = inject(AgentService);
  themeService = inject(ThemeService);

  constructor() {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.isLoading) return;

    const userMessage: ChatMessage = {
      role: RoleType.USER,
      content: this.newMessage,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.isLoading = true;

    this.agentService.sendMessage({
      query: this.newMessage,
    }).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: response.response,
            timestamp: new Date()
          };
          this.messages.push(assistantMessage);
        } else {
          this.messages.push(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.newMessage = '';
        console.error('Error sending message:', error);
        this.messages.push(this.errorMessage);
      },
      complete: () => {
        this.isLoading = false;
        this.newMessage = '';
      }
    });
  }

  get errorMessage(): ChatMessage {
    return {
      role: RoleType.ASSISTANT,
      content: APP_CONSTANTS.ERROR_MESSAGE,
      timestamp: new Date()
    }
  }
} 