import SongList from "../components/SongList";
import songs from "../data/songs.json";

export default function MusicPage() {
  return (
    <main className="container">
      <h1 className="pageHeader">Music</h1>
      <SongList songs={songs} />
    </main>
  );
}
