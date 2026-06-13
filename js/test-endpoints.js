const BASE = 'https://careflow-api-5.onrender.com/careflow';
const TOKEN = 'your_token_here';
const HEADERS = { 'Authorization': `Bearer ${TOKEN}` };

const endpoints = [
  '/patients',
  '/staff',
  '/appointments',
  '/appointments/week',
  '/invoices',
  '/invoices/pending',
  '/payments',
  '/queue/today',
  '/reports/daily',
  '/reports/weekly',
  '/reports/monthly',
  '/reports/revenue',
  '/services',
  '/consultations',
];

async function checkAll() {
  for (const ep of endpoints) {
    try {
      const res = await fetch(`${BASE}${ep}`, { headers: HEADERS });
      const data = await res.json();
      console.log(`${res.status} ✓  ${ep}`, Array.isArray(data) ? `[${data.length} items]` : '');
    } catch (e) {
      console.log(`ERR ✗  ${ep} —`, e.message);
    }
  }
}

checkAll();

// run node test-endpoints.js