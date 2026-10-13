'use client';

import { useState } from 'react';

export function DemoSection() {
	const [playing, setPlaying] = useState(false);

	return (
		<section
			className="w-full max-w-5xl mx-auto px-6 animate-fade-in-up"
			style={{ paddingTop: '48px', paddingBottom: '80px', position: 'relative' }}
		>
			{/* Radial spotlight — centered behind the card, teal glow */}
			<div
				aria-hidden="true"
				style={{
					position: 'absolute',
					inset: 0,
					background: 'radial-gradient(ellipse 70% 55% at 50% 58%, rgba(47,230,201,0.06) 0%, transparent 70%)',
					pointerEvents: 'none',
					zIndex: 0,
				}}
			/>

			{/* Section label — neutral, unobtrusive */}
			<div className="flex flex-col items-center gap-2 mb-5" style={{ position: 'relative', zIndex: 1 }}>
				<span
					style={{
						fontSize: '10px',
						fontWeight: 500,
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
						color: 'rgba(255,255,255,0.28)',
					}}
				>
					Product Preview
				</span>
				<p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.22)', margin: 0 }}>
					See what you&rsquo;re waiting for
				</p>
			</div>

			{/* Video card — physical depth, cinematic surface */}
			<div
				className="relative w-full overflow-hidden cursor-pointer group"
				onClick={() => setPlaying(true)}
				role="button"
				tabIndex={0}
				aria-label="Play demo video"
				onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
				style={{
					position: 'relative',
					zIndex: 1,
					aspectRatio: '16/9',
					borderRadius: '18px',
					background: 'linear-gradient(180deg, #0B1114 0%, #050505 100%)',
					border: '1px solid rgba(255,255,255,0.10)',
					boxShadow:
						'0 40px 120px rgba(0,0,0,0.8), ' +
						'0 0 60px rgba(47,230,201,0.08), ' +
						'inset 0 0 80px rgba(0,0,0,0.6)',
					transition: 'box-shadow 0.7s ease, border-color 0.7s ease',
				}}
				onMouseEnter={(e) => {
					(e.currentTarget as HTMLElement).style.boxShadow =
						'0 48px 140px rgba(0,0,0,0.85), ' +
						'0 0 80px rgba(47,230,201,0.12), ' +
						'inset 0 0 80px rgba(0,0,0,0.6)';
					(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLElement).style.boxShadow =
						'0 40px 120px rgba(0,0,0,0.8), ' +
						'0 0 60px rgba(47,230,201,0.08), ' +
						'inset 0 0 80px rgba(0,0,0,0.6)';
					(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
				}}
			>
				{/* Inner vignette — top highlight + bottom depth */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.018) 0%, transparent 60%), ' +
							'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 65%)',
					}}
				/>

				{/* Play button — focal point of the section */}
				{!playing && (
					<div className="absolute inset-0 flex items-center justify-center z-10">
						{/* Slow outer pulse ring */}
						<div
							className="absolute rounded-full animate-pulse-glow"
							style={{
								width: '100px',
								height: '100px',
								background: 'transparent',
								border: '1px solid rgba(47,230,201,0.14)',
							}}
						/>
						{/* Main play button — solid gradient, brightest element on page */}
						<div
							className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
							style={{
								width: '72px',
								height: '72px',
								background: 'linear-gradient(135deg, #2FE6C9 0%, #1FB6FF 100%)',
								boxShadow:
									'0 0 40px rgba(47,230,201,0.50), ' +
									'0 0 80px rgba(47,230,201,0.20), ' +
									'0 8px 32px rgba(0,0,0,0.4)',
							}}
						>
							<svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '3px' }}>
								<path d="M6 4l14 8-14 8V4z" fill="#050505" />
							</svg>
						</div>
					</div>
				)}

				{/* Playing state */}
				{playing && (
					<div
						className="absolute inset-0 flex items-center justify-center z-10"
						style={{ background: 'rgba(5,5,5,0.92)' }}
					>
						<div className="flex flex-col items-center gap-5">
							<div
								className="flex items-center justify-center rounded-full"
								style={{
									width: '64px',
									height: '64px',
									background: 'linear-gradient(135deg, #2FE6C9 0%, #1FB6FF 100%)',
									boxShadow: '0 0 32px rgba(47,230,201,0.4)',
								}}
							>
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
									<rect x="6" y="5" width="4" height="14" rx="1" fill="#050505" />
									<rect x="14" y="5" width="4" height="14" rx="1" fill="#050505" />
								</svg>
							</div>
							<p className="text-sm" style={{ color: 'rgba(255,255,255,0.28)' }}>
								Video player would appear here
							</p>
							<button
								onClick={(e) => { e.stopPropagation(); setPlaying(false); }}
								className="text-xs px-5 py-2 rounded-lg"
								style={{
									color: 'rgba(255,255,255,0.28)',
									border: '1px solid rgba(255,255,255,0.07)',
									transition: 'background 0.2s ease',
								}}
								onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)')}
								onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
							>
								Close
							</button>
						</div>
					</div>
				)}

				{/* Top edge highlight — subtle surface catch */}
				<div
					className="absolute inset-x-0 top-0 h-px pointer-events-none"
					style={{
						background:
							'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.06) 75%, transparent 100%)',
					}}
				/>
			</div>
		</section>
	);
}
