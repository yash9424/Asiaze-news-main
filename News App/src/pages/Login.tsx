import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/preferences");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8 sm:mb-12 flex justify-center">
          <img src="/Group 15.png" alt="asiaze" className="h-12 sm:h-16 w-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <Input
            type="text"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 sm:h-14 rounded-full px-4 sm:px-6 bg-white border-border text-sm sm:text-base"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 sm:h-14 rounded-full px-4 sm:px-6 bg-white border-border text-sm sm:text-base"
          />

          <Button type="submit" className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full">
            Login
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
        <span className="text-muted-foreground">Don't have an account? </span>
        <button
          onClick={() => navigate("/signup")}
          className="text-primary font-semibold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
