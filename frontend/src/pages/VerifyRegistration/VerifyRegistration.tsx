import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ThemeToggle from "../../components/ui/ThemeToggle/ThemeToggle";
import "../Login/Login.css"; // Reuse auth layout styles
import { verifyRegistrationSchema, type VerifyRegistrationFormData } from "../../validations/auth";
import { AuthService } from "../../services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function VerifyRegistration() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // We expect the email to be passed via state from Register
    const email = location.state?.email || "your registered email";
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<VerifyRegistrationFormData>({
        resolver: zodResolver(verifyRegistrationSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: VerifyRegistrationFormData) => {
        const authPromise = AuthService.verifyRegistration({
            ...data,
            email: location.state?.email || ""
        });
        
        toast.promise(authPromise, {
            loading: 'Verifying Bar Council OTP...',
            success: 'Registration verified! Initializing chamber docket.',
            error: (err) => err.message || 'Failed to verify OTP.',
        });

        authPromise.then(() => {
            setTimeout(() => navigate("/login"), 1500);
        }).catch(() => {});
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-split-grid">
                
                <aside className="auth-brand-side">
                    <div className="auth-brand-header">
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
                            <span className="brand-tag">Legal Practice Suite</span>
                        </div>
                    </div>

                    <div className="auth-brand-content">
                        <span className="auth-quote-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Bar Council Verification
                        </span>
                        <h1 className="auth-hero-title">Verify your chamber's digital docket.</h1>
                        <p className="auth-hero-text">
                            We have dispatched a secure 6-digit verification code to <strong>{email}</strong>. Please enter the OTP to finalize your advocate registration and enter the platform.
                        </p>
                    </div>

                    <div className="auth-brand-footer">
                        <span>&copy; 2026 JurisDesk Systems Inc. All rights reserved.</span>
                        <span>Bar Compliance Grade AES-256</span>
                    </div>
                </aside>

                <main className="auth-form-side">
                    <div className="theme-toggle-position">
                        <ThemeToggle />
                    </div>

                    <div className="auth-card" style={{ maxWidth: "480px" }}>
                        <div className="auth-form-header">
                            <h2 className="auth-form-title">Verify Registration</h2>
                            <p className="auth-form-subtitle">Enter OTP to verify your legal practice</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* OTP Field */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="verify-otp">
                                    6-Digit Verification Code
                                    <span className="form-label-required">*</span>
                                </label>
                                <div className="input-with-icon">
                                    <span className="input-icon-left">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                                        </svg>
                                    </span>
                                    <input
                                        {...register("otp")}
                                        type="text"
                                        id="verify-otp"
                                        className={`form-input ${errors.otp ? "input-error" : ""}`}
                                        placeholder="123456"
                                        maxLength={6}
                                        disabled={isSubmitting}
                                        style={{ letterSpacing: '0.25em', fontWeight: 600 }}
                                    />
                                </div>
                                {errors.otp && (
                                    <span className="field-error-message" style={{ color: "var(--color-danger, #ef4444)", fontSize: "var(--font-size-xs, 0.75rem)", marginTop: "4px", display: "block" }}>
                                        {errors.otp.message}
                                    </span>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-4)" }} disabled={isSubmitting}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    <polyline points="9 12 11 14 15 10"></polyline>
                                </svg>
                                Complete Registration
                            </button>
                        </form>

                        <div className="auth-form-footer">
                            <Link to="/register">&larr; Return to Registration</Link>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default VerifyRegistration;
