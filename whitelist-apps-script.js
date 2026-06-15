// ─────────────────────────────────────────────────────────────
//  Cats of Paraiso — Whitelist Google Apps Script
//
//  SETUP INSTRUCTIONS:
//  1. Go to https://script.google.com → New Project
//  2. Paste this entire file into the editor
//  3. Replace SHEET_ID below with your Google Sheet's ID
//     (it's the long string in the sheet URL between /d/ and /edit)
//  4. Click Deploy → New Deployment → Web App
//     - Execute as: Me
//     - Who has access: Anyone
//  5. Copy the deployed Web App URL
//  6. Add it to Vercel as VITE_APPS_SCRIPT_URL
// ─────────────────────────────────────────────────────────────

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Whitelist'; // tab name in your sheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = data.name || '';
    const email = data.email || '';

    if (!name || !email) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Missing fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    sheet.appendRow([getPHTTimestamp(), name, email]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Returns timestamp in PHT (GMT+8) formatted as: 2026-06-15 | 04:39:18 PM
function getPHTTimestamp() {
  const now = new Date();
  const pht = new Date(now.getTime() + 8 * 60 * 60 * 1000);

  const date = pht.toISOString().slice(0, 10); // YYYY-MM-DD

  let hours = pht.getUTCHours();
  const minutes = String(pht.getUTCMinutes()).padStart(2, '0');
  const seconds = String(pht.getUTCSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const time = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

  return `${date} | ${time}`;
}

// Optional: test by visiting the web app URL directly in your browser
function doGet() {
  return ContentService
    .createTextOutput('Whitelist API is running ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
