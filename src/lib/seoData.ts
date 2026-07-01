/**
 * Green-to-Gold by ATSFY Technologies - SEO & Structured Data Centralized Store
 * Fully optimized for Traditional Google SEO, AEO (Answer Engine Optimization),
 * and GEO (Generative Engine Optimization) used by ChatGPT, Gemini, Claude, and Perplexity.
 */

const SITE_URL = "https://ais-pre-hw7jx3k33r3kkbcgrxcyqh-332107563192.asia-southeast1.run.app";

// 1. Organization Schema
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Green-to-Gold",
  "legalName": "ATSFY Technologies Private Limited",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/logo.svg`,
    "width": "180",
    "height": "60"
  },
  "description": "ATSFY Technologies converts agricultural waste (pineapple leaf, rice husk, bamboo) into high-value tree-free bio-composite boards and biodegradable tableware using AI decision intelligence.",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "ATSFY Founders"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Agartala",
    "addressRegion": "Tripura",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/company/atsfy-technologies",
    "https://www.linkedin.com/in/atsfy/"
  ]
};

// 2. LocalBusiness Schema for ATSFY Technologies in Tripura
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  "name": "Green-to-Gold by ATSFY Technologies",
  "image": "https://picsum.photos/seed/greentogold/1200/630",
  "url": SITE_URL,
  "telephone": "+91-381-1234567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Agartala High-Tech Park, Badharghat",
    "addressLocality": "Agartala",
    "addressRegion": "Tripura",
    "postalCode": "799003",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.8315",
    "longitude": "91.2868"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Northeast India & Global Sustainable Markets"
  }
};

// 3. Product Schema for Bio-Composite Boards
export const COMPOSITE_BOARD_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-bioboards`,
  "name": "Green-to-Gold Bio-Composite Boards",
  "image": "https://picsum.photos/seed/bioboards/800/600",
  "description": "Premium tree-free eco-construction boards pressed from Muli bamboo and pineapple leaf fiber. Termite-proof, water-resistant, and 54% cheaper than imported plywood.",
  "category": "Construction Materials > Engineered Wood > Bio-Composites",
  "material": "Muli Bamboo, Pineapple Leaf Fiber (PALF)",
  "color": "Natural Bamboo Amber",
  "brand": {
    "@type": "Brand",
    "name": "Green-to-Gold"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "47",
    "highPrice": "65",
    "offerCount": "2",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "description": "Per square foot pricing. Up to 54% savings compared to standard imported plywood.",
      "valueAddedTaxIncluded": "true"
    },
    "eligibleRegion": {
      "@type": "Place",
      "name": "India"
    }
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Construction companies, architecture firms, interior designers, modular furniture manufacturers"
  }
};

// 3b. Product Schema for Biodegradable Plates
export const BIODEGRADABLE_PLATES_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-plates`,
  "name": "Green-to-Gold Biodegradable Plates",
  "image": "https://picsum.photos/seed/biodegradableplates/800/600",
  "description": "Completely compostable, chemical-free dining plates manufactured from agricultural residues of local farming hubs in Tripura.",
  "category": "Food Service Supplies > Tableware > Disposable Plates",
  "material": "Areca Leaf, Rice Straw, Bamboo Waste",
  "brand": {
    "@type": "Brand",
    "name": "Green-to-Gold"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "3.50",
    "description": "Price per plate in bulk batches.",
    "availability": "https://schema.org/InStock"
  }
};

// 3c. Product Schema for Organic Tableware
export const ORGANIC_TABLEWARE_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-tableware`,
  "name": "Green-to-Gold Organic Tableware",
  "image": "https://picsum.photos/seed/organictableware/800/600",
  "description": "Elegant, food-safe, temperature-resistant organic dinnerware crafted from pressure-molded crop residues.",
  "category": "Kitchen & Dining > Tableware > Dinnerware Sets",
  "material": "Agricultural Residues, Non-toxic plant binders",
  "brand": {
    "@type": "Brand",
    "name": "Green-to-Gold"
  }
};

