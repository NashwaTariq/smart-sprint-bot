import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AgentConfig {
  groq_api_key: string;
  jira_api_key: string;
  jira_user: string;
  jira_url: string;
}

export interface AgentStatus {
  isConnected: boolean;
  lastChecked: Date;
  status: 'online' | 'offline' | 'error';
  message?: string;
  user?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgentManagementService {
  private configUrl = `${environment.apiUrl}/agent/config`;
  private statusUrl = `${environment.apiUrl}/agent/status`;
  
  private statusSubject = new BehaviorSubject<AgentStatus>({
    isConnected: false,
    lastChecked: new Date(),
    status: 'offline'
  });

  status$ = this.statusSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkStatus();
  }

  getConfigStatus(): Observable<AgentConfig> {
    return this.http.get<AgentConfig>(this.statusUrl);
  }

  updateConfig(config: AgentConfig): Observable<AgentConfig> {
    return this.http.post<AgentConfig>(this.configUrl, config).pipe(
      tap(() => this.checkStatus())
    );
  }

  checkStatus(): void {
    this.http.get<AgentStatus>(this.statusUrl).subscribe({
      next: (status) => {
        this.statusSubject.next({
          ...status,
          lastChecked: new Date()
        });
      },
      error: (error) => {
        this.statusSubject.next({
          isConnected: false,
          lastChecked: new Date(),
          status: 'error',
          message: error.message
        });
      }
    });
  }
} 