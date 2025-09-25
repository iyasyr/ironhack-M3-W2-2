import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="container">
      <section className="card form-card">
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>Contact</h1>
        <p className="muted">Got a question or want to say hi? Send me a message.</p>
        <ContactForm />
      </section>
    </main>
  );
}