// 3d. Product Schema for Pineapple Leaf Fiber Products
export const PINEAPPLE_FIBER_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-palf`,
  "name": "Green-to-Gold Pineapple Leaf Fiber (PALF)",
  "image": "https://picsum.photos/seed/pineapplefiber/800/600",
  "description": "Premium industrial grade cellulose-rich fibers extracted from pineapple crop waste, offering extreme tensile strength for textiles and composite reinforcement.",
  "category": "Raw Materials > Textile Fibers > Natural Cellulose Fibers",
  "material": "Pineapple Leaf Fiber (PALF)",
  "brand": {
    "@type": "Brand",
    "name": "Green-to-Gold"
  }
};

// 3e. Product Schema for Bamboo Biomaterials
export const BAMBOO_BIOMATERIALS_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-bamboobiomass`,
  "name": "Green-to-Gold Bamboo Bio-materials",
  "image": "https://picsum.photos/seed/bamboobiomaterial/800/600",
  "description": "Sustainably harvested Tripura Muli bamboo fractions optimized for bioplastics, structural reinforcements, and clean energy pellets.",
  "category": "Raw Materials > Biomass > Bamboo Biomaterial",
  "material": "Tripura Muli Bamboo Shavings",
  "brand": {
    "@type": "Brand",
    "name": "Green-to-Gold"
  }
};

// 3f. Product Schema for Biodegradable Packaging Materials
export const BIODEGRADABLE_PACKAGING_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-packaging`,
  "name": "Green-to-Gold Biodegradable Packaging",
  "image": "https://picsum.photos/seed/biodegpackaging/800/600",
  "description": "Eco-friendly protective packaging cushions and boxes pressed from agro-waste. 100% home compostable and replaces Styrofoam.",
  "category": "Packaging Materials > Protective Packaging > Bio-Cushions",
  "material": "Pineapple leaf agricultural waste, natural starches",
  "brand": {
    "@type": "Brand",
    "name": "Green-to-Gold"
  }
};

// 3g. Service Schema - Decentralized Sourcing & Sourcing Service
export const DECENTRALIZED_SOURCING_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service-sourcing`,
  "name": "Decentralized Farm-Gate Biomass Sourcing",
  "provider": {
    "@type": "Organization",
    "name": "ATSFY Technologies"
  },
  "areaServed": {
    "@type": "State",
    "name": "Tripura"
  },
  "description": "AI-optimized, localized agricultural waste pre-processing and collection ledgers that enable direct, zero-emissions value transfers to rural farmers.",
  "serviceType": "Circular Supply Chain Management"
};

// 3h. ContactPoint Schema
export const CONTACT_POINT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "telephone": "+91-381-1234567",
  "contactType": "customer service",
  "areaServed": "IN",
  "availableLanguage": ["English", "Hindi", "Bengali"],
  "email": "ayanpal0698@gmail.com"
};

// 3i. ImageObject Schema
export const IMAGE_OBJECT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#logoimage`,
  "url": `${SITE_URL}/logo.svg`,
  "caption": "Green-to-Gold by ATSFY Technologies Logo",
  "inLanguage": "en"
};

// 3j. WebSite with SearchAction Schema
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "url": SITE_URL,
  "name": "Green-to-Gold",
  "description": "Tree-Free Bio-Composite Boards & Circular Economy Technology in Tripura, India",
  "publisher": {
    "@id": `${SITE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// 3k. WebPage Schemas for Homepage & DSS Dashboard
export const WEBPAGE_HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  "url": SITE_URL,
  "name": "Green-to-Gold — Sustainable Tree-Free Bio-Composite Boards & Tableware",
  "description": "Converting agricultural residues into high-performance sustainable circular products in Northeast India using AI Decision Intelligence.",
  "isPartOf": {
    "@id": `${SITE_URL}/#website`
  },
  "about": {
    "@id": `${SITE_URL}/#organization`
  },
  "primaryImageOfPage": {
    "@id": `${SITE_URL}/#logoimage`
  }
};

