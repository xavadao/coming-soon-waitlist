import { WorkerEntrypoint } from 'cloudflare:workers';

interface Env {
  ASSETS: Fetcher;
}

// Demo data lasts only for the lifetime of this Worker isolate.
const waitlistEmails = new Set<string>();

export default class WaitlistWorker extends WorkerEntrypoint<Env> {
  async fetch(request: Request): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    if (pathname !== '/api/waitlist' && pathname !== '/api/waitlist/') {
      return this.env.ASSETS.fetch(request);
    }

    if (request.method !== 'POST') {
      return Response.json(
        { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST to join the waitlist.' } },
        { status: 405, headers: { Allow: 'POST' } },
      );
    }

    try {
      const body = await request.json() as { email?: unknown };
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return Response.json(
          { ok: false, error: { code: 'INVALID_EMAIL', message: 'Please enter a valid email address.' } },
          { status: 400 },
        );
      }

      const alreadyJoined = waitlistEmails.has(email);
      waitlistEmails.add(email);
      return Response.json({ ok: true, alreadyJoined, count: waitlistEmails.size });
    } catch {
      return Response.json(
        { ok: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong. Please try again.' } },
        { status: 500 },
      );
    }
  }
}
