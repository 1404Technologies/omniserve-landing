import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

function Icon({ d, className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICON_PIN = "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z";
const ICON_PHONE = "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
const ICON_MAIL = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8 M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
const ICON_GLOBE = "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9";

const serviceOptions = [
  "OmniServe — Full Platform",
  "Healthcare module",
  "Construction module",
  "Logistics module",
];

const inputClass =
  "bg-white border rounded-[8px] py-[11px] px-[14px] text-[14px] text-ink " +
  "placeholder:text-ink-mute focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all duration-150";

const emptyForm = { name: "", email: "", phone: "", company: "", service: "", message: "" };

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[12px] font-semibold text-ink-soft">
        {label}
        {required && <span className="text-blue-600 ml-1">*</span>}
      </label>
      {children}
      {error && <span className="text-[12px] text-red-600">{error}</span>}
    </div>
  );
}

function fieldError(name, value) {
  if (name === "name" && !value.trim()) return "Required";
  if (name === "email") {
    if (!value.trim()) return "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
  }
  return null;
}

function OfficeCard({ label, tag, address, phone }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.10] rounded-[10px] p-4 flex flex-col gap-[10px]">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-teal-300">{label}</span>
        <span className="text-[10px] font-semibold text-blue-200 bg-white/[0.06] border border-white/[0.10] rounded py-[2px] px-[6px]">
          {tag}
        </span>
      </div>
      <div className="flex items-start gap-[10px] text-[13px] text-blue-100 leading-snug">
        <span className="text-teal-300 shrink-0 mt-[2px]">
          <Icon d={ICON_PIN} className="w-[14px] h-[14px]" />
        </span>
        <span>{address}</span>
      </div>
      <div className="flex items-center gap-[10px] text-[13px] text-blue-100">
        <span className="text-teal-300 shrink-0">
          <Icon d={ICON_PHONE} className="w-[14px] h-[14px]" />
        </span>
        <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white">{phone}</a>
      </div>
    </div>
  );
}

export default function Contact({ website, email, offices }) {
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
    <section id="contact" className="bg-navy text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 sm:gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="text-[clamp(28px,3.6vw,42px)] font-bold leading-[1.15] tracking-[-0.02em] mb-4">
            Ready to <span className="text-teal-300">transform</span> your operations?
          </h2>
          <p className="text-[15px] text-blue-200 leading-[1.65] mb-8 max-w-[480px]">
            Talk to our team today. We'll match you with the right modules and pricing for your business size and industry.
          </p>

          <div className="flex flex-col gap-3 mb-7">
            {offices.map((office) => (
              <OfficeCard key={office.label} {...office} />
            ))}
          </div>

          <div className="flex flex-col gap-[10px] pt-4">
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-[13px] text-blue-100 hover:text-white transition-colors">
              <span className="text-teal-300 shrink-0">
                <Icon d={ICON_MAIL} className="w-[14px] h-[14px]" />
              </span>
              <span className="font-medium">{email}</span>
            </a>
            <div className="flex items-center gap-3 text-[13px] text-blue-100">
              <span className="text-teal-300 shrink-0">
                <Icon d={ICON_GLOBE} className="w-[14px] h-[14px]" />
              </span>
              <span className="font-medium">{website}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] p-6 sm:p-8 lg:p-10 text-ink">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="text-[20px] font-bold text-ink mb-2">Message received</div>
              <div className="text-[14px] text-ink-soft mb-8">A member of our team will be in touch within one business day.</div>
              <button onClick={resetForm} className="text-[13px] font-semibold text-blue-700 hover:text-blue-800">
                Send another enquiry →
              </button>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <div className="text-[20px] font-bold text-ink leading-snug">Get in touch</div>
                <div className="text-[13px] text-ink-soft mt-1">A member of our team will be in touch.</div>
              </div>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <Field label="Full name" required error={fieldErrors.name}>
                  <input
                    className={`${inputClass} ${fieldErrors.name ? "border-red-300" : "border-line"}`}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jane Smith"
                  />
                </Field>
                <Field label="Work email" required error={fieldErrors.email}>
                  <input
                    className={`${inputClass} ${fieldErrors.email ? "border-red-300" : "border-line"}`}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jane@company.com"
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone number">
                    <input
                      className={`${inputClass} border-line`}
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+1 (555) 000-0000"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      className={`${inputClass} border-line`}
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Acme Corp"
                    />
                  </Field>
                </div>
                <Field label="Module of interest">
                  <select
                    className={`${inputClass} border-line bg-white`}
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select…</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    <option value="Bundle with 1404 BPO">Bundle with 1404 BPO — let's talk</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    className={`${inputClass} border-line resize-y min-h-[100px]`}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your needs…"
                  />
                </Field>
                {status === "error" && (
                  <div className="text-[13px] text-red-600">
                    Something went wrong — please try again or email us directly.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn--primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Send message →"}
                </button>
                <div className="text-[11px] text-ink-mute leading-snug text-center mt-1">
                  By submitting you agree to our <a href={`mailto:${email}`} className="underline">Privacy Policy</a>. We never share your data with third parties.
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
