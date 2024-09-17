import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat app",
  description: "Basic chat app developed by Chris Hass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
