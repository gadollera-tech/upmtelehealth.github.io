/**
 * UP Manila National Telehealth Center website form receiver.
 * Bind this script to an institution-controlled Google Sheet, then deploy it
 * as a Web app that executes as the deploying account.
 */

const SHEET_NAME = 'Website Submissions';
const HEADERS = [
  'Timestamp',
  'Form Type',
  'First Name',
  'Full Name',
  'Email',
  'Interest',
  'Organization',
  'Role / Position',
  'Sector',
  'Inquiry Type',
  'Message',
  'Updates Consent',
  'Privacy Consent',
  'Updates Opt-in',
  'Source Page'
];

function doGet() {
  return jsonResponse_({ ok: true, service: 'NTHC website form receiver' });
}

function doPost(e) {
  try {
    const data = (e && e.parameter) || {};

    // Honeypot: silently accept bot submissions without storing them.
    if (String(data.website || '').trim()) {
      return jsonResponse_({ ok: true });
    }

    validateSubmission_(data);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      if (!spreadsheet) throw new Error('This script must be bound to a Google Sheet.');

      let sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
        sheet.setFrozenRows(1);
      }

      sheet.appendRow([
        new Date(),
        safeCell_(data.form_type, 30),
        safeCell_(data.first_name, 100),
        safeCell_(data.full_name, 150),
        safeCell_(data.email, 254),
        safeCell_(data.interest, 150),
        safeCell_(data.organization, 200),
        safeCell_(data.role, 150),
        safeCell_(data.sector, 150),
        safeCell_(data.inquiry_type, 150),
        safeCell_(data.message, 1800),
        safeCell_(data.consent, 20),
        safeCell_(data.privacy_consent, 20),
        safeCell_(data.updates_opt_in, 20),
        safeCell_(data.source_page, 500)
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}

function validateSubmission_(data) {
  const formType = String(data.form_type || '').trim();
  const email = String(data.email || '').trim();

  if (!['updates', 'inquiry'].includes(formType)) {
    throw new Error('Invalid form type.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('A valid email address is required.');
  }

  if (formType === 'updates') {
    if (!String(data.first_name || '').trim()) throw new Error('First name is required.');
    if (String(data.consent || '') !== 'yes') throw new Error('Updates consent is required.');
  }

  if (formType === 'inquiry') {
    if (!String(data.full_name || '').trim()) throw new Error('Full name is required.');
    if (!String(data.message || '').trim()) throw new Error('Message is required.');
    if (String(data.privacy_consent || '') !== 'yes') throw new Error('Privacy consent is required.');
  }
}

function safeCell_(value, maximumLength) {
  let text = String(value || '').trim().slice(0, maximumLength);

  // Protect the spreadsheet from formula injection.
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
