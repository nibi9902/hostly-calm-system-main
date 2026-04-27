import { useEffect, useRef, useState } from 'react';

/**
 * usePlaybackFrame — adapta la API de Remotion (`useCurrentFrame` + `useVideoConfig`)
 * al navegador. Retorna el frame actual d'una timeline.
 *
 * @param totalFrames  Frames totals (p.ex. 180 per 6s a 30fps)
 * @param fps          Frames per segon (30 per defecte)
 * @param playing      Si false, el frame queda congelat al 0
 * @param refToObserve Ref del contenidor pare — pausa quan no és visible
 * @param loop         Si true, repeteix en bucle infinit sense pausa
 * @param loopDelay    Ms d'espera abans de reiniciar (només quan loop=false). 0 = no reinicia.
 */
export function usePlaybackFrame(
  totalFrames: number,
  fps = 30,
  playing = true,
  refToObserve?: React.RefObject<Element>,
  loop = false,
  loopDelay = 0,
): number {
  const [frame, setFrame] = useState(0);
  const rafRef     = useRef<number>();
  const startRef   = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const doneRef    = useRef(false);

  // IntersectionObserver per pausar quan no es veu
  useEffect(() => {
    if (!refToObserve?.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.15 },
    );
    obs.observe(refToObserve.current);
    return () => obs.disconnect();
  }, [refToObserve]);

  useEffect(() => {
    if (!playing) {
      setFrame(0);
      doneRef.current = false;
      return;
    }
    doneRef.current = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const startAnimation = () => {
      startRef.current = null;

      const tick = (timestamp: number) => {
        if (startRef.current === null) startRef.current = timestamp;
        if (visibleRef.current) {
          const elapsedMs = timestamp - startRef.current;
          const raw = Math.floor((elapsedMs / 1000) * fps);
          if (loop) {
            setFrame(raw % totalFrames);
          } else {
            const clamped = Math.min(raw, totalFrames - 1);
            setFrame(clamped);
            if (clamped >= totalFrames - 1 && !doneRef.current) {
              doneRef.current = true;
              if (loopDelay > 0) {
                timeoutId = setTimeout(() => {
                  doneRef.current = false;
                  startAnimation();
                }, loopDelay);
              }
              return; // para el RAF
            }
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    startAnimation();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutId) clearTimeout(timeoutId);
      startRef.current = null;
    };
  }, [totalFrames, fps, playing, loop, loopDelay]);

  return frame;
}

/**
 * Spring value (aproxima `spring()` de Remotion amb damping i stiffness).
 * Retorna un valor entre 0 i 1 que creix amb inèrcia.
 */
export function spring(
  frame: number,
  fps: number,
  config: { damping?: number; stiffness?: number; mass?: number } = {},
): number {
  if (frame <= 0) return 0;
  const { damping = 18, stiffness = 180, mass = 1 } = config;
  const t = frame / fps;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t));
  }
  return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
}
