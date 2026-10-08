import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { NextStops } from "@/components/layout/next/NextStops";
import styles from "../cart/page.module.css";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <div className={`on-light surface ${styles.page}`}>
        <div className="wrap">
          <h1 className={`headline ${styles.title}`}>Checkout</h1>
          <CheckoutView />
        </div>
      </div>
      <NextStops from="checkout" />
    </>
  );
}
