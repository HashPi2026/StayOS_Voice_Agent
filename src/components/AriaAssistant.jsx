import React, { useState } from 'react';
import { Send, Keyboard, X, Sparkles, FastForward, CheckSquare, ExternalLink } from 'lucide-react';
import VoiceOrb from './VoiceOrb.jsx';

/**
 * AriaAssistant Component
 * Contains the primary voice receptionist interaction area,
 * voice orb controls, type-instead fallback, and viva demo controls.
 */
export default function AriaAssistant({
  ariaState,
  onToggleMic,
  onSendMessage,
  onEndCheckIn,
  onSimulateStep,
  onFillAllDemo,
  hasCollectedAllRequired,
  liveTranscript,
  micError,
  audioLevel
}) {
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Handle submitting typed text to Aria
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!typedText.trim()) return;
    onSendMessage(typedText.trim());
    setTypedText('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E8E2D8] shadow-sm p-6 flex flex-col justify-between h-full">
      
      {/* Receptionist Heading */}
      <div className="text-center pb-2 border-b border-[#EFE9DF]">
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C6D2B]">
          StayOS AI Concierge
        </span>
        <h2 className="text-2xl font-serif text-[#1F1D1A] mt-1 font-semibold tracking-tight">
          Aria
        </h2>
        <p className="text-xs text-[#6B6357] mt-0.5">
          Your Virtual Hotel Receptionist
        </p>
      </div>

      {/* Main Interactive Voice Orb Area */}
      <div className="my-auto py-2">
        <VoiceOrb 
          ariaState={ariaState} 
          onToggleMic={onToggleMic} 
          liveTranscript={liveTranscript}
          micError={micError}
          audioLevel={audioLevel}
        />
      </div>

      {/* Primary Interaction Controls */}
      <div className="space-y-3 pt-3 border-t border-[#EFE9DF]">
        
        {/* Type Instead Accordion / Input Bar */}
        {showTypeInput ? (
          <form onSubmit={handleTextSubmit} className="relative">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type your response to Aria..."
                className="w-full text-sm bg-white border border-[#D5CDC0] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-lg px-3.5 py-2.5 outline-none text-[#1F1D1A] placeholder:text-[#9E9587] transition-all"
                autoFocus
              />
              
              <button
                type="submit"
                disabled={!typedText.trim()}
                className="px-3 py-2.5 bg-[#2B2723] hover:bg-[#433D37] disabled:opacity-40 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
                aria-label="Send message to Aria"
              >
                <Send className="w-4 h-4 text-[#F5EFE6]" />
              </button>

              <button
                type="button"
                onClick={() => setShowTypeInput(false)}
                className="p-2 text-[#7C7467] hover:text-[#1F1D1A] transition-colors rounded-lg"
                aria-label="Close text input"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-[#8C8476] mt-1 pl-1">
              Accessibility mode: speak or type naturally at any point.
            </p>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setShowTypeInput(true)}
              className="text-[#595145] hover:text-[#1F1D1A] font-medium transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-md hover:bg-[#F2ECE1]"
            >
              <Keyboard className="w-3.5 h-3.5 text-[#8C6D2B]" />
              <span>Type instead</span>
            </button>

            <span className="text-[#D8D0C3]">|</span>

            <button
              onClick={onEndCheckIn}
              className="text-[#7A7163] hover:text-[#B91C1C] transition-colors py-1 px-2.5 rounded-md hover:bg-[#FEE2E2]/40"
            >
              End Check-In
            </button>
          </div>
        )}

        {/* Demo Viva Testing Controls */}
        <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EBE4D6]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#736A5D] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              Evaluation Simulator
            </span>
            <span className="text-[10px] text-[#8F8678]">Viva demonstration tools</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onSimulateStep}
              className="text-xs font-medium py-1.5 px-2 bg-white hover:bg-[#F5EFE6] border border-[#DDD5C6] rounded text-[#38332A] transition-colors flex items-center justify-center gap-1 truncate"
              title="Advances one check-in step with simulated dialogue"
            >
              <FastForward className="w-3 h-3 text-[#8C6D2B]" />
              <span>Next Field Step</span>
            </button>

            <button
              onClick={onFillAllDemo}
              className="text-xs font-medium py-1.5 px-2 bg-[#2B2723] hover:bg-[#433D37] text-white rounded transition-colors flex items-center justify-center gap-1 truncate"
              title="Fills all required fields immediately to test confirmation"
            >
              <CheckSquare className="w-3 h-3 text-[#C5A059]" />
              <span>Instant Fill All</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
