'use client';

import { useState } from 'react';

const SHARE_URL = typeof window !== 'undefined' ? window.location.href : 'https://yourproduct.com';
const SHARE_TEXT = "I just joined the waitlist for something exciting. Skip the line and join me 👇";

function TwitterIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
		</svg>
	);
}

function LinkIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
			<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="20 6 9 17 4 12"/>
		</svg>
	);
}

export function SocialShare() {
	const [copied, setCopied] = useState(false);

	function shareTwitter() {
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	function shareLinkedIn() {
		const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(SHARE_URL);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for browsers without clipboard API
			const el = document.createElement('input');
			el.value = SHARE_URL;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}

	const btnBase = `
		flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
		transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
	`;

	return (
		<section className="w-full max-w-2xl mx-auto px-6 py-16">
			<div className="flex flex-col items-center gap-6">
				<div className="flex flex-col items-center gap-2 animate-fade-in-up">
					<p className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>
						Skip the line — share with friends
					</p>
					<p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
						Help others discover what&apos;s coming
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up delay-100">
					{/* Twitter / X */}
					<button
						onClick={shareTwitter}
						className={btnBase}
						style={{
							background: 'rgba(255,255,255,0.04)',
							border: '1px solid rgba(255,255,255,0.1)',
							color: 'rgba(255,255,255,0.75)',
						}}
						aria-label="Share on X (Twitter)"
					>
						<TwitterIcon />
						<span>Share on X</span>
					</button>

					{/* LinkedIn */}
					<button
						onClick={shareLinkedIn}
						className={btnBase}
						style={{
							background: 'rgba(255,255,255,0.04)',
							border: '1px solid rgba(255,255,255,0.1)',
							color: 'rgba(255,255,255,0.75)',
						}}
						aria-label="Share on LinkedIn"
					>
						<LinkedInIcon />
						<span>Share on LinkedIn</span>
					</button>

					{/* Copy link */}
					<button
						onClick={copyLink}
						className={btnBase}
						style={{
							background: copied ? 'rgba(47,230,201,0.08)' : 'rgba(255,255,255,0.04)',
							border: copied ? '1px solid rgba(47,230,201,0.25)' : '1px solid rgba(255,255,255,0.1)',
							color: copied ? '#2FE6C9' : 'rgba(255,255,255,0.75)',
						}}
						aria-label="Copy link to clipboard"
					>
						{copied ? <CheckIcon /> : <LinkIcon />}
						<span>{copied ? 'Copied!' : 'Copy link'}</span>
					</button>
				</div>
			</div>
		</section>
	);
}
