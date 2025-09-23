import { motion } from "framer-motion";
import type { Song } from "../utils/types";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Props = { songs?: Song[] };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

export default function SongList({ songs = [] }: Props) {
  if (!songs.length) return <p>No songs found.</p>;
  return (
    <motion.div className="songs" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {songs.map((song, idx) => (
        <motion.article
          className="song"
          key={idx}
          variants={item}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img className="album-art" src={song.albumImage} alt={`${song.title} cover`} />
          <div className="song-meta">
            <h4 className="title">{song.title}</h4>
            <p className="album"><strong>Album:</strong> {song.album}</p>
            <p className="duration"><strong>Duration:</strong> {formatDuration(song.duration)}</p>
            <p className="rating"><strong>Rating:</strong> {song.rating}/5</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
