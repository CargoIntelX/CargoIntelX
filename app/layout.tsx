import "./globals.css";

import { AuthProvider } from "@/providers/AuthProvider";

export const metadata = {
  title: "CargoIntelX",

  description:
    "Operational intelligence platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}