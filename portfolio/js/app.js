/**
 * PortfoliX Studio - Main Controller
 * Manages full-screen portfolio rendering, top-bar theme switcher,
 * PDF generation backend/client engine, and off-canvas editor drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.dataStore;
  const root = document.getElementById('portfolio-root');
  const drawerOverlay = document.getElementById('edit-drawer-overlay');
  const projectModal = document.getElementById('project-modal');
  const jsonFileInput = document.getElementById('json-file-input');

  let updateTimeout = null;

  // Render Full-Screen Portfolio directly to root
  function renderLivePortfolio() {
    if (!root) return;
    const data = store.getData();
    root.innerHTML = window.TemplateEngine.renderPortfolio(data);

    // Sync theme on root / document
    const theme = data.settings.theme || 'cyber-violet';
    document.documentElement.setAttribute('data-theme', theme);

    // Keep header dropdown synced
    const headerSelect = document.getElementById('header-theme-select');
    if (headerSelect) {
      headerSelect.value = theme;
    }
  }

  function debounceRender() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      renderLivePortfolio();
    }, 120);
  }

  // Reactive store subscription
  store.subscribe(() => {
    debounceRender();
  });

  // Theme Selector Handler
  window.selectTheme = (themeId) => {
    store.updateSettings('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    const headerSelect = document.getElementById('header-theme-select');
    if (headerSelect) headerSelect.value = themeId;
    renderThemeOptions();
    if (window.Exporter) {
      window.Exporter.showToast(`Theme changed to: ${themeId.replace('-', ' ').toUpperCase()}`, 'info');
    }
  };

  // PDF Download Engine (Supports offline html2pdf and print fallback)
  window.handlePdfDownload = () => {
    const data = store.getData();
    const safeName = (data.profile.name || 'Portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const filename = `${safeName}-portfolio.pdf`;

    if (window.Exporter) {
      window.Exporter.showToast('Generating high-resolution PDF... Please wait a moment.', 'info');
    }

    // Hide navigation bar and drawer momentarily for pristine PDF export
    const nav = document.querySelector('.pf-nav');
    const ambient = document.querySelector('.pf-ambient-glow');
    if (nav) nav.style.display = 'none';
    if (ambient) ambient.style.display = 'none';

    const element = document.querySelector('.pf-container') || root;

    if (typeof html2pdf !== 'undefined') {
      const opt = {
        margin: [8, 8, 8, 8],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          if (nav) nav.style.display = '';
          if (ambient) ambient.style.display = '';
          if (window.Exporter) {
            window.Exporter.showToast(`✓ Downloaded ${filename} successfully!`, 'success');
          }
        })
        .catch((err) => {
          if (nav) nav.style.display = '';
          if (ambient) ambient.style.display = '';
          console.warn('html2pdf fallback to native print', err);
          window.print();
        });
    } else {
      if (nav) nav.style.display = '';
      if (ambient) ambient.style.display = '';
      window.print();
    }
  };

  // Off-canvas Drawer Controls
  window.toggleEditDrawer = (isOpen) => {
    if (!drawerOverlay) return;
    if (isOpen) {
      drawerOverlay.classList.add('open');
      populateDrawerForm();
    } else {
      drawerOverlay.classList.remove('open');
    }
  };

  // Close drawer if clicking on overlay backdrop
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        window.toggleEditDrawer(false);
      }
    });
  }

  // Populate drawer form inputs from store data
  function populateDrawerForm() {
    const data = store.getData();

    // Profile fields
    setInputValue('input-name', data.profile.name);
    setInputValue('input-title', data.profile.title);
    setInputValue('input-tagline', data.profile.tagline);
    setInputValue('input-status', data.profile.statusBadge);
    setInputValue('input-avatar', data.profile.avatar);
    setInputValue('input-location', data.profile.location);
    setInputValue('input-years-exp', data.profile.yearsExperience);
    setInputValue('input-projects-done', data.profile.projectsCompleted);
    setInputValue('input-clients', data.profile.happyClients);
    setInputValue('input-commits', data.profile.codeContributions);
    setInputValue('input-hero-summary', data.profile.heroSummary);
    setInputValue('input-about-story', data.profile.aboutStory);

    // Socials & Contact
    setInputValue('input-email', data.socials.email);
    setInputValue('input-linkedin', data.socials.linkedin);
    setInputValue('input-github', data.socials.github);
    setInputValue('input-twitter', data.socials.twitter);
    setInputValue('input-website', data.socials.website);
    setInputValue('input-resume', data.socials.resumeUrl);
    setInputValue('input-phone', data.socials.phone);

    // Settings
    setInputValue('input-cta-text', data.settings.ctaText);

    // Dynamic Lists
    renderSkillsList();
    renderProjectsList();
    renderExperienceList();
    renderTestimonialsList();
    renderThemeOptions();
  }

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  // Attach live input listeners to drawer fields
  function setupInputBindings() {
    const profileBindings = [
      ['input-name', 'name'],
      ['input-title', 'title'],
      ['input-tagline', 'tagline'],
      ['input-status', 'statusBadge'],
      ['input-avatar', 'avatar'],
      ['input-location', 'location'],
      ['input-years-exp', 'yearsExperience'],
      ['input-projects-done', 'projectsCompleted'],
      ['input-clients', 'happyClients'],
      ['input-commits', 'codeContributions'],
      ['input-hero-summary', 'heroSummary'],
      ['input-about-story', 'aboutStory']
    ];

    profileBindings.forEach(([id, field]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          store.updateProfile(field, e.target.value);
        });
      }
    });

    const socialBindings = [
      ['input-email', 'email'],
      ['input-linkedin', 'linkedin'],
      ['input-github', 'github'],
      ['input-twitter', 'twitter'],
      ['input-website', 'website'],
      ['input-resume', 'resumeUrl'],
      ['input-phone', 'phone']
    ];

    socialBindings.forEach(([id, field]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          store.updateSocial(field, e.target.value);
        });
      }
    });

    const ctaInput = document.getElementById('input-cta-text');
    if (ctaInput) {
      ctaInput.addEventListener('input', (e) => {
        store.updateSettings('ctaText', e.target.value);
      });
    }
  }

  // Drawer Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Skills List
  function renderSkillsList() {
    const listEl = document.getElementById('skills-editor-list');
    if (!listEl) return;
    const skills = store.getData().skills || [];

    listEl.innerHTML = skills.map((cat, catIdx) => `
      <div class="editor-card">
        <div class="editor-card-header">
          <input 
            type="text" 
            value="${window.TemplateEngine.escapeHtml(cat.category)}" 
            class="form-field-input" 
            style="font-weight: 700; width: 60%; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 4px 8px; color: #fff;"
            onchange="updateSkillCategory(${catIdx}, this.value)"
          />
          <button class="icon-btn-danger" onclick="deleteSkillCategory(${catIdx})" title="Delete Category">✕</button>
        </div>

        <div class="tag-input-group">
          <input 
            type="text" 
            id="new-skill-input-${catIdx}" 
            placeholder="Add skill (e.g. Next.js, Docker)" 
            onkeydown="if(event.key === 'Enter') { addSkillItem(${catIdx}); event.preventDefault(); }"
          />
          <button class="action-btn" onclick="addSkillItem(${catIdx})">+ Add</button>
        </div>

        <div class="skill-pills-list">
          ${(cat.items || []).map((item, itemIdx) => `
            <span class="skill-pill-item">
              ${window.TemplateEngine.escapeHtml(item)}
              <button class="skill-pill-remove" onclick="removeSkillItem(${catIdx}, ${itemIdx})">✕</button>
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  window.updateSkillCategory = (catIdx, newTitle) => {
    const data = store.getData();
    data.skills[catIdx].category = newTitle;
    store.save();
  };

  window.deleteSkillCategory = (catIdx) => {
    const data = store.getData();
    data.skills.splice(catIdx, 1);
    store.save();
    renderSkillsList();
  };

  window.addSkillItem = (catIdx) => {
    const input = document.getElementById(`new-skill-input-${catIdx}`);
    if (!input || !input.value.trim()) return;
    const val = input.value.trim();
    const data = store.getData();
    data.skills[catIdx].items.push(val);
    input.value = '';
    store.save();
    renderSkillsList();
  };

  window.removeSkillItem = (catIdx, itemIdx) => {
    const data = store.getData();
    data.skills[catIdx].items.splice(itemIdx, 1);
    store.save();
    renderSkillsList();
  };

  const addCatBtn = document.getElementById('btn-add-skill-cat');
  if (addCatBtn) {
    addCatBtn.addEventListener('click', () => {
      const data = store.getData();
      data.skills.push({ category: "New Category", items: [] });
      store.save();
      renderSkillsList();
    });
  }

  // Projects Manager
  function renderProjectsList() {
    const listEl = document.getElementById('projects-editor-list');
    if (!listEl) return;
    const projects = store.getData().projects || [];

    listEl.innerHTML = projects.map((p, idx) => `
      <div class="editor-card">
        <div class="editor-card-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-weight: 700; color: #fff;">${idx + 1}. ${window.TemplateEngine.escapeHtml(p.title || 'Untitled Project')}</span>
            ${p.featured ? '<span style="font-size: 0.7rem; color: #f59e0b; background: rgba(245,158,11,0.15); padding: 2px 6px; border-radius: 4px;">★ Featured</span>' : ''}
          </div>
          <div style="display: flex; gap: 0.4rem;">
            <button class="action-btn" style="padding: 0.25rem 0.6rem; font-size: 0.8rem;" onclick="openProjectModal(${idx})">Edit</button>
            <button class="icon-btn-danger" onclick="deleteProject(${idx})" title="Delete Project">✕</button>
          </div>
        </div>
        <p style="font-size: 0.82rem; color: var(--studio-text-muted); margin-bottom: 0.5rem;">${window.TemplateEngine.escapeHtml(p.tagline || p.description || '')}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          ${(p.tags || []).map(t => `<span style="font-size: 0.72rem; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px;">${window.TemplateEngine.escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  let editingProjectIndex = -1;

  window.openProjectModal = (idx = -1) => {
    editingProjectIndex = idx;
    const data = store.getData();
    const proj = idx >= 0 ? data.projects[idx] : {
      title: "",
      category: "Web Application",
      tagline: "",
      description: "",
      tags: [],
      demoUrl: "",
      githubUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      featured: false
    };

    setInputValue('proj-title', proj.title);
    setInputValue('proj-category', proj.category);
    setInputValue('proj-tagline', proj.tagline);
    setInputValue('proj-desc', proj.description);
    setInputValue('proj-tags', (proj.tags || []).join(', '));
    setInputValue('proj-demo', proj.demoUrl);
    setInputValue('proj-github', proj.githubUrl);
    setInputValue('proj-image', proj.imageUrl);
    const featCheck = document.getElementById('proj-featured');
    if (featCheck) featCheck.checked = !!proj.featured;

    document.getElementById('project-modal-title').textContent = idx >= 0 ? 'Edit Project' : 'Add New Project';
    if (projectModal) projectModal.classList.add('open');
  };

  window.closeProjectModal = () => {
    if (projectModal) projectModal.classList.remove('open');
    editingProjectIndex = -1;
  };

  window.saveProjectModal = (e) => {
    e.preventDefault();
    const title = document.getElementById('proj-title').value.trim();
    if (!title) return;

    const data = store.getData();
    const newProj = {
      id: editingProjectIndex >= 0 ? data.projects[editingProjectIndex].id : 'proj-' + Date.now(),
      title: title,
      category: document.getElementById('proj-category').value.trim() || 'Software Project',
      tagline: document.getElementById('proj-tagline').value.trim(),
      description: document.getElementById('proj-desc').value.trim(),
      tags: document.getElementById('proj-tags').value.split(',').map(t => t.trim()).filter(Boolean),
      demoUrl: document.getElementById('proj-demo').value.trim(),
      githubUrl: document.getElementById('proj-github').value.trim(),
      imageUrl: document.getElementById('proj-image').value.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      featured: document.getElementById('proj-featured').checked
    };

    if (editingProjectIndex >= 0) {
      data.projects[editingProjectIndex] = newProj;
    } else {
      data.projects.push(newProj);
    }

    store.save();
    renderProjectsList();
    closeProjectModal();
    window.Exporter.showToast('Project saved successfully!', 'success');
  };

  window.deleteProject = (idx) => {
    if (confirm('Delete this project card?')) {
      const data = store.getData();
      data.projects.splice(idx, 1);
      store.save();
      renderProjectsList();
    }
  };

  const addProjBtn = document.getElementById('btn-add-project');
  if (addProjBtn) {
    addProjBtn.addEventListener('click', () => openProjectModal(-1));
  }

  // Work Experience Manager
  function renderExperienceList() {
    const listEl = document.getElementById('experience-editor-list');
    if (!listEl) return;
    const items = store.getData().experience || [];

    listEl.innerHTML = items.map((exp, idx) => `
      <div class="editor-card">
        <div class="editor-card-header">
          <span class="editor-card-title">${window.TemplateEngine.escapeHtml(exp.role)} @ ${window.TemplateEngine.escapeHtml(exp.company)}</span>
          <button class="icon-btn-danger" onclick="deleteExperience(${idx})" title="Delete">✕</button>
        </div>
        <div class="form-row">
          <div class="form-col">
            <input 
              type="text" 
              placeholder="Role" 
              value="${window.TemplateEngine.escapeHtml(exp.role)}" 
              oninput="updateExpField(${idx}, 'role', this.value)"
            />
          </div>
          <div class="form-col">
            <input 
              type="text" 
              placeholder="Company" 
              value="${window.TemplateEngine.escapeHtml(exp.company)}" 
              oninput="updateExpField(${idx}, 'company', this.value)"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-col">
            <input 
              type="text" 
              placeholder="Period (e.g. 2022 - Present)" 
              value="${window.TemplateEngine.escapeHtml(exp.period)}" 
              oninput="updateExpField(${idx}, 'period', this.value)"
            />
          </div>
          <div class="form-col">
            <input 
              type="text" 
              placeholder="Location" 
              value="${window.TemplateEngine.escapeHtml(exp.location || '')}" 
              oninput="updateExpField(${idx}, 'location', this.value)"
            />
          </div>
        </div>
        <div class="form-field">
          <label>Achievements (One bullet per line)</label>
          <textarea 
            rows="3" 
            oninput="updateExpHighlights(${idx}, this.value)"
          >${(exp.highlights || []).join('\n')}</textarea>
        </div>
      </div>
    `).join('');
  }

  window.updateExpField = (idx, field, val) => {
    const data = store.getData();
    data.experience[idx][field] = val;
    store.save();
  };

  window.updateExpHighlights = (idx, text) => {
    const data = store.getData();
    data.experience[idx].highlights = text.split('\n').map(l => l.trim()).filter(Boolean);
    store.save();
  };

  window.deleteExperience = (idx) => {
    const data = store.getData();
    data.experience.splice(idx, 1);
    store.save();
    renderExperienceList();
  };

  const addExpBtn = document.getElementById('btn-add-experience');
  if (addExpBtn) {
    addExpBtn.addEventListener('click', () => {
      const data = store.getData();
      data.experience.push({
        id: 'exp-' + Date.now(),
        role: "Software Engineer",
        company: "Company Name",
        period: "2023 - Present",
        location: "City, Country",
        highlights: ["Built key web features and collaborated across squads."]
      });
      store.save();
      renderExperienceList();
    });
  }

  // Testimonials Manager
  function renderTestimonialsList() {
    const listEl = document.getElementById('testimonials-editor-list');
    if (!listEl) return;
    const items = store.getData().testimonials || [];

    listEl.innerHTML = items.map((t, idx) => `
      <div class="editor-card">
        <div class="editor-card-header">
          <span class="editor-card-title">${window.TemplateEngine.escapeHtml(t.author || 'Reviewer')}</span>
          <button class="icon-btn-danger" onclick="deleteTestimonial(${idx})">✕</button>
        </div>
        <div class="form-field">
          <label>Quote</label>
          <textarea rows="2" oninput="updateTestimonial(${idx}, 'quote', this.value)">${window.TemplateEngine.escapeHtml(t.quote)}</textarea>
        </div>
        <div class="form-row">
          <div class="form-col">
            <input type="text" placeholder="Author Name" value="${window.TemplateEngine.escapeHtml(t.author)}" oninput="updateTestimonial(${idx}, 'author', this.value)"/>
          </div>
          <div class="form-col">
            <input type="text" placeholder="Title & Company" value="${window.TemplateEngine.escapeHtml(t.title)}" oninput="updateTestimonial(${idx}, 'title', this.value)"/>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.updateTestimonial = (idx, field, val) => {
    const data = store.getData();
    data.testimonials[idx][field] = val;
    store.save();
  };

  window.deleteTestimonial = (idx) => {
    const data = store.getData();
    data.testimonials.splice(idx, 1);
    store.save();
    renderTestimonialsList();
  };

  const addTestBtn = document.getElementById('btn-add-testimonial');
  if (addTestBtn) {
    addTestBtn.addEventListener('click', () => {
      const data = store.getData();
      data.testimonials.push({
        id: 'test-' + Date.now(),
        quote: "Phenomenal work and attention to detail throughout the product cycle.",
        author: "Client or Manager Name",
        title: "VP of Product"
      });
      store.save();
      renderTestimonialsList();
    });
  }

  // Theme Chooser in Drawer
  function renderThemeOptions() {
    const themes = [
      { id: 'cyber-violet', name: 'Cyber Violet', desc: 'Electric Violet & Cyan Neon Glow', colors: ['#09090f', '#8b5cf6', '#ec4899', '#06b6d4'] },
      { id: 'midnight-luxe', name: 'Midnight Luxe', desc: 'Obsidian Black & Amber Gold', colors: ['#050505', '#f59e0b', '#fbbf24', '#ffffff'] },
      { id: 'aurora-emerald', name: 'Aurora Emerald', desc: 'Fintech Deep Forest & Mint', colors: ['#041310', '#10b981', '#06b6d4', '#ecfdf5'] },
      { id: 'solar-amber', name: 'Solar Amber', desc: 'Warm Rose, Flame & Coral Glow', colors: ['#0e0909', '#f43f5e', '#fb923c', '#facc15'] },
      { id: 'nordic-clean', name: 'Nordic Clean', desc: 'Crisp Swiss Minimal Light/Dark', colors: ['#f8fafc', '#6366f1', '#0ea5e9', '#0f172a'] }
    ];

    const grid = document.getElementById('theme-options-grid');
    if (!grid) return;
    const currentTheme = store.getData().settings.theme || 'cyber-violet';

    grid.innerHTML = themes.map(t => `
      <div 
        class="theme-card-option ${currentTheme === t.id ? 'selected' : ''}" 
        onclick="window.selectTheme('${t.id}')"
      >
        <div class="theme-preview-colors">
          ${t.colors.map(c => `<div class="theme-preview-chip" style="background: ${c};"></div>`).join('')}
        </div>
        <div class="theme-title">${t.name}</div>
        <div class="theme-desc">${t.desc}</div>
      </div>
    `).join('');
  }

  // Standalone HTML and JSON buttons inside Drawer
  const dlHtmlBtn = document.getElementById('btn-drawer-download-html');
  if (dlHtmlBtn) {
    dlHtmlBtn.addEventListener('click', () => {
      window.Exporter.downloadHtml();
    });
  }

  const dlJsonBtn = document.getElementById('btn-drawer-download-json');
  if (dlJsonBtn) {
    dlJsonBtn.addEventListener('click', () => {
      window.Exporter.downloadJson();
    });
  }

  const importBtn = document.getElementById('btn-drawer-import-json');
  if (importBtn && jsonFileInput) {
    importBtn.addEventListener('click', () => {
      jsonFileInput.click();
    });
    jsonFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        window.Exporter.importJson(e.target.files[0]);
        setTimeout(() => {
          populateDrawerForm();
          renderLivePortfolio();
        }, 120);
      }
    });
  }

  const demoBtn = document.getElementById('btn-drawer-load-demo');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      if (confirm('Load sample portfolio profile?')) {
        store.resetToDefault();
        populateDrawerForm();
        renderLivePortfolio();
        window.Exporter.showToast('Sample developer portfolio loaded!', 'success');
      }
    });
  }

  const resetBtn = document.getElementById('btn-drawer-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Clear all profile data and start fresh?')) {
        store.clearAll();
        populateDrawerForm();
        renderLivePortfolio();
        window.Exporter.showToast('Portfolio cleared. Ready for your data!', 'info');
      }
    });
  }

  // Interactive contact form submission handler
  window.handleContactSubmit = (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('cf-name');
    const emailEl = document.getElementById('cf-email');
    const msgEl = document.getElementById('cf-msg');
    const feedback = document.getElementById('cf-feedback');

    const name = nameEl ? nameEl.value : '';
    const email = emailEl ? emailEl.value : '';
    const msg = msgEl ? msgEl.value : '';

    const targetEmail = store.getData().socials.email || '';
    const subject = encodeURIComponent("Portfolio Inquiry from " + name);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + msg);

    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(16, 185, 129, 0.15)';
      feedback.style.border = '1px solid #10b981';
      feedback.style.color = '#34d399';
      feedback.innerHTML = '✓ Thank you! Opening your email client to send message...';
    }

    setTimeout(() => {
      window.location.href = "mailto:" + targetEmail + "?subject=" + subject + "&body=" + body;
    }, 600);
  };

  // Initial Boot
  setupInputBindings();
  renderLivePortfolio();
});
