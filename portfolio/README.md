# ✨ PortfoliX Studio — Next-Gen Portfolio Builder Website

> **A modern, interactive portfolio builder website** (similar to a resume builder, but crafted specifically for developer and designer portfolios). Fill in your details, see real-time live preview across desktop, tablet, and mobile, and export a 100% self-contained, production-ready portfolio with zero build steps!

---

## 🌟 Key Features

### 1. 🖥️ Full-Screen Immersive Experience
- The entire page is a **100% full-screen, responsive portfolio website** without any permanent split-screen sidebars cluttering the view.
- Smooth native vertical scrolling across all sections: **Hero**, **Stats**, **About Me**, **Skills**, **Projects**, **Experience**, **Testimonials**, and **Contact**.

### 2. 🎨 Top Navbar Theme Switcher
- Choose themes right from the top navigation bar:
  1. **🌌 Cyber Violet**: Deep obsidian with electric violet and cyan neon glow.
  2. **💎 Midnight Luxe**: High-contrast black with warm amber-gold accents.
  3. **🌲 Aurora Emerald**: Modern fintech deep pine and mint neon.
  4. **🌅 Solar Amber**: Creative warm rose and coral flame gradients.
  5. **❄️ Nordic Clean**: Crisp Swiss minimal aesthetic.

### 3. 📄 Top Navbar PDF Download (Working Engine)
- Dedicated **Download PDF** button right on the top navbar.
- Powered by the bundled `html2pdf.bundle.min.js` and dedicated `@media print` rules.
- Silently generates and downloads a clean, executive-ready `[Your-Name]-portfolio.pdf`.

### 4. ✏️ Slide-Out Editor Drawer
- Click **✏️ Edit** on the top bar to open an off-canvas drawer that smoothly slides in from the left.
- Modify your **Name**, **Title**, **Avatar**, **Bio**, **Email**, **LinkedIn**, **GitHub**, **Skills**, **Projects**, and **Experience**.
- Real-time instant updates: as you type in the drawer, the full-screen portfolio updates in the background!
- Close the drawer anytime (`✕`) to return to the uninterrupted full-screen portfolio.

### 8. 📱 Responsive Device Simulator
- Switch between **Desktop View (100%)**, **Tablet View (768px)**, and **Mobile View (390px)** directly inside the builder.
- Fullscreen preview button for an immersive presentation.

### 9. 💾 Instant Export & Portability
- **Download Standalone HTML (.html)**: Generates a single, zero-dependency HTML file containing all HTML, CSS, and JS. Upload this single file anywhere and your website is live!
- **Download JSON Backup (.json)**: Save your portfolio data so you can import and update it later.
- **Import JSON**: One-click restore of any previously saved portfolio configuration.
- **Copy HTML to Clipboard**: One-click code copying for pasting into your own repositories.
- **Print / Save as PDF**: Clean printable layout for interviews.

---

## 🚀 How to Run Locally

### Option 1: Direct File Open (Zero Install!)
Simply double-click [`index.html`](file:///c:/Users/Asus/Desktop/portfolio/index.html) in your browser (Google Chrome, Microsoft Edge, Brave, Firefox, or Safari).

### Option 2: Using the Included Local Server
Run with Node.js:
```bash
npm start
```
or:
```bash
node server.js
```
Then open: **`http://localhost:3000`** in your browser.

---

## 🌐 How to Host Your Exported Portfolio for Free

Once you click **🚀 Export Portfolio** -> **Download Standalone HTML (.html)**, you will get a file (e.g. `karthik-subramanian-portfolio.html`).

### 1. GitHub Pages (100% Free):
1. Rename the exported file to `index.html`.
2. Create a new repository on GitHub (e.g. `username.github.io`).
3. Push the `index.html` file to the repository.
4. Go to **Settings** -> **Pages** -> Select `main` branch -> **Save**.
5. Your portfolio is now live at `https://username.github.io`!

### 2. Netlify Drop (Takes 30 Seconds):
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the folder containing your exported `index.html`.
3. Netlify will instantly provide a live HTTPS URL.

---

## 📁 Project Structure (Under 10 Files Total)

```
c:\Users\Asus\Desktop\portfolio\
├── index.html                 # Studio Builder application & live simulator
├── css/
│   ├── builder.css            # Styles for the builder controls, panels, & simulator
│   └── portfolio-themes.css   # Universal theme tokens, glassmorphism, & animations
├── js/
│   ├── app.js                 # Event listeners, reactive input bindings, & UI logic
│   ├── data-store.js          # Default profile, state persistence, & JSON parser
│   ├── template-engine.js     # Responsive portfolio markup generator & standalone builder
│   └── exporter.js            # HTML download, JSON backup/restore, & clipboard logic
├── server.js                  # Zero-dependency local Node.js static HTTP server
├── package.json               # Project metadata & start script
└── README.md                  # Comprehensive documentation
```

---

## 🇮🇳 தமிழ் சுருக்கம் (Tamil Quick Guide)

- **இது என்ன?**: Resume builder மாதிரி வேலை செய்யும் ஒரு நவீன **Portfolio Builder Website**.
- **என்னென்ன கேட்கும்?**:
  - Name, Title, Bio, About Me கதை
  - Email ID, LinkedIn, GitHub, Twitter/X, Website, Resume Link, Phone
  - Projects (Title, Category, Tech Stack, Demo Link, GitHub Repo, Image, Featured Star)
  - Skills (Frontend, Backend, Cloud & Tools பிரிவுகள்)
  - Work Experience & Education காலவரிசை
  - Testimonials & Recommendations
- **எப்படி பயன்படுத்துவது?**:
  - `index.html` ஃபைலை நேரடியாக browser-இல் திறக்கலாம் அல்லது `npm start` கொடுக்கலாம்.
  - திரையின் இடது பக்கத்தில் உள்ள form-இல் உங்கள் தகவல்களை மாற்றலாம் அல்லது மேலே உள்ள **⚡ Demo Data** பட்டனை அழுத்தி உடனே பார்க்கலாம்.
  - வலது பக்கத்தில் Desktop, Tablet, Mobile காட்சிகளை உடனடியாகப் பார்க்கலாம்.
  - **🚀 Export Portfolio** பட்டனை அழுத்தி ஒரே ஒரு `.html` ஃபைலாக பதிவிறக்கம் செய்து GitHub Pages அல்லது Netlify-இல் இலவசமாக host செய்து கொள்ளலாம்.
- **கோப்புகள் எண்ணிக்கை**: உங்கள் தேவைக்கேற்ப மொத்தம் 10 கோப்புகளுக்குள் (Under 10 files) மிகவும் நேர்த்தியாக உருவாக்கப்பட்டுள்ளது.
