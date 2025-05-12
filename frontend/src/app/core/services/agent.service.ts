import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { 
  MessageRequest,
  MessageResponse,
  JiraDailyUpdate,
  LogsResponse,
  JiraQueryRequest,
  JiraQueryResponse
} from '../interfaces/agent.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private readonly basePath = '/agents';

  constructor(private apiService: ApiService) {}

  sendMessage(request: MessageRequest): Observable<MessageResponse> {
    return this.apiService.post<MessageResponse>(`${this.basePath}/ask`, request);
  }

  getJiraDailyUpdates(): Observable<JiraDailyUpdate> {
    return this.apiService.get<JiraDailyUpdate>('/jira/daily-updates');
  }

  getLogs(): Observable<LogsResponse[]> {
    return this.apiService.get<LogsResponse[]>(`/sessions/logs`);
  }

  queryJira(request: JiraQueryRequest): Observable<JiraQueryResponse> {
    return this.apiService.post<JiraQueryResponse>('/jira/agent', request);
  }
} 