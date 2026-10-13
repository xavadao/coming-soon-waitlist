import { CountdownTimer } from '@/components/waitlist/CountdownTimer';
import { EmailForm } from '@/components/waitlist/EmailForm';
import { SocialProof } from '@/components/waitlist/SocialProof';
import { DemoSection } from '@/components/waitlist/DemoSection';
import { SocialShare } from '@/components/waitlist/SocialShare';

// ── MODE TOGGLE ──────────────────────────────────────────────
// true  = Mode A: hero + product preview + social share + footer
// false = Mode B: hero + social share + footer (no preview gap)
const SHOW_VIDEO = true;
// ─────────────────────────────────────────────────────────────



export default function HomePage() {
	return (
		<div className="relative min-h-screen noise-bg" style={{ background: '#050505' }}>

			{/* ── ONE global background canvas — fixed, spans the entire page ── */}
			<div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
				{/* Cinematic hero artwork — full page */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/cdn/uploads/pawel-czerwinski-NTYYL9Eb9y8-unsplash.jpg"
					alt=""
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center top',
						filter: 'saturate(1.4) brightness(0.52) contrast(1.08)',
					}}
				/>
				{/* Smart layered overlay — light at top, progressively darker */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.28) 25%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.72) 68%, #050505 82%, #050505 100%)',
					}}
				/>
				{/* Teal center bloom */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(ellipse 70% 45% at 50% 22%, rgba(47,230,201,0.07) 0%, transparent 60%)',
					}}
				/>
				{/* Corner vignettes */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(ellipse 120% 100% at 50% 0%, transparent 40%, rgba(0,0,0,0.55) 100%)',
					}}
				/>
				{/* Side vignettes */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(to right, rgba(5,5,5,0.55) 0%, transparent 28%, transparent 72%, rgba(5,5,5,0.55) 100%)',
					}}
				/>
			</div>

			<main id="main-content" tabIndex={-1} className="relative z-10">

				{/* ════════════════════════════════════════════
				    HERO SECTION
				════════════════════════════════════════════ */}
				<section
					className="flex flex-col items-center px-6 text-center"
					style={{
						paddingTop: 'clamp(48px, 6vh, 88px)',
						paddingBottom: 'clamp(40px, 5vh, 64px)',
					}}
				>
					{/* Hero content — 1200px/92vw ensures headline fits two lines */}
					<div
						className="relative z-10 flex flex-col items-center mx-auto"
						style={{ maxWidth: '1200px', width: '100%', gap: '0' }}
					>
						{/* Badge */}
						<div
							className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full animate-fade-in-up"
							style={{
								background: 'rgba(255,255,255,0.04)',
								border: '1px solid rgba(255,255,255,0.09)',
								color: 'rgba(255,255,255,0.36)',
								fontSize: '10px',
								fontWeight: 600,
								letterSpacing: '0.16em',
								textTransform: 'uppercase',
								marginBottom: '24px',
							}}
						>
							<span
								style={{
									display: 'inline-block',
									width: '5px',
									height: '5px',
									borderRadius: '50%',
									background: 'rgba(255,255,255,0.28)',
									flexShrink: 0,
								}}
							/>
							Coming Soon
						</div>

						{/* Headline — exactly two lines, only "wait" accented */}
						<h1
							className="animate-fade-in-up delay-100"
							style={{
								fontSize: 'clamp(40px, 6vw, 96px)',
								fontWeight: 900,
								lineHeight: 1.08,
								letterSpacing: '-0.03em',
								color: '#ffffff',
								margin: 0,
								marginBottom: '28px',
								maxWidth: '1200px',
								width: '100%',
							}}
						>
							Good things come to
							<br />
							{'those who '}
							<em
								style={{
									fontStyle: 'italic',
									fontWeight: 900,
									background: 'linear-gradient(135deg, #46FFE0 0%, #33C8FF 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text',
									letterSpacing: '-0.03em',
									position: 'relative',
									zIndex: 20,
									filter: 'drop-shadow(0 0 22px rgba(70,255,224,0.22)) drop-shadow(0 0 48px rgba(51,200,255,0.10))',
								}}
							>
								wait
							</em>
						</h1>

						{/* Subheadline */}
						<p
							className="animate-fade-in-up delay-200"
							style={{
								fontSize: 'clamp(15px, 1.9vw, 18px)',
								lineHeight: 1.7,
								color: 'rgba(255,255,255,0.52)',
								maxWidth: '500px',
								margin: '0 auto',
								marginBottom: '28px',
							}}
						>
							Be among the first to experience{' '}
							<span style={{ color: 'rgba(255,255,255,0.8)' }}>Nexus</span>.{' '}
							Join the waitlist and get early access.
						</p>

						{/* Email capture */}
						<div
							className="w-full animate-fade-in-up delay-300"
							style={{ marginBottom: '18px' }}
						>
							<EmailForm />
						</div>

						{/* Social proof */}
						<div
							className="animate-fade-in-up delay-400"
							style={{ marginBottom: '34px' }}
						>
							<SocialProof />
						</div>

						{/* Divider — barely there */}
						<div
							className="animate-fade-in delay-500"
							style={{
								width: '180px',
								height: '1px',
								background:
									'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
								marginBottom: '34px',
							}}
						/>

						{/* Countdown — only one on the entire page */}
						<div className="animate-fade-in-up delay-500">
							<CountdownTimer />
						</div>
					</div>
				</section>

				{/* MODE A: Product Preview — section is fully transparent */}
				{SHOW_VIDEO && <DemoSection />}

				{/* Social Share — transparent, no background */}
				<SocialShare />

				{/* ── Footer ── */}
				<footer
					className="px-6 pb-10 pt-2"
					style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
				>
					<div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
						<p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
							© 2025{' '}
							<span style={{ color: 'rgba(255,255,255,0.3)' }}>Nexus</span>
							{' · '}Made by{' '}
							<span style={{ color: 'rgba(255,255,255,0.3)' }}>Ashley Smith</span>
						</p>
						<nav className="flex items-center gap-6">
							{['Privacy', 'Terms', 'Contact'].map((link) => (
								<a
									key={link}
									href="#"
									className="footer-link"
									style={{ fontSize: '11px', transition: 'color 0.2s ease' }}
								>
									{link}
								</a>
							))}
						</nav>
					</div>
				</footer>

			</main>
		</div>
	);
}
