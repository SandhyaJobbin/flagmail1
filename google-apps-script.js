/**
 * FlagMail — Google Apps Script
 *
 * Handles:
 *   POST  — saves player summary + per-email raw data to two sheets
 *   GET   — checks if an email has already been used (?checkEmail=...)
 *
 * Setup:
 *   1. Create a Google Sheet with two tabs: "Summary" and "RawData"
 *   2. Extensions > Apps Script > paste this file
 *   3. Deploy > New deployment > Web app > Execute as: Me, Access: Anyone
 *   4. Copy the URL into flagmail1/src/config.js
 */

// ── POST ──────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = new Date().toISOString();

    // — Summary sheet (one row per player) —
    var summary = ss.getSheetByName('Summary');
    if (!summary) {
      summary = ss.insertSheet('Summary');
      summary.appendRow([
        'Timestamp', 'Name', 'Email', 'Score', 'Display Score',
        'Tier', 'Zone 1', 'Zone 2', 'Zone 3'
      ]);
    }

    summary.appendRow([
      ts,
      payload.name        || '',
      payload.email       || '',
      payload.score       || 0,
      payload.displayScore|| 0,
      payload.title       || '',
      payload.zone1Score  || 0,
      payload.zone2Score  || 0,
      payload.zone3Score  || 0,
    ]);

    // — RawData sheet (one row per email per player) —
    var raw = ss.getSheetByName('RawData');
    if (!raw) {
      raw = ss.insertSheet('RawData');
      raw.appendRow([
        'Timestamp', 'Name', 'Email', 'Email ID', 'Zone',
        'Selected L1', 'Selected L2', 'Correct L1', 'Correct L2',
        'L1 Correct', 'L2 Correct', 'Clues Used', 'Timed Out', 'Points'
      ]);
    }

    var perEmail = payload.perEmail || [];
    for (var i = 0; i < perEmail.length; i++) {
      var r = perEmail[i];
      raw.appendRow([
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
    // Check if email already exists in Summary sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var summary = ss.getSheetByName('Summary');
    var exists = false;

    if (summary && summary.getLastRow() > 1) {
      var emails = summary.getRange(2, 3, summary.getLastRow() - 1, 1).getValues();
      var needle = checkEmail.trim().toLowerCase();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === needle) {
          exists = true;
          break;
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ exists: exists }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // No recognised query — return empty
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'No action specified' }))
    .setMimeType(ContentService.MimeType.JSON);
}
