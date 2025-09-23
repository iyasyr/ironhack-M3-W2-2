import "./index.css";
import { motion } from "framer-motion";
import SongList from "./components/SongList";
import Hobbies from "./components/HobbiesList";
import songs from "./data/songs.json";

const profileUrl = "/profile.JPG";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
const stagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
};

export default function App() {
  const firstName = "Ilia";
  const lastName = "Iasyr";
  const hobbies = ["Coding", "Travelling", "Hiking", "Gaming", "Paddle Tennis"];

  return (
    <main className="container">
      {/* HERO */}
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.65 } }}
      >
        <motion.div
          className="avatar-wrap"
          whileHover={{ rotate: 2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        >
          <img className="avatar" src={profileUrl} alt="Profile" />
        </motion.div>

        <div>
          <motion.h1 {...fadeUp}>{firstName}</motion.h1>
          <motion.h2 {...fadeUp}>{lastName}</motion.h2>
          <motion.p {...fadeUp}>
            Check out{" "}
            <a href="https://www.linkedin.com/in/ilia-yasyr-8a0b3b322/" target="_blank" rel="noreferrer">
              my LinkedIn
            </a>{" "}
          </motion.p>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <motion.section className="section grid grid-2" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className="card" variants={fadeUp}>
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>My Hobbies</h3>
          <Hobbies items={hobbies} />
        </motion.div>

        <motion.div className="card" variants={fadeUp}>
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>About Me</h3>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            I build things, learn fast, and like good teamwork. Looking for my next opportunity.
            This small landing demonstrates lists, images, links, JSON data and reusable components.
          </p>
        </motion.div>
      </motion.section>

      <motion.section className="section card" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.25 }}>
        <h3 style={{ marginTop: 0 }}>Favorite Songs <span className="badge">{songs.length}</span></h3>
        <SongList songs={songs} />
      </motion.section>

      <p className="footer-note">Built with React + TypeScript + Vite · Animated with Framer Motion</p>
    </main>
  );
}
