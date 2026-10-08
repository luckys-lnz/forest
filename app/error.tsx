"use client";

import { useEffect } from "react";
import { Pip } from "@/components/pip/Pip";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="boundary">
      <div className="wrap boundary-inner">
        <Pip size={120} mood="surprised" />
        <h1 className="headline boundary-title">
          Something went <em>wrong</em> on our side.
        </h1>
        <p className="boundary-lead">
          This page didn&apos;t load properly. Try again, and if it keeps happening, let us know what you were doing.
        </p>
        <div className="boundary-actions">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Go home
          </ButtonLink>
        </div>
        {error.digest && <p className="boundary-small">Reference: {error.digest}</p>}
      </div>
    </div>
  );
}
