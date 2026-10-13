export function SocialProof() {
	// Subtle avatar initials — muted, secondary to headline
	const avatars = [
		{ bg: 'rgba(47,230,201,0.08)',  initials: 'AK', color: 'rgba(47,230,201,0.65)' },
		{ bg: 'rgba(31,182,255,0.08)',  initials: 'MR', color: 'rgba(31,182,255,0.65)' },
		{ bg: 'rgba(255,255,255,0.06)', initials: 'JL', color: 'rgba(255,255,255,0.4)' },
		{ bg: 'rgba(47,230,201,0.06)',  initials: 'SP', color: 'rgba(47,230,201,0.55)' },
		{ bg: 'rgba(31,182,255,0.07)',  initials: 'TN', color: 'rgba(31,182,255,0.6)' },
	];

	return (
		<div className="flex flex-wrap items-center gap-3 justify-center">
			{/* Avatar stack */}
			<div className="flex items-center">
				{avatars.map((a, i) => (
					<div
						key={i}
						className="flex items-center justify-center font-semibold flex-shrink-0"
						style={{
							background: a.bg,
							border: '1.5px solid rgba(255,255,255,0.06)',
							width: '26px',
							height: '26px',
							borderRadius: '50%',
							marginLeft: i === 0 ? 0 : '-8px',
							color: a.color,
							fontSize: '7.5px',
							letterSpacing: '0.03em',
						}}
					>
						{a.initials}
					</div>
				))}
			</div>
			{/* Copy — secondary weight */}
			<p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.34)', margin: 0 }}>
				Join{' '}
				<span style={{ color: 'rgba(255,255,255,0.58)', fontWeight: 500 }}>
					12,500+
				</span>{' '}
				others on the waitlist
			</p>
		</div>
	);
}
