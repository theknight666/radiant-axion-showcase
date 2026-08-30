import React from "react";

const BEBAS = "'Bebas Neue', 'Arial Narrow', sans-serif";
const INTER = "'Inter', system-ui, -apple-system, sans-serif";
const ORANGE = "#F26522";
const DARK = "#0d0d0d";
const DARK_ON_DARK = "rgba(255,255,255,0.95)";

interface AxionisLogoIconProps {
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Compact square icon — just the "A" lettermark with orange accent bar.
 * Used in favicon-like contexts.
 */
export function AxionisLogoIcon({
  className = "w-8 h-8",
  variant = "light",
}: AxionisLogoIconProps) {
  const ink = variant === "dark" ? DARK_ON_DARK : DARK;
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text
        x="16"
        y="26"
        textAnchor="middle"
        fontFamily={BEBAS}
        fontSize="28"
        fill={ink}
        letterSpacing="1"
      >
        A
      </text>
      <rect x="5" y="28" width="22" height="2.5" rx="1.25" fill={ORANGE} />
    </svg>
  );
}

interface AxionisLogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Axionis wordmark.
 *
 * Bebas Neue — a premium condensed display typeface used by major agencies,
 * broadcast brands, and fashion houses. Authoritative, distinctive, instantly
 * recognisable at any size.
 *
 * Design treatment:
 *  - "AXIONIS" in Bebas Neue, very tight natural spacing
 *  - A thin orange rule beneath the wordmark (1.5px) — the brand underline
 *  - "GROWTH AGENCY" in Inter 300, wide tracking, orange — sophisticated contrast
 *    between the bold display and the hairline sub-brand text
 */
export function AxionisLogo({
  variant = "light",
  showTagline = true,
  size = "md",
  className = "",
}: AxionisLogoProps) {
  const isDark = variant === "dark";
  const ink = isDark ? DARK_ON_DARK : DARK;

  const wordmarkSizes = { sm: 22, md: 30, lg: 56 };
  const taglineSizes = { sm: 7, md: 8, lg: 10 };
  const ruleSizes = { sm: 1, md: 1.5, lg: 2 };
  const ruleGaps = { sm: 3, md: 4, lg: 6 };

  const wSize = wordmarkSizes[size];
  const tSize = taglineSizes[size];
  const rSize = ruleSizes[size];
  const rGap = ruleGaps[size];

  return (
    <div className={`inline-flex flex-col ${className}`}>
      {/* ── Main wordmark ── */}
      <span
        style={{
          fontFamily: BEBAS,
          fontSize: wSize,
          fontWeight: 400, // Bebas Neue is inherently bold
          letterSpacing: "0.06em", // very slight open tracking — airiness
          color: ink,
          lineHeight: 1,
          display: "block",
        }}
      >
        AXIONIS
      </span>

      {/* ── Orange brand rule ── */}
      <div
        style={{
          marginTop: rGap,
          height: rSize,
          width: "100%",
          background: ORANGE,
          borderRadius: 99,
        }}
      />

      {/* ── Tagline ── */}
      {showTagline && (
        <span
          style={{
            marginTop: rGap + 1,
            fontFamily: INTER,
            fontSize: tSize,
            fontWeight: 300,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.42)",
            lineHeight: 1,
            display: "block",
          }}
        >
          Growth Agency
        </span>
      )}
    </div>
  );
}
