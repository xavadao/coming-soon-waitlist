import type { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<div className="min-h-screen bg-background text-foreground">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
