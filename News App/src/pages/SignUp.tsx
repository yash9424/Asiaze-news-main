import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: emailOrPhone,
          password,
          role: 'user'
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Sign up failed');
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError('Sign up failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8 sm:mb-12 flex justify-center">
          <img src="/Group 15.png" alt="asiaze" className="h-12 sm:h-16 w-auto" />
        </div>

        <form onSubmit={handleSignUp} className="space-y-3 sm:space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-full text-center text-sm">
              {error}
            </div>
          )}
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12 sm:h-14 rounded-full px-4 sm:px-6 bg-white border-border text-sm sm:text-base"
          />
          <Input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            className="h-12 sm:h-14 rounded-full px-4 sm:px-6 bg-white border-border text-sm sm:text-base"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 sm:h-14 rounded-full px-4 sm:px-6 pr-12 bg-white border-border text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Eye className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <div className="text-center text-sm sm:text-base text-muted-foreground">
          Or continue with
        </div>

        <Button
          variant="outline"
          className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-full border-2 border-foreground"
          onClick={() => {}}
        >
          <span className="mr-2 text-lg sm:text-xl font-bold">G</span> Google
        </Button>
      </div>

      <div className="w-full max-w-md text-center pb-4 text-sm sm:text-base">
        <span className="text-muted-foreground">Already have an account? </span>
        <button
          onClick={() => navigate("/login")}
          className="text-primary font-semibold hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
