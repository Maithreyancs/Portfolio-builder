/**
 * PortfoliX Studio - Builder Page Controller
 * Powers the dedicated full-page creator studio in builder.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.dataStore;
  const previewFrame = document.getElementById('preview-frame');
  const viewportWrapper = document.getElementById('viewport-wrapper');
  const projectModal = document.getElementById('project-modal');
  const fileInput = document.getElementById('json-file-input');
  let updateTimeout = null;

  // Render to Preview Iframe
  async function refreshPreview() {
    if (!previewFrame) return;

    const data = store.getData();
    const css = await window.Exporter.getPortfolioCss();
    const fullHtml = window.TemplateEngine.buildStandaloneHtml(data, css);

    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(fullHtml);
    doc.close();
  }

  function debouncePreview() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      refreshPreview();
    }, 120);
  }

  store.subscribe(() => {
    debouncePreview();
  });

  // Populate form with current store data
  function populateForm() {
    const data = store.getData();

    // Profile
    setVal('input-name', data.profile.name);
    setVal('input-title', data.profile.title);
    setVal('input-tagline', data.profile.tagline);
    setVal('input-status', data.profile.statusBadge);
    setVal('input-avatar', data.profile.avatar);
    setVal('input-location', data.profile.location);
    setVal('input-years-exp', data.profile.yearsExperience);
    setVal('input-projects-done', data.profile.projectsCompleted);
    setVal('input-clients', data.profile.happyClients);
    setVal('input-commits', data.profile.codeContributions);
    setVal('input-hero-summary', data.profile.heroSummary);
    setVal('input-about-story', data.profile.aboutStory);

    // Socials
    setVal('input-email', data.socials.email);
    setVal('input-linkedin', data.socials.linkedin);
    setVal('input-github', data.socials.github);
    setVal('input-twitter', data.socials.twitter);
    setVal('input-website', data.socials.website);
    setVal('input-resume', data.socials.resumeUrl);
    setVal('input-phone', data.socials.phone);

    // Settings
    setVal('input-cta-text', data.settings.ctaText);

    // Dynamic Lists
    renderSkillsList();
    renderProjectsList();
    renderExperienceList();
    renderTestimonialsList();
    renderThemeOptions();
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  // Setup reactive form listeners
  function setupBindings() {
    const profileFields = [
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

    profileFields.forEach(([id, field]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          store.updateProfile(field, e.target.value);
        });
      }
    });

    const socialFields = [
      ['input-email', 'email'],
      ['input-linkedin', 'linkedin'],
      ['input-github', 'github'],
      ['input-twitter', 'twitter'],
      ['input-website', 'website'],
      ['input-resume', 'resumeUrl'],
      ['input-phone', 'phone']
    ];

    socialFields.forEach(([id, field]) => {
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

  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel-content');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabs.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Device switcher
  const deviceButtons = document.querySelectorAll('.device-btn');
  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.device;
      deviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (viewportWrapper) {
        viewportWrapper.className = `viewport-frame-wrapper mode-${mode}`;
      }
    });
  });

  // Skills
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
            placeholder="Add skill (e.g. React, Next.js, Docker)" 
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

  window.updateSkillCategory = (catIdx, val) => {
    const data = store.getData();
    data.skills[catIdx].category = val;
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
    const data = store.getData();
    data.skills[catIdx].items.push(input.value.trim());
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

  const addSkillCatBtn = document.getElementById('btn-add-skill-cat');
  if (addSkillCatBtn) {
    addSkillCatBtn.addEventListener('click', () => {
      const data = store.getData();
      data.skills.push({ category: "New Category", items: [] });
      store.save();
      renderSkillsList();
    });
  }

  // Projects
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

    setVal('proj-title', proj.title);
    setVal('proj-category', proj.category);
    setVal('proj-tagline', proj.tagline);
    setVal('proj-desc', proj.description);
    setVal('proj-tags', (proj.tags || []).join(', '));
    setVal('proj-demo', proj.demoUrl);
    setVal('proj-github', proj.githubUrl);
    setVal('proj-image', proj.imageUrl);
    const feat = document.getElementById('proj-featured');
    if (feat) feat.checked = !!proj.featured;

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

  // Work Experience
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
            <input type="text" placeholder="Role" value="${window.TemplateEngine.escapeHtml(exp.role)}" oninput="updateExpField(${idx}, 'role', this.value)"/>
          </div>
          <div class="form-col">
            <input type="text" placeholder="Company" value="${window.TemplateEngine.escapeHtml(exp.company)}" oninput="updateExpField(${idx}, 'company', this.value)"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-col">
            <input type="text" placeholder="Period" value="${window.TemplateEngine.escapeHtml(exp.period)}" oninput="updateExpField(${idx}, 'period', this.value)"/>
          </div>
          <div class="form-col">
            <input type="text" placeholder="Location" value="${window.TemplateEngine.escapeHtml(exp.location || '')}" oninput="updateExpField(${idx}, 'location', this.value)"/>
          </div>
        </div>
        <div class="form-field">
          <label>Achievements (One bullet per line)</label>
          <textarea rows="3" oninput="updateExpHighlights(${idx}, this.value)">${(exp.highlights || []).join('\n')}</textarea>
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
        role: "Senior Software Engineer",
        company: "Company Name",
        period: "2023 - Present",
        location: "City, Country",
        highlights: ["Designed and shipped core architecture features."]
      });
      store.save();
      renderExperienceList();
    });
  }

  // Testimonials
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
        author: "Colleague or Manager",
        title: "Engineering Lead"
      });
      store.save();
      renderTestimonialsList();
    });
  }

  // Themes
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
        onclick="selectTheme('${t.id}')"
      >
        <div class="theme-preview-colors">
          ${t.colors.map(c => `<div class="theme-preview-chip" style="background: ${c};"></div>`).join('')}
        </div>
        <div class="theme-title">${t.name}</div>
        <div class="theme-desc">${t.desc}</div>
      </div>
    `).join('');
  }

  window.selectTheme = (themeId) => {
    store.updateSettings('theme', themeId);
    renderThemeOptions();
    window.Exporter.showToast(`Theme changed to ${themeId.replace('-', ' ').toUpperCase()}`, 'info');
  };

  // Header Actions
  const btnDemo = document.getElementById('btn-load-demo');
  if (btnDemo) {
    btnDemo.addEventListener('click', () => {
      if (confirm('Load demo portfolio with sample data?')) {
        store.resetToDefault();
        populateForm();
        refreshPreview();
        window.Exporter.showToast('Sample developer portfolio loaded!', 'success');
      }
    });
  }

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Clear all data and start fresh?')) {
        store.clearAll();
        populateForm();
        refreshPreview();
        window.Exporter.showToast('All fields cleared!', 'info');
      }
    });
  }

  const btnDownloadHtml = document.getElementById('btn-download-html');
  if (btnDownloadHtml) {
    btnDownloadHtml.addEventListener('click', () => {
      window.Exporter.downloadHtml();
    });
  }

  const btnDownloadJson = document.getElementById('btn-download-json');
  if (btnDownloadJson) {
    btnDownloadJson.addEventListener('click', () => {
      window.Exporter.downloadJson();
    });
  }

  const btnImportJson = document.getElementById('btn-import-json');
  if (btnImportJson && fileInput) {
    btnImportJson.addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        window.Exporter.importJson(e.target.files[0]);
        setTimeout(() => {
          populateForm();
          refreshPreview();
        }, 120);
      }
    });
  }

  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', () => {
      window.Exporter.printPortfolio();
    });
  }

  // Initial populate and render
  populateForm();
  setupBindings();
  refreshPreview();
});
