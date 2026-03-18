import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'SparkAgents - No-Code AI Agent Platform',
  description: 'Build, test, and deploy AI agent workforces without writing code.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[240px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
