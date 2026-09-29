/**
 * PortfoliX Studio - Exporter Module
 * Manages downloading standalone HTML, saving/loading JSON backups, and clipboard operations.
 */

const Exporter = {
  cachedCss: null,

  async getPortfolioCss() {
    if (this.cachedCss) return this.cachedCss;
    try {
      const res = await fetch('css/portfolio-themes.css');
      if (res.ok) {
        this.cachedCss = await res.text();
        return this.cachedCss;
      }
    } catch (e) {
      console.warn('Could not fetch external CSS, using fallback', e);
    }
    // Fallback: extract from document if loaded
    return `/* PortfoliX Embedded Styles */`;
  },

  showToast(message, type = 'success') {
    let toast = document.getElementById('studio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'studio-toast';
      toast.className = 'studio-toast';
      document.body.appendChild(toast);
    }

    toast.className = `studio-toast ${type} show`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${message}</span>`;

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  },

  async downloadHtml() {
    const data = window.dataStore.getData();
    const css = await this.getPortfolioCss();
    const html = window.TemplateEngine.buildStandaloneHtml(data, css);

    const safeName = (data.profile.name || 'portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const filename = `${safeName}-portfolio.html`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast(`Portfolio saved as "${filename}"! Ready to upload to GitHub Pages or Netlify.`, 'success');
  },

  downloadJson() {
    const data = window.dataStore.getData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolix-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast('Portfolio data backup downloaded (.json)!', 'success');
  },

  importJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.profile) {
          window.dataStore.setFullData(parsed);
          this.showToast('Portfolio configuration imported successfully!', 'success');
        } else {
          alert('Invalid PortfoliX JSON format: Missing profile data.');
        }
      } catch (err) {
        alert('Could not parse JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  },

  async copyHtmlToClipboard() {
    const data = window.dataStore.getData();
    const css = await this.getPortfolioCss();
    const html = window.TemplateEngine.buildStandaloneHtml(data, css);

    try {
      await navigator.clipboard.writeText(html);
      this.showToast('Full Standalone HTML copied to clipboard!', 'success');
    } catch (e) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('HTML copied to clipboard!', 'success');
    }
  },

  printPortfolio() {
    const iframe = document.getElementById('preview-frame');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      window.print();
    }
  }
};

window.Exporter = Exporter;
