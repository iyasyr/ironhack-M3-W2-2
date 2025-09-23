// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SplineBackground from "../components/SplineBackground";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Home() {
  return (
    <div className="page">
      <SplineBackground />

      {/* Hero content */}
      <main className="home">
        <section className="hero container">
          <motion.p {...fadeUp} className="tagline">
            Project about my interests — explore hobbies and music.
          </motion.p>
          <motion.div {...fadeUp} className="cta-row">
            <Link className="chip" to="/hobbies">Go to Hobbies</Link>
            <Link className="chip" to="/music">Go to Music</Link>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
