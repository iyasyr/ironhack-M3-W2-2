import { motion } from "framer-motion";

type Props = { items?: string[] };

const itemVar = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } }
};

export default function Hobbies({ items = [] }: Props) {
  if (!items.length) return <p>No hobbies yet.</p>;
  return (
    <motion.div className="chips" initial="initial" animate="animate">
      {items.map((h, i) => (
        <motion.span className="chip" key={i} variants={itemVar} whileHover={{ y: -2 }}>
          {h}
        </motion.span>
      ))}
    </motion.div>
  );
}
