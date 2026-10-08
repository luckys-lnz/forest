import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { NextStops } from "@/components/layout/next/NextStops";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <div className={`on-light surface ${styles.page}`}>
        <div className="wrap">
          <h1 className={`headline ${styles.title}`}>
            Your <em>cart</em>
          </h1>
          <CartView />
        </div>
      </div>
      <NextStops from="cart" />
    </>
  );
}
