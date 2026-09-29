/**
 * PortfoliX Studio - Template Engine
 * Generates the complete HTML, CSS, and JS for both live preview and standalone export.
 */

const TemplateEngine = {
  // SVG Icon definitions
  icons: {
    github: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    download: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
    palette: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61.35.44.85.73 1.41.81.42.06.84-.04 1.19-.28.51-.35.81-.93.81-1.54 0-.41.13-.8.37-1.11.39-.5.98-.82 1.63-.89.17-.02.34-.03.52-.03 1.71 0 3.1 1.39 3.1 3.1 0 .61.5 1.1 1.1 1.1 3.25 0 6.9-3.23 6.9-7.87C21 7.03 16.97 3 12 3zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
    externalLink: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    location: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    briefcase: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    code: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  },

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  renderPortfolio(data) {
    const { profile, socials, skills, projects, experience, education, testimonials, settings } = data;
    const theme = settings.theme || 'cyber-violet';
    const initials = (profile.name || 'Dev')
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Clean status badge text (remove duplicate emoji if present)
    const cleanStatus = (profile.statusBadge || '').replace(/^[🟢•\s]+/, '').trim();

    return `
<div class="pf-container" data-theme="${theme}">
  <!-- Ambient Atmospheric Lighting -->
  <div class="pf-ambient-glow">
    <div class="pf-orb pf-orb-1"></div>
    <div class="pf-orb pf-orb-2"></div>
  </div>

  <!-- Sticky Navbar -->
  <header class="pf-nav">
    <div class="pf-nav-inner">
      <a href="#home" class="pf-logo">
        <span class="pf-logo-icon">${initials}</span>
        <span>${this.escapeHtml(profile.name || 'Portfolio')}</span>
      </a>

      <nav>
        <ul class="pf-nav-links">
          <li><a href="#about" class="pf-nav-link">About</a></li>
          <li><a href="#skills" class="pf-nav-link">Skills</a></li>
          <li><a href="#projects" class="pf-nav-link">Projects</a></li>
          ${experience && experience.length ? '<li><a href="#experience" class="pf-nav-link">Experience</a></li>' : ''}
          <li><a href="#contact" class="pf-nav-link">Contact</a></li>
        </ul>
      </nav>

      <div class="pf-nav-controls">
        <!-- Theme Selector directly on top -->
        <div class="pf-theme-picker" title="Switch Theme">
          <span class="pf-theme-label">${this.icons.palette} Theme:</span>
          <select class="pf-theme-select" id="header-theme-select" onchange="window.selectTheme(this.value)">
            <option value="cyber-violet" ${theme === 'cyber-violet' ? 'selected' : ''}>🌌 Cyber Violet</option>
            <option value="midnight-luxe" ${theme === 'midnight-luxe' ? 'selected' : ''}>💎 Midnight Luxe</option>
            <option value="aurora-emerald" ${theme === 'aurora-emerald' ? 'selected' : ''}>🌲 Aurora Emerald</option>
            <option value="solar-amber" ${theme === 'solar-amber' ? 'selected' : ''}>🌅 Solar Amber</option>
            <option value="nordic-clean" ${theme === 'nordic-clean' ? 'selected' : ''}>❄️ Nordic Clean</option>
          </select>
        </div>

        <!-- Download PDF button directly on top -->
        <button class="pf-btn-pdf" id="btn-download-pdf" onclick="window.handlePdfDownload()" title="Download Portfolio as PDF">
          ${this.icons.download}
          <span>Download PDF</span>
        </button>

        <!-- Unique Standout Colorful Create Button (redirects to full page) -->
        <a href="builder.html" class="pf-btn-create-sparkle" title="Create & Customize Your Portfolio (Full Page)">
          <span class="btn-create-content">
            <span class="btn-create-icon">✨</span>
            <span class="btn-create-text">Create Portfolio</span>
          </span>
        </a>

        <a href="#contact" class="pf-nav-cta">${this.escapeHtml(settings.ctaText || 'Get in Touch')}</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="pf-hero" id="home">
    <div class="pf-hero-content">
      ${profile.statusBadge ? `
        <div class="pf-status-badge">
          <span class="pf-status-dot"></span>
          <span>${this.escapeHtml(cleanStatus)}</span>
        </div>
      ` : ''}

      <div class="pf-hero-greeting">Hello, I'm</div>
      <h1 class="pf-hero-name">${this.escapeHtml(profile.name || 'Your Name')}</h1>
      <div class="pf-hero-role">${this.escapeHtml(profile.title || 'Software Engineer')}</div>
      <p class="pf-hero-bio">${this.escapeHtml(profile.heroSummary || profile.tagline || '')}</p>

      <div class="pf-hero-actions">
        <a href="#projects" class="pf-btn pf-btn-primary">
          <span>Explore Projects</span>
          ${this.icons.externalLink}
        </a>
        <a href="#contact" class="pf-btn pf-btn-outline">
          <span>${this.icons.email}</span>
          <span>Contact Me</span>
        </a>
        ${socials.resumeUrl && socials.resumeUrl !== '#' ? `
          <a href="${this.escapeHtml(socials.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="pf-btn pf-btn-outline">
            <span>Download CV</span>
          </a>
        ` : ''}
      </div>

      <!-- Social Links Row -->
      <div class="pf-social-links">
        ${socials.linkedin ? `
          <a href="${this.escapeHtml(socials.linkedin)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon" title="LinkedIn">
            ${this.icons.linkedin}
          </a>
        ` : ''}
        ${socials.github ? `
          <a href="${this.escapeHtml(socials.github)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon" title="GitHub">
            ${this.icons.github}
          </a>
        ` : ''}
        ${socials.twitter ? `
          <a href="${this.escapeHtml(socials.twitter)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon" title="X / Twitter">
            ${this.icons.twitter}
          </a>
        ` : ''}
        ${socials.email ? `
          <a href="mailto:${this.escapeHtml(socials.email)}" class="pf-social-icon" title="Email">
            ${this.icons.email}
          </a>
        ` : ''}
        ${socials.website ? `
          <a href="${this.escapeHtml(socials.website)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon" title="Personal Website">
            ${this.icons.globe}
          </a>
        ` : ''}
      </div>
    </div>

    <!-- Hero Avatar -->
    <div class="pf-hero-avatar-wrap">
      <div class="pf-avatar-frame">
        <img 
          src="${this.escapeHtml(profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')}" 
          alt="${this.escapeHtml(profile.name)}" 
          class="pf-avatar-img"
          onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'"
        />
        <div class="pf-avatar-badge">
          <span class="pf-avatar-badge-val">${this.escapeHtml(profile.yearsExperience || '5+')}</span>
          <span class="pf-avatar-badge-lbl">Years<br>Experience</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Metric Counters Ribbon -->
  ${settings.showStats ? `
    <div class="pf-section" style="padding-top: 0; padding-bottom: 2rem;">
      <div class="pf-stats-grid">
        <div class="pf-stat-card">
          <div class="pf-stat-num">${this.escapeHtml(profile.yearsExperience || '5+')}</div>
          <div class="pf-stat-label">Years of Experience</div>
        </div>
        <div class="pf-stat-card">
          <div class="pf-stat-num">${this.escapeHtml(profile.projectsCompleted || '30+')}</div>
          <div class="pf-stat-label">Projects Completed</div>
        </div>
        <div class="pf-stat-card">
          <div class="pf-stat-num">${this.escapeHtml(profile.happyClients || '99%')}</div>
          <div class="pf-stat-label">Client Satisfaction</div>
        </div>
        <div class="pf-stat-card">
          <div class="pf-stat-num">${this.escapeHtml(profile.codeContributions || '1k+')}</div>
          <div class="pf-stat-label">Code Contributions</div>
        </div>
      </div>
    </div>
  ` : ''}

  <!-- About Section -->
  <section class="pf-section" id="about">
    <div class="pf-section-header">
      <span class="pf-section-tag">About Me</span>
      <h2 class="pf-section-title">Passion, Craft & Engineering Rigor</h2>
      <p class="pf-section-desc">Here's a glimpse into my background, philosophy, and what drives my work every day.</p>
    </div>

    <div class="pf-about-grid">
      <div class="pf-about-story">
        ${this.escapeHtml(profile.aboutStory || profile.heroSummary || 'Welcome to my portfolio! I build modern, resilient web applications.')}
      </div>

      <div class="pf-about-info-box">
        ${profile.location ? `
          <div class="pf-info-item">
            <div class="pf-info-icon">${this.icons.location}</div>
            <div>
              <div class="pf-info-label">Based in</div>
              <div class="pf-info-value">${this.escapeHtml(profile.location)}</div>
            </div>
          </div>
        ` : ''}

        <div class="pf-info-item">
          <div class="pf-info-icon">${this.icons.briefcase}</div>
          <div>
            <div class="pf-info-label">Experience</div>
            <div class="pf-info-value">${this.escapeHtml(profile.yearsExperience || '5+')} Years Professional</div>
          </div>
        </div>

        ${socials.email ? `
          <div class="pf-info-item">
            <div class="pf-info-icon">${this.icons.email}</div>
            <div>
              <div class="pf-info-label">Direct Email</div>
              <div class="pf-info-value">${this.escapeHtml(socials.email)}</div>
            </div>
          </div>
        ` : ''}

        ${socials.linkedin ? `
          <div class="pf-info-item">
            <div class="pf-info-icon">${this.icons.linkedin}</div>
            <div>
              <div class="pf-info-label">LinkedIn</div>
              <div class="pf-info-value">
                <a href="${this.escapeHtml(socials.linkedin)}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">
                  View Profile ↗
                </a>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  </section>

  <!-- Skills Matrix Section -->
  <section class="pf-section" id="skills">
    <div class="pf-section-header">
      <span class="pf-section-tag">Expertise</span>
      <h2 class="pf-section-title">Skills & Technologies</h2>
      <p class="pf-section-desc">Tools and frameworks I use to bring robust architectures and refined interfaces to life.</p>
    </div>

    <div class="pf-skills-grid">
      ${(skills || []).map(cat => `
        <div class="pf-skill-category-card">
          <h3 class="pf-skill-cat-title">${this.escapeHtml(cat.category)}</h3>
          <div class="pf-skill-tags">
            ${(cat.items || []).map(skill => `
              <span class="pf-skill-tag">${this.escapeHtml(skill)}</span>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Featured Projects Section -->
  <section class="pf-section" id="projects">
    <div class="pf-section-header">
      <span class="pf-section-tag">Portfolio</span>
      <h2 class="pf-section-title">Featured Projects</h2>
      <p class="pf-section-desc">A curated selection of applications, systems, and platforms I've designed and engineered.</p>
    </div>

    <div class="pf-projects-grid">
      ${(projects || []).map(proj => `
        <article class="pf-project-card">
          <div class="pf-project-thumb">
            <img 
              src="${this.escapeHtml(proj.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')}" 
              alt="${this.escapeHtml(proj.title)}" 
              class="pf-project-thumb-img"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'"
            />
            ${proj.featured ? `<div class="pf-project-featured-badge">★ Featured</div>` : ''}
          </div>
          <div class="pf-project-body">
            <div class="pf-project-cat">${this.escapeHtml(proj.category || 'Engineering')}</div>
            <h3 class="pf-project-title">${this.escapeHtml(proj.title)}</h3>
            <p class="pf-project-desc">${this.escapeHtml(proj.description || proj.tagline || '')}</p>
            
            <div class="pf-project-tags">
              ${(proj.tags || []).map(tag => `
                <span class="pf-project-tag">${this.escapeHtml(tag)}</span>
              `).join('')}
            </div>

            <div class="pf-project-links">
              ${proj.demoUrl ? `
                <a href="${this.escapeHtml(proj.demoUrl)}" target="_blank" rel="noopener noreferrer" class="pf-project-link">
                  <span>Live Demo</span>
                  ${this.icons.externalLink}
                </a>
              ` : ''}
              ${proj.githubUrl ? `
                <a href="${this.escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="pf-project-link">
                  <span>Source Code</span>
                  ${this.icons.github}
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  </section>

  <!-- Experience & Career Timeline -->
  ${settings.showExperience && experience && experience.length ? `
    <section class="pf-section" id="experience">
      <div class="pf-section-header">
        <span class="pf-section-tag">Career Journey</span>
        <h2 class="pf-section-title">Work Experience</h2>
        <p class="pf-section-desc">My professional track record building production systems and driving technical impact.</p>
      </div>

      <div class="pf-timeline">
        ${experience.map(item => `
          <div class="pf-timeline-item">
            <div class="pf-timeline-dot"></div>
            <div class="pf-timeline-card">
              <div class="pf-timeline-header">
                <div>
                  <h3 class="pf-timeline-role">${this.escapeHtml(item.role)}</h3>
                  <div class="pf-timeline-company">${this.escapeHtml(item.company)} • ${this.escapeHtml(item.location || '')}</div>
                </div>
                <div class="pf-timeline-period">${this.escapeHtml(item.period)}</div>
              </div>
              <ul class="pf-timeline-highlights">
                ${(item.highlights || []).map(hl => `
                  <li>${this.escapeHtml(hl)}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : ''}

  <!-- Testimonials Section -->
  ${settings.showTestimonials && testimonials && testimonials.length ? `
    <section class="pf-section">
      <div class="pf-section-header">
        <span class="pf-section-tag">Endorsements</span>
        <h2 class="pf-section-title">What Collaborators Say</h2>
        <p class="pf-section-desc">Feedback from engineering leads, executives, and teammates I have built products with.</p>
      </div>

      <div class="pf-testimonials-grid">
        ${testimonials.map(t => `
          <div class="pf-testimonial-card">
            <div>
              <div class="pf-quote-icon">“</div>
              <p class="pf-testimonial-quote">${this.escapeHtml(t.quote)}</p>
            </div>
            <div>
              <div class="pf-testimonial-author">${this.escapeHtml(t.author)}</div>
              <div class="pf-testimonial-role">${this.escapeHtml(t.title)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : ''}

  <!-- Contact Section -->
  <section class="pf-section" id="contact">
    <div class="pf-section-header">
      <span class="pf-section-tag">Get in Touch</span>
      <h2 class="pf-section-title">Let's Build Something Exceptional</h2>
      <p class="pf-section-desc">Have a role, consulting opportunity, or project idea? Drop a line and let's talk.</p>
    </div>

    <div class="pf-contact-wrap">
      <div class="pf-contact-card">
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #fff;">Direct Contact</h3>
        <p style="color: var(--pf-text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
          I respond to all professional inquiries promptly.
        </p>

        <div class="pf-contact-methods">
          ${socials.email ? `
            <a href="mailto:${this.escapeHtml(socials.email)}" class="pf-contact-method-item">
              <span class="pf-info-icon">${this.icons.email}</span>
              <div>
                <div class="pf-info-label">Email</div>
                <div class="pf-info-value">${this.escapeHtml(socials.email)}</div>
              </div>
            </a>
          ` : ''}

          ${socials.linkedin ? `
            <a href="${this.escapeHtml(socials.linkedin)}" target="_blank" rel="noopener noreferrer" class="pf-contact-method-item">
              <span class="pf-info-icon">${this.icons.linkedin}</span>
              <div>
                <div class="pf-info-label">LinkedIn</div>
                <div class="pf-info-value">Connect on LinkedIn ↗</div>
              </div>
            </a>
          ` : ''}

          ${profile.location ? `
            <div class="pf-contact-method-item" style="cursor: default;">
              <span class="pf-info-icon">${this.icons.location}</span>
              <div>
                <div class="pf-info-label">Location</div>
                <div class="pf-info-value">${this.escapeHtml(profile.location)}</div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Contact Message Form -->
      <div class="pf-contact-card">
        <h3 style="font-size: 1.3rem; margin-bottom: 1.25rem; color: #fff;">Send a Message</h3>
        <form id="pf-contact-form" onsubmit="handleContactSubmit(event)">
          <div class="pf-form-group">
            <label class="pf-form-label">Your Name</label>
            <input type="text" class="pf-form-input" id="cf-name" placeholder="John Doe" required>
          </div>
          <div class="pf-form-group">
            <label class="pf-form-label">Your Email</label>
            <input type="email" class="pf-form-input" id="cf-email" placeholder="john@example.com" required>
          </div>
          <div class="pf-form-group">
            <label class="pf-form-label">Message</label>
            <textarea class="pf-form-textarea" id="cf-msg" placeholder="Tell me about your project, timeline, or open role..." required></textarea>
          </div>
          <button type="submit" class="pf-btn pf-btn-primary" style="width: 100%; justify-content: center;">
            Send Message
          </button>
          <div id="cf-feedback" style="display: none; margin-top: 1rem; padding: 0.8rem; border-radius: 8px; font-size: 0.9rem; text-align: center;"></div>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="pf-footer">
    <p class="pf-footer-text">
      Crafted with precision by <strong>${this.escapeHtml(profile.name || 'Developer')}</strong> • Built with PortfoliX
    </p>
    <div class="pf-social-links" style="justify-content: center; margin-top: 1rem;">
      ${socials.github ? `<a href="${this.escapeHtml(socials.github)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon">${this.icons.github}</a>` : ''}
      ${socials.linkedin ? `<a href="${this.escapeHtml(socials.linkedin)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon">${this.icons.linkedin}</a>` : ''}
      ${socials.twitter ? `<a href="${this.escapeHtml(socials.twitter)}" target="_blank" rel="noopener noreferrer" class="pf-social-icon">${this.icons.twitter}</a>` : ''}
    </div>
  </footer>
</div>
    `;
  },

  // Builds complete self-contained HTML document with embedded CSS and JS
  buildStandaloneHtml(data, cssString) {
    const { profile, settings } = data;
    const bodyContent = this.renderPortfolio(data);
    const title = `${profile.name || 'Portfolio'} - ${profile.title || 'Developer Portfolio'}`;
    const font = settings.fontFamily || 'Outfit';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(title)}</title>
  <meta name="description" content="${this.escapeHtml(profile.heroSummary || profile.tagline || 'Professional Portfolio')}">
  
  <!-- Modern Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
${cssString}
  </style>
</head>
<body>
${bodyContent}

<script>
  function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const msg = document.getElementById('cf-msg').value;
    const feedback = document.getElementById('cf-feedback');
    
    // Open mailto link as direct fallback
    const targetEmail = "${this.escapeHtml(data.socials.email || '')}";
    const subject = encodeURIComponent("Portfolio Inquiry from " + name);
    const body = encodeURIComponent("Name: " + name + "\\nEmail: " + email + "\\n\\nMessage:\\n" + msg);
    
    feedback.style.display = 'block';
    feedback.style.background = 'rgba(16, 185, 129, 0.15)';
    feedback.style.border = '1px solid #10b981';
    feedback.style.color = '#34d399';
    feedback.innerHTML = '✓ Thank you! Opening your email client to send message...';
    
    setTimeout(() => {
      window.location.href = "mailto:" + targetEmail + "?subject=" + subject + "&body=" + body;
    }, 600);
  }
</script>
</body>
</html>`;
  }
};

if (typeof window !== 'undefined') {
  window.TemplateEngine = TemplateEngine;
} else if (typeof global !== 'undefined') {
  global.TemplateEngine = TemplateEngine;
}
