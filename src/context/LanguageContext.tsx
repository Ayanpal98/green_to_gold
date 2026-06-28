import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "bn" | "kok";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.dss": "BioSense DSS",
    "nav.problem": "The Problem",
    "nav.model": "The Model",
    "nav.products": "Products",
    "nav.techProducts": "Technology / Products",
    "nav.impact": "Impact",
    "nav.about": "About",
    "nav.vision": "Vision 2030",
    "nav.process": "Process",
    "nav.roadmap": "Roadmap",
    "nav.company": "Company",
    "nav.bioboards": "Bio-Composite Boards",
    "nav.plates": "Biodegradable Plates",
    "nav.tableware": "Organic Tableware",
    "nav.partner": "Partner",
    "nav.partnerButton": "Partner With Us",
    "nav.startCoop": "Start Collaboration",

    // General Words / Common
    "common.crop": "Crop",
    "common.district": "District",
    "common.totalHarvested": "Total Harvested",
    "common.totalReplanted": "Total Replanted",
    "common.compliance": "Compliance %",
    "common.co2": "CO₂ Sequestered",
    "common.downloadReport": "Download Carbon Report",
    "common.bamboo": "Bamboo",
    "common.rice": "Rice",
    "common.sugarcane": "Sugarcane",
    "common.rubber": "Rubber",
    "common.agarwood": "Agarwood",
    "common.betelnut": "Betelnut",
    "common.jute": "Jute",
    "common.shgAct": "SHG Activity Ledger",
    "common.aiAdvisor": "BioSense AI Advisor",
    "common.carbonTracker": "Carbon & Replanting Tracker",
    "common.resourceIntel": "Resource Intelligence",
    "common.dssDashboard": "Decision Support Dashboard",
    "common.optimize": "Run Optimization",
    "common.replantingRatio": "1:1.25 Compliant",
    "common.income": "Income (₹)",
    "common.volume": "Volume (t)",
    "common.status": "Status",
    "common.actions": "Actions",
    "common.addActivity": "Add Activity Log",
    "common.save": "Save Log",
    "common.cancel": "Cancel",
    "common.totalEarnings": "Total Earnings",
    "common.aggregateImpact": "Aggregate Impact",
    "common.districtBreakdown": "District-wise Breakdown",
    "common.ratioStatus": "Ratio Status",
    "common.developedBy": "by ATSFY Technologies",

    // Sub-components Headers
    "dss.totalBambooStock": "Total Bamboo Stock",
    "dss.harvestReadyZones": "Harvest-Ready Zones",
    "dss.depletionRiskZones": "Depletion Risk Zones",
    "dss.regionalInventory": "Regional Bamboo Stock Inventory",
    "dss.stockTonnes": "Stock (tonnes)",
    "dss.coverage": "Coverage",
    "dss.nextHarvest": "Next Harvest",
    "dss.pineappleFibre": "Pineapple Fibre Availability (Tonnes)",
    "dss.engineParameters": "Engine Parameters",
    "dss.optimiseProductYield": "Optimising Product Yield",
    "dss.cropType": "Crop Type",
    "dss.species": "Species",
    "dss.clumpAge": "Clump/Crop Age (Years)",
    "dss.season": "Season",
    "dss.plantingDensity": "Planting Density (per ha)",
    "dss.recommendation": "BioSense Recommendation",
    "dss.recentHistory": "Recent Optimization History",
    "dss.cooperativeName": "Cooperative / SHG Name",
    "dss.districtReplantingCompliance": "District Replanting Compliance",
    "dss.goalRatio": "Goal: 1:1.25 Ratio",
    "dss.liveTracking": "Live Tracking",
    "dss.activeAlerts": "Active System Alerts",
    "dss.resolve": "Resolve",
    "dss.resolved": "Resolved",
    "dss.runSuccess": "Optimization Complete!",
    "dss.runPending": "Analyzing with BioSense AI...",
    "dss.districtSelect": "Select Tripura District",

    // Landing Page
    "hero.badge": "Tripura's Sustainable Agri-Tech Revolution",
    "hero.title": "Decision Support System for",
    "hero.subtitle": "Transforming local crops into world-class bio-composites. Real-time yield optimization, carbon reports, and SHG ledger tracking for sustainable agriculture.",
    "hero.explore": "Explore BioSense DSS",
    "hero.mission": "Our Mission",
    "hero.missionDesc": "Empowering Tripura's rural communities through circular bio-composite manufacturing.",

    "problem.title": "The Agrarian Challenge",
    "problem.desc": "Tripura possesses the largest concentration of bamboo in India, yet much of it goes underutilized. Farmers lack tools to gauge peak harvest age, leading to lower yields and wood decay. Meanwhile, industrial supply lines face unpredictable resource flow.",
    "problem.card1": "Inefficient Harvesting",
    "problem.card1Desc": "Harvesting bamboo too early or too late decreases quality and breaks regeneration cycles.",
    "problem.card2": "Local Economic Leakage",
    "problem.card2Desc": "Middlemen sap value from smallholder farmers and Self-Help Groups (SHGs).",
    "problem.card3": "Carbon Deficit Tracking",
    "problem.card3Desc": "Lack of verification systems for carbon sequestration credits and replanting goals.",

    "solution.title": "The BioSense Model",
    "solution.desc": "An intelligent, full-loop Decision Support System that coordinates harvesting, logs local SHG logistics, calculates carbon offset credits, and utilizes Gemini 1.5 Flash for agricultural advice.",

    "products.title": "Engineered Bio-Composites",
    "products.desc": "Converting raw materials into premium, eco-friendly structural supplies.",
    "products.viewSpec": "View Specifications",

    "vision.title": "Tripura Vision 2030",
    "vision.desc": "Our long-term developmental blueprint targets 1,000+ local cooperatives connected, 50,000 tons of carbon sequestered yearly, and major structural bamboo composite exports.",

    "process.title": "Sustainable Journey",
    "process.desc": "How we turn Tripura's raw biomass into premium bio-composites securely.",

    "impact.title": "Empowering Local Communities",
    "impact.desc": "By routing secondary income streams to Tripura's talented SHGs and cooperatives, we ensure circular socio-economic resilience.",

    "sidebar.activeAlerts": "Active Alerts",
    "sidebar.distResource": "District Resources",
    "sidebar.settings": "DSS System Settings",

    // Advisor
    "advisor.title": "AI Strategic Advisor",
    "advisor.subtitle": "Ask questions about crop life-cycles, replanting, Tripura's bamboo varieties, or partnership opportunities.",
    "advisor.placeholder": "Ask our Green-to-Gold advisory system...",
    "advisor.disclaimer": "Powered by Gemini 1.5 Flash with localized Tripura agricultural data."
  },
  bn: {
    // Navbar
    "nav.home": "মূল পাতা",
    "nav.dss": "বায়োসেন্স ডিএসএস",
    "nav.problem": "মূল সমস্যা",
    "nav.model": "আমাদের মডেল",
    "nav.products": "পণ্যসম্ভার",
    "nav.techProducts": "প্রযুক্তি ও পণ্যসম্ভার",
    "nav.impact": "সামাজিক প্রভাব",
    "nav.about": "আমাদের কথা",
    "nav.vision": "ভিশন ২০৩০",
    "nav.process": "উৎপাদন পদ্ধতি",
    "nav.roadmap": "রোডম্যাপ",
    "nav.company": "প্রতিষ্ঠান",
    "nav.bioboards": "বায়ো-কম্পোজিট বোর্ড",
    "nav.plates": "বায়োডিগ্রেডেবল থালা",
    "nav.tableware": "জৈব টেবিলওয়্যার",
    "nav.partner": "অংশীদার",
    "nav.partnerButton": "সহযোগী হন",
    "nav.startCoop": "সহযোগিতা শুরু করুন",

    // General Words / Common
    "common.crop": "ফসল",
    "common.district": "জেলা",
    "common.totalHarvested": "মোট সংগৃহীত ফসল",
    "common.totalReplanted": "মোট পুনর্বোপন",
    "common.compliance": "কমপ্লায়েন্স হার %",
    "common.co2": "শোষিত কার্বন (CO₂)",
    "common.downloadReport": "কার্বন রিপোর্ট ডাউনলোড",
    "common.bamboo": "বাঁশ",
    "common.rice": "ধান",
    "common.sugarcane": "আখ",
    "common.rubber": "রাবার",
    "common.agarwood": "আগর কাঠ",
    "common.betelnut": "সুপারি",
    "common.jute": "পাট",
    "common.shgAct": "এসএইচজি (SHG) কাজের খতিয়ান",
    "common.aiAdvisor": "বায়োসেন্স এআই পরামর্শদাতা",
    "common.carbonTracker": "কার্বন ও পুনর্বোপন ট্র্যাকার",
    "common.resourceIntel": "রিসোর্স ইন্টেলিজেন্স",
    "common.dssDashboard": "সিদ্ধান্ত সমর্থন ব্যবস্থা ড্যাশবোর্ড",
    "common.optimize": "অপ্টিমাইজেশন চালান",
    "common.replantingRatio": "১:১.২৫ কমপ্লায়েন্ট",
    "common.income": "উপার্জন (₹)",
    "common.volume": "পরিমাণ (টন)",
    "common.status": "অবস্থা",
    "common.actions": "ক্রিয়াকলাপ",
    "common.addActivity": "নতুন লগ যোগ করুন",
    "common.save": "সংরক্ষণ করুন",
    "common.cancel": "বাতিল",
    "common.totalEarnings": "মোট উপার্জন",
    "common.aggregateImpact": "মোট সামগ্রিক প্রভাব",
    "common.districtBreakdown": "জেলা-ভিত্তিক বিবরণ",
    "common.ratioStatus": "অনুপাতের অবস্থা",
    "common.developedBy": "এটিএসএফওয়াই টেকনোলজিস দ্বারা",

    // Sub-components Headers
    "dss.totalBambooStock": "মোট বাঁশের মজুদ",
    "dss.harvestReadyZones": "ফসল সংগ্রহের উপযুক্ত অঞ্চল",
    "dss.depletionRiskZones": "ক্ষয়ক্ষতির ঝুঁকিতে থাকা অঞ্চল",
    "dss.regionalInventory": "আঞ্চলিক বাঁশের মজুদের বিবরণ",
    "dss.stockTonnes": "মজুদ (টন)",
    "dss.coverage": "কাভারেজ এলাকা",
    "dss.nextHarvest": "পরবর্তী ফসল কাটা",
    "dss.pineappleFibre": "আনারসের আঁশের প্রাপ্যতা (টন)",
    "dss.engineParameters": "ইঞ্জিন প্যারামিটারসমূহ",
    "dss.optimiseProductYield": "সর্বোত্তম ফলন নির্ধারণ",
    "dss.cropType": "ফসলের ধরণ",
    "dss.species": "প্রজাতি",
    "dss.clumpAge": "ফসলের বয়স (বছর)",
    "dss.season": "ঋতু",
    "dss.plantingDensity": "রোপণ ঘনত্ব (হেক্টর প্রতি)",
    "dss.recommendation": "বায়োসেন্স পূর্বাভাস ও পরামর্শ",
    "dss.recentHistory": "সাম্প্রতিক অপ্টিমাইজেশন ইতিহাস",
    "dss.cooperativeName": "সমবায় / এসএইচজি (SHG) এর নাম",
    "dss.districtReplantingCompliance": "জেলা-ভিত্তিক পুনর্বোপন কমপ্লায়েন্স",
    "dss.goalRatio": "লক্ষ্যমাত্রা: ১:১.২৫ অনুপাত",
    "dss.liveTracking": "সরাসরি পর্যবেক্ষণ",
    "dss.activeAlerts": "সক্রিয় সিস্টেম সতর্কতা",
    "dss.resolve": "সমাধান করুন",
    "dss.resolved": "সমাধান করা হয়েছে",
    "dss.runSuccess": "অপ্টিমাইজেশন সম্পন্ন হয়েছে!",
    "dss.runPending": "বায়োসেন্স এআই দ্বারা বিশ্লেষণ করা হচ্ছে...",
    "dss.districtSelect": "ত্রিপুরার জেলা নির্বাচন করুন",

    // Landing Page
    "hero.badge": "ত্রিপুরায় টেকসই কৃষি-প্রযুক্তি বিপ্লব",
    "hero.title": "যার জন্য সিদ্ধান্ত সমর্থন ব্যবস্থা",
    "hero.subtitle": "স্থানীয় ফসলকে বিশ্বমানের বায়ো-কম্পোজিট বা জৈব-মিশ্র নির্মাণ সামগ্রীতে রূপান্তর করা। টেকসই কৃষির জন্য রিয়েল-টাইম ফলন অপ্টিমাইজেশন, কার্বন রিপোর্ট এবং এসএইচজি খতিয়ান ট্র্যাকিং।",
    "hero.explore": "বায়োসেন্স ড্যাশবোর্ড খুলুন",
    "hero.mission": "আমাদের মিশন",
    "hero.missionDesc": "বৃত্তাকার বায়ো-কম্পোজিট উৎপাদনের মাধ্যমে ত্রিপুরার গ্রামীণ জনগোষ্ঠীকে ক্ষমতায়ন করা।",

    "problem.title": "কৃষি ক্ষেত্রে চ্যালেঞ্জ",
    "problem.desc": "ভারতে সবচেয়ে বেশি বাঁশ ত্রিপুরায় উৎপাদিত হয়, তবুও এর বেশিরভাগ অংশই অব্যবহৃত থেকে যায়। চাষীদের কাছে বিজ্ঞানসম্মত ফসল কাটার কোনো আধুনিক প্রযুক্তি নেই, যার ফলে মান কমে যায় এবং ফসল নষ্ট হয়। একই সাথে, শিল্প উৎপাদন ক্ষেত্রগুলি কাঁচামালের অনিশ্চয়তার মুখোমুখি হয়।",
    "problem.card1": "অদক্ষ ফসল সংগ্রহ",
    "problem.card1Desc": "খুব তাড়াতাড়ি বা খুব দেরিতে বাঁশ কাটার ফলে গুণমান হ্রাস পায় এবং প্রাকৃতিক পুনরুত্পাদন চক্র ভেঙে যায়।",
    "problem.card2": "স্থানীয় অর্থনৈতিক ক্ষতি",
    "problem.card2Desc": "মধ্যস্বত্বভোগীরা ক্ষুদ্র কৃষক এবং স্বনির্ভর গোষ্ঠীর (SHG) ন্যায্য মূল্য ছিনিয়ে নেয়।",
    "problem.card3": "কার্বন ট্র্যাকিংয়ের অভাব",
    "problem.card3Desc": "কার্বন নির্গমন কমানোর শংসাপত্র ও পুনরায় গাছ লাগানোর লক্ষ্যমাত্রার জন্য কোনো যাচাইকরণ ব্যবস্থা নেই।",

    "solution.title": "বায়োসেন্স মডেল",
    "solution.desc": "একটি বুদ্ধিমান, সামগ্রিক সিদ্ধান্ত সমর্থন ব্যবস্থা যা ফসল কাটা সমন্বয় করে, স্থানীয় স্বনির্ভর গোষ্ঠী (SHG) লজিস্টিক রেকর্ড করে, কার্বন ক্রেডিট হিসাব করে এবং কৃষি পরামর্শের জন্য জেমিনি ১.৫ ফ্ল্যাশ ব্যবহার করে।",

    "products.title": "উন্নত বায়ো-কম্পোজিটস",
    "products.desc": "কাঁচামালকে উচ্চ মানের পরিবেশবান্ধব পরিকাঠামো নির্মাণ সামগ্রীতে রূপান্তর করা হচ্ছে।",
    "products.viewSpec": "বিশদ বিবরণ দেখুন",

    "vision.title": "ত্রিপুরা ভিশন ২০৩০",
    "vision.desc": "আমাদের দীর্ঘমেয়াদী উন্নয়ন পরিকল্পনায় ১,০০০টিরও বেশি স্থানীয় সমবায় সংযোগ, বার্ষিক ৫০,০০০ টন কার্বন শোষণ এবং বিশ্বজুড়ে বাঁশের বায়ো-কম্পোজিট সামগ্রী রপ্তানি করার লক্ষ্য রয়েছে।",

    "process.title": "টেকসই যাত্রা",
    "process.desc": "আমরা কীভাবে ত্রিপুরার কাঁচা বায়োমাসকে নিরাপদে প্রিমিয়াম বায়ো-কম্পোজিটে রূপান্তর করি।",

    "impact.title": "স্থানীয় সমবায় ক্ষমاتیষ্পন্ন করা",
    "impact.desc": "ত্রিপুরার প্রতিভাবান স্বনির্ভর গোষ্ঠী ও সমবায়গুলিতে আয়ের বিকল্প পথ তৈরি করে আমরা সামগ্রিক সামাজিক-অর্থনৈতিক স্থিতিশীলতা নিশ্চিত করি।",

    "sidebar.activeAlerts": "সক্রিয় সতর্কতা",
    "sidebar.distResource": "জেলা সম্পদ বিবরণ",
    "sidebar.settings": "পদ্ধতি সেটিংস",

    // Advisor
    "advisor.title": "এআই স্ট্র্যাটেজিক অ্যাডভাইজার",
    "advisor.subtitle": "ফসলের জীবনচক্র, পুনর্বোপন, ত্রিপুরার বাঁশের জাত বা অংশীদারিত্বের সুযোগ সম্পর্কে প্রশ্ন জিজ্ঞাসা করুন।",
    "advisor.placeholder": "আমাদের গ্রিন-টু-গোল্ড পরামর্শ ব্যবস্থায় প্রশ্ন করুন...",
    "advisor.disclaimer": "ত্রিপুরার স্থানীয় কৃষি তথ্যসহ জেমিনি ১.৫ ফ্ল্যাশ দ্বারা চালিত।"
  },
  kok: {
    // Navbar
    "nav.home": "Home",
    "nav.dss": "BioSense DSS",
    "nav.problem": "Belai Khakchangya",
    "nav.model": "Choba Laman",
    "nav.products": "Manuthairog",
    "nav.techProducts": "Technology / Products",
    "nav.impact": "Kahmlai",
    "nav.about": "Chwngni Kok",
    "nav.vision": "Koktwma 2030",
    "nav.process": "Borom Salmung",
    "nav.roadmap": "Khunchi-Lama",
    "nav.company": "Company",
    "nav.bioboards": "Bio-Composite Boards",
    "nav.plates": "Biodegradable Plates",
    "nav.tableware": "Organic Tableware",
    "nav.partner": "Baksa Logor",
    "nav.partnerButton": "Chwng bai baksa khumu",
    "nav.startCoop": "Choba jora chengmung",

    // General Words / Common
    "common.crop": "Buphang / Maithang",
    "common.district": "Haste-Khor",
    "common.totalHarvested": "Kotor Kokhai",
    "common.totalReplanted": "Kotor Bagwk-Khai",
    "common.compliance": "Replanting Kahmlai %",
    "common.co2": "CO₂ Khumung",
    "common.downloadReport": "Carbon Report Rungmung",
    "common.bamboo": "Wa (Bamboo)",
    "common.rice": "Mai (Rice)",
    "common.sugarcane": "Kerok (Sugarcane)",
    "common.rubber": "Rubber",
    "common.agarwood": "Agarwood",
    "common.betelnut": "Guwa (Betelnut)",
    "common.jute": "Pat (Jute)",
    "common.shgAct": "SHG Samung Tangmung Ledger",
    "common.aiAdvisor": "BioSense AI Advisor-Yorom",
    "common.carbonTracker": "Carbon & Replanting Tracker",
    "common.resourceIntel": "Resource Intelligence",
    "common.dssDashboard": "Decision Support Dashboard",
    "common.optimize": "Kahmlai Sanmung Run",
    "common.replantingRatio": "1:1.25 Compliant",
    "common.income": "Rangman (₹)",
    "common.volume": "Kotor (t)",
    "common.status": "Aungmung (Status)",
    "common.actions": "Khlammung",
    "common.addActivity": "Khor gwdan rommung",
    "common.save": "Romdi",
    "common.cancel": "Ajakya khladi",
    "common.totalEarnings": "Rang kotor manmung",
    "common.aggregateImpact": "Tripura Kahmlai Kotor",
    "common.districtBreakdown": "Tripura Haste-Khor Rok",
    "common.ratioStatus": "Replanting Aungmung",
    "common.developedBy": "ATSFY Technologies ni bakhajak",

    // Sub-components Headers
    "dss.totalBambooStock": "Kotor Wa Stock",
    "dss.harvestReadyZones": "Bagwkna Chuba Phung",
    "dss.depletionRiskZones": "Kokgwi Kwmana Chuba Phung",
    "dss.regionalInventory": "Tripura Haste Wa Stock Inventory",
    "dss.stockTonnes": "Stock (tonnes)",
    "dss.coverage": "Coverage area",
    "dss.nextHarvest": "Chuba Phung bagwkmung",
    "dss.pineappleFibre": "Anarash Bisiring Manmung (t)",
    "dss.engineParameters": "DSS Parameters",
    "dss.optimiseProductYield": "Optimising Product Yield",
    "dss.cropType": "Crop Type",
    "dss.species": "Buphang variety",
    "dss.clumpAge": "Buphang Bisi (Age)",
    "dss.season": "Halok / Jora",
    "dss.plantingDensity": "Bagwkmung density (per ha)",
    "dss.recommendation": "BioSense Khunuju Sanmung",
    "dss.recentHistory": "Gwdan Optimization History",
    "dss.cooperativeName": "SHG Cooperatives ni mung",
    "dss.districtReplantingCompliance": "District Replanting Compliance",
    "dss.goalRatio": "Goal: 1:1.25 Ratio",
    "dss.liveTracking": "Live Tracking",
    "dss.activeAlerts": "Active Alerts",
    "dss.resolve": "Resolve khladi",
    "dss.resolved": "Resolved khlajjago",
    "dss.runSuccess": "Optimization Kahm Khlajjago!",
    "dss.runPending": "BioSense AI Advisor bai choba khlajja...",
    "dss.districtSelect": "Tripura ni Haste-Khor phiadi",

    // Landing Page
    "hero.badge": "Tripura ni Phola-Haste Thungmung Swk",
    "hero.title": "Kok-Choba Tongmung nikhai",
    "hero.subtitle": "Tripura ni buphang tei maithangrok no yak khlaiwi kotor bio-composite construction hachuk kahm khlamna bagwi. Replanting, Carbon offset, tei SHG ledger choba khorrok nikhai.",
    "hero.explore": "BioSense DSS Dashboard Nai",
    "hero.mission": "Chwngni Koktwma",
    "hero.missionDesc": "Tripura ni rural logorrokno bio-composite manufacturing bai bo kotor mung swk khlamna bagwi.",

    "problem.title": "Hakhor ni Sajakmung",
    "problem.desc": "Tripura haste kotor wa buphang tongo, thajakbo jora khamwi kahm phola khaiya mung rongo. Bisi bano sidi bagwkna bagwi technology kwrwi chukhano, aboni bagwi quality khorgrog aungwi kwmamo.",
    "problem.card1": "Bagwkmung Kahmya",
    "problem.card1Desc": "Wa kotor rwi jora chengya chengya sidi khlaiwi bagwkmung nikhrai laha aungwi thango.",
    "problem.card2": "Economic Leakage",
    "problem.card2Desc": "Middlemen rog rural Cooperatives tei SHG rogni rang rogo bo manwi phayok khlaio.",
    "problem.card3": "Carbon Deficit tracking kwrwi",
    "problem.card3Desc": "Carbon credit offset nikhai tei replanting standard verification tuchomung kwrwi.",

    "solution.title": "BioSense Choba Laman",
    "solution.desc": "Kotor, choba smart Decision Support System abochor harvesting, SHG logistic ledger tracking, carbon credit verification, tei Gemini 1.5 Flash AI Advisor bai ko choba khlaio.",

    "products.title": "Engineered Bio-Composites",
    "products.desc": "Kotor wa tei agricultural waste rokno subrai kotor structural items khlaimung.",
    "products.viewSpec": "Specifications naidi",

    "vision.title": "Tripura Vision 2030",
    "vision.desc": "Chwngni kotor 2030 plan chuba 1,000+ local cooperatives ni swk baksa khamung, 50,000+ tons carbon offset credit, tei wa structural composites exports haste hachuk bai rwi thango.",

    "process.title": "Tripura Sustainable Lama",
    "process.desc": "Nokha wa buphang kotor no bini borom rwi bio-composite structural materials khlamna bagwi.",

    "impact.title": "Cooperatives Kahmlai",
    "impact.desc": "Tripura ni SHG cooperatives rogni mukhra kotor secondary rang-man kokmung rwi circular economic resilience tuchona bagwi.",

    "sidebar.activeAlerts": "Alerts rok",
    "sidebar.distResource": "District Manuthai",
    "sidebar.settings": "DSS Parameters",

    // Advisor
    "advisor.title": "AI Strategic Advisor",
    "advisor.subtitle": "Tripura ni wa variety ni bisi, replanting, cooperative partnership nikhai kok-twma swngdi.",
    "advisor.placeholder": "Green-to-Gold advisory system no swngdi...",
    "advisor.disclaimer": "Tripura ni regional raw data tei Gemini 1.5 Flash software software bai choba khlajjago."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("biosense_lang");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("biosense_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
