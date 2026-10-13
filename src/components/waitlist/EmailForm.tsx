'use client';

import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

interface WaitlistResponse {
	ok: boolean;
	alreadyJoined?: boolean;
	count?: number;
	error?: { code: string; message: string };
}

async function joinWaitlist(email: string): Promise<WaitlistResponse> {
	const res = await fetch('/api/waitlist', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	});
	const data = await res.json() as WaitlistResponse;
	if (!res.ok) throw new Error(data.error?.message ?? 'Something went wrong.');
	return data;
}

export function EmailForm() {
	const [email, setEmail] = useState('');
	const [validationError, setValidationError] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const mutation = useMutation<WaitlistResponse, Error, string>({
		mutationFn: joinWaitlist,
		onError: () => {
			inputRef.current?.focus();
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setValidationError('');

		const trimmed = email.trim();
		if (!trimmed) {
			setValidationError('Please enter your email address.');
			inputRef.current?.focus();
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
			setValidationError('Please enter a valid email address.');
			inputRef.current?.focus();
			return;
		}

		mutation.mutate(trimmed);
	}

	/* ── Success state ── */
	if (mutation.isSuccess) {
		return (
			<div className="animate-scale-in flex flex-col items-center gap-3 py-1">
				<div
					className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl"
					style={{
						background: 'rgba(47,230,201,0.05)',
						border: '1px solid rgba(47,230,201,0.18)',
						boxShadow: '0 0 40px rgba(47,230,201,0.07)',
					}}
				>
					{/* Check circle */}
					<div
						className="flex-shrink-0 flex items-center justify-center rounded-full"
						style={{
							width: '32px',
							height: '32px',
							background: 'rgba(47,230,201,0.12)',
							border: '1px solid rgba(47,230,201,0.3)',
						}}
					>
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
							<path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="#2FE6C9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
					<div className="text-left">
						<p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3 }}>
							Demo signup complete
						</p>
						<p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>
							This example does not send launch notifications.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const errorMessage = validationError || (mutation.isError ? mutation.error?.message : '');

	return (
		<form onSubmit={handleSubmit} noValidate className="w-full max-w-md mx-auto">
			<div className="flex flex-col sm:flex-row gap-2.5">
				{/* Glass input */}
				<div className="relative flex-1">
					<input
						ref={inputRef}
						type="email"
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value);
							if (validationError) setValidationError('');
						}}
						placeholder="Enter your email"
						className="input-glow w-full px-5 py-4 rounded-xl text-sm text-white placeholder:text-white/28 transition-all duration-300"
						style={{
							background: 'rgba(255,255,255,0.055)',
							border: errorMessage
								? '1px solid rgba(255,80,80,0.55)'
								: '1px solid rgba(255,255,255,0.1)',
							fontSize: '14px',
						}}
						disabled={mutation.isPending}
						autoComplete="email"
						aria-label="Email address"
					/>
				</div>
				{/* CTA button */}
				<button
					type="submit"
					disabled={mutation.isPending}
					className="waitlist-glow-btn px-7 py-4 rounded-xl font-semibold text-sm flex-shrink-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					style={{
						background: 'linear-gradient(135deg, #2FE6C9 0%, #1FB6FF 100%)',
						color: '#050505',
						minWidth: '152px',
						fontSize: '14px',
					}}
				>
					{mutation.isPending ? (
						<>
							<svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
								<circle cx="7.5" cy="7.5" r="5.5" stroke="rgba(0,0,0,0.25)" strokeWidth="2"/>
								<path d="M7.5 2a5.5 5.5 0 0 1 5.5 5.5" stroke="#050505" strokeWidth="2" strokeLinecap="round"/>
							</svg>
							<span>Joining…</span>
						</>
					) : (
						<span>Join waitlist</span>
					)}
				</button>
			</div>
			{errorMessage && (
				<p className="mt-2.5 text-xs text-center animate-fade-in" style={{ color: 'rgba(255,100,100,0.9)' }}>
					{errorMessage}
				</p>
			)}
		</form>
	);
}
