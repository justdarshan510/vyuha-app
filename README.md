# Vyuha — AMR Clinical Decision Support (CDS) Platform 🧬🏥

**Vyuha** is an AI-powered Clinical Decision Support (CDS) application designed to combat **Antimicrobial Resistance (AMR)**. It provides critical care clinicians, infectious disease specialists, and ICU teams with real-time risk stratification, antibiotic exposure telemetry, clinical override protocols, and diagnostic analytics.

Built with **React Native**, **Expo Router**, and **TypeScript** for web, iOS, and Android.

---

## 🌟 Key Features

### 1. 🤖 AI Clinical Decision Support (CDS)
- Real-time AMR risk escalation detection and antibiotic regimen recommendations.
- Interactive **Accept Recommendation** and **Clinical Override** logging workflows.
- Diagnostic AST (Antimicrobial Susceptibility Testing) report inspection.

### 2. 📊 Pinned Key Information & Vital Biomarkers
- At-a-glance monitoring of core clinical parameters:
  - **AMR Risk Score** (Real-time risk index with severity chips)
  - **WBC Count** (Elevated/Normal/Low markers)
  - **Blood Pressure & Hemodynamics**
  - **eGFR & Renal Function**

### 3. 📈 Visual Telemetry & Analytics
- **Biomarker & Fluid Compositions:** Live levels vs. Risk trends for Procalcitonin (PCT), Lactate, Serum Creatinine, and Platelets with animated fluid meters.
- **Antibiotic Exposure Share:** SVG-rendered interactive exposure distribution chart with detailed medication breakdowns.

### 4. 📅 Clinical Calendar & Check-up Queue
- Interactive appointment and check-up tracking.
- STAT orders, protocol checks, and stewardship rounds with completion checkboxes.

### 5. 🔐 Clinical Authentication & Patient Selector
- Multi-channel authentication (Doctor ID / Hospital SSO / Google / Email).
- Rapid bedside patient selector with ICU bed allocation and EHR patient records.

---

## 🛠️ Technology Stack

- **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 52)
- **Routing & Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Styling:** Vanilla React Native `StyleSheet` with responsive `useWindowDimensions` and Platform selections
- **Gradients:** `expo-linear-gradient`
- **Vectors & Visuals:** `react-native-svg`
- **Icons:** `lucide-react-native`
- **Typography:** Google Fonts (`Plus Jakarta Sans` & `Inter`) via `@expo-google-fonts`
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Project Structure

```
mobile-app/
├── assets/
│   └── images/              # Logos, illustrations, medical assets
├── src/
│   ├── app/
│   │   ├── _layout.tsx      # Root layout with font loaders & stack router
│   │   ├── index.tsx        # Landing Page (Overview, Features & CTA)
│   │   ├── auth.tsx         # Doctor Login & Clinical Authentication
│   │   └── dashboard.tsx    # Main AMR Clinical Decision Support Dashboard
│   └── components/          # Reusable UI components
├── app.json                 # Expo configuration
├── package.json             # Project dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app (for testing on physical iOS/Android devices)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/vyuha-app.git
   cd vyuha-app/mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   # Run on Web
   npm run web

   # Or run universal Expo server
   npx expo start
   ```

4. Open in browser:
   - **Local Web:** `http://localhost:8081`
   - **Landing Page:** `/`
   - **Authentication:** `/auth`
   - **Main Dashboard:** `/dashboard`

---

## 📱 Mobile Deployment

- **Android:** `npm run android`
- **iOS:** `npm run ios` (macOS with Xcode required)

---

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
