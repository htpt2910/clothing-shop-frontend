import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-pink-50">
      <Component {...pageProps} />
    </div>
  );
}
