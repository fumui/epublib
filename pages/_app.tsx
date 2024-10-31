// pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext'; // Adjust the import path as necessary

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;