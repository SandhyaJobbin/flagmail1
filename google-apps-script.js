/**
 * FlagMail — Google Apps Script
 *
 * Handles:
 *   POST action:"register" — saves name + email immediately when assessment starts
 *   POST action:"submit"   — updates that row with scores + writes per-email raw data
 *   GET  ?checkEmail=...   — checks if an email has already been used
 *
 * Setup:
 *   1. Create a Google Sheet with two tabs: "Summary" and "RawData"
 *   2. Extensions > Apps Script > paste this file
 *   3. Deploy > New deployment > Web app > Execute as: Me, Access: Anyone
 *   4. Copy the URL into flagmail1/src/config.js
 */

function ensureSheets(ss) {
  var summary = ss.getSheetByName('Summary');
  if (!summary) {
    summary = ss.insertSheet('Summary');
    summary.appendRow([
      'Timestamp', 'Name', 'Email', 'Status',
      'Score', 'Display Score', 'Tier',
      'Zone 1', 'Zone 2', 'Zone 3'
    ]);
  }

  var raw = ss.getSheetByName('RawData');
  if (!raw) {
    raw = ss.insertSheet('RawData');
    raw.appendRow([
      'Timestamp', 'Name', 'Email', 'Email ID', 'Zone',
      'Selected L1', 'Selected L2', 'Correct L1', 'Correct L2',
      'L1 Correct', 'L2 Correct', 'Clues Used', 'Timed Out', 'Points'
    ]);
  }

  return { summary: summary, raw: raw };
}

function findRowByEmail(sheet, email) {
  if (sheet.getLastRow() < 2) return -1;
  var emails = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues();
  var needle = email.trim().toLowerCase();
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).trim().toLowerCase() === needle) {
      return i + 2; // 1-based row number
    }
  }
  return -1;
}

// ── POST ──────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action = payload.action || 'submit';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ensureSheets(ss);
    var ts = new Date().toISOString();

    if (action === 'register') {
      // Called at game start — lock the email in immediately
      sheets.summary.appendRow([
        ts,
        payload.name  || '',
        payload.email || '',
        'In Progress',
        '', '', '', '', '', ''
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // action === 'submit' — update the existing row with scores
    var row = findRowByEmail(sheets.summary, payload.email || '');

    if (row > 0) {
      // Update existing row (columns D–J: Status, Score, Display Score, Tier, Z1, Z2, Z3)
      sheets.summary.getRange(row, 4, 1, 7).setValues([[
        'Completed',
        payload.score        || 0,
        payload.displayScore || 0,
        payload.title        || '',
        payload.zone1Score   || 0,
        payload.zone2Score   || 0,
        payload.zone3Score   || 0,
      ]]);
    } else {
      // Fallback: no register row found, append a full row
      sheets.summary.appendRow([
        ts,
        payload.name         || '',
        payload.email        || '',
        'Completed',
        payload.score        || 0,
        payload.displayScore || 0,
        payload.title        || '',
        payload.zone1Score   || 0,
        payload.zone2Score   || 0,
        payload.zone3Score   || 0,
      ]);
    }

    // Write per-email raw data
    var perEmail = payload.perEmail || [];
    for (var i = 0; i < perEmail.length; i++) {
      var r = perEmail[i];
      sheets.raw.appendRow([
        ts,
        payload.name  || '',
        payload.email || '',
        r.emailId     || '',
        r.zone        || '',
        r.selectedL1  || '',
        r.selectedL2  || '',
        r.correctL1   || '',
        r.correctL2   || '',
        r.l1Correct   === true,
        r.l2Correct   === true,
        r.cluesUsed   || 0,
        r.timedOut    === true,
        r.points      || 0,
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET ───────────────────────────────────────────────────────────────────────

function doGet(e) {
  var checkEmail = (e.parameter && e.parameter.checkEmail) || '';

  if (checkEmail) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ensureSheets(ss);
    var exists = findRowByEmail(sheets.summary, checkEmail) > 0;

    return ContentService
      .createTextOutput(JSON.stringify({ exists: exists }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'No action specified' }))
    .setMimeType(ContentService.MimeType.JSON);
}
