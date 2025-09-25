import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Hobby } from "../utils/types";

type Props = { items?: Hobby[] };

function hueFromString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

export default function Hobbies({ items = [] }: Props) {
  if (!items.length) return <p>No hobbies yet.</p>;

  return (
    <>
      {/* container fades in on mount */}
      <motion.div
        className="hobby-grid"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {items.map((h, i) => {
          const hue = hueFromString(h.title);
          const c1 = `hsl(${hue} 85% 60%)`;
          const c2 = `hsl(${(hue + 40) % 360} 85% 55%)`;
          const style = { "--c1": c1, "--c2": c2 } as CSSProperties;

          return (
            <motion.article
              key={h.title}                       // stable key
              className="hobby-card"
              style={style}
              initial={{ opacity: 0, y: 10 }}     // each card animates on first render
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Image or gradient fallback */}
              {h.imageUrl ? (
                <img className="hobby-img" src={h.imageUrl} alt={h.title} />
              ) : (
                <div className="hobby-fallback" aria-hidden />
              )}

              <div className="hobby-shade" />

              <div className="hobby-body">
                <h4 className="hobby-title">{h.title}</h4>
                {h.description && <p className="hobby-desc">{h.description}</p>}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </>
  );
}
