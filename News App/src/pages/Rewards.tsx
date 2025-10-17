import { useNavigate } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const Rewards = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="safe-area-top px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 sm:left-6">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Reward Points</h1>
      </div>

      <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 flex-1">
        {/* Points Card */}
        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{backgroundColor: '#DC143C'}}>
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-extrabold mb-2" style={{color: '#DC143C'}}>520 Points</div>
            <p className="text-black text-sm sm:text-base font-medium">
              Share news or refer friends to earn more points.
            </p>
          </div>
        </div>

        {/* Invite Friends Button */}
        <Button className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-full">Invite Friends</Button>

        {/* Available Rewards */}
        <h2 className="text-sm sm:text-base font-semibold text-foreground mt-2">Available Rewards</h2>

        <div className="space-y-3">
          {/* Reward 1 */}
          <div className="bg-white border border-border rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
              <img src="/Group 13.png" alt="Amazon" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-xs sm:text-sm font-bold text-foreground">₹100 Amazon Gift Card</div>
              <div className="text-xs text-muted-foreground">500 pts</div>
            </div>
            <Button className="rounded-full h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm">Redeem</Button>
          </div>

          {/* Reward 2 */}
          <div className="bg-white border border-border rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
              <img src="/Group 14.png" alt="Google Play" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-xs sm:text-sm font-bold text-foreground">₹150 Google Play Voucher</div>
              <div className="text-xs text-muted-foreground">700 pts</div>
            </div>
            <Button variant="secondary" className="rounded-full h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm bg-primary/10 text-primary hover:bg-primary/20">
              Redeem
            </Button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 pb-4 safe-area-bottom">
        <p className="text-center text-xs text-muted-foreground">
          Points are verified through your share/referral activity.
        </p>
      </div>
    </div>
  );
};

export default Rewards;


