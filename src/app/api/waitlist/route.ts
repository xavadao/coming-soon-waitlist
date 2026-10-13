import { NextRequest, NextResponse } from 'next/server';

// In-memory store (resets on worker restart — fine for template demo)
const waitlistEmails = new Set<string>();

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json() as { email?: unknown };
		const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

		if (!email || !isValidEmail(email)) {
			return NextResponse.json(
				{ ok: false, error: { code: 'INVALID_EMAIL', message: 'Please enter a valid email address.' } },
				{ status: 400 }
			);
		}

		const alreadyJoined = waitlistEmails.has(email);
		waitlistEmails.add(email);

		return NextResponse.json({
			ok: true,
			alreadyJoined,
			count: waitlistEmails.size,
		});
	} catch {
		return NextResponse.json(
			{ ok: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong. Please try again.' } },
			{ status: 500 }
		);
	}
}
