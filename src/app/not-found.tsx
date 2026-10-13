import Link from 'next/link';

export default function NotFound() {
	return (
		<div
			className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden noise-bg"
			style={{ background: '#050505' }}
		>
			{/* Ambient glow — teal, centered */}
			<div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
					style={{
						background: 'radial-gradient(ellipse at center, rgba(47,230,201,0.07) 0%, transparent 70%)',
						filter: 'blur(100px)',
					}}
				/>
				<div
					className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full"
					style={{
						background: 'radial-gradient(ellipse at center, rgba(31,182,255,0.05) 0%, transparent 70%)',
						filter: 'blur(120px)',
					}}
				/>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto gap-8 animate-fade-in-up">

				{/* Large 404 display */}
				<div className="relative select-none">
					<span
						className="text-[180px] sm:text-[220px] font-black leading-none tracking-tighter"
						style={{
							background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
						}}
					>
						404
					</span>
					{/* Teal glow overlay on 404 */}
					<span
						className="absolute inset-0 flex items-center justify-center text-[180px] sm:text-[220px] font-black leading-none tracking-tighter pointer-events-none"
						style={{
							background: 'linear-gradient(135deg, rgba(47,230,201,0.12) 0%, rgba(31,182,255,0.06) 50%, transparent 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							filter: 'blur(0.5px)',
						}}
						aria-hidden="true"
					>
						404
					</span>
				</div>

				<div className="flex flex-col items-center gap-4 -mt-6">
					<h1
						className="text-3xl sm:text-4xl font-bold tracking-tight"
						style={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.02em' }}
					>
						This page doesn&apos;t exist{' '}
						<em
							style={{
								fontStyle: 'italic',
								background: 'linear-gradient(135deg, #2FE6C9 0%, #1FB6FF 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
							}}
						>
							(yet)
						</em>
					</h1>

					<p
						className="text-base leading-relaxed max-w-sm"
						style={{ color: 'rgba(255,255,255,0.38)' }}
					>
						The page you&apos;re looking for might be coming soon. Head back home.
					</p>
				</div>

				{/* CTA */}
				<Link
					href="/"
					className="waitlist-glow-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm"
					style={{
						background: 'linear-gradient(135deg, #2FE6C9 0%, #1FB6FF 100%)',
						color: '#050505',
					}}
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Go back home
				</Link>

				{/* Footer note */}
				<p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
					Nexus · Made by Ashley Smith
				</p>
			</div>
		</div>
	);
}
