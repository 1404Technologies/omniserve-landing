import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

function ContactIcon({ d }) {
  return (
    <svg className="w-4 h-4 text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const serviceOptions = [
  "OmniServe — Full Platform",
  "Module A: Workflow Orchestration",
  "Module B: Performance Intelligence",
  "Module C: Smart Procurement",
];

const inputClass =
  "bg-white/[0.11] border rounded-[6px] py-3 px-4 text-[13px] text-white " +
  "placeholder:text-[#7BAAC8] focus:border-teal-500 focus:outline-none w-full transition-colors duration-150";

const emptyForm = { name: "", email: "", company: "", service: "", message: "" };

function FieldWrapper({ label, error, children }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[13px] font-semibold text-blue-200">{label}</label>
      {children}
      {error && (
        <span className="text-[12px] text-red-400">{error}</span>
      )}
    </div>
  );
}

function fieldError(name, value) {
  if (name === "name" && !value.trim()) return "Name is required";
  if (name === "email") {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
  }
  return null;
}

export default function Contact({ website, email, phones, offices }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: fieldError(name, value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: fieldError(name, value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(emptyForm).map((k) => [k, true]));
    const errors = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, fieldError(k, v)])
    );
    setTouched(allTouched);
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setStatus("submitting");
    try {
      await addDoc(collection(db, "omniserve_earlyaccess_requests"), {
        ...form,
        submittedAt: serverTimestamp(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setTouched({});
    setFieldErrors({});
    setStatus("idle");
  }

  return (
    <section id="contact" className="section section--dark">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-white mb-4 leading-snug">
            Ready to <em className="not-italic text-teal-400">transform</em> your operations?
          </h2>
          <p className="text-[17px] text-blue-300 leading-[1.7] mb-10">
            Interested in OmniServe? Get in touch and we'll walk you through the platform, pricing, and what getting started looks like for your team.
          </p>

          <div className="flex flex-col gap-5 mb-8">
            {offices.map(({ label, address }) => (
              <div key={label}>
                <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-teal-400 mb-1">
                  {label}
                </div>
                <div className="text-[13px] text-blue-300 leading-normal">{address}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[10px] text-[13px] text-blue-200">
              <ContactIcon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              <span>{email}</span>
            </div>
            {phones.map((phone) => (
              <div key={phone} className="flex items-center gap-[10px] text-[13px] text-blue-200">
                <ContactIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                <span>{phone}</span>
              </div>
            ))}
            <div className="flex items-center gap-[10px] text-[13px] text-blue-200">
              <ContactIcon d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              <span>{website}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.07] border border-white/[0.14] rounded-2xl p-10 flex flex-col gap-5">
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="text-[48px] mb-4">✓</div>
              <div className="text-[20px] font-bold text-white mb-2">Message received!</div>
              <div className="text-[14px] text-[#9ca3af] mb-8">We'll be in touch within one business day.</div>
              <button
                onClick={resetForm}
                className="btn btn--outline-white text-[13px] py-[10px] px-5"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="text-xl font-bold text-white mb-1">Get in touch</div>
                <div className="text-[13px] text-blue-300">We respond within one business day.</div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-4">
                  <FieldWrapper label="Full name" error={fieldErrors.name}>
                    <input
                      className={`${inputClass} ${fieldErrors.name ? "border-red-400/60" : "border-white/[0.18]"}`}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane Smith"
                    />
                  </FieldWrapper>
                  <FieldWrapper label="Work email" error={fieldErrors.email}>
                    <input
                      className={`${inputClass} ${fieldErrors.email ? "border-red-400/60" : "border-white/[0.18]"}`}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@company.com"
                    />
                  </FieldWrapper>
                  <FieldWrapper label="Company" error={fieldErrors.company}>
                    <input
                      className={`${inputClass} border-white/[0.18]`}
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Acme Corp"
                    />
                  </FieldWrapper>
                  <FieldWrapper label="Service of interest" error={fieldErrors.service}>
                    <select
                      className={`${inputClass} border-white/[0.18]`}
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" className="bg-navy-2 text-white">Select a service…</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-navy-2 text-white">{opt}</option>
                      ))}
                      <option value="Enterprise / Custom" className="bg-navy-2 text-white">Enterprise / Custom — let's talk</option>
                    </select>
                  </FieldWrapper>
                  <FieldWrapper label="Message" error={fieldErrors.message}>
                    <textarea
                      className={`${inputClass} border-white/[0.18] resize-y min-h-[100px]`}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your needs…"
                    />
                  </FieldWrapper>
                  {status === "error" && (
                    <div className="text-[13px] text-red-400">
                      Something went wrong — please try again or email us directly.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn btn--primary w-full justify-center py-4 text-[17px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Send message →"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
