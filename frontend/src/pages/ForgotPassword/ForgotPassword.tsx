import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeToggle from "../../components/ui/ThemeToggle/ThemeToggle";
import "../Login/Login.css"; // Reuse auth layout styles
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../../validations/auth";
import { AuthService } from "../../services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function ForgotPassword() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        const authPromise = AuthService.forgotPassword(data);
        
        toast.promise(authPromise, {
            loading: 'Verifying advocate records...',
            success: 'Recovery OTP sent to your official email.',
            error: (err) => err.message || 'Failed to initiate password recovery.',
        });

        authPromise.then(() => {
            // Wait briefly before redirecting so user can read the toast
            setTimeout(() => navigate("/reset-password", { state: { email: data.email } }), 1500);
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
                            Secure Access Recovery
                        </span>
                        <h1 className="auth-hero-title">Recover your chamber docket securely.</h1>
                        <p className="auth-hero-text">
                            We employ strict verification protocols. A one-time passcode will be dispatched to your registered Bar Council email address to authorize access restoration.
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

                    <div className="auth-card">
                        <div className="auth-form-header">
                            <h2 className="auth-form-title">Forgot Password</h2>
                            <p className="auth-form-subtitle">Enter your official email to receive a secure recovery code</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="recovery-email">
                                    Official Email Address
                                    <span className="form-label-required">*</span>
                                </label>
                                <div className="input-with-icon">
                                    <span className="input-icon-left">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                    </span>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        id="recovery-email"
                                        className={`form-input ${errors.email ? "input-error" : ""}`}
                                        placeholder="advocate.sharma@delhibar.org"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="field-error-message" style={{ color: "var(--color-danger, #ef4444)", fontSize: "var(--font-size-xs, 0.75rem)", marginTop: "4px", display: "block" }}>
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-4)" }} disabled={isSubmitting}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13"></path>
                                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                                </svg>
                                Send Recovery OTP
                            </button>
                        </form>

                        <div className="auth-form-footer">
                            Remembered your password?
                            <Link to="/login">Return to Sign In &rarr;</Link>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default ForgotPassword;
