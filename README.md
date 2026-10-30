# StockMate - Small Business Inventory App

A beginner-friendly mobile inventory application built with React Native and Expo for the Stack & Scale Week 1 Internship Project (October 2026).

## 📱 About the Project
Small shopkeepers need a simple way to keep track of product names, prices, quantities, and low-stock items on a phone. StockMate provides a clean, local product management solution with clear stock indicators.

## ✨ Core Features
- **Inventory List:** Displays products with distinct color-coded stock badges (In Stock, Low Stock below 10, Out of Stock).
- **CRUD Operations:** Users can Add, Edit, and Delete products using validated forms.
- **Stock Controls:** Easily increase or decrease product quantities with +/- buttons (prevents negative values).
- **Local Persistence:** Data is saved locally using AsyncStorage and survives app restarts.
- **Validation:** Forms prevent empty fields and invalid numbers.

## 🗓️ Development Roadmap (Daily Milestones)

**Day 1: App Structure & UI Setup**
- Set up the React Native project using Expo.
- Sketched the initial UI (Inventory List and Add/Edit screens).
- Built the static Inventory List with 3 hardcoded sample products and color-coded stock badges.

**Day 2: Forms & Adding Products**
- Created an "Add Product" form with inputs for Name, Price, and Quantity.
- Implemented form validation using inline error messages (preventing empty fields or negative numbers).
- Used React `useState` to dynamically update the `FlatList` immediately when a new product is added.

**Day 3: Edit, Delete & Stock Updates**
- Added Edit functionality to update existing product details.
- Implemented Delete functionality with a confirmation alert to prevent accidental deletions.
- Added simple +/- quantity controls and ensured quantities cannot drop below zero.
- Documented the low-stock threshold (set to 10).

**Day 4: Local Persistence & Usability**
- Integrated `@react-native-async-storage/async-storage`.
- Used JSON serialization to save and load the product array across app restarts.
- Handled empty inventory states and tested multiple user actions.

**Day 5: Testing & Final Delivery**
- Conducted end-to-end testing of add, edit, delete, quantity updates, validation, and persistence.
- Wrote this README, pushed final source code to GitHub, and recorded the mandatory video demonstration.

## 🛠️ Tech Stack
- **Framework:** React Native (Expo SDK 57)
- **Language:** TypeScript / JavaScript
- **State Management:** React `useState` (Ephemeral state)
- **Persistence:** `@react-native-async-storage/async-storage` (JSON serialization)

## 🚀 How to Run
1. Install dependencies: 
   ```bash
   npm install
