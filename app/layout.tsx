import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NÓMADAS | Agencia de Diseño y Marketing Digital en Puyo, Pastaza',
  description: 'Estrategias, Creatividad y Resultados. Agencia de diseño y marketing digital en Puyo, Ecuador. Branding estratégico, landing pages de alta conversión y pauta publicitaria medible.',
  keywords: [
    'marketing digital Puyo',
    'agencia de diseño Puyo',
    'marketing digital Pastaza',
    'creacion de paginas web Puyo',
    'branding Ecuador',
    'pauta digital Meta Ads Ecuador',
    'Nomadas agencia'
  ],
  authors: [{ name: 'Nómadas Agencia' }],
  openGraph: {
    title: 'NÓMADAS | Estrategias • Creatividad • Resultados',
    description: 'Transformamos negocios en marcas de alto impacto con diseño estratégico y marketing digital enfocado en ventas.',
    url: 'https://nomadas-agencia.vercel.app',
    siteName: 'Nómadas Agencia de Diseño y Marketing Digital',
    locale: 'es_EC',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-[#E25822] selection:text-white">
        {children}
      </body>
    </html>
  );
}
