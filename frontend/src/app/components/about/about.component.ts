import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
}

interface TechStack {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="about-container">
      <section class="hero">
        <h1>Smart Sprint Bot</h1>
        <p class="subtitle">A Modern Multi-Agent Sprint Control Platform for Folio3 AI Hackathon 2025</p>
      </section>

      <section class="features">
        <div class="feature-card">
          <h2>🤖 Agent Management</h2>
          <p>Register, configure, and manage multiple AI agents with ease. Each agent can be customized with specific capabilities and configurations.</p>
        </div>

        <div class="feature-card">
          <h2>💬 Natural Language Interface</h2>
          <p>Interact with your agents using natural language powered by Groq. Get intelligent responses and execute complex tasks through simple conversations.</p>
        </div>

        <div class="feature-card">
          <h2>📊 Monitoring & Logs</h2>
          <p>Track agent activities, view detailed logs, and monitor performance in real-time. Stay informed about every action and response.</p>
        </div>
      </section>

      <section class="tech-stack">
        <h2>Technology Stack</h2>
        <div class="tech-grid">
          @for (tech of techStack; track tech.category) {
            <div class="tech-item">
              <h3>{{ tech.category }}</h3>
              <ul>
                @for (item of tech.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </section>

      <section class="team">
        <h2>Meet Our Team</h2>
        <div class="team-grid">
          @for (member of teamMembers; track member.initials) {
            <div class="team-member">
              <div class="member-avatar">{{ member.initials }}</div>
              <h3>{{ member.name }}</h3>
              <p class="role">{{ member.role }}</p>
              <p class="bio">{{ member.bio }}</p>
            </div>
          }
        </div>
      </section>

      <section class="contact">
        <h2>Contact Us</h2>
        <p>Have questions or need support? Reach out to our team.</p>
        <a mat-raised-button color="primary" href="mailto:smartsprintbot&#64;gmail.com">
          <mat-icon>email</mat-icon>
          smartsprintbot&#64;gmail.com
        </a>
      </section>
    </div>

    <style>
      .about-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      :host-context(.dark-theme) .about-container {
        background-color: #1a1a1a;
        color: #ffffff;
      }

      section {
        transition: all 0.3s ease;
      }

      :host-context(.dark-theme) section {
        background-color: #1a1a1a;
      }

      .hero {
        text-align: center;
        margin-bottom: 4rem;
        padding: 2rem;
        border-radius: 8px;
      }

      :host-context(.dark-theme) .hero {
        background: rgba(255, 255, 255, 0.05);
      }

      .hero h1 {
        font-size: 3rem;
        color: #2c3e50;
        margin-bottom: 1rem;
        font-weight: 700;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .hero h1 {
        color: #ecf0f1;
      }

      .subtitle {
        font-size: 1.25rem;
        color: #5f6368;
        margin: 0;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .subtitle {
        color: #bdc3c7;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
        padding: 1rem;
      }

      .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host-context(.dark-theme) .feature-card {
        background: #23272b;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.12);
      }

      :host-context(.dark-theme) .feature-card:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      }

      .feature-card h2 {
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .feature-card h2 {
        color: #ecf0f1;
      }

      .feature-card p {
        color: #5f6368;
        line-height: 1.6;
        margin: 0;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .feature-card p {
        color: #bdc3c7;
      }

      .tech-stack {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        margin-bottom: 4rem;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host-context(.dark-theme) .tech-stack {
        background: #23272b;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .tech-stack h2 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .tech-stack h2 {
        color: #ecf0f1;
      }

      .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }

      .tech-item {
        text-align: center;
        padding: 1.5rem;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
      }

      :host-context(.dark-theme) .tech-item {
        background: #23272b;
      }

      .tech-item:hover {
        background: rgba(255, 255, 255, 0.7);
      }

      :host-context(.dark-theme) .tech-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .tech-item h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.25rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .tech-item h3 {
        color: #ecf0f1;
      }

      .tech-item ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .tech-item li {
        color: #5f6368;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .tech-item li {
        color: #bdc3c7;
      }

      .team {
        margin-bottom: 4rem;
        padding: 1rem;
      }

      .team h2 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .team h2 {
        color: #ecf0f1;
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 2rem;
      }

      .team-member {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host-context(.dark-theme) .team-member {
        background: #23272b;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .team-member:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.12);
      }

      :host-context(.dark-theme) .team-member:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      }

      .member-avatar {
        width: 80px;
        height: 80px;
        background: #008080;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0 auto 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      :host-context(.dark-theme) .member-avatar {
        background: #008080;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      .team-member h3 {
        color: #2c3e50;
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .team-member h3 {
        color: #ecf0f1;
      }

      .role {
        color: #5f6368;
        font-weight: 500;
        margin: 0 0 1rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .role {
        color: #bdc3c7;
      }

      .bio {
        color: #5f6368;
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .bio {
        color: #bdc3c7;
      }

      .contact {
        text-align: center;
        background: white;
        padding: 3rem 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host-context(.dark-theme) .contact {
        background: #23272b !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .contact h2 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 2rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .contact h2 {
        color: #ecf0f1;
      }

      .contact p {
        color: #5f6368;
        margin-bottom: 2rem;
        transition: color 0.3s ease;
      }

      :host-context(.dark-theme) .contact p {
        color: #bdc3c7;
      }

      .contact a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
      }

      .contact mat-icon {
        font-size: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
      }

      @media (max-width: 768px) {
        .about-container {
          padding: 1rem;
        }

        .hero h1 {
          font-size: 2rem;
        }

        .subtitle {
          font-size: 1rem;
        }

        .features {
          grid-template-columns: 1fr;
        }

        .team-grid {
          grid-template-columns: 1fr;
        }
      }

    </style>
  `
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      initials: 'AZ',
      name: 'Aliza Jamal',
      role: 'Lead Software Engineer',
      bio: 'AI Augmented - Microsoft Dynamics AX/365FO - Lead Technical Consultant at Folio3',
    },
    {
      initials: 'UK',
      name: 'Uzair Kamdar',
      role: 'Senior Software Engineer',
      bio: 'Specializes in LLM integration and .NET development.'
    },
    {
      initials: 'SA',
      name: 'Syed Shahbaz Akhter',
      role: 'Senior Software Engineer',
      bio: 'AI Augmented - Microsoft Dynamics AX/365FO '
    },
    {
      initials: 'NT',
      name: 'Nashwa Tariq',
      role: 'Senior Software Engineer',
      bio: 'AI Augmented - Crafting secure and scalable frontend systems.'
    }
  ];

  techStack: TechStack[] = [
    {
      category: 'Frontend',
      items: ['Angular 19', 'TypeScript', 'Material UI']
    },
    {
      category: 'Backend',
      items: ['Python', 'FastAPI', 'PostgreSQL']
    },
    {
      category: 'AI Integration',
      items: ['LangChain Groq', 'JIRA Toolkit', 'Gmail Toolkit']
    }
  ];
} 