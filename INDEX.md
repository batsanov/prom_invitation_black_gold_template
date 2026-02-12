# 🎯 Master Index - Wedding Invitation Template Setup

> **Quick navigation guide for AI agents and developers deploying wedding websites for multiple clients**

---

## 📚 Documentation Overview

This template includes comprehensive guides for rapid deployment. Choose the right document for your needs:

| Document | Purpose | Time Required | Best For |
|----------|---------|---------------|----------|
| **[README.md](README.md)** | General overview & features | 5 min read | Understanding the template |
| **[AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md)** | Complete step-by-step setup | 60-70 min | First-time setup, AI agents |
| **[QUICK_SETUP.md](QUICK_SETUP.md)** | Fast checklist format | 45-60 min | Experienced users |
| **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** | Firebase configuration & troubleshooting | 15-20 min | Firebase issues only |
| **[CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md)** | Client information collection | 30-45 min | Pre-project planning |

---

## 🚀 Quick Start Paths

### Path 1: Automated Setup (Fastest)
**Time: ~15 minutes + manual config**

**Windows (PowerShell):**
```powershell
.\setup-client.ps1 -ClientName "maria-ivan" -BrideName "Мария" -GroomName "Иван" -WeddingDate "2026-08-15"
```

**Mac/Linux (Bash):**
```bash
./setup-client.sh maria-ivan "Мария" "Иван" "2026-08-15"
```

Then manually:
1. Update `src/config/weddingConfig.ts` with venue details
2. Configure `.env` with Firebase credentials
3. Deploy to Vercel

→ **Use:** [`setup-client.ps1`](setup-client.ps1) or [`setup-client.sh`](setup-client.sh)

---

### Path 2: Comprehensive Manual Setup (Most Control)
**Time: 60-70 minutes**

For AI agents or first-time users who need detailed instructions:

