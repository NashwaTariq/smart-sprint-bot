import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-backdrop" *ngIf="loaderService.loading$ | async">
      <div class="loader"></div>
    </div>
  `,
  styles: [`
    .loader-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.2);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #008080;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  `]
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
} 