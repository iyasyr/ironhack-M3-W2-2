import { useId, useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
};

type Errors = Partial<Record<keyof FormData, string>>;

const initial: FormData = { name: "", email: "", subject: "", message: "", website: "" };

export default function ContactForm() {
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");

  const idName = useId();
  const idEmail = useId();
  const idSubject = useId();
  const idMessage = useId();

  function validate(partial?: Partial<FormData>) {
    const d = { ...data, ...partial };
    const e: Errors = {};
    if (!d.name.trim() || d.name.trim().length < 2) e.name = "Please enter your name (min 2 chars).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email address.";
    if (!d.subject.trim()) e.subject = "Please add a subject.";
    if (!d.message.trim() || d.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    // honeypot: if filled, treat as error silently
    if (d.website && d.website.trim().length > 0) e.website = "spam";
    return e;
  }

  function onChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  function onBlur<K extends keyof FormData>(key: K) {
    const e = validate();
    setErrors(prev => ({ ...prev, [key]: e[key] }));
  }

async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  const v = validate();
  setErrors(v);
  if (Object.keys(v).length) return;

  setSubmitting(true);
  setStatus("idle");

  // simulate latency
  await new Promise((r) => setTimeout(r, 600));

  // local dev log
  try {
    const key = "__study_contact_submissions__";
    const all = JSON.parse(localStorage.getItem(key) || "[]");
    all.unshift({ ...data, createdAt: Date.now() });
    localStorage.setItem(key, JSON.stringify(all.slice(0, 20)));
  } catch {
    // ignore storage errors
  }

  setStatus("ok");
  setData(initial);
  setSubmitting(false);
}


  return (
    <form className="ui-form" onSubmit={onSubmit} noValidate>
      {/* honeypot (hidden field to trap bots) */}
      <div className="hp">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" autoComplete="off"
               value={data.website} onChange={e => onChange("website", e.target.value)} />
      </div>

      <div className="form-grid">
        <div className={`field ${errors.name ? "has-error" : ""}`}>
          <label htmlFor={idName}>Name</label>
          <input
            id={idName}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={data.name}
            onChange={e => onChange("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? idName + "-err" : undefined}
          />
          {errors.name && <small id={idName + "-err"} className="error">{errors.name}</small>}
        </div>

        <div className={`field ${errors.email ? "has-error" : ""}`}>
          <label htmlFor={idEmail}>Email</label>
          <input
            id={idEmail}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={e => onChange("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? idEmail + "-err" : undefined}
          />
          {errors.email && <small id={idEmail + "-err"} className="error">{errors.email}</small>}
        </div>
      </div>

      <div className={`field ${errors.subject ? "has-error" : ""}`}>
        <label htmlFor={idSubject}>Subject</label>
        <input
          id={idSubject}
          type="text"
          placeholder="What is this about?"
          value={data.subject}
          onChange={e => onChange("subject", e.target.value)}
          onBlur={() => onBlur("subject")}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? idSubject + "-err" : undefined}
        />
        {errors.subject && <small id={idSubject + "-err"} className="error">{errors.subject}</small>}
      </div>

      <div className={`field ${errors.message ? "has-error" : ""}`}>
        <label htmlFor={idMessage}>Message</label>
        <textarea
          id={idMessage}
          placeholder="Tell me a bit more..."
          rows={6}
          value={data.message}
          onChange={e => onChange("message", e.target.value)}
          onBlur={() => onBlur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? idMessage + "-err" : undefined}
        />
        {errors.message && <small id={idMessage + "-err"} className="error">{errors.message}</small>}
      </div>

      <div className="actions">
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send Message"}
        </button>
        <div className={`form-status ${status}`}>
          {status === "ok" && "Thanks! I’ll get back to you soon."}
          {status === "fail" && "Something went wrong. Please try again."}
        </div>
      </div>
    </form>
  );
}
