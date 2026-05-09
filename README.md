# BioSense (by Green-to-Gold) — Strategic Decision Support System

BioSense is an enterprise-grade AI-powered Decision Support System (DSS) designed for **Green-to-Gold**, a sustainable manufacturing startup based in Tripura, India. The platform serves as the technological backbone for transforming the region's agricultural abundance into high-value bio-composite construction materials.

## 🚀 The Mission: Green-to-Gold
Tripura possesses the highest concentration of bamboo in India, yet much of its agricultural potential remains underutilized. Green-to-Gold's mission is to:
- **Empower Farmers**: Provide data-driven insights to maximize crop yield and profit.
- **Sustainable Manufacturing**: Convert waste and raw bamboo into structural bio-composites.
- **Circular Economy**: Implement a strict "Harvest-to-Replant" compliance model (1:1.25 ratio).

## 🛠 Features & Workflows

### 1. Bio-Decision Support (DSS)
The DSS is split into specialized modules for different crops (Bamboo, Rice, Sugarcane, Rubber, Agarwood, Betelnut, and Jute).
- **The Workflow**: 
  1. User selects a crop and district.
  2. Input parameters like Clump Age, Species Variety, and Planting Density.
  3. The **AI Engine** calculates optimal harvest volumes and suggests a "Harvest or Hold" status.
  4. Decision history is persisted and accessible for audit.

### 2. SHG Activity Ledger (Real-time Tracker)
Designed for Self-Help Groups (SHGs) and Cooperatives.
- **The Workflow**:
  1. SHGs log harvest activities (Cooperative name, District, Volume).
  2. The system uses **Optimistic UI updates** to show changes instantly.
  3. Table views include CRUD (Create, Read, Update, Delete) capabilities with real-time metric recalculations for total volume and income.

### 3. Resource Intelligence
A geographic information layer that visualizes raw material distribution across the 8 districts of Tripura.
- **Tech**: Built with custom SVG mapping and responsive data grids.

### 4. Carbon & Replanting Compliance
Ensures the long-term sustainability of the manufacturing engine.
- **Mechanism**: Every ton of biomass harvested triggers a mandatory replanting requirement.
- **Reporting**: Generates dynamic, print-ready PDF Carbon Reports showing district-wise compliance and CO₂ sequestration estimates.

### 5. BioSense AI Advisor
A context-aware assistant powered by Gemini 1.5 Flash.
- **Capability**: Answers queries regarding Vision 2030, manufacturing processes, and partnership opportunities.

## 💻 Tech Stack & Architecture

- **Core Framework**: React 18+ with Vite (Single Page Application architecture).
- **Type Safety**: Strictly typed with TypeScript to ensure data integrity across agricultural parameters.
- **Styling & UX**:
  - **Tailwind CSS**: Custom "Green-to-Gold" design system (Brand Greens, Earth Tones, and Deep Inks).
  - **Framer Motion**: Staggered animations, AnimatePresence for real-time list transitions, and smooth route fades.
- **Data Visualization**: Recharts for resource distribution analytics.
- **AI Integration**: `@google/genai` (SDK) leveraging Gemini 1.5 Flash for strategic advice.
- **Icons**: Lucide React for consistent semantic iconography.

## 📁 Project Architecture
- `src/components/BioSenseDSS.tsx`: The primary dashboard containing the multi-tab DSS engine.
- `src/components/LandingPage.tsx`: High-fidelity marketing and mission-driven entry point.
- `src/components/AboutPage.tsx`: Documentation portal rendering this README dynamically.
- `src/components/Navbar.tsx`: Shared navigation with hash-link awareness.

---
*Developed by ATSFY Technologies, Agartala, Tripura.*