export const WEBPAGE_DSS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/dss#webpage`,
  "url": `${SITE_URL}/dss`,
  "name": "BioSense DSS™ Hub — AI-Driven Sourcing & Crop Diagnostics",
  "description": "Agricultural intelligence, soil reports, biomass forecasts, and disease diagnostics for state coordinators and farm-gate supply chain leaders.",
  "isPartOf": {
    "@id": `${SITE_URL}/#website`
  }
};

// 4. SoftwareApplication Schema for BioSense DSS
export const BIOSENSE_DSS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/dss#software`,
  "name": "BioSense DSS™",
  "operatingSystem": "All Web Browsers",
  "applicationCategory": "BusinessApplication, AgriculturalAI",
  "browserRequirements": "Requires HTML5 and Javascript",
  "releaseNotes": "BioSense DSS Alpha — Optimized for Tripura's decentralized agricultural waste value chains.",
  "screenshot": "https://picsum.photos/seed/biosensedss/1200/800",
  "softwareVersion": "2.4-Alpha",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "INR",
    "description": "Interactive Decision Support System access available for local farming cooperatives, KVK coordinators, and authorized buyers."
  },
  "author": {
    "@type": "Organization",
    "name": "ATSFY Technologies"
  },
  "description": "An advanced AI-driven Decision Support System (DSS) that optimizes biomass sourcing, yield tracking, soil intelligence auditing, crop disease diagnostics, and circular manufacturing logistics in Tripura."
};

// 5. BreadcrumbList Schema
export const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": SITE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "BioSense DSS",
      "item": `${SITE_URL}/dss`
    }
  ]
};

