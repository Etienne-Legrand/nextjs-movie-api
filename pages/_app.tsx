import type { AppProps } from "next/app";
import "./globals.css";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return <Component key={router.asPath} {...pageProps} />;
}
