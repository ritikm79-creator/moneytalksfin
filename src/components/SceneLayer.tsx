import { lazy, Suspense, useEffect, useState } from "react";
import { Poster } from "./Poster";
import type { Tier } from "@/scene/Experience";

const Experience = lazy(() => import("@/scene/Experience"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
function pickTier(): Tier {
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (window.innerWidth < 768 || mem <= 2 || cores <= 4) return "low";
  if (mem <= 4 || cores <= 6) return "medium";
  return "high";
}

export function SceneLayer({ paused }: { paused: boolean }) {
  const [mode, setMode] = useState<"poster" | "3d">("poster");
  const [tier, setTier] = useState<Tier>("low");
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    if (hasWebGL() && !rm) {
      setTier(pickTier());
      setMode("3d");
    }
    const v = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", v);
    return () => document.removeEventListener("visibilitychange", v);
  }, []);
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Poster />
      {mode === "3d" && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          data-scene-ready={ready || undefined}
        >
          <Suspense fallback={null}>
            <Experience
              tier={tier}
              paused={paused || hidden}
              reduced={reduced}
              onReady={() => setReady(true)}
            />
          </Suspense>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-scrim-left" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night/90 to-transparent md:hidden" />
    </div>
  );
}
