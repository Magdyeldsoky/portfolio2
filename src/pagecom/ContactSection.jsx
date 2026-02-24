"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import Antigravity from "@/components/Antigravity";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-background overflow-hidden border-t border-border"
    >
      {/* Antigravity Layer */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${submitted ? "z-50 opacity-100" : "z-0 opacity-40"}`}
      >
        <Antigravity
          mode={focused}
          isTyping={form.name.length + form.email.length}
          isSuccess={submitted}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <h3 className="text-6xl md:text-8xl font-black text-foreground italic uppercase leading-[0.85] tracking-tighter mb-8">
              Let's <br /> <span className="text-primary">Connect.</span>
            </h3>
          </div>

          <motion.div className="lg:col-span-7">
            <div className="bg-card/30 backdrop-blur-xl border border-border p-10 md:p-14 rounded-[3rem] shadow-2xl">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border py-4 text-foreground focus:outline-none text-xl"
                  />
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border py-4 text-foreground focus:outline-none text-xl"
                  />
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    onChange={handleChange}
                    rows="3"
                    required
                    className="w-full bg-transparent border-b border-border py-4 text-foreground focus:outline-none text-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  {loading ? "SENDING..." : "SHOOT MESSAGE"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-background/20 backdrop-blur-sm pointer-events-none"
          >
            <h2 className="text-7xl md:text-9xl font-black text-primary italic tracking-tighter">
              DONE!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
