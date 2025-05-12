import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, LoaderComponent],
  template: `
    <app-loader></app-loader>
    <app-header></app-header>
    <main class="main-content">
      <div class="main-inner">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .main-content {
      position: relative;
      height: 100vh;
      overflow-y: auto;
      padding: 2rem;
      padding-top: 80px;
      width: 100vw;
      max-width: 100vw;
      margin: 0;
      box-sizing: border-box;
    }

    .main-inner {
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
        padding-top: 80px;
      }
      .main-inner {
        max-width: 100vw;
      }
    }
  `]
})
export class AppComponent {
  title = 'MCP Server';

  constructor(private themeService: ThemeService) {
    // Initialize theme
    this.themeService.theme$.subscribe();
  }
}
