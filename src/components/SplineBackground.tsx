// src/components/SplineBackground.tsx
import { lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineBackground() {
  return (
    // <div className="bg-root" aria-hidden>
    //   <Suspense fallback={null}>
    //     <Spline scene="https://prod.spline.design/5UZP2WsrSpLGLkQ8/scene.splinecode" />
    //   </Suspense>
      
    //   <div className="bg-overlay" />
    // </div>

  <div className="bg-root bg-hit">
      <Spline scene="https://prod.spline.design/5UZP2WsrSpLGLkQ8/scene.splinecode" />
    <div className="bg-overlay" />
  </div>
  );
}
