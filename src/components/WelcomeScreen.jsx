import React from 'react';
import { Sparkles, Mic, ShieldCheck, Key, ArrowRight, HelpCircle } from 'lucide-react';

/**
 * WelcomeScreen Component
 * The initial landing and reception portal.
 * Welcomes the guest to the hotel and introduces Aria.
 */
export default function WelcomeScreen({ onStartCheckIn, onOpenHowItWorks }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 flex flex-col items-center text-center">
      
      {/* Luxury Hotel Tagline */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EDE2] border border-[#E2D8C6] text-[#786645] text-xs font-medium mb-6">
        <Sparkles className="w-3.5 h-3.5 text-[#8C6D2B]" />
        <span className="tracking-wide">AI-Powered Hotel Guest Check-In</span>
      </div>

      {/* Main Headlines */}
      <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1A17] tracking-tight max-w-3xl leading-[1.15]">
        Welcome to StayOS
      </h1>

      <p className="text-lg sm:text-xl font-serif text-[#635742] mt-3 font-normal">
        Your seamless hotel check-in, powered by AI.
      </p>

      <p className="text-sm sm:text-base text-[#6B6357] mt-4 max-w-xl leading-relaxed">
        Meet Aria, your virtual hotel receptionist. Simply speak naturally and she'll guide you through your check-in.
      </p>

      {/* Primary Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
        <button
          onClick={onStartCheckIn}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#2B2723] hover:bg-[#433D37] text-white font-medium rounded-xl text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Start Check-In</span>
          <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={onOpenHowItWorks}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F7F3EB] text-[#38332A] border border-[#DDD5C6] font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-[#8C6D2B]" />
          <span>How it works</span>
        </button>
      </div>

      {/* Hotel Value Pillars */}
      <div className="mt-14 w-full grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
        
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8E2D8] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center mb-4 border border-[#EFE5D0]">
            <Mic className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-semibold text-base text-[#1F1D1A]">
            Voice-First Simplicity
          </h3>
          <p className="text-xs text-[#6B6357] mt-1.5 leading-relaxed">
            Speak naturally like you would at any five-star front desk. Aria listens and handles the rest.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8E2D8] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center mb-4 border border-[#EFE5D0]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-semibold text-base text-[#1F1D1A]">
            Zero Long Forms
          </h3>
          <p className="text-xs text-[#6B6357] mt-1.5 leading-relaxed">
            No tedious forms or repetitive typing. Your information is organized cleanly in real time.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8E2D8] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center mb-4 border border-[#EFE5D0]">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-semibold text-base text-[#1F1D1A]">
            Instant Digital Key
          </h3>
          <p className="text-xs text-[#6B6357] mt-1.5 leading-relaxed">
            Verify your details and receive your room assignment and digital credentials immediately.
          </p>
        </div>

      </div>

      {/* Hotel Property Notice */}
      <div className="mt-12 text-xs text-[#8C8476] border-t border-[#EFE9DF] pt-6 flex items-center gap-4">
        <span>The Grand Heritage Hotel & Suites</span>
        <span>·</span>
        <span>StayOS Front-Desk Edition</span>
        <span>·</span>
        <span>24/7 Virtual Concierge</span>
      </div>

    </div>
  );
}
