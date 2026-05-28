import { useState } from "react";
import { motion } from "framer-motion";
import { submitContactToHubSpot } from "../lib/hubspot";
import Icon from "./Icon";
import Reveal from "./ui/Reveal";
import TextReveal from "./ui/TextReveal";
import MagneticButton from "./ui/MagneticButton";
import { ease, duration } from "../lib/motion";

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
          <Icon name="pin" className="w-[14px] h-[14px]" />
        </span>
        <span>{address}</span>
      </div>
      <div className="flex items-center gap-[10px] text-[13px] text-blue-100">
        <span className="text-teal-300 shrink-0">
          <Icon name="phone" className="w-[14px] h-[14px]" />
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
      await submitContactToHubSpot(form);
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
        <Reveal>
          <h2 className="text-[clamp(28px,3.6vw,42px)] font-bold leading-[1.15] tracking-[-0.02em] mb-4">
            <TextReveal text="Ready to" />{" "}
            <TextReveal text="transform" as="span" className="text-teal-300" delayChildren={0.12} />{" "}
            <TextReveal text="your operations?" delayChildren={0.24} />
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
                <Icon name="mail" className="w-[14px] h-[14px]" />
              </span>
              <span className="font-medium">{email}</span>
            </a>
            <div className="flex items-center gap-3 text-[13px] text-blue-100">
              <span className="text-teal-300 shrink-0">
                <Icon name="globe" className="w-[14px] h-[14px]" />
              </span>
              <span className="font-medium">{website}</span>
            </div>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: duration.base, ease: ease.out, delay: 0.1 }}
          className="bg-white rounded-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] p-6 sm:p-8 lg:p-10 text-ink"
        >
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" className="w-6 h-6" />
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
                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn--primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  strength={8}
                >
                  {status === "submitting" ? "Sending…" : (
                    <>
                      <span>Send message</span>
                      <span aria-hidden>→</span>
                    </>
                  )}
                </MagneticButton>
                <div className="text-[11px] text-ink-mute leading-snug text-center mt-1">
                  By submitting you agree to our <a href={`mailto:${email}`} className="underline">Privacy Policy</a>. We never share your data with third parties.
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
