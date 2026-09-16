import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ThemeToggle from "../../components/ui/ThemeToggle/ThemeToggle";
import "../Login/Login.css"; // Reuse auth layout styles
import { resetPasswordSchema, type ResetPasswordFormData } from "../../validations/auth";
import { AuthService } from "../../services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // We expect the email to be passed via state from ForgotPassword, but it's optional for the UI
    const email = location.state?.email || "your registered email";
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange"
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const passwordValue = watch("password", "");

    const calculateStrength = () => {
        if (!passwordValue) return 0;
        let score = 0;
        if (passwordValue.length >= 8) score++;
        if (/[A-Z]/.test(passwordValue)) score++;
        if (/[0-9]/.test(passwordValue)) score++;
        if (/[^A-Za-z0-9]/.test(passwordValue)) score++;
        return score;
    };

    const onSubmit = async (data: ResetPasswordFormData) => {
        const payload = {
            ...data,
            email: email === "your registered email" ? "" : email,
        };
        const authPromise = AuthService.resetPassword(payload);
        
        toast.promise(authPromise, {
            loading: 'Verifying OTP and securing new credentials...',
            success: 'Chamber password successfully reset!',
            error: (err) => err.message || 'Failed to verify OTP or reset password.',
        });

        authPromise.then(() => {
            setTimeout(() => navigate("/login"), 1500);
        }).catch(() => {});
    };

    const strength = calculateStrength();

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
                            Credential Reset
                        </span>
                        <h1 className="auth-hero-title">Establish your new master key.</h1>
                        <p className="auth-hero-text">
                            For security purposes, please utilize the 6-digit verification code sent to <strong>{email}</strong>. Ensure your new password adheres to judicial encryption standards.
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
                            <h2 className="auth-form-title">Reset Password</h2>
                            <p className="auth-form-subtitle">Enter OTP and new chamber credentials</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* OTP Field */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="reset-otp-0">
                                    6-Digit Verification Code
                                    <span className="form-label-required">*</span>
                                </label>
                                <div className="otp-input-container" style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', margin: '8px 0' }}>
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            id={`reset-otp-${index}`}
                                            type="text"
                                            maxLength={1}
                                            className={`form-input otp-box ${errors.otp ? "input-error" : ""}`}
                                            style={{ 
                                                width: '45px', 
                                                height: '56px', 
                                                textAlign: 'center', 
                                                fontSize: '1.5rem', 
                                                fontWeight: 'bold',
                                                padding: '0',
                                                borderRadius: '8px'
                                            }}
                                            disabled={isSubmitting}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Handle paste
                                                if (val.length > 1) {
                                                    const pastedData = val.replace(/\D/g, '').slice(0, 6);
                                                    if (pastedData) {
                                                        const currentOtp = [0,1,2,3,4,5].map(i => {
                                                            const el = document.getElementById(`reset-otp-${i}`) as HTMLInputElement;
                                                            if (el) {
                                                                const char = pastedData[i] || '';
                                                                el.value = char;
                                                                return char;
                                                            }
                                                            return '';
                                                        }).join('');
                                                        
                                                        // Update the hidden form field
                                                        const hiddenInput = document.getElementById('hidden-otp-input') as HTMLInputElement;
                                                        if (hiddenInput) {
                                                            hiddenInput.value = currentOtp;
                                                            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                                                        }
                                                        
                                                        // Focus last filled box
                                                        const focusIndex = Math.min(pastedData.length, 5);
                                                        document.getElementById(`reset-otp-${focusIndex}`)?.focus();
                                                    }
                                                    return;
                                                }
                                                
                                                // Handle single character typed
                                                if (val && !/^\d$/.test(val)) {
                                                    e.target.value = "";
                                                    return;
                                                }
                                                
                                                if (val) {
                                                    // Move to next input
                                                    if (index < 5) {
                                                        const nextInput = document.getElementById(`reset-otp-${index + 1}`) as HTMLInputElement;
                                                        if (nextInput) nextInput.focus();
                                                    }
                                                }
                                                
                                                // Update hidden form field
                                                const currentOtp = [0,1,2,3,4,5].map(i => {
                                                    const el = document.getElementById(`reset-otp-${i}`) as HTMLInputElement;
                                                    return el ? el.value : '';
                                                }).join('');
                                                
                                                const hiddenInput = document.getElementById('hidden-otp-input') as HTMLInputElement;
                                                if (hiddenInput) {
                                                    hiddenInput.value = currentOtp;
                                                    hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace") {
                                                    const target = e.target as HTMLInputElement;
                                                    if (!target.value && index > 0) {
                                                        // Move focus to previous and clear it
                                                        const prevInput = document.getElementById(`reset-otp-${index - 1}`) as HTMLInputElement;
                                                        if (prevInput) {
                                                            prevInput.value = "";
                                                            prevInput.focus();
                                                            // Trigger update
                                                            const currentOtp = [0,1,2,3,4,5].map(i => {
                                                                const el = document.getElementById(`reset-otp-${i}`) as HTMLInputElement;
                                                                return el ? el.value : '';
                                                            }).join('');
                                                            const hiddenInput = document.getElementById('hidden-otp-input') as HTMLInputElement;
                                                            if (hiddenInput) {
                                                                hiddenInput.value = currentOtp;
                                                                hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                                {/* Hidden input bound to react-hook-form */}
                                <input
                                    {...register("otp")}
                                    type="hidden"
                                    id="hidden-otp-input"
                                />
                                {errors.otp && (
                                    <span className="field-error-message" style={{ color: "var(--color-danger, #ef4444)", fontSize: "var(--font-size-xs, 0.75rem)", marginTop: "4px", display: "block" }}>
                                        {errors.otp.message}
                                    </span>
                                )}
                            </div>

                            {/* New Password Field */}
                            <div className="form-group" style={{ marginTop: "var(--space-4)" }}>
                                <label className="form-label" htmlFor="reset-password">
                                    New Master Password
                                    <span className="form-label-required">*</span>
                                </label>
                                <div className="input-with-icon">
                                    <span className="input-icon-left">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </span>
                                    <input
                                        {...register("password")}
                                        type={showPassword ? "text" : "password"}
                                        id="reset-password"
                                        className={`form-input ${errors.password ? "input-error" : ""}`}
                                        placeholder="••••••••••••"
                                        disabled={isSubmitting}
                                    />
                                    <span 
                                        className="input-icon-right" 
                                        title="Show/Hide Password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer", pointerEvents: "auto" }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            {showPassword ? (
                                                <>
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                    <line x1="2" y1="2" x2="22" y2="22"></line>
                                                </>
                                            ) : (
                                                <>
                                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </>
                                            )}
                                        </svg>
                                    </span>
                                </div>
                                {errors.password && (
                                    <span className="field-error-message" style={{ color: "var(--color-danger, #ef4444)", fontSize: "var(--font-size-xs, 0.75rem)", marginTop: "4px", display: "block" }}>
                                        {errors.password.message}
                                    </span>
                                )}
                                
                                <div className="password-strength-indicator" style={{ marginTop: '8px' }}>
                                    <div className="strength-meter" style={{ display: 'flex', gap: '4px', height: '4px' }}>
                                        <div className={`strength-segment ${strength >= 1 ? 'is-active' : ''}`} style={{ flex: 1, backgroundColor: strength >= 1 ? 'var(--color-success, #10b981)' : 'var(--color-border-default, #e2e8f0)', borderRadius: '999px', transition: 'background-color 0.2s' }}></div>
                                        <div className={`strength-segment ${strength >= 2 ? 'is-active' : ''}`} style={{ flex: 1, backgroundColor: strength >= 2 ? 'var(--color-success, #10b981)' : 'var(--color-border-default, #e2e8f0)', borderRadius: '999px', transition: 'background-color 0.2s' }}></div>
                                        <div className={`strength-segment ${strength >= 3 ? 'is-active' : ''}`} style={{ flex: 1, backgroundColor: strength >= 3 ? 'var(--color-success, #10b981)' : 'var(--color-border-default, #e2e8f0)', borderRadius: '999px', transition: 'background-color 0.2s' }}></div>
                                        <div className={`strength-segment ${strength >= 4 ? 'is-active' : ''}`} style={{ flex: 1, backgroundColor: strength >= 4 ? 'var(--color-success, #10b981)' : 'var(--color-border-default, #e2e8f0)', borderRadius: '999px', transition: 'background-color 0.2s' }}></div>
                                    </div>
                                    <div className="strength-label" style={{ fontSize: 'var(--font-size-2xs, 0.65rem)', color: strength === 4 ? 'var(--color-success, #10b981)' : 'var(--color-text-muted, #94a3b8)', marginTop: '4px' }}>
                                        {strength === 0 ? "Enter password" : strength < 4 ? "Weak judicial encryption" : "Excellent judicial encryption"}
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-group" style={{ marginTop: "var(--space-3)" }}>
                                <label className="form-label" htmlFor="confirm-password">
                                    Confirm Master Password
                                    <span className="form-label-required">*</span>
                                </label>
                                <div className="input-with-icon">
                                    <span className="input-icon-left">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </span>
                                    <input
                                        {...register("confirmPassword")}
                                        type={showPassword ? "text" : "password"}
                                        id="confirm-password"
                                        className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
                                        placeholder="••••••••••••"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <span className="field-error-message" style={{ color: "var(--color-danger, #ef4444)", fontSize: "var(--font-size-xs, 0.75rem)", marginTop: "4px", display: "block" }}>
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-4)" }} disabled={isSubmitting}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    <polyline points="9 12 11 14 15 10"></polyline>
                                </svg>
                                Verify OTP & Reset Password
                            </button>
                        </form>

                        <div className="auth-form-footer">
                            <Link to="/login">&larr; Return to Sign In</Link>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default ResetPassword;
