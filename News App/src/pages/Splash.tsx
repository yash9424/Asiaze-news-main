import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-4 animate-in fade-in duration-700">
        <h1 className="text-6xl md:text-7xl font-bold text-white lowercase tracking-tight">
          asiaze
        </h1>
        <p className="text-white text-lg md:text-xl font-light tracking-wide">
          Your World, Simplified
        </p>
      </div>
    </div>
  );
};

export default Splash;
