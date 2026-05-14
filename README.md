# LinkedIn Job Email Automation

## Overview
This project automates a basic job outreach workflow using Node.js and Puppeteer.

The automation:
- Opens LinkedIn using a saved browser session
- Scrapes visible email addresses from LinkedIn page content
- Sends automated job application emails using Gmail and Nodemailer

## Features
- LinkedIn browser automation
- Email extraction using regex
- Automated email sending
- Resume attachment support
- Environment variable security using `.env`

## Technologies Used
- Node.js
- Puppeteer
- Puppeteer Extra Stealth Plugin
- Nodemailer
- Dotenv

## Project Structure
- `index.js` → Main automation logic
- `scraper.js` → Extracts email addresses
- `mailer.js` → Sends emails using Gmail
- `.env` → Stores credentials securely (not uploaded)

## Installation
```bash
npm install