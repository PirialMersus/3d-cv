import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Background3D from '@/components/Background3D';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Супер-Йог ИИ-Интеграции | Портфолио Вознесенного',
    description: 'Астральный фуллстек-шаман и Гуру LLM-архитектуры 20-го уровня, познавший дзен нейросетей.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-background text-white antialiased`}>
                <Background3D />
                <main className="relative z-10 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
