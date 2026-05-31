/**
 * Kuboqss Google Sheets order webhook.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Add the columns from templates/orders_sheet_columns.csv as row 1.
 * 3. Open Extensions > Apps Script.
 * 4. Paste this file.
 * 5. Set Script Property ORDER_WEBHOOK_SECRET to the same value used in backend env.
 * 6. Deploy as Web App: execute as Me, access Anyone with the link.
 */

const SHEET_NAME = 'orders';

const COLUMNS = [
  'order_number',
  'created_at',
  'status',
  'customer_name',
  'phone_raw',
  'phone_e164',
  'phone_local',
  'city',
  'address',
  'items_json',
  'subtotal_lyd',
  'discount_lyd',
  'total_lyd',
  'currency',
  'source',
  'landing_page',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'fbc',
  'fbp',
  'ttclid',
  'ttp',
  'snapclid',
  'event_id',
  'client_ip',
  'user_agent',
  'sheet_sync_status',
  'notes',
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('ORDER_WEBHOOK_SECRET');

    if (expectedSecret && payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'unauthorized' }, 401);
    }

    const sheet = getOrCreateSheet_();
    ensureHeader_(sheet);

    const order = payload.order || payload;
    const row = COLUMNS.map((column) => {
      if (column === 'items_json') {
        return JSON.stringify(order.items || []);
      }
      return order[column] == null ? '' : order[column];
    });

    sheet.appendRow(row);

    return jsonResponse({
      ok: true,
      order_number: order.order_number || '',
    }, 200);
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error && error.message ? error.message : error),
    }, 500);
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeader_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
  const hasHeader = firstRow.some((cell) => String(cell || '').trim() !== '');

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
    sheet.setFrozenRows(1);
  }
}

function jsonResponse(body, status) {
  return ContentService
    .createTextOutput(JSON.stringify({ status, ...body }))
    .setMimeType(ContentService.MimeType.JSON);
}
