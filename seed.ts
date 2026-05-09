import { db } from "./src/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const districts = ["Unakoti", "North Tripura", "Dhalai", "Sepahijala", "Gomati"];

async function seed() {
  console.log("Seeding Firestore...");

  // District Resources
  for (const d of districts) {
    await addDoc(collection(db, "district_resources"), {
      district: d,
      bamboo_stock_t: Math.floor(Math.random() * 50000) + 10000,
      coverage_pct: Math.floor(Math.random() * 40) + 50,
      status: ["Healthy", "Monitor", "Critical"][Math.floor(Math.random() * 3)],
      fibre_stock_t: Math.floor(Math.random() * 5000) + 1000,
      next_harvest_date: "Oct 2026"
    });
  }

  // SHG Activity
  const shgs = [
    { name: "Unakoti Bamboo Crafts", dist: "Unakoti" },
    { name: "North Tripura Fibre Co-op", dist: "North Tripura" },
    { name: "Dhalai Green Builders", dist: "Dhalai" },
    { name: "Sepahijala Eco-Pack", dist: "Sepahijala" },
    { name: "Gomati Tableware SHG", dist: "Gomati" }
  ];
  for (const s of shgs) {
    await addDoc(collection(db, "shg_activity"), {
      cooperative_name: s.name,
      district: s.dist,
      last_harvest_date: "Apr 2026",
      volume_t: Math.floor(Math.random() * 500) + 100,
      income_inr: Math.floor(Math.random() * 500000) + 200000,
      status: "Active"
    });
  }

  // DSS Alerts
  const alerts = [
    { title: "Bamboosa Tulda Depletion", severity: "Critical", district: "Dhalai", desc: "Excessive harvesting detected in Dhalai buffer zones. immediate hold recommended.", action: "Pause All Permits" },
    { title: "Pest Outbreak: Bamboo Blight", severity: "Warning", district: "Unakoti", desc: "Early signs of blight in Unakoti north quadrant.", action: "Apply Organic Biocide" },
    { title: "Bumper Harvest Forecast", severity: "Info", district: "Gomati", desc: "Optimal conditions for Muli bamboo harvest next month.", action: "Scale Logistics" }
  ];
  for (const a of alerts) {
    await addDoc(collection(db, "dss_alerts"), {
      ...a,
      detected_at: Timestamp.now(),
      resolved: false
    });
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
