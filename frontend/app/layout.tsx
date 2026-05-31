import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PixelLoader } from "@/components/pixel-loader";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "كوبوكس | Kuboqss",
  description: "متجر ليبي premium لمنتجات الجمال والعناية مع الدفع عند الاستلام.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kuboqss.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arabic.variable}>
      <body className="font-arabic antialiased">
        <PixelLoader />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </body>
    </html>
  );
}
