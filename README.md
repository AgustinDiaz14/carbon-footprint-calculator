# 🌱 Carbon Footprint Calculator

![demo](./screenshot.png)

A quick and minimal web app built during **Nerdearla 2025** for the **AWS Challenge #3 with Amazon Q Developer**.  
The goal is to provide a simple estimate of personal carbon footprint based on three factors:

- 🚗 Kilometers traveled by car
- ✈️ Short flights taken
- 💡 Electricity consumed (kWh)

The result is displayed in **kg of CO₂ equivalent** and also converted into **trees required per year** 🌳.

---

## ✨ Features
- **Interactive form**: enter your data and calculate instantly.
- **External factors via fetch**: emission factors are pulled from `factors.json` simulating an API call.
- **Simplified but realistic calculations** using global emission averages.
- **Clean, responsive UI**: works well on desktop and mobile.
- **Future-proof design**: ready to connect to real APIs (e.g., Climatiq, Carbon Interface) for country-specific factors.

---

## 🚀 How to run
1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/carbon-footprint-calculator
   cd carbon-footprint-calculator
   ```
2. Open index.html in your browser.
   (No backend or dependencies required).

### 🛠️ Built with Amazon Q Developer

For this challenge I used Amazon Q Developer as a coding partner:

Generated the project skeleton (index.html, style.css, script.js).

Helped structure the calculation logic and fetch integration.

Iterated on responsive UI improvements to make it demo-ready within 40 minutes.