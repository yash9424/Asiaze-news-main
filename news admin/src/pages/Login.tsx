import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple login logic - in production, this would validate credentials
    if (username && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        {/* Logo */}
        <div className="text-center">
          <img src="/Red_Logo.png" alt="Asiaze" className="mx-auto mb-12 h-20" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-base font-semibold">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-primary font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-full">
            Login
          </Button>
        </form>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-6 bg-muted">
        <div className="flex justify-center gap-8 text-sm">
          <a href="#" className="text-foreground hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-foreground hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-foreground hover:underline">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
