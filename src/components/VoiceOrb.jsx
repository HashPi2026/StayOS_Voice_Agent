import React from 'react';
import { Mic, MicOff, Volume2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * VoiceOrb Component
 * Represents Aria's visual presence. It dynamically responds to
 * interaction states: idle, listening, processing, speaking, error, and completed.
 */
export default function VoiceOrb({ 
  ariaState, 
  onToggleMic, 
  disabled, 
  liveTranscript,
  micError,
  audioLevel = 0 
}) {
  // Determine helper message based on Aria's current state
  const getStateInfo = () => {
    switch (ariaState) {
      case 'listening':
        return {
          title: "Listening...",
          subtitle: "Speak naturally, Aria is listening to your answer",
          color: "border-[#C5A059] shadow-[0_0_35px_rgba(197,160,89,0.35)] bg-[#FBF7EE]",
          iconColor: "text-[#8C6D2B]",
          badgeClass: "text-[#8C6D2B]"
        };
      case 'processing':
        return {
          title: "Understanding...",
          subtitle: "Aria is processing your information",
          color: "border-[#968265] shadow-[0_0_25px_rgba(150,130,101,0.2)] bg-[#F7F4EE]",
          iconColor: "text-[#69573F]",
          badgeClass: "text-[#69573F]"
        };
      case 'speaking':
        return {
          title: "Aria is speaking...",
          subtitle: "Listen to the virtual receptionist's response",
          color: "border-[#B08D4B] shadow-[0_0_40px_rgba(176,141,75,0.35)] bg-[#FAF5EB]",
          iconColor: "text-[#8C6D2B]",
          badgeClass: "text-[#8C6D2B]"
        };
      case 'completed':
        return {
          title: "Check-in completed",
          subtitle: "All required guest details collected",
          color: "border-[#15803D] shadow-[0_0_20px_rgba(21,128,61,0.2)] bg-[#F0FDF4]",
          iconColor: "text-[#15803D]",
          badgeClass: "text-[#15803D]"
        };
      case 'idle':
      default:
        return {
          title: "Tap to Speak",
          subtitle: "Click the circle to talk with Aria",
          color: "border-[#D6CCBC] hover:border-[#B59F7A] shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white",
          iconColor: "text-[#3D3830]",
          badgeClass: "text-[#70685C]"
        };
    }
  };

  const stateInfo = getStateInfo();

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 select-none">
      
      {/* Orb Container with ripple rings */}
      <div className="relative flex items-center justify-center">
        
        {/* Animated aura rings for listening/speaking states */}
        {ariaState === 'listening' && (
          <div className="absolute w-44 h-44 rounded-full border-2 border-[#C5A059]/40 animate-ping opacity-35" />
        )}
        
        {ariaState === 'speaking' && (
          <div className="absolute w-40 h-40 rounded-full border border-[#B08D4B]/30 animate-pulse opacity-50" />
        )}

        {/* Central Interactive Voice Button */}
        <button
          type="button"
          onClick={onToggleMic}
          disabled={disabled}
          aria-label={ariaState === 'listening' ? 'Stop listening' : 'Start speaking with Aria'}
          style={{
            transform: ariaState === 'listening' && audioLevel > 0 
              ? `scale(${1 + Math.min(audioLevel * 0.4, 0.2)})` 
              : undefined
          }}
          className={`
            relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 
            flex flex-col items-center justify-center transition-all duration-200
            focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C5A059]/40
            cursor-pointer active:scale-95 ${stateInfo.color}
            ${ariaState === 'listening' ? 'animate-aria-listening' : ''}
            ${ariaState === 'speaking' ? 'animate-aria-speaking' : ''}
          `}
        >
          {/* Inner Icon */}
          <div className="flex flex-col items-center justify-center">
            {ariaState === 'listening' && (
              <Mic className={`w-8 h-8 sm:w-9 sm:h-9 ${stateInfo.iconColor}`} />
            )}
            {ariaState === 'processing' && (
              <Loader2 className={`w-8 h-8 sm:w-9 sm:h-9 animate-spin ${stateInfo.iconColor}`} />
            )}
            {ariaState === 'speaking' && (
              <Volume2 className={`w-8 h-8 sm:w-9 sm:h-9 ${stateInfo.iconColor}`} />
            )}
            {ariaState === 'error' && (
              <AlertCircle className={`w-8 h-8 sm:w-9 sm:h-9 ${stateInfo.iconColor}`} />
            )}
            {ariaState === 'completed' && (
              <CheckCircle2 className={`w-8 h-8 sm:w-9 sm:h-9 ${stateInfo.iconColor}`} />
            )}
            {ariaState === 'idle' && (
              <Mic className={`w-8 h-8 sm:w-9 sm:h-9 ${stateInfo.iconColor}`} />
            )}

            {/* Sub-label under mic */}
            <span className="text-[10px] tracking-wider uppercase mt-1 font-medium text-[#7D7569]">
              {ariaState === 'listening' ? 'Active' : 'Aria'}
            </span>
          </div>

          {/* Sound wave bars simulation when speaking or listening */}
          {(ariaState === 'speaking' || ariaState === 'listening') && (
            <div className="absolute -bottom-2 flex items-center gap-1">
              <span className="w-1 h-3 bg-[#B08D4B] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-5 bg-[#8C6D2B] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2.5 bg-[#B08D4B] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </button>
      </div>

      {/* State Text Readout */}
      <div className="mt-5 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-[#1F1D1A]">
          {stateInfo.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#6E6659] mt-0.5 max-w-xs">
          {stateInfo.subtitle}
        </p>

        {liveTranscript ? (
          <div className="mt-3 px-3.5 py-1.5 bg-[#FAF5EB] border border-[#E8DFC0] rounded-full text-xs text-[#8C6D2B] animate-pulse max-w-xs truncate mx-auto shadow-xs">
            Hearing: &ldquo;{liveTranscript}&rdquo;
          </div>
        ) : null}
      </div>

    </div>
  );
}
