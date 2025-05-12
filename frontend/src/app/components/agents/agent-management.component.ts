import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AgentManagementService, AgentStatus } from '../../core/services/agent-management.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-agent-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="agent-management" [class.dark-theme]="isDarkMode()">
      <div class="status-card">
        <mat-card>
          <mat-card-content>
            <div class="status-header">
              <h2>Agent Status</h2>
              <button mat-icon-button (click)="refreshStatus()">
                <mat-icon>refresh</mat-icon>
              </button>
            </div>
            <div class="status-content" [class]="status()?.status">
              <div class="status-indicator"></div>
              <div class="status-details">
                <p class="status-text">{{ status()?.status | titlecase }}</p>
                <p class="status-message" *ngIf="status()?.user">{{ status()?.user }}</p>
                <p class="status-message" *ngIf="status()?.message">{{ status()?.message }}</p>
                <p class="last-checked">Last checked: {{ status()?.lastChecked | date:'medium' }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="config-card">
        <mat-card-header>
          <mat-card-title>Agent Configuration</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="configForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Groq API Key</mat-label>
              <input 
                matInput 
                type="password" 
                formControlName="groq_api_key"
                placeholder="Enter your Groq API key">
              <mat-error *ngIf="configForm.get('groq_api_key')?.hasError('required')">
                Groq API key is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Jira API Key</mat-label>
              <input 
                matInput 
                type="password" 
                formControlName="jira_api_key"
                placeholder="Enter your Jira API key">
              <mat-error *ngIf="configForm.get('jira_api_key')?.hasError('required')">
                Jira API key is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Jira Email</mat-label>
              <input 
                matInput 
                type="email" 
                formControlName="jira_user"
                placeholder="Enter your Jira email">
              <mat-error *ngIf="configForm.get('jira_user')?.hasError('required')">
                Jira email is required
              </mat-error>
              <mat-error *ngIf="configForm.get('jira_user')?.hasError('email')">
                Please enter a valid email address
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Jira URL</mat-label>
              <input 
                matInput 
                type="url" 
                formControlName="jira_url"
                placeholder="Enter your Jira instance URL">
              <mat-error *ngIf="configForm.get('jira_url')?.hasError('required')">
                Jira URL is required
              </mat-error>
              <mat-error *ngIf="configForm.get('jira_url')?.hasError('pattern')">
                Please enter a valid URL
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button 
                mat-raised-button 
                color="primary" 
                type="submit"
                [disabled]="configForm.invalid || isSubmitting()">
                {{ isSubmitting() ? 'Saving...' : 'Save Configuration' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .agent-management {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .agent-management.dark-theme {
      background-color: #1a1a1a;
      color: #ffffff;
    }

    .status-card {
      margin-bottom: 2rem;
    }

    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .status-header h2 {
      margin: 0;
    }

    .status-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background-color: #f5f5f5;
      transition: background-color 0.3s ease;
    }

    .dark-theme .status-content {
      background-color: #2d2d2d;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #666;
    }

    .status-content.online .status-indicator {
      background-color: #4caf50;
    }

    .status-content.offline .status-indicator {
      background-color: #f44336;
    }

    .status-content.error .status-indicator {
      background-color: #ff9800;
    }

    .status-details {
      flex: 1;
    }

    .status-text {
      margin: 0;
      font-weight: 500;
    }

    .status-message {
      margin: 0.5rem 0;
      color: #666;
    }

    .dark-theme .status-message {
      color: #999;
    }

    .last-checked {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
    }

    .dark-theme .last-checked {
      color: #999;
    }

    .config-card {
      margin-bottom: 2rem;
    }

    mat-card {
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dark-theme mat-card {
      background-color: #2d2d2d;
      color: #ffffff;
    }

    mat-card-header {
      margin-bottom: 1.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .form-actions button {
      background-color: #008080;
      color: #ffffff;
    }

  `]
})
export class AgentManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private agentService = inject(AgentManagementService);
  private snackBar = inject(MatSnackBar);
  private themeService = inject(ThemeService);

  configForm: FormGroup;
  status = signal<AgentStatus | null>(null);
  isSubmitting = signal(false);
  isDarkMode = signal(false);

  constructor() {
    this.configForm = this.fb.group({
      groq_api_key: ['', Validators.required],
      jira_api_key: ['', Validators.required],
      jira_user: ['', [Validators.required, Validators.email]],
      jira_url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode.set(theme === 'dark');
    });
  }

  ngOnInit() {
    this.agentService.status$.subscribe(status => {
      this.status.set(status);
    });

    this.agentService.getConfigStatus().subscribe({
      next: (config) => {
        this.configForm.patchValue(config);
      },
      error: (error) => {
        this.snackBar.open('Failed to load configuration', 'Close', {
          duration: 3000
        });
      }
    });
  }

  refreshStatus() {
    this.agentService.checkStatus();
  }

  onSubmit() {
    if (this.configForm.valid) {
      this.isSubmitting.set(true);
      this.agentService.updateConfig(this.configForm.value).subscribe({
        next: () => {
          this.snackBar.open('Configuration updated successfully', 'Close', {
            duration: 3000
          });
        },
        error: (error) => {
          this.isSubmitting.set(false);
          console.error('Failed to update configuration', error);
          this.snackBar.open(error.error?.detail || 'Failed to update configuration', 'Close', {
            duration: 5000
          });
        },
        complete: () => {
          this.isSubmitting.set(false);
        }
      });
    }
  }
} 