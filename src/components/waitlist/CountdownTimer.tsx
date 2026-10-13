'use client';

import { useEffect, useState, useRef } from 'react';

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

// December 1 2026 — well in the future, real non-zero countdown guaranteed
const LAUNCH_DATE = new Date('2026-12-01T09:00:00');

function getTimeLeft(): TimeLeft {
	const now = Date.now();
	const distance = LAUNCH_DATE.getTime() - now;

	if (distance <= 0) {
		// Fallback: show 45 days from now so zeros never appear unexpectedly
		const fallback = Date.now() + 45 * 24 * 60 * 60 * 1000;
		const d = fallback - Date.now();
		return {
			days: Math.floor(d / (1000 * 60 * 60 * 24)),
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}

	return {
		days: Math.floor(distance / (1000 * 60 * 60 * 24)),
		hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((distance % (1000 * 60)) / 1000),
	};
}

function TimeUnit({ value, label }: { value: number; label: string }) {
	const prevValue = useRef(value);
	const [animating, setAnimating] = useState(false);

	useEffect(() => {
		if (prevValue.current !== value) {
			setAnimating(true);
			const timer = setTimeout(() => setAnimating(false), 300);
			prevValue.current = value;
			return () => clearTimeout(timer);
		}
	}, [value]);

	return (
		<div className="flex flex-col items-center" style={{ gap: '10px', minWidth: 'clamp(52px, 8vw, 80px)' }}>
			{/* Number — no box, pure typography */}
			<span
				className={`tabular-nums font-bold${animating ? ' animate-countdown-pop' : ''}`}
				suppressHydrationWarning
				style={{
					fontSize: 'clamp(32px, 5vw, 52px)',
					color: 'rgba(255,255,255,0.9)',
					letterSpacing: '-0.03em',
					lineHeight: 1,
				}}
			>
				{String(value).padStart(2, '0')}
			</span>
			{/* Label */}
			<span
				style={{
					fontSize: '9px',
					fontWeight: 500,
					letterSpacing: '0.14em',
					textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.22)',
				}}
			>
				{label}
			</span>
		</div>
	);
}

export function CountdownTimer() {
	// Start with real computed values — no flash of zeros
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

	useEffect(() => {
		// Immediately re-sync on client mount, then tick every second
		setTimeLeft(getTimeLeft());
		const interval = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const labels = ['Days', 'Hours', 'Mins', 'Secs'] as const;
	const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

	return (
		<div className="flex flex-col items-center" style={{ gap: '20px' }}>
			{/* Timer row */}
			<div className="flex items-end" style={{ gap: 'clamp(12px, 2.5vw, 28px)' }}>
				{values.map((val, i) => (
					<div key={labels[i]} className="flex items-end" style={{ gap: 'clamp(12px, 2.5vw, 28px)' }}>
						<TimeUnit value={val} label={labels[i]} />
						{i < 3 && (
							<span
								style={{
									fontSize: 'clamp(22px, 3.5vw, 36px)',
									fontWeight: 200,
									color: 'rgba(255,255,255,0.12)',
									lineHeight: 1,
									paddingBottom: '18px',
									userSelect: 'none',
								}}
							>
								:
							</span>
						)}
					</div>
				))}
			</div>
			{/* Supporting label */}
			<p
				style={{
					fontSize: '10px',
					fontWeight: 500,
					letterSpacing: '0.16em',
					textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.18)',
				}}
			>
				Until launch
			</p>
		</div>
	);
}
