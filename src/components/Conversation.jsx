import React, { useEffect, useRef } from 'react';
import { Sparkles, User, CornerDownLeft } from 'lucide-react';

/**
 * Conversation Component
 * Displays a clean, professional dialogue transcript between Aria and the guest.
 * Maintains an auto-scrolling container and visual hierarchy.
 */
export default function Conversation({ 
  messages, 
  guestName, 
  onQuickReply,
  quickReplies = []
}) {
  const messagesEndRef = useRef(null);

  // Auto-scroll whenever a new message is appended
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-sm rounded-xl border border-[#E8E2D8] shadow-sm overflow-hidden">
      
      {/* Conversation Header */}
      <div className="px-5 py-3 border-b border-[#EFE9DF] bg-[#FAF8F5]/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          <h4 className="text-xs uppercase tracking-widest font-semibold text-[#574F44]">
            Reception Dialogue
          </h4>
        </div>
        <span className="text-xs text-[#8C8476]">
          {messages.length} {messages.length === 1 ? 'exchange' : 'exchanges'}
        </span>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[380px] sm:max-h-[440px]">
        {messages.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center text-[#8C8476] px-4">
            <Sparkles className="w-6 h-6 text-[#C5A059] mb-2 opacity-60" />
            <p className="text-sm font-medium text-[#4A453E]">Welcome to StayOS Reception</p>
            <p className="text-xs mt-1 max-w-xs">
              Tap the microphone to speak with Aria. Your natural conversation will seamlessly complete check-in.
            </p>
          </div>
        ) : (
          messages.map((item) => {
            const isAria = item.sender === 'aria';
            return (
              <div 
                key={item.id} 
                className={`flex flex-col ${isAria ? 'items-start' : 'items-end'}`}
              >
                {/* Sender Tag */}
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  {isAria ? (
                    <>
                      <Sparkles className="w-3 h-3 text-[#8C6D2B]" />
                      <span className="text-[11px] font-medium text-[#7A6A53] tracking-wide">
                        Aria · Receptionist
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-medium text-[#6B6457] tracking-wide">
                        {guestName || 'Guest'}
                      </span>
                      <User className="w-3 h-3 text-[#7B7265]" />
                    </>
                  )}
                  <span className="text-[10px] text-[#A69E90] ml-1">
                    {item.time || 'Just now'}
                  </span>
                </div>

                {/* Message Bubble with Luxury Styling */}
                <div 
                  className={`
                    max-w-[88%] sm:max-w-[82%] px-4 py-3 rounded-xl text-sm leading-relaxed
                    ${isAria 
                      ? 'bg-[#F5EFE6] text-[#2C2720] rounded-tl-sm border border-[#E8DFC0]/60' 
                      : 'bg-[#2B2723] text-[#F9F7F4] rounded-tr-sm shadow-sm'
                    }
                  `}
                >
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Replies / Shortcuts (Useful for demo & college viva evaluation) */}
      {quickReplies.length > 0 && (
        <div className="p-3 bg-[#FAF8F5]/90 border-t border-[#EFE9DF]">
          <div className="text-[11px] text-[#7C756B] mb-1.5 flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3 text-[#8C6D2B]" />
            <span>Suggested replies for easy testing:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => onQuickReply(reply)}
                className="text-xs px-2.5 py-1 bg-white hover:bg-[#F2ECE1] text-[#3D372E] border border-[#DDD6C8] rounded-md transition-colors text-left"
              >
                "{reply}"
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
