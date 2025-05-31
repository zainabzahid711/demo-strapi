// /importServices.js
// demo-strapi/importServices.js

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); // install node-fetch if needed

// STEP 1: Read JSON file
const filePath = path.join(__dirname, "services_import_full.json");

// STEP 2: Your Admin API Token (paste it here)
const API_TOKEN =
  "ba852b984f7c6d966ae6fcf8e6351ed4d8c58459b050bc3ac49d5931ce41d886072c63b6c9c20f278faba4ac99c8688c8b9a0c4a51bc1da62a419088aecd62e6b4ae361f8c80054c335f3cfeba1c2fd81d28da63acb28788354bcc7c831875576e8672e945ca86b78ef2ff7e5b94482ec558efe1c2f7745e006d32b42cc7a7c2";

// STEP 3: Function to import services
async function importServices() {
  const servicesData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Extract the actual services array from the data property
  const services = servicesData.map((item) => item.data);

  for (const service of services) {
    try {
      const response = await fetch("http://localhost:1337/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { ...service, publishedAt: new Date().toISOString() },
        }),
      });

      const data = await response.json();
      console.log(`✅ Imported: ${service.name}`, data);
    } catch (err) {
      console.error(`❌ Error importing ${service.name}:`, err);
    }
  }
}

importServices();
