// src/components/Hobbies.tsx
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Hobby } from "../utils/types";

type Props = { items?: Hobby[] };

const gridVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};
// const cardVar = {
//   hidden: { opacity: 0, y: 12, scale: 0.98 },
//   show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.4, ease: [0.22,1,0.36,1] } }
// };

function hueFromString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

export default function Hobbies({ items = [] }: Props) {
  if (!items.length) return <p>No hobbies yet.</p>;

  return (
    <motion.div className="hobby-grid" variants={gridVar} initial="hidden" animate="show">
      {items.map((h, i) => {
        const hue = hueFromString(h.title);
        const c1 = `hsl(${hue} 85% 60%)`;
        const c2 = `hsl(${(hue + 40) % 360} 85% 55%)`;
        const style = { "--c1": c1, "--c2": c2 } as CSSProperties;

        return (
          <motion.article
            key={i}
            className="hobby-card"
            // variants={cardVar}
            whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
            whileTap={{ scale: 0.99 }}
            style={style}
          >
            {/* Image (or gradient fallback) */}
            {h.imageUrl ? (
              <img className="hobby-img" src={h.imageUrl} alt={h.title} />
            ) : (
              <div className="hobby-fallback" aria-hidden />
            )}

            {/* Overlay for readability */}
            <div className="hobby-shade" />

            {/* Content */}
            <div className="hobby-body">
              <h4 className="hobby-title">{h.title}</h4>
              {h.description && <p className="hobby-desc">{h.description}</p>}
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
