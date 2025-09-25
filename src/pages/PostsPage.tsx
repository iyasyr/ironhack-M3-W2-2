import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ServerPost = { userId: number; id: number; title: string; body: string };
type Post = ServerPost & { cid: string }; // client-only

const API = "https://jsonplaceholder.typicode.com/posts";

function generateCid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `cid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}


const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
} as const;


export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // validation errors
  const [createError, setCreateError] = useState<string>("");
  const [editError, setEditError] = useState<string>("");


  // create form
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");

  // inline edit
  const [editingCid, setEditingCid] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editBody, setEditBody] = useState<string>("");

  // READ on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}?_limit=12`);
        if (!res.ok) throw new Error("Failed to load posts");
        const data: ServerPost[] = await res.json();
        setPosts(data.map(p => ({ ...p, cid: String(p.id) })));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // CREATE
  async function handleCreate() {
    const title = newTitle.trim();
    const body = newBody.trim();

    // validation
    if (!title || !body) {
      setCreateError("Please complete both title and body.");
      return;
    }
    if (title.length < 3) {
      setCreateError("Title must be at least 3 characters.");
      return;
    }
    if (body.length < 10) {
      setCreateError("Body must be at least 10 characters.");
      return;
    }

    setCreateError("");

    const cid = generateCid();
    const optimistic: Post = { cid, userId: 1, id: -1, title, body };

    setPosts(p => [optimistic, ...p]);
    setNewTitle("");
    setNewBody("");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: optimistic.userId })
      });
      if (!res.ok) throw new Error("Could not create the post.");
      const server: ServerPost = await res.json();
      setPosts(p => p.map(x => (x.cid === cid ? { ...x, ...server } : x)));
    } catch {
      setPosts(p => p.filter(x => x.cid !== cid)); // rollback
      setCreateError("Could not create the post.");
    }
  }


  function startEdit(p: Post) {
    setEditingCid(p.cid);
    setEditTitle(p.title);
    setEditBody(p.body);
    setEditError("");
  }
  function cancelEdit() {
    setEditingCid(null);
    setEditTitle("");
    setEditBody("");
    setEditError("");
  }


  // UPDATE
  async function handleUpdate(cid: string) {
    const current = posts.find(x => x.cid === cid);
    if (!current) return;

    const title = editTitle.trim();
    const body = editBody.trim();

    // validation
    if (!title || !body) {
      setEditError("Please complete both title and body.");
      return;
    }
    if (title.length < 3) {
      setEditError("Title must be at least 3 characters.");
      return;
    }
    if (body.length < 10) {
      setEditError("Body must be at least 10 characters.");
      return;
    }
    // avoid no-op updates
    if (title === current.title.trim() && body === current.body.trim()) {
      setEditError("No changes to save.");
      return;
    }

    setEditError("");

    const original: Post = { ...current };
    const next: Post = { ...current, title, body };

    // optimistic UI
    setPosts(p => p.map(x => (x.cid === cid ? next : x)));
    setEditingCid(null);

    try {
      const res = await fetch(`${API}/${current.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: next.userId,
          id: current.id,
          title: next.title,
          body: next.body
        })
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setPosts(p => p.map(x => (x.cid === cid ? original : x))); // rollback
      // feedback inline
      setEditError("Could not update the post.");
      setEditingCid(cid);              // re-open the editor so the user can fix it
      setEditTitle(title);
      setEditBody(body);
    }
  }


  // DELETE (with confirm)
  async function handleDelete(cid: string) {
    const ok = window.confirm("Are you sure you want to delete this post?");
    if (!ok) return;

    const current = posts.find(x => x.cid === cid);
    if (!current) return;

    const prev = posts;
    setPosts(p => p.filter(x => x.cid !== cid));

    try {
      const res = await fetch(`${API}/${current.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setPosts(prev); // rollback
      alert("Delete failed");
    }
  }

  if (loading) return <main className="container"><div className="card">Loading…</div></main>;
  if (error) return <main className="container"><div className="card">Error: {error}</div></main>;


  return (
    <main className="container">
      {/* Create panel */}
      <motion.section
        key="create"
        className="card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        <h1 className="pageHeader">Posts</h1>
        <div className="post-create">
          <input
            className="post-input"
            placeholder="Title"
            value={newTitle}
            onChange={e => { setNewTitle(e.target.value); if (createError) setCreateError(""); }}
          />
          <textarea
            className="post-input"
            placeholder="Body"
            rows={3}
            value={newBody}
            onChange={e => { setNewBody(e.target.value); if (createError) setCreateError(""); }}
          />
          {createError && <p className="form-error" role="alert">{createError}</p>}
          <button className="btn" onClick={handleCreate}>crear</button>
        </div>
      </motion.section>

      {/* List */}
      <motion.section
        key="list"
        className="card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          className="posts-grid"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {posts.map(p => (
            <motion.article
              key={p.cid}
              className="card post-card"
              variants={itemVariants}
              layout
            >
              {editingCid === p.cid ? (
                <>
                  <input
                    className="post-input"
                    value={editTitle}
                    onChange={e => { setEditTitle(e.target.value); if (editError) setEditError(""); }}
                  />
                  <textarea
                    className="post-input"
                    rows={4}
                    value={editBody}
                    onChange={e => { setEditBody(e.target.value); if (editError) setEditError(""); }}
                  />
                  {editError && <p className="form-error" role="alert">{editError}</p>}
                  <div className="post-actions">
                    <button className="btn" onClick={() => handleUpdate(p.cid)}>update</button>
                    <button className="btn btn-ghost" onClick={cancelEdit}>cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="post-title">{p.title}</h3>
                  <p className="post-body">{p.body}</p>
                  <div className="post-actions">
                    <button className="chip" onClick={() => startEdit(p)}>editar</button>
                    <button className="chip chip-danger" onClick={() => handleDelete(p.cid)}>borrar</button>
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

    </main>
  );
}
