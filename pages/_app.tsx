import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Amplifyの設定（SSR対応）
Amplify.configure(outputs, { ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}