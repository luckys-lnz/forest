"use client";

import { useMemo, useState } from "react";
import { rankMatches } from "@/lib/discover";
import { useInView } from "@/lib/hooks/motion";
import { Exchange } from "./Exchange";
import { ScenarioList } from "./ScenarioList";
import { SCENARIOS } from "./scenarios";
import { useExchange } from "./useExchange";
import styles from "./ForTwo.module.css";

/** Pick a situation, watch it play out, see what Pip would suggest. Answers come from the real engine. */
export function ForTwo() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const scenario = SCENARIOS[active];
  const match = useMemo(() => rankMatches(scenario.a, scenario.b)[0], [scenario]);
  const beat = useExchange(scenario.id, inView);
  return (
    <div ref={ref} className={styles.wrap}>
      <ScenarioList scenarios={SCENARIOS} active={active} onSelect={setActive} />
      <Exchange scenario={scenario} match={match} beat={beat} />
    </div>
  );
}
