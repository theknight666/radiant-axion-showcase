# Axionis Growth Agency — Development & Architecture Guidelines

## Overview
Axionis Growth Agency is a high-performance web showcase featuring:
- Apple-grade full-viewport liquid glass preloader with dynamic shader and blur physics.
- 3D super-curved floating design system (`rounded-[36px]`, multi-layered ambient shadows, specular rim highlights).
- Complete interactive route architecture (`/projects`, `/agency`, `/services`, `/journal`, `/connect`, `/careers`, `/press`, `/privacy`, `/terms`).
- Full interactive modals for strategy booking, case study deep-dives, and job applications.
- India Flagship studios in Bengaluru & Mumbai with live IST clocks.

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite + TanStack Router (`@tanstack/react-router`)
- **SSR & Deployment:** Nitro + Cloudflare preset (`@tanstack/react-start`)
- **Styling:** Tailwind CSS v4 + custom 3D floating & liquid-glass utility classes
- **Icons & UI:** `lucide-react`, `sonner` for toast notifications
- **Typography:** Bebas Neue display wordmarks + Inter typography

## Code Quality Standards
- Preserve the 3D rounded squircle aesthetics (`rounded-[32px]`, `rounded-[36px]`, `rounded-full`).
- Maintain zero sharp or squared corners across all routes and components.
- Ensure all interactive links and buttons route properly with active state feedback.
