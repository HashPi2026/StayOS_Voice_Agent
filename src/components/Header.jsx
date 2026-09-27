import React from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, RotateCcw } from 'lucide-react';

/**
 * Header Component
 * Implements the Top Bar Contract:
 * Zone 1: StayOS Wordmark
 * Zone 2: Navigation Links & Information
 * Zone 3: Audio Toggle & Quick Reset
 */
export default function Header({ 
  currentScreen, 
  onNavigate, 
  soundEnabled, 
  onToggleSound, 
  onReset,
  onOpenHowItWorks 
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8] px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Zone 1: StayOS Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('welcome')}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
          >
            <span className="font-serif text-xl tracking-[0.2em] font-semibold text-[#1A1815] group-hover:text-[#8C6D2B] transition-colors">
              STAYOS
            </span>
            <span className="hidden sm:inline-block ml-3 text-xs tracking-widest text-[#7C756B] uppercase font-sans border-l border-[#DCD5C9] pl-3">
              The Grand Heritage
            </span>
          </button>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5E584F]">
          <button 
            onClick={() => onNavigate('welcome')}
            className={`hover:text-[#1A1815] transition-colors ${currentScreen === 'welcome' ? 'text-[#1A1815] font-semibold' : ''}`}
          >
            Reception
          </button>
          
          <button 
            onClick={() => onNavigate('checkin')}
            className={`hover:text-[#1A1815] transition-colors ${currentScreen === 'checkin' ? 'text-[#1A1815] font-semibold' : ''}`}
          >
            Aria Assistant
          </button>

          <button 
            onClick={onOpenHowItWorks}
            className="hover:text-[#1A1815] transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8C6D2B]" />
            How It Works
          </button>
        </nav>

        {/* Zone 3: Actions (Sound & Reset) */}
        <div className="flex items-center gap-2.5">
          {/* Audio toggle button for speech synthesis */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? "Mute Aria's Voice" : "Unmute Aria's Voice"}
            title={soundEnabled ? "Aria voice enabled (click to mute)" : "Aria voice muted (click to unmute)"}
            className="px-3 py-1.5 text-xs font-medium text-[#4A453E] bg-[#F0EBE1] hover:bg-[#E6DFD2] rounded-md transition-colors flex items-center gap-1.5 border border-[#DDD5C7]"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#8C6D2B]" />
                <span className="hidden sm:inline">Voice On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#8C857B]" />
                <span className="hidden sm:inline">Voice Muted</span>
              </>
            )}
          </button>

          {/* Quick Restart if in check-in */}
          {currentScreen !== 'welcome' && (
            <button
              onClick={onReset}
              title="Restart Check-In"
              className="px-3 py-1.5 text-xs font-medium text-[#6B6357] hover:text-[#1A1815] hover:bg-[#EFEAE0] rounded-md transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
