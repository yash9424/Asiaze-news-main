import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "EN", label: "English" },
  { code: "HIN", label: "Hindi" },
  { code: "BEN", label: "Bengali" },
];

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("HIN");
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/categories');
      const data = await res.json();
      const activeCategories = data.categories
        .filter((cat: any) => cat.isActive)
        .map((cat: any) => cat.name);
      setInterests(activeCategories);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setInterests(["Politics", "Sports", "Business", "Tech"]);
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center space-y-8 sm:space-y-12">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
            Choose Your Language
          </h2>
          <div className="flex justify-center gap-3 sm:gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full font-bold text-base sm:text-lg transition-all ${
                  selectedLanguage === lang.code
                    ? "bg-primary text-white"
                    : "bg-white border-2 border-foreground text-foreground"
                }`}
              >
                {lang.code}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
            Select Your Interests
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`h-16 sm:h-20 rounded-2xl font-semibold text-sm sm:text-base transition-all ${
                  selectedInterests.includes(interest)
                    ? "bg-primary text-white"
                    : "bg-white border-2 border-border text-foreground"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full flex justify-center pb-4">
        <Button
          onClick={handleContinue}
          className="w-40 sm:w-48 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Preferences;
