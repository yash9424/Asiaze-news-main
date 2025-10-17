import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-4 bg-background border-b border-border flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Privacy Policy</h1>
      </div>
      <div className="px-4 py-6 space-y-4 text-foreground">
        <p>
          We respect your privacy. This app stores only the data necessary to
          provide core functionality such as preferences, notifications, and
          saved items. We never sell your data.
        </p>
        <p>
          You can request deletion of local data by clearing app storage or by
          contacting support.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


