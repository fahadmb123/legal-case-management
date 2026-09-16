import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, passwordRules, type RegisterSchema } from "../../validations/auth";
import { AuthService } from "../../services/auth.service";
import ThemeToggle from "../../components/ui/ThemeToggle/ThemeToggle";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "Adv. Rajesh Kumar Sharma",
      email: "sharma@lawchambers.org",
      phone: "+91 98765 43210",
      barNumber: "D/1482/2014",
      password: "JudiciaryPass@2026",
      confirmPassword: "JudiciaryPass@2026",
      agreedToTerms: true,
    }
  });

  const passwordValue = watch("password");

  const passwordStrength = useMemo(() => {
    if (!passwordValue) return 0;
    let score = 0;
    if (passwordRules.length.safeParse(passwordValue).success) score += 1;
    if (passwordRules.uppercase.safeParse(passwordValue).success) score += 1;
    if (passwordRules.number.safeParse(passwordValue).success) score += 1;
    if (passwordRules.special.safeParse(passwordValue).success) score += 1;
    return score;
  }, [passwordValue]);

  const onSubmit = (data: RegisterSchema) => {
    const verificationPromise = AuthService.register(data);
    
    toast.promise(verificationPromise, {
      loading: 'Verifying advocate credentials with Bar Council...',
      success: 'Verification complete! Initializing chamber docket.',
      error: (err) => err.message || 'Failed to verify credentials.',
    });

    verificationPromise.then(() => {
      setTimeout(() => navigate("/"), 1200);
    }).catch(() => {
      // Catch prevents unhandled promise rejection error in console
    });
  };

  return (
    <div className="register-layout">
      <div className="register-grid">
        <aside className="register-brand-side">
          <div className="register-brand-header">
            <div className="brand-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                <path d="M7 21h10"/>
                <path d="M12 3v18"/>
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
              </svg>
            </div>
            <div className="brand-name">
              <span>JurisDesk</span>
              <span className="brand-tag">Advocate Practice Suite</span>
            </div>
          </div>

          <div className="register-brand-main">
            <div className="register-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              Bar Enrollment Verification
            </div>
            <h1 className="register-title">Establish your chamber's digital docket.</h1>
            <p className="register-desc">
              Equip your practice with unified client ledgers, hearing calendars, cause list synchronizations, and assistant delegation.
            </p>

            <div className="verification-notice-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <div>
                <strong>Bar Council Verification</strong>: All advocates undergo state bar roll cross-verification to ensure attorney-client privilege protection and certified judicial filings.
              </div>
            </div>
          </div>

          <div className="register-brand-footer">
            JurisDesk Judicial Platform &bull; ISO 27001 Certified Security
          </div>
        </aside>

        <main className="register-form-side">
          <div className="register-theme-toggle">
            <ThemeToggle />
          </div>

          <div className="register-form-container">
            <div className="register-form-header">
              <h2 className="register-form-title">Advocate Registration</h2>
              <p className="register-form-subtitle">
                Register your legal practice to manage cases, clerk tasks, and court listings
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="advocate-name" className="form-label">
                  Advocate Full Name
                  <span className="form-label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-icon-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="advocate-name"
                    className="form-input"
                    placeholder="e.g. Adv. Rajesh Kumar Sharma"
                    {...register("fullname")}
                  />
                </div>
                {errors.fullname && <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px" }}>{errors.fullname.message}</span>}
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="advocate-email" className="form-label">
                    Official Email
                    <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="advocate-email"
                    className="form-input"
                    placeholder="sharma@lawchambers.org"
                    {...register("email")}
                  />
                  {errors.email && <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px" }}>{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="advocate-phone" className="form-label">
                    Mobile / Chamber Phone
                    <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="advocate-phone"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                  />
                  {errors.phone && <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px" }}>{errors.phone.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bar-reg" className="form-label">
                  Bar Council Registration Number
                  <span className="form-label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-icon-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="bar-reg"
                    className="form-input font-mono"
                    placeholder="e.g. D/1482/2014"
                    {...register("barNumber")}
                  />
                </div>
                {errors.barNumber ? (
                  <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px" }}>{errors.barNumber.message}</span>
                ) : (
                  <span className="form-hint">Format: State/Roll Number/Year of Enrollment</span>
                )}
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="reg-password" className="form-label">
                    Master Password
                    <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="password"
                    id="reg-password"
                    className="form-input"
                    placeholder="Minimum 8 characters"
                    {...register("password")}
                  />
                  {errors.password && <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px", display: "block" }}>{errors.password.message}</span>}
                  <div className="password-strength-indicator">
                    <div className="strength-meter">
                      <div className={`strength-segment ${passwordStrength >= 1 ? "is-active" : ""}`}></div>
                      <div className={`strength-segment ${passwordStrength >= 2 ? "is-active" : ""}`}></div>
                      <div className={`strength-segment ${passwordStrength >= 3 ? "is-active" : ""}`}></div>
                      <div className={`strength-segment ${passwordStrength >= 4 ? "is-active" : ""}`}></div>
                    </div>
                    <span className="strength-label">
                      {passwordStrength <= 1 && "Weak password"}
                      {passwordStrength === 2 && "Moderate password strength"}
                      {passwordStrength === 3 && "Strong password strength"}
                      {passwordStrength >= 4 && "Excellent judicial encryption"}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-confirm" className="form-label">
                    Confirm Password
                    <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="password"
                    id="reg-confirm"
                    className="form-input"
                    placeholder="Re-enter password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px" }}>
                      &times; {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "var(--space-2)" }}>
                <label className="form-check" style={{ alignItems: "flex-start", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ marginTop: "3px" }}
                    {...register("agreedToTerms")}
                  />
                  <span style={{ fontSize: "var(--font-size-xs)", lineHeight: 1.4, color: "var(--color-text-secondary)" }}>
                    I affirm that I am a licensed advocate registered with the Bar Council, and agree to the{" "}
                    <span className="text-primary" style={{ fontWeight: 600 }}>Advocate Code of Conduct</span> and{" "}
                    <span className="text-primary" style={{ fontWeight: 600 }}>Client Privilege Data Agreement</span>.
                  </span>
                </label>
                {errors.agreedToTerms && <span className="form-hint text-danger" style={{ fontSize: "var(--font-size-2xs)", marginTop: "4px", display: "block" }}>{errors.agreedToTerms.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "var(--space-4)" }}
              >
                Complete Registration & Enter Chamber
              </button>
            </form>

            <div className="register-footer-link">
              Already enrolled your practice?{" "}
              <Link to="/login" style={{ fontWeight: 600 }}>
                Sign in to chamber &rarr;
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
