"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { clsx } from "clsx";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Button from "../ui/Button";
import { useSubmit } from "./useSubmit";

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii",
  "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

const steps = ["Applicant", "Address & Course", "Health & Activities", "Parent / Guardian", "Emergency Contact"];

function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-puma">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function ParticipationForm() {
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const { status, error, submit, reset } = useSubmit("participation");

  // Validate only the visible step; hidden steps stay mounted so FormData includes every field.
  const validStep = () => {
    const fs = formRef.current?.querySelector<HTMLFieldSetElement>(`fieldset[data-step="${step}"]`);
    if (!fs) return true;
    for (const el of Array.from(fs.querySelectorAll<HTMLInputElement>("input, select, textarea"))) {
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validStep()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-5 py-16 text-center">
        <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 240, damping: 14 }}>
          <CheckCircle2 className="h-20 w-20 text-puma" />
        </motion.span>
        <h3 className="font-display text-5xl uppercase">Welcome to the family!</h3>
        <p className="max-w-md text-mute">Your participation form has been submitted. We&apos;ll be in touch soon to get you on the mat.</p>
        <button
          onClick={() => {
            reset();
            setStep(0);
          }}
          className="text-sm font-semibold uppercase tracking-widest text-puma hover:underline"
        >
          Submit another form
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < steps.length - 1) return next();
        if (validStep()) submit(e.currentTarget);
      }}
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {/* Progress */}
      <ol className="mb-10 grid grid-cols-5 gap-2">
        {steps.map((s, i) => (
          <li key={s} className="text-xs">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-puma" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <span className={clsx("mt-2 hidden font-semibold uppercase tracking-wider transition-colors md:block", i <= step ? "text-bone" : "text-mute")}>
              {String(i + 1).padStart(2, "0")} · {s}
            </span>
          </li>
        ))}
      </ol>
      <p className="mb-6 font-display text-3xl uppercase tracking-wide md:hidden">
        <span className="text-puma">{String(step + 1).padStart(2, "0")}</span> {steps[step]}
      </p>

      <div className="relative">
        {[0, 1, 2, 3, 4].map((i) => (
            <motion.fieldset
              key={i}
              data-step={i}
              hidden={i !== step}
              initial={false}
              animate={i === step ? { opacity: 1, x: 0 } : { opacity: 0, x: i > step ? 40 : -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <legend className="sr-only">{steps[i]}</legend>
              {i === 0 && (
                <>
                  <Field label="First name" required>
                    <input name="firstName" required autoComplete="given-name" className="field" />
                  </Field>
                  <Field label="Last name" required>
                    <input name="lastName" required autoComplete="family-name" className="field" />
                  </Field>
                  <Field label="Email" required>
                    <input name="email" type="email" required autoComplete="email" className="field" />
                  </Field>
                  <Field label="Phone">
                    <input name="phone" type="tel" autoComplete="tel" className="field" />
                  </Field>
                  <Field label="Date of birth">
                    <input name="dateOfBirth" type="date" className="field [color-scheme:dark]" />
                  </Field>
                  <Field label="Gender">
                    <select name="gender" defaultValue="" className="field">
                      <option value="">Select…</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </Field>
                </>
              )}
              {i === 1 && (
                <>
                  <Field label="Address line 1" className="sm:col-span-2">
                    <input name="address1" autoComplete="address-line1" className="field" />
                  </Field>
                  <Field label="Address line 2" className="sm:col-span-2">
                    <input name="address2" autoComplete="address-line2" className="field" />
                  </Field>
                  <Field label="City">
                    <input name="city" autoComplete="address-level2" className="field" />
                  </Field>
                  <Field label="State">
                    <select name="state" defaultValue="" className="field">
                      <option value="">--- Select state ---</option>
                      {states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Zip code">
                    <input name="zip" inputMode="numeric" autoComplete="postal-code" className="field" />
                  </Field>
                  <Field label="Course name">
                    <select name="course" defaultValue="" className="field">
                      <option value="">Select level…</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </Field>
                </>
              )}
              {i === 2 && (
                <>
                  <Field label="Medical conditions" className="sm:col-span-2">
                    <textarea name="medicalConditions" rows={4} className="field resize-none" placeholder="Anything our instructors should know?" />
                  </Field>
                  <Field label="Extracurricular activities" className="sm:col-span-2">
                    <textarea name="extracurricularActivities" rows={4} className="field resize-none" />
                  </Field>
                </>
              )}
              {i === 3 && (
                <>
                  <p className="text-sm text-mute sm:col-span-2">Required for applicants under 18.</p>
                  <Field label="Parent/Guardian first name">
                    <input name="guardianFirstName" className="field" />
                  </Field>
                  <Field label="Parent/Guardian last name">
                    <input name="guardianLastName" className="field" />
                  </Field>
                  <Field label="Parent/Guardian email">
                    <input name="guardianEmail" type="email" className="field" />
                  </Field>
                  <Field label="Parent/Guardian phone">
                    <input name="guardianPhone" type="tel" className="field" />
                  </Field>
                </>
              )}
              {i === 4 && (
                <>
                  <Field label="Emergency contact first name" required>
                    <input name="emergencyFirstName" required className="field" />
                  </Field>
                  <Field label="Emergency contact last name" required>
                    <input name="emergencyLastName" required className="field" />
                  </Field>
                  <Field label="Emergency contact email" required>
                    <input name="emergencyEmail" type="email" required className="field" />
                  </Field>
                  <Field label="Emergency contact phone">
                    <input name="emergencyPhone" type="tel" className="field" />
                  </Field>
                </>
              )}
            </motion.fieldset>
        ))}
      </div>

      {error && <p className="mt-6 text-sm text-puma-300">{error}</p>}

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          className={clsx("inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-mute transition-all hover:text-bone", step === 0 && "pointer-events-none opacity-0")}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>
            Next step
          </Button>
        ) : (
          <Button type="submit" disabled={status === "sending"} icon={status !== "sending"}>
            {status === "sending" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
