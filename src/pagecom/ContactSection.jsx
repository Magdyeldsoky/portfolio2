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
      setTimeout(() => setSubmitted(false), 6000);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-background overflow-hidden border-t border-border"
    >
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${submitted ? "z-50 opacity-100" : "z-0 opacity-50"}`}
      >
        <Antigravity
          mode={focused}
          isTyping={form.name.length + form.email.length + form.message.length}
          isSuccess={submitted}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.h3 className="text-5xl md:text-8xl font-black text-foreground italic uppercase leading-[0.85] tracking-tighter">
              Let's <br /> <span className="text-primary">Connect.</span>
            </motion.h3>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-card/20 dark:bg-zinc-950/30 backdrop-blur-xl border border-border p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-8 md:space-y-10"
              >
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border py-3 md:py-4 text-foreground focus:outline-none text-xl md:text-2xl font-light transition-all focus:border-primary"
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border py-3 md:py-4 text-foreground focus:outline-none text-xl md:text-2xl font-light transition-all focus:border-primary"
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    onChange={handleChange}
                    rows="2"
                    required
                    className="w-full bg-transparent border-b border-border py-3 md:py-4 text-foreground focus:outline-none text-xl md:text-2xl font-light resize-none transition-all focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 md:py-6 bg-primary text-primary-foreground font-black rounded-2xl tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-background/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center px-6"
            >
              <h2 className="text-7xl md:text-[12rem] font-black italic text-primary leading-none tracking-tighter">
                DONE!
              </h2>
              <p className="text-lg md:text-2xl font-mono tracking-[0.3em] md:tracking-[0.4em] text-foreground mt-6 md:mt-8 opacity-90 uppercase">
                Message received safely
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
