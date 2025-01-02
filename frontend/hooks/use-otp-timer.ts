import { useState, useEffect } from 'react';

const OTP_TIMER_KEY = 'otpTimer';
const OTP_EMAIL_KEY = 'otpEmail';

interface OTPTimerState {
  email: string;
  expiryTime: number;
}

export function useOtpTimer(email: string) {
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    // Load saved timer state
    const savedState = localStorage.getItem(OTP_TIMER_KEY);
    const savedEmail = localStorage.getItem(OTP_EMAIL_KEY);
    
    if (savedState && savedEmail === email) {
      const expiryTime = parseInt(savedState);
      if (expiryTime > Date.now()) {
        setCanResend(false);
        setResendTimer(Math.ceil((expiryTime - Date.now()) / 1000));
      } else {
        localStorage.removeItem(OTP_TIMER_KEY);
        localStorage.removeItem(OTP_EMAIL_KEY);
      }
    }
  }, [email]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            localStorage.removeItem(OTP_TIMER_KEY);
            localStorage.removeItem(OTP_EMAIL_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  const startTimer = (seconds: number = 180) => {
    setResendTimer(seconds);
    setCanResend(false);
    // Save timer state
    localStorage.setItem(OTP_TIMER_KEY, (Date.now() + seconds * 1000).toString());
    localStorage.setItem(OTP_EMAIL_KEY, email);
  };

  return {
    canResend,
    resendTimer,
    startTimer,
  };
} 