1. **Collect client information** → [CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md)
2. **Follow complete guide** → [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md)
3. **Troubleshoot if needed** → [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

→ **Use:** [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md)

---

### Path 3: Express Checklist (Experienced Users)
**Time: 45-60 minutes**

For developers familiar with Firebase and Vercel:

1. **Quick checklist** → [QUICK_SETUP.md](QUICK_SETUP.md)
2. **Reference only if issues** → [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

→ **Use:** [QUICK_SETUP.md](QUICK_SETUP.md)

---

## 📋 Pre-Deployment Checklist

Before starting any setup, ensure you have:

### Required Information
- [ ] Bride & Groom names
- [ ] Wedding date (YYYY-MM-DD format)
- [ ] Wedding time
- [ ] Ceremony venue name & full address
- [ ] Reception venue name & full address
- [ ] Client email for access sharing

### Required Accounts (Free Tier OK)
- [ ] Firebase account (https://console.firebase.google.com)
- [ ] Vercel account (https://vercel.com)
- [ ] GitHub account (https://github.com) - recommended

### Optional But Recommended
- [ ] Google Maps URLs for venues
- [ ] Client photos
- [ ] "Our Story" content
- [ ] Custom domain information

→ **Use:** [CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md) to collect all info

---

## 🔧 Configuration Files Reference

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/config/weddingConfig.ts` | All wedding details | Every new client |
| `.env` | Firebase & admin credentials | Every new client |
| `firestore.rules` | Firebase security rules | Deploy once, reuse |
| `client-config.template.json` | Project tracking template | Optional - per client |

---

## 🎯 Step-by-Step Process

### Phase 1: Planning (30-45 min)
1. **Collect information** from client using [CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md)
2. **Verify** all required details are provided
3. **Create** Firebase project name and Vercel project name

### Phase 2: Firebase Setup (15-20 min)
1. **Create** Firebase project
2. **Enable** Firestore Database
3. **Deploy** security rules from `firestore.rules`
4. **Extract** credentials for `.env`

→ **Guide:** [FIREBASE_SETUP.md](FIREBASE_SETUP.md) or [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) Step 1

### Phase 3: Template Configuration (20-30 min)
1. **Clone/Copy** template to new project folder
2. **Install** dependencies: `npm install`
3. **Update** `src/config/weddingConfig.ts` with client details
4. **Configure** `.env` with Firebase credentials
5. **Test** locally: `npm run dev`

→ **Guide:** [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) Steps 2-3 or [QUICK_SETUP.md](QUICK_SETUP.md)

### Phase 4: Deployment (10-15 min)
1. **Push** to GitHub
2. **Import** to Vercel
3. **Add** environment variables in Vercel
4. **Deploy** and verify

→ **Guide:** [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) Step 4 or [QUICK_SETUP.md](QUICK_SETUP.md)

### Phase 5: Verification & Handoff (10-15 min)
1. **Test** all features on live site
2. **Verify** RSVP form works
3. **Test** admin dashboard
4. **Share** access with client

→ **Guide:** [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) Steps 5-6

---

## 🐛 Common Issues & Solutions

| Issue | Solution | Reference |
|-------|----------|-----------|
| Form stuck on "Изпращане..." | Firestore rules not configured | [FIREBASE_SETUP.md](FIREBASE_SETUP.md) |
| Permission denied error | Check security rules | [FIREBASE_SETUP.md](FIREBASE_SETUP.md) |
| Vercel build fails | Check environment variables | [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) Troubleshooting |
| Environment vars not working | Must start with `VITE_` | [README.md](README.md) |
| Firebase not initialized | Missing `.env` credentials | [FIREBASE_SETUP.md](FIREBASE_SETUP.md) |

---

## 📊 Project Structure Quick Reference

```
wedding-invitation/
│
├── 📚 DOCUMENTATION
│   ├── README.md                      # Main overview
│   ├── AI_DEPLOYMENT_GUIDE.md         # Complete setup guide
│   ├── QUICK_SETUP.md                 # Quick checklist
│   ├── FIREBASE_SETUP.md              # Firebase help
│   ├── CLIENT_INFO_FORM.md            # Information collection
│   └── INDEX.md                       # This file
│
├── 🤖 AUTOMATION SCRIPTS
│   ├── setup-client.ps1               # Windows automation
│   └── setup-client.sh                # Mac/Linux automation
│
├── ⚙️ CONFIGURATION
│   ├── .env.example                   # Environment template
│   ├── client-config.template.json    # Project tracking
│   ├── firestore.rules                # Firebase security
│   └── src/config/weddingConfig.ts    # Wedding details
│
└── 💻 SOURCE CODE
    ├── src/                           # React application
    ├── public/                        # Static assets
    └── package.json                   # Dependencies
```

---

## 🎓 Learning Path

### For First-Time Users
1. Read [README.md](README.md) - understand what the template does
2. Review [CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md) - know what info you need
3. Follow [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) - complete step-by-step

### For Experienced Developers
1. Skim [README.md](README.md) - refresh on features
2. Use [QUICK_SETUP.md](QUICK_SETUP.md) - fast deployment
3. Refer to [FIREBASE_SETUP.md](FIREBASE_SETUP.md) only if issues arise

### For AI Agents
1. Load [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) - primary instruction set
2. Use [CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md) - gather requirements
3. Reference [QUICK_SETUP.md](QUICK_SETUP.md) - verify steps completed

---

## 📞 Support & Resources

### Internal Documentation
- **Features & Overview:** [README.md](README.md)
- **Complete Setup:** [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md)
- **Quick Reference:** [QUICK_SETUP.md](QUICK_SETUP.md)
- **Troubleshooting:** [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

### External Resources
- **Firebase Console:** https://console.firebase.google.com/
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Firebase Documentation:** https://firebase.google.com/docs/firestore
- **Vercel Documentation:** https://vercel.com/docs

---

## ✅ Success Criteria

A successful deployment includes:

- ✅ Website live on Vercel
- ✅ All wedding details accurate
- ✅ RSVP form functional (test submission works)
- ✅ Data appears in Firebase Firestore
- ✅ Admin dashboard accessible and working
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Client has access to Firebase & Vercel
- ✅ Client knows admin dashboard password
- ✅ Documentation provided to client

---

## 🔄 Multi-Client Workflow Summary

```
For Each New Client:
│
├─ 1. Collect Info → CLIENT_INFO_FORM.md
├─ 2. Create Firebase Project → FIREBASE_SETUP.md
├─ 3. Clone Template → setup-client.ps1 or manual
├─ 4. Configure → weddingConfig.ts + .env
├─ 5. Test Locally → npm run dev
├─ 6. Deploy to Vercel → AI_DEPLOYMENT_GUIDE.md
├─ 7. Verify Everything → QUICK_SETUP.md checklist
└─ 8. Hand Off to Client → Share access & docs
```

**Average Time Per Client:** 60-90 minutes (30-45 min after you've done it once)

---

## 💡 Pro Tips

1. **Save time:** Keep a template Firebase project and reuse security rules
2. **Efficiency:** Use automation scripts for repetitive setup
3. **Quality:** Always test RSVP submission before client handoff
4. **Documentation:** Track each client in `client-config.template.json`
5. **Automation:** Create your own scripts building on the provided ones
6. **Backup:** Export `.env` and config files for each client securely

---

## 📅 Document Versions

- **Template Version:** 1.0.0
- **Last Updated:** February 2026
- **Compatibility:** Node.js 18+, React 18, Vite 5, Firebase 10+

---

**Ready to deploy your first wedding website?**  
→ Start with [CLIENT_INFO_FORM.md](CLIENT_INFO_FORM.md) or jump straight to [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md)

---

_Made with 💝 for creating beautiful wedding websites at scale_
