import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

const monaSans = localFont({
  src: [
    {
      path: '../../public/fonts/MonaSans-Medium.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/MonaSans-SemiBold.ttf',
      weight: '600'
    }
  ],
  variable: '--font-mona-sans'
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} font-sans bg-gradient-to-r from-blue-800 to-pink-500 text-white`}>{children}</body>
    </html>
  );
}
