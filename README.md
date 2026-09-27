# IDENTITY-X 🛡️
### AI-Powered Multi-Layer Identity & Document Forensics Platform
**Smart India Hackathon 2026 | Team: HexaCore (Team ID: 167304)**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC.svg)](https://tailwindcss.com/)
[![ICAO Standard](https://img.shields.io/badge/ICAO-Doc%209303-green.svg)](https://www.icao.int/)
[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange.svg)](https://www.sih.gov.in/)

---

## 📌 Executive Summary
**IDENTITY-X** is an enterprise-grade AI decision-support platform engineered for immigration officers, border security personnel, and forensic investigators. It bridges physical travel credentials and automated fraud detection by unifying **multi-spectral optical forensics, machine-readable zone (MRZ) checksum validation, cross-document correlation, and 1:1 biometric liveness verification** in real time (< 3 seconds latency).

The platform strictly adheres to **responsible AI ethics**: it operates as a decision-support and evidence-correlation engine that provides objective forensic signals, leaving the final legal clearance decision to the authorized border security officer.

---

## 📑 Official SIH 2026 Presentation Deck Included
This repository includes the complete 6-slide PowerPoint presentation matching the official SIH 2026 template:
* 📁 **[IDENTITY-X_SIH2026_HexaCore.pptx](./IDENTITY-X_SIH2026_HexaCore.pptx)**
* 🖥️ **Interactive In-App Presentation Viewer:** Navigate to /pitch-deck in the running application to preview all 6 slides in 16:9 widescreen with speaker notes.

---

## 🔬 Core Forensic Capabilities

### 1. Document Classification & ICAO Structure Validation
* Evaluates TD3 passport geometry, font typographies, and layout against ICAO Doc 9303 standards.
* Verifies UV security fibers, optical variable devices (holograms), and microtext sharpness.

### 2. Neural OCR & Dual MRZ Validation
* Parses visual biographical fields (Name, DOB, Nationality, Gender, Expiry).
* Mathematical verification of Type-3 MRZ lines, checksum digits, and date hashes.
* Instantly flags visual-to-MRZ discrepancies (e.g. 1-year mismatch between visual date of birth and encoded MRZ digits).

### 3. Pixel-Level Tampering Detection (ELA & Noise Heatmaps)
* **Error Level Analysis (ELA):** Discovers compression variance discontinuities across modified text blocks.
* **Frequency Noise Analysis:** Detects localized resampling artifacts and digital overlay replacement.
* **Interactive AI Heatmap:** Renders bounding overlays with confidence metrics (e.g., *91% Suspicious Region* over altered DOB).

### 4. Cross-Document Entity Correlation Graph
* Correlates extracted person attributes across all submitted credentials (Passport, Visa, National ID / Aadhaar).
* Relational intelligence mapping highlights identity conflicts (e.g., DOB 1998 on Passport vs 1996 on National ID register).

### 5. 1:1 Face Biometrics & Presentation Attack Detection
* Landmark correlation between high-resolution document photo and live terminal probe.
* 3D facial liveness test resistant to printed photos, mobile screen replays, and silicone masks.

### 6. Explainable Evidence Index & Officer Decision
* Transparent additive point scoring (+18 MRZ, +24 Tamper, +16 DOB conflict, +12 Face, +8 Baseline = 78/100).
* Official disposition workflow: **CLEAR**, **SECONDARY INSPECTION**, **FURTHER INVESTIGATION**.
* Real-time cryptographic audit trail tracking custody events with SHA-256 hashes.

---

## 🎯 Dual Showcase Demonstration

The application features a built-in **Demo Mode Switcher** directly in the sidebar:
1. **Demo 1: Rahul Sharma (Low Anomaly - 7/100)**
   * Clean credentials, all ICAO checksums pass, 97% biometric similarity, cleared for entry.
2. **Demo 2: Rohan Mehta (High Anomaly - 78/100)**
   * Visual DOB (1998) vs MRZ DOB (1997) mismatch.
   * 91% tampering probability localized on DOB field.
   * National ID conflict (1996) across civil databases.
   * Marginal face similarity (63%) with secondary inspection recommended.

---

## 🏗️ System Architecture

`	ext
React 19 Frontend (1440x1024 Desktop Console)
       │
       ▼ REST API / WebSocket
Node.js / Express Gateway & Session Auth
       │
       ├── PostgreSQL (Case Dossiers & Audit Ledger)
       ├── S3 / MinIO (Biometric Image & Scan Vault)
       │
       ▼ Python AI Forensic Microservices
             ├── Neural OCR (ICAO Doc 9303)
             ├── MRZ Checksum Validator Engine
             ├── Tamper & ELA Heatmap Analyzer
             ├── Biometric Face & Liveness Matcher
             └── Cross-Document Relational Graph
`

---

## 🚀 Quick Start Guide

### Prerequisites
* Node.js (v18.x or higher)
* npm (v9.x or higher)

### Installation
`ash
# Clone the repository
git clone https://github.com/suyog2602/Identity-X-Sih26.git
cd Identity-X-Sih26

# Install dependencies
npm install

# Start development server
npm run dev
`

Visit **http://localhost:5173/** in your browser.

---

## 📂 Project Structure

`	ext
Identity-X/
├── IDENTITY-X_SIH2026_HexaCore.pptx # Official SIH 2026 PowerPoint Deck
├── index.html                        # Main portal entry
├── vite.config.js                    # Vite + Tailwind configuration
├── package.json
├── src/
│   ├── api/                          # Modular API client layer (client, caseApi, screeningApi)
│   ├── components/
│   │   ├── layout/                   # Sidebar, Topbar
│   │   ├── ui/                       # StatusBadge, RiskBadge, StatCard, Modal, Toast
│   ├── contexts/                     # AuthContext, CaseContext (state & demo switcher)
│   ├── data/                         # Realistic forensic mock datasets (Rohan Mehta, Rahul Sharma)
│   ├── layouts/                      # Persistent 1440px desktop layout
│   └── pages/
│       ├── LoginPage.jsx             # Border control officer auth
│       ├── DashboardPage.jsx         # Live screening throughput & anomaly analytics
│       ├── NewScreeningPage.jsx      # Document ingestion & live biometric probe
│       ├── ProcessingPage.jsx        # 8-layer AI neural pipeline & live telemetry
│       ├── InvestigationPage.jsx     # Core forensic dossier, ELA heatmap & officer decision
│       ├── ActiveCasesPage.jsx       # Priority triage review queue
│       ├── CaseHistoryPage.jsx       # Filterable archive of screening records
│       ├── ReportsPage.jsx           # Formal forensic PDF report generator
│       ├── IdentityIntelligencePage.jsx # Cross-document correlation relationship graph
│       ├── PresentationPage.jsx      # Interactive 6-slide SIH Pitch Deck viewer
│       ├── SystemStatusPage.jsx      # Microservice health & latency telemetry
│       └── SettingsPage.jsx          # Officer credentials & sensitivity sliders
`

---

## 👥 Team HexaCore (SIH 2026)
* **Team ID:** 167304
* **Problem Statement ID:** 26132
* **Project Name:** IDENTITY-X
