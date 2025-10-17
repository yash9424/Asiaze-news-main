import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    navigate("/preferences");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Verify your account
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            Enter the 6-digit code sent to your email/phone
          </p>
        </div>

        <div className="flex justify-center py-6 sm:py-8">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-2 sm:gap-3">
              <InputOTPSlot index={0} className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl border-border rounded-xl" />
              <InputOTPSlot index={1} className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl border-border rounded-xl" />
              <InputOTPSlot index={2} className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl border-border rounded-xl" />
              <InputOTPSlot index={3} className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl border-border rounded-xl" />
              <InputOTPSlot index={4} className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl border-border rounded-xl" />
              <InputOTPSlot index={5} className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl border-border rounded-xl" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full"
          disabled={otp.length !== 6}
        >
          Verify
        </Button>

        <div className="text-center text-sm sm:text-base">
          <span className="text-muted-foreground">Didn't receive code? </span>
          <button className="text-muted-foreground hover:underline font-medium">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
