import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import fs from "fs";

// Read Excel file as buffer
const excelBuffer = fs.readFileSync("/home/arch/Downloads/AI_Terminologies_For_Beginners.xlsx");

// Parse the buffer into workbook
const workbook = XLSX.read(excelBuffer, { type: "buffer" });

// Pick the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const data = XLSX.utils.sheet_to_json(sheet);

// Supabase setup
const supabase = createClient(
  "https://vxexigrndbgzgbnbvhtr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk"
);

// Insert data
const { error } = await supabase.from("AIT").insert(data);

if (error) {
  console.error("❌ Supabase Insert Error:", error.message);
} else {
  console.log("✅ Data successfully inserted into Supabase");
}
