import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';

const port = Number(process.env.TEST_PORT || 8793);
const origin = `http://127.0.0.1:${port}`;
let worker;
let output = '';

before(async () => {
  worker = spawn('pnpm', ['exec', 'wrangler', 'dev', '--ip', '127.0.0.1', '--port', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  worker.stdout.on('data', (data) => { output += data; });
  worker.stderr.on('data', (data) => { output += data; });

  for (let attempt = 0; attempt < 120; attempt++) {
    if (worker.exitCode !== null) throw new Error(output);
    try {
      const response = await fetch(`${origin}/api/waitlist`);
      if (response.status === 405) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Worker did not start:\n${output}`);
});

after(() => { worker?.kill('SIGTERM'); });

async function post(body) {
  return fetch(`${origin}/api/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('accepts an email and deduplicates normalized addresses', async () => {
  const first = await post({ email: ' Example@Example.com ' });
  assert.equal(first.status, 200);
  assert.deepEqual(await first.json(), { ok: true, alreadyJoined: false, count: 1 });
  const duplicate = await post({ email: 'example@example.com' });
  assert.deepEqual(await duplicate.json(), { ok: true, alreadyJoined: true, count: 1 });
  const second = await post({ email: 'second@example.com' });
  assert.deepEqual(await second.json(), { ok: true, alreadyJoined: false, count: 2 });
});

test('rejects missing, invalid, and non-string emails', async () => {
  for (const body of [{}, { email: '' }, { email: 'bad' }, { email: 'a b@example.com' }, { email: 123 }]) {
    const response = await post(body);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, 'INVALID_EMAIL');
  }
});

test('preserves the malformed JSON error response', async () => {
  const response = await fetch(`${origin}/api/waitlist`, { method: 'POST', body: '{' });
  assert.equal(response.status, 500);
  assert.equal((await response.json()).error.code, 'SERVER_ERROR');
});

test('rejects unsupported methods', async () => {
  const response = await fetch(`${origin}/api/waitlist`);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
});

test('serves the generated landing page and returns a real 404', async () => {
  const page = await fetch(origin);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /Good/);
  const missing = await fetch(`${origin}/missing-page`);
  assert.equal(missing.status, 404);
});
