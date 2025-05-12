import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

interface MenuItem {
  path: string;
  label: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar [class.dark-theme]="isDarkMode" class="toolbar">
      <div class="toolbar-brand">
        <!-- <img 
          [src]="logoPath" 
          alt="Folio3 Logo" 
          class="logo"
          (error)="handleImageError($event)"
          #logoImg> -->
        <h1>🤖 Smart Sprint Bot</h1>
      </div>
      <div class="toolbar-menu">
        @for (item of menuItems; track item.path) {
          <a 
            mat-button
            [routerLink]="item.path" 
            routerLinkActive="active" 
            [routerLinkActiveOptions]="{exact: item.exact}">
            {{ item.label }}
          </a>
        }
        <button 
          mat-icon-button 
          (click)="toggleTheme()" 
          [attr.aria-label]="'Switch to ' + (isDarkMode ? 'light' : 'dark') + ' mode'">
          @if (isDarkMode) {
            <mat-icon>light_mode</mat-icon>
          } @else {
            <mat-icon>dark_mode</mat-icon>
          }
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      background: #fff;
      transition: background-color 0.3s ease, color 0.3s ease;
      border-bottom: 3px solid #008080;
    }

    .toolbar.dark-theme {
      background-color: #1a1a1a;
      color: #ffffff;
    }

    .toolbar-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      height: 40px;
      width: auto;
      object-fit: contain;
    }

    .toolbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: -0.5px;
    }

    .toolbar-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
    }

    .toolbar-menu a {
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: inherit;
    }

    .toolbar-menu a.active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .dark-theme .toolbar-menu a {
      color: #ffffff;
    }

    .dark-theme .toolbar-menu a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      .toolbar-brand h1 {
        font-size: 1.25rem;
      }

      .toolbar-menu {
        gap: 0.25rem;
      }

      .logo {
        height: 32px;
      }
    }
  `]
})
export class HeaderComponent {
  logoPath = 'assets/folio3.png';
  isDarkMode = false;
  menuItems: MenuItem[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/agents', label: 'Agent Management', exact: false },
    { path: '/logs', label: 'Logs', exact: false },
    { path: '/about', label: 'About', exact: false }
  ];

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  handleImageError(event: Event) {
    console.error('Error loading logo:', event);
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
} 