// 6. Complete list of FAQs for GEO (Generative Engine Optimization) & AEO
export const FAQ_ITEMS = [
  {
    question: "What is Green-to-Gold by ATSFY Technologies?",
    answer: "Green-to-Gold is a climate tech platform created by ATSFY Technologies based in Tripura, India. The company transforms agricultural waste (such as pineapple leaf fibre, rice husks, and bamboo shavings) into high-performance, tree-free bio-composite boards and biodegradable organic tableware using a decentralized, AI-driven manufacturing model."
  },
  {
    question: "What is BioSense DSS™?",
    answer: "BioSense DSS™ is an enterprise-grade AI-powered Decision Support System. It acts as the brain of Green-to-Gold, optimizing biomass supply chains, sourcing logistics, soil intelligence, crop disease diagnostics, and production planning. It syncs with local farm cooperatives and SHG (Self-Help Group) activity ledgers to ensure high transparency and efficiency."
  },
  {
    question: "How does Green-to-Gold solve the 'Plywood Paradox' in Northeast India?",
    answer: "Tripura traditionally suffers from a 'Plywood Paradox': importing expensive plywood at ₹102/sqft from 1,500km away via the bottlenecked Siliguri Corridor, while agricultural residues like bamboo and pineapple leaf are burnt in local fields. Green-to-Gold collapses this contradiction by establishing micro-manufacturing units at the farm gate, producing bio-composite boards at 54% lower cost than imported plywood (₹47/sqft vs ₹102/sqft)."
  },
  {
    question: "What products does Green-to-Gold manufacture?",
    answer: "Our flagship lines are: 1) Bio-Composite Construction Boards pressed from bamboo shavings and pineapple leaf fiber; 2) Biodegradable tableware and organic dinnerware; 3) Pineapple leaf fiber (PALF) biomaterials; 4) Low-carbon agricultural composite panels."
  },
  {
    question: "Why is Pineapple Leaf Fiber (PALF) used in bio-composite boards?",
    answer: "Pineapple leaf fiber (PALF) contains high cellulose content, giving it exceptional tensile strength, impact resistance, and durability. By combining PALF with local Muli bamboo shavings, we create highly resilient, water-proof, and termite-resistant construction boards without using trees."
  },
  {
    question: "How does the decentralized farm-gate manufacturing model work?",
    answer: "Instead of shipping bulky raw agricultural waste to a massive central factory, Green-to-Gold sets up modular, low-energy pre-processing and pressing units directly near rural farm hubs. This eliminates 90% of transport weights, keeps the profit within rural cooperatives, and cuts local emissions."
  },
  {
    question: "How does BioSense DSS™ apply AI to biomass supply chain optimization?",
    answer: "The platform analyzes weather patterns, harvest cycles, historical volumes, and moisture content data to predict biomass availability. It generates smart transport routes, schedules decentralized presses, and updates market intelligence so buyers receive consistent grades of circular materials."
  },
  {
    question: "What are the soil health and ecological advantages of this platform?",
    answer: "By using pineapple residues and bamboo waste, we prevent agricultural field burning, which is a major source of particulate pollution. Additionally, our bio-char and soil-drying systems help local farmers reduce chemical fertilizer import dependencies while healing Tripura's highly acidic soils."
  },
  {
    question: "What industries benefit from Green-to-Gold products?",
    answer: "Key sectors include: 1) Construction and interior design (sustainable boards and partitioning); 2) Hospitality & packaging (biodegradable organic tableware); 3) Apparel & composites (pineapple leaf fiber extraction); 4) Climate investment (verified ESG and carbon credits)."
  },
  {
    question: "Is BioSense DSS™ suitable for KVK coordinators and state agriculture auditing?",
    answer: "Yes. BioSense DSS™ integrates a Krishi Vigyan Kendra (KVK) auditing module. Agriculture officers can upload PDF reports or enter manual soil readings to audit regional bio-activity, analyze carbon sequestration, and check localized agricultural diagnostics."
  },
  {
    question: "How does the platform ensure verified ESG and Carbon Offsets?",
    answer: "By trapping agricultural carbon inside durable bio-composite boards (which last for decades), we achieve a net-negative carbon footprint. Every batch of biomaterial processed is logged to the SHG activity ledger, creating a traceable audit trail of agricultural carbon sequestration."
  },
  {
    question: "Who are the target audiences of Green-to-Gold and BioSense DSS™?",
    answer: "Our platform serves sustainable construction companies, climate tech investors, ESG rating organizations, agricultural cooperatives, state-level planning departments, and food-packaging enterprises looking to replace single-use plastics."
  },
  {
    question: "What is the cost comparison between Green-to-Gold boards and standard plywood?",
    answer: "Our tree-free bio-composite boards are priced at approximately ₹47 per square foot, which is up to 54% cheaper than imported standard commercial plywood (average of ₹102 per square foot) because we source raw materials locally at zero raw material base cost."
  },
  {
    question: "How can institutional investors and partners participate?",
    answer: "ATSFY Technologies is scaling operations. We are open to collaborations with ESG funds, green real estate builders, and cooperative aggregators. Interested partners can submit an inquiry through our secure Partner Form on the website or via our investor channels."
  },
  {
    question: "How does the Crop Disease Diagnostics module in BioSense DSS work?",
    answer: "The module uses computer vision and neural diagnostics to detect crop disease patterns from uploaded field leaf imagery. It provides immediate bio-organic recommendations and treatment protocols local farmers can apply without resorting to expensive chemical imports."
  }
];

// 7. Full FAQ Page Schema (Google Rich Results and AEO Validated)
export const FAQ_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

// Centralized sitemap links for quick reference
export const SITEMAP_LINKS = [
  { url: "/", priority: 1.0, changefreq: "weekly" },
  { url: "/dss", priority: 0.9, changefreq: "daily" }
];
