import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentService } from '../../core/services/agent.service';

interface SessionLog {
  id: string;
  title: string;
  created_at: string;
  messages: { timestamp: string; user: string; bot: string }[];
}

@Component({
  selector: 'app-session-logs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="logs-container dark-theme">
      <h2>Session Logs</h2>

      <div class="logs-table">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngIf="isLoading">
              <td colspan="3">Loading...</td>
            </tr>
            <tr *ngIf="error">
              <td colspan="3">{{ error }}</td>
            </tr>
            <tr *ngFor="let log of logs">
              <td>{{ formatTimestamp(log.created_at) }}</td>
              <td>{{ log.title || 'Untitled Session' }}</td>
              <td>
                <button (click)="showOutput(log)">View Chat</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-overlay" *ngIf="selectedLog" (click)="closeOutput()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Chat - {{ selectedLog.title || 'Untitled' }}</h3>
            <button class="close-btn" (click)="closeOutput()">&times;</button>
          </div>
          <div class="modal-body">
            <div *ngFor="let msg of selectedLog.messages" class="chat-message">
              <p><strong>User:</strong> {{ msg.user }}</p>
              <p><strong>Bot:</strong> {{ msg.bot }}</p>
              <p><strong>Timestamp:</strong> {{ msg.timestamp | date:'medium' }}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dark-theme {
      background-color: #121212;
      color: #f0f0f0;
      padding: 1rem;
      min-height: 100vh;
    }

    .logs-table table {
      width: 100%;
      border-collapse: collapse;
      background: #1e1e1e;
    }

    th, td {
      border-bottom: 1px solid #333;
      padding: 1rem;
      text-align: left;
    }

    th {
      background-color: #2c2c2c;
    }

    button {
      background-color: #008080;
      color: white;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: #222;
      color: #eee;
      width: 90%;
      max-width: 800px;
      padding: 1rem;
      border-radius: 8px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close-btn {
      font-size: 1.5rem;
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
    }

    .modal-body {
      margin-top: 1rem;
      max-height: 400px;
      overflow-y: auto;
    }

    .chat-message {
      margin-bottom: 1rem;
    }
  `]
})
export class LogsComponent implements OnInit {
  logs: SessionLog[] = [];
  selectedLog: SessionLog | null = null;
  isLoading = false;
  error: string | null = null;
  sessionService = inject(AgentService);

  constructor() {}

  ngOnInit(): void {
    this.loadSessionLogs();
  }

  loadSessionLogs(): void {
    this.isLoading = true;
    this.sessionService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (err) => {
        console.error('Error fetching session logs:', err);
        this.error = 'Failed to load session logs';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  showOutput(log: SessionLog): void {
    this.selectedLog = log;
  }

  closeOutput(): void {
    this.selectedLog = null;
  }
}
