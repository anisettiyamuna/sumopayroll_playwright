# 🎭 Playwright Automation Framework (JavaScript)

## 📌 Overview

This project is a **UI Automation Testing Framework** built using **Playwright with JavaScript**.
It follows **Page Object Model (POM)** design pattern and integrates **Allure Reporting** for rich test reports.

The framework is designed for:

* Scalable test automation
* Easy maintenance
* Clear reporting
* CI/CD integration readiness

---

## 🚀 Tech Stack

* **Playwright**
* **JavaScript (Node.js)**
* **Allure Reports**
* **Git & GitHub**
* **VS Code**

---

## 📁 Project Structure

```
project-root/
│
├── tests/
├── pages/
├── utils/
├── test-data/
│
├── playwright.config.js
├── package.json
├── .gitignore
│
├── test-results/
├── playwright-report/
├── allure-results/
├── allure-report/
```

---

## ⚙️ Installation

### Clone the repository

```
git clone <your-repo-url>
cd project-root
```

### Install dependencies

```
npm install
```

### Install Playwright browsers

```
npx playwright install
```

---

## ▶️ Running Tests

```
npx playwright test
```

Run specific test:

```
npx playwright test tests/login.spec.js
```

Run in headed mode:

```
npx playwright test --headed
```

---

## 📊 Allure Reporting

```
npx playwright test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🧱 Framework Design (POM)

* **tests/** → Test cases
* **pages/** → Locators & actions
* **utils/** → Helper functions

Example:

```
LoginPage.js
login.spec.js
```

---

## 🔑 Features

* Page Object Model (POM)
* Reusable components
* Cross-browser testing
* Allure reporting integration
* Scalable structure

---

## 🧪 Sample Test Flow

1. Launch browser
2. Navigate to application
3. Perform login
4. Validate dashboard
5. Capture screenshots

---

## ⚠️ Best Practices

* Keep locators in page classes
* Avoid hard waits
* Use explicit waits
* Separate test data

---

## 📎 Notes

* Reports are ignored using `.gitignore`
* Requires Node.js >= 16

---
