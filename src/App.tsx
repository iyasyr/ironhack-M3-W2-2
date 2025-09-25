import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import HobbiesPage from "./pages/Hobbies";
import MusicPage from "./pages/Music";
import ContactPage from "./pages/Contact";
import PostsPage from "./pages/PostsPage";

function Layout() {
  return (
    <>
      {/*  top nav */}
      <header className="site-nav">
        <div className="container nav-row">
          <Link to="/" style={{textDecoration: 'none'}}><span className="brand">Ilia Iasyr</span></Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/hobbies">Hobbies</Link>
            <Link to="/music">Music</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/posts">Posts API</Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="hobbies" element={<HobbiesPage />} />
        <Route path="music" element={<MusicPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="*" element={<div className="container not-found">404 Not Found</div>} />

      </Route>
    </Routes>
  );
}
