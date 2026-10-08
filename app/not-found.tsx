import Link from "next/link";
import { Pip } from "@/components/pip/Pip";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="boundary">
      <div className="wrap boundary-inner">
        <Pip size={120} mood="curious" look={{ x: -0.6, y: -0.4 }} />
        <h1 className="headline boundary-title">
          This page isn&apos;t on the <em>menu.</em>
        </h1>
        <p className="boundary-lead">
          The link may be old, or the page may have moved. Here are the places people usually mean to go.
        </p>
        <div className="boundary-actions">
          <ButtonLink href="/discover">Find tonight&apos;s meal</ButtonLink>
          <ButtonLink href="/shop" variant="secondary">
            Visit the shop
          </ButtonLink>
        </div>
        <p className="boundary-small">
          Expected something here? <Link href="/contact?topic=other">Tell us</Link> and we&apos;ll fix it.
        </p>
      </div>
    </div>
  );
}
