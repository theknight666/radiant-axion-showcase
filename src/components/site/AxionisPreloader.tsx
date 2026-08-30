import React, { useEffect, useRef, useState } from "react";
import { AxionisLogo } from "./AxionisLogo";

interface AxionisPreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export function AxionisPreloader({ onComplete, minDurationMs = 2800 }: AxionisPreloaderProps) {
  const [progress, setProgress]     = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [mounted, setMounted]        = useState(false);
  const [exiting, setExiting]        = useState(false);
  const startRef = useRef(performance.now());

  const STATUS = [
    "Initializing",
    "Calibrating growth engines",
    "Synchronizing systems",
    "Welcome to Axionis",
  ];

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = performance.now() - startRef.current;
      const raw     = Math.min(1, elapsed / minDurationMs);
      const eased   = 1 - Math.pow(1 - raw, 3);
      const pct     = Math.round(eased * 100);
      setProgress(pct);
      setStatusIndex(pct < 30 ? 0 : pct < 65 ? 1 : pct < 95 ? 2 : 3);
      if (elapsed >= minDurationMs) {
        clearInterval(id);
        setProgress(100);
        setStatusIndex(3);
        setTimeout(() => { setExiting(true); setTimeout(() => onComplete?.(), 800); }, 380);
      }
    }, 16);
    return () => clearInterval(id);
  }, [minDurationMs, onComplete]);

  const skip = () => { setExiting(true); setTimeout(() => onComplete?.(), 600); };

  // SVG noise filter for glass surface grain
  const noiseSvg = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='1'/></svg>`;

  return (
    <>
      <style>{`
        @keyframes axFadeUp {
          from { opacity:0; transform:translateY(5px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes axContentIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes axGrainShift {
          0%  { transform: translate(0,0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(1px,-2px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(2px,-1px); }
          100%{ transform: translate(0,0); }
        }
        @keyframes axCausticPulse {
          0%,100% { opacity:0.18; transform:scaleX(1); }
          50%     { opacity:0.32; transform:scaleX(1.04); }
        }
        @keyframes axCornerGlow {
          0%,100% { opacity:0.55; }
          50%     { opacity:0.85; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════
          ROOT — full-screen glass with entrance/exit
          ═══════════════════════════════════════════════ */}
      <div
        onClick={skip}
        style={{
          position:"fixed", inset:0, zIndex:99999,
          cursor:"default", userSelect:"none", overflow:"hidden",

          /* ── Core glass: site bleeds through ── */
          background: "rgba(240,240,240,0.18)",
          backdropFilter: "blur(26px) saturate(190%) brightness(1.03)",
          WebkitBackdropFilter: "blur(26px) saturate(190%) brightness(1.03)",

          transition:"opacity 0.75s cubic-bezier(0.22,1,0.36,1)",
          opacity: !mounted || exiting ? 0 : 1,
          pointerEvents: exiting ? "none" : "auto",

          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
        }}
      >

        {/* ─────────────────────────────────────────────
            GLASS PHYSICS LIGHTING LAYERS (back→front)
            ───────────────────────────────────────────── */}

        {/* 1. SURFACE GRAIN — fine noise texture on glass */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", inset:"-50%",
            backgroundImage:`url("${noiseSvg}")`,
            backgroundRepeat:"repeat",
            opacity: 0.028,
            mixBlendMode:"overlay",
            animation:"axGrainShift 0.12s steps(1) infinite",
            pointerEvents:"none",
          }}
        />

        {/* 2. BOTTOM SHADOW — glass absorbs light at bottom edge, casts shadow down */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", bottom:0, left:0, right:0,
            height:"28%",
            background:"linear-gradient(to top, rgba(0,0,0,0.09) 0%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 3. LEFT EDGE shadow — light comes from top-right, left is slightly darker */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, bottom:0, left:0,
            width:"12%",
            background:"linear-gradient(to right, rgba(0,0,0,0.055) 0%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 4. RIGHT EDGE warm glow — ambient occlusion from the right */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, bottom:0, right:0,
            width:"10%",
            background:"linear-gradient(to left, rgba(255,255,255,0.06) 0%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 5. MAIN TOP SPECULAR — primary light source hits top face of glass at angle */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, left:0, right:0,
            height:"38%",
            background:"linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 6. TOP HAIRLINE SPECULAR — the sharpest reflection on the very top rim */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, left:0, right:0,
            height:"1.5px",
            background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 8%, rgba(255,255,255,0.82) 25%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.82) 75%, rgba(255,255,255,0.0) 92%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 7. BOTTOM HAIRLINE EDGE — glass rim at bottom, slightly brighter than shadow */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", bottom:0, left:0, right:0,
            height:"1px",
            background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.25) 80%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 8. LEFT HAIRLINE — glass left edge rim */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, bottom:0, left:0,
            width:"1px",
            background:"linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0.0) 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 9. RIGHT HAIRLINE — glass right edge rim */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, bottom:0, right:0,
            width:"1px",
            background:"linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.0) 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 10. TOP-LEFT CORNER SPARKLE — concentrated specular at corner where two planes meet */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:-60, left:-60,
            width:180, height:180,
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)",
            animation:"axCornerGlow 3.5s ease-in-out infinite",
            pointerEvents:"none",
          }}
        />

        {/* 11. TOP-RIGHT SECONDARY CORNER — subtler, second light bounce */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:-40, right:-40,
            width:140, height:140,
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)",
            animation:"axCornerGlow 4.2s ease-in-out infinite 0.8s",
            pointerEvents:"none",
          }}
        />

        {/* 12. CHROMATIC FRINGE — top edge: very subtle blue shift (glass refracts blue upward) */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:0, left:"5%", right:"5%",
            height:"2px",
            background:"linear-gradient(90deg, transparent 0%, rgba(100,160,255,0.18) 30%, rgba(100,160,255,0.22) 50%, rgba(100,160,255,0.18) 70%, transparent 100%)",
            pointerEvents:"none",
          }}
        />

        {/* 13. CAUSTIC LIGHT BAND — the wavering bright band glass projects on surfaces behind it */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", top:"18%", left:0, right:0,
            height:"1px",
            background:"linear-gradient(90deg, transparent 0%, transparent 15%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.22) 70%, transparent 85%, transparent 100%)",
            animation:"axCausticPulse 5s ease-in-out infinite",
            pointerEvents:"none",
          }}
        />

        {/* 14. INNER VIGNETTE — slight darkening toward center bottom suggesting glass depth */}
        <div
          aria-hidden="true"
          style={{
            position:"absolute", inset:0,
            background:"radial-gradient(ellipse 80% 70% at 50% 0%, transparent 50%, rgba(0,0,0,0.04) 100%)",
            pointerEvents:"none",
          }}
        />


        {/* ─────────────────────────────────────────────
            FLOATING CONTENT — no box, no card
            ───────────────────────────────────────────── */}
        <div
          style={{
            position:"relative", zIndex:1,
            display:"flex", flexDirection:"column", alignItems:"center",
            animation: mounted && !exiting ? "axContentIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
            opacity: mounted ? undefined : 0,
          }}
        >
          {/* Bespoke SVG Wordmark Logo */}
          <AxionisLogo variant="light" size="lg" showTagline={true} />

          {/* Progress section */}
          <div style={{marginTop:52, width:210, display:"flex", flexDirection:"column", alignItems:"center"}}>
            {/* Track */}
            <div style={{width:"100%", height:"2px", borderRadius:99, background:"rgba(0,0,0,0.09)", overflow:"hidden", boxShadow:"inset 0 1px 2px rgba(0,0,0,0.08)"}}>
              <div
                style={{
                  height:"100%", width:`${progress}%`, borderRadius:99,
                  background:"linear-gradient(90deg, #F26522 0%, #FF9A4D 100%)",
                  transition:"width 0.2s cubic-bezier(0.25,0.1,0.25,1)",
                  boxShadow:"0 0 8px rgba(242,101,34,0.5)",
                }}
              />
            </div>

            {/* Status + counter */}
            <div style={{marginTop:13, width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <p
                key={statusIndex}
                style={{margin:0, fontFamily:"system-ui,-apple-system,'Segoe UI',sans-serif", fontSize:11.5, fontWeight:500, color:"rgba(0,0,0,0.4)", animation:"axFadeUp 0.3s ease forwards"}}
              >
                {STATUS[statusIndex]}
              </p>
              <p style={{margin:0, fontFamily:"'SF Mono','Fira Code','Consolas',monospace", fontSize:11.5, fontWeight:500, color:"rgba(0,0,0,0.48)", letterSpacing:"0.03em"}}>
                {progress}%
              </p>
            </div>
          </div>
        </div>

        {/* Skip hint */}
        <p style={{position:"absolute", bottom:30, margin:0, fontFamily:"system-ui,-apple-system,'Segoe UI',sans-serif", fontSize:10.5, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(0,0,0,0.2)"}}>
          Click anywhere to skip
        </p>

      </div>
    </>
  );
}
