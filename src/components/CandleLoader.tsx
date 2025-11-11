import { useEffect, useState } from "react";

interface CandleLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
}

const CandleLoader = ({ isLoading = true, onComplete }: CandleLoaderProps) => {
  const [isLit, setIsLit] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [flameOpacity, setFlameOpacity] = useState(1);

  useEffect(() => {
    if (!isLoading && isLit) {
      // Gradually reduce flame before blowing out
      setFlameOpacity(0.7);

      const flickerTimer = setTimeout(() => {
        setFlameOpacity(0.3);
      }, 400);

      // Blow out the candle when loading is complete
      const blowOutTimer = setTimeout(() => {
        setIsLit(false);
        // Start fade out after smoke animation
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete?.();
          }, 1000);
        }, 1500);
      }, 800);

      return () => {
        clearTimeout(flickerTimer);
        clearTimeout(blowOutTimer);
      };
    }
  }, [isLoading, isLit, onComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 z-50 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        {/* Holder */}
        <div className="relative mx-auto mt-48 w-[150px] h-[200px]">
          {/* Candle */}
          <div className="absolute bottom-0 w-[150px] h-[300px] rounded-[150px_/_40px] shadow-candle candle-gradient">
            {/* Candle top */}
            <div className="absolute w-full h-10 rounded-[50%] border-2 candle-top-gradient" />

            {/* Candle shadow */}
            <div className="absolute w-[34px] h-[10px] left-1/2 -translate-x-1/2 rounded-[50%] top-[14px] candle-shadow" />

            {/* Thread/Wick */}
            <div className="absolute w-1.5 h-9 -top-[17px] left-1/2 z-10 rounded-t-[40%] -translate-x-1/2 thread-gradient" />

            {/* Flame elements - only show when lit */}
            {isLit && (
              <div
                className="transition-all duration-700 ease-out"
                style={{ opacity: flameOpacity, transform: `scale(${flameOpacity})` }}
              >
                {/* Blinking glow */}
                <div className="absolute w-[100px] h-[180px] left-1/2 -top-[55%] -translate-x-1/2 rounded-[50%] bg-[#ff6000] candle-blur animate-blink-glow" />

                {/* Inner glow */}
                <div className="absolute w-[26px] h-[60px] rounded-[50%_50%_35%_35%] left-1/2 -top-12 -translate-x-1/2 glow-gradient glow-shadow">
                  <div className="absolute w-[70%] h-[60%] left-1/2 -translate-x-1/2 bottom-0 rounded-[50%] bg-black/35" />
                </div>

                {/* Main flame */}
                <div className="absolute w-6 h-[120px] left-1/2 -translate-x-1/2 bottom-full rounded-[50%_50%_20%_20%] origin-bottom flame-gradient animate-flame-move">
                  <div className="absolute w-full h-full rounded-[50%_50%_20%_20%] flame-shadow" />
                </div>
              </div>
            )}

            {/* Smoke when blown out */}
            {!isLit && (
              <>
                <div className="absolute w-2 h-16 left-1/2 -translate-x-1/2 -top-4 bg-gradient-to-t from-gray-300/70 via-gray-400/50 to-transparent rounded-full blur-sm animate-smoke-rise-1" />
                <div className="absolute w-3 h-20 left-1/2 -translate-x-1/2 -top-4 bg-gradient-to-t from-gray-200/60 via-gray-300/40 to-transparent rounded-full blur-md animate-smoke-rise-2" />
                <div className="absolute w-1.5 h-12 left-1/2 -translate-x-1/2 -top-4 bg-gradient-to-t from-white/40 via-gray-200/30 to-transparent rounded-full blur-[2px] animate-smoke-rise-3" />
              </>
            )}
          </div>
        </div>

        {/* Loading text */}
        {isLoading && (
          <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-amber-200/80 font-medium animate-pulse whitespace-nowrap tracking-wider">
            Carregando...
          </p>
        )}
      </div>

      <style>{`
        /* Candle gradients */
        .candle-gradient {
          background: linear-gradient(to bottom, #e48825, #e78e0e, #833c03, #4c1a03 50%, #1c0900);
        }

        .candle-top-gradient {
          border-color: #d47401;
          background: radial-gradient(circle, #eaa121, #8e4901 45%, #b86409 80%);
        }

        .thread-gradient {
          background: linear-gradient(to bottom, #d6994a, #4b232c, #121212, black, #e8bb31 90%);
        }

        .flame-gradient {
          background: linear-gradient(to bottom, white 80%, transparent);
        }

        .glow-gradient {
          background: rgba(0, 133, 255, 0.7);
        }

        /* Shadows */
        .shadow-candle {
          box-shadow: inset 20px -30px 50px 0 rgba(0, 0, 0, 0.4),
                      inset -20px 0 50px 0 rgba(0, 0, 0, 0.4);
        }

        .candle-shadow {
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
          background: radial-gradient(circle, rgba(0, 0, 0, 0.6), transparent 45%);
        }

        .flame-shadow {
          box-shadow: 0 0 15px 0 rgba(247, 93, 0, 0.4),
                      0 -6px 4px 0 rgba(247, 128, 0, 0.7);
        }

        .glow-shadow {
          box-shadow: 0 -40px 30px 0 #dc8a0c,
                      0 40px 50px 0 #dc8a0c,
                      inset 3px 0 2px 0 rgba(0, 133, 255, 0.6),
                      inset -3px 0 2px 0 rgba(0, 133, 255, 0.6);
        }

        /* Blur effect */
        .candle-blur {
          filter: blur(60px);
          -webkit-filter: blur(50px);
        }

        /* Animations */
        @keyframes moveFlame {
          0%, 100% {
            transform: translateX(-50%) rotate(-2deg);
          }
          50% {
            transform: translateX(-50%) rotate(2deg);
          }
        }

        @keyframes enlargeFlame {
          0%, 100% {
            height: 120px;
          }
          50% {
            height: 140px;
          }
        }

        @keyframes blinkIt {
          50% {
            opacity: 0.8;
          }
        }

        @keyframes smokeRise1 {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -60px) scale(2);
            opacity: 0;
          }
        }

        @keyframes smokeRise2 {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translate(-45%, -80px) scale(2.5);
            opacity: 0;
          }
        }

        @keyframes smokeRise3 {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.4;
          }
          100% {
            transform: translate(-52%, -70px) scale(2);
            opacity: 0;
          }
        }

        .animate-flame-move {
          animation: moveFlame 6s linear infinite, enlargeFlame 5s linear infinite;
        }

        .animate-blink-glow {
          animation: blinkIt 0.1s infinite;
        }

        .animate-smoke-rise-1 {
          animation: smokeRise1 1.5s ease-out forwards;
        }

        .animate-smoke-rise-2 {
          animation: smokeRise2 2s ease-out forwards;
        }

        .animate-smoke-rise-3 {
          animation: smokeRise3 1.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CandleLoader;
