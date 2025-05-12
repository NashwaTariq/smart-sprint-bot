import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgentManagementComponent } from './components/agents/agent-management.component';
import { LogsComponent } from './components/logs/logs.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'agents', component: AgentManagementComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
