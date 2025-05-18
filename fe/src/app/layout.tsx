import type { Metadata } from "next";
import "./assets/globals.css";
import { StyledComponentsRegistry } from "@/lib/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "Transactions",
  description: "App for transactions review",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
