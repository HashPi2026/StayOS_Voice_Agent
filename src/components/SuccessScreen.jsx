import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Key, 
  Wifi, 
  Coffee, 
  Clock, 
  Sparkles, 
  RotateCcw,
  Smartphone,
  Info
} from 'lucide-react';

/**
 * SuccessScreen Component
 * Displayed upon completed check-in.
 * Delivers the guest's digital room key, WiFi details, and stay amenities.
 */
export default function SuccessScreen({ 
  guestData, 
  bookingRef, 
  onFinish 
}) {
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

  // Extract first name for a welcoming personal touch
  const firstName = guestData.fullName 
    ? guestData.fullName.trim().split(' ')[0] 
    : 'Guest';

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Central Success Badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3EEDF] border-2 border-[#C5A059] mb-4 shadow-sm animate-bounce">
          <CheckCircle2 className="w-8 h-8 text-[#8C6D2B]" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6D2B] block mb-1">
          StayOS Guest Concierge
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F1D1A]">
          Check-In Complete
        </h2>
        <p className="text-lg text-[#524B40] font-medium mt-1">
          You're all set, {firstName}.
        </p>
        <p className="text-xs sm:text-sm text-[#7A7367] mt-1 max-w-md mx-auto">
          Your check-in has been successfully completed. Welcome to StayOS.
        </p>

        {bookingRef && (
          <div className="mt-2 text-xs text-[#8C8476]">
            Confirmation Reference: <span className="font-mono font-medium text-[#1F1D1A]">{bookingRef}</span>
          </div>
        )}
      </div>

      {/* Luxury Digital Room Key Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#25221E] via-[#2F2A25] to-[#1E1B17] text-[#FAF7F2] p-6 sm:p-8 shadow-xl border border-[#484137] overflow-hidden mb-6">
        
        {/* Subtle Decorative Gold Accent Ring */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-[#C5A059]/20 pointer-events-none" />
        
        {/* Key Card Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
              Digital Room Key
            </span>
            <span className="font-serif text-lg tracking-wider text-[#FAF7F2]">
              THE GRAND HERITAGE
            </span>
          </div>
          <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#C5A059]">
            <Key className="w-5 h-5" />
          </div>
        </div>

        {/* Room Details Grid */}
        <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Room Number
            </span>
            <span className="text-2xl font-serif font-bold text-[#FAF7F2] mt-0.5 block">
              408
            </span>
          </div>

          <div>
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Suite Type
            </span>
            <span className="text-sm font-medium text-[#FAF7F2] mt-1 block">
              Deluxe King
            </span>
          </div>

          <div>
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Floor
            </span>
            <span className="text-sm font-medium text-[#FAF7F2] mt-1 block">
              4th Floor
            </span>
          </div>

          <div>
            <span className="text-[10px] text-white/50 uppercase tracking-wider block">
              Elevator Access
            </span>
            <span className="text-sm font-medium text-[#FAF7F2] mt-1 block">
              East Wing
            </span>
          </div>
        </div>

        {/* Card Footer: Guest & NFC Readiness */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#C5A059]" />
            <span>NFC Tap to unlock room door active</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/40 block">Guest of Honor</span>
            <span className="font-medium text-[#FAF7F2]">{guestData.fullName || 'Registered Guest'}</span>
          </div>
        </div>

      </div>

      {/* Guest Essentials: WiFi & Concierge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        
        {/* High-Speed Wi-Fi */}
        <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#FAF5EB] text-[#8C6D2B] shrink-0">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1F1D1A]">High-Speed Wi-Fi</h4>
            <p className="text-xs text-[#7A7265] mt-0.5">Complimentary 1Gbps throughout hotel</p>
            <div className="mt-2 text-xs bg-[#FAF8F5] px-2.5 py-1.5 rounded border border-[#EFE9DF] inline-block">
              Network: <span className="font-medium text-[#1F1D1A]">GrandHeritage_Guest</span>
            </div>
          </div>
        </div>

        {/* Breakfast & Dining */}
        <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#FAF5EB] text-[#8C6D2B] shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1F1D1A]">Dining & Breakfast</h4>
            <p className="text-xs text-[#7A7265] mt-0.5">The Terrace Restaurant · Level 1</p>
            <div className="mt-2 text-xs text-[#8C6D2B] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Served 06:30 – 10:30 AM</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onFinish}
          className="w-full sm:w-auto px-8 py-3 bg-[#2B2723] hover:bg-[#433D37] text-white text-sm font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-[#C5A059]" />
          <span>Finish & New Check-In</span>
        </button>

        <button
          onClick={() => setShowAmenitiesModal(true)}
          className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F5EFE6] text-[#3A342B] border border-[#DDD5C6] text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-[#8C6D2B]" />
          <span>Need anything else?</span>
        </button>
      </div>

      {/* Concierge Services Modal */}
      {showAmenitiesModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-[#E8E2D8] shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DF]">
              <h3 className="font-serif text-lg font-semibold text-[#1F1D1A]">
                Hotel Concierge Services
              </h3>
              <button 
                onClick={() => setShowAmenitiesModal(false)}
                className="text-[#8C8476] hover:text-[#1F1D1A] text-sm"
              >
                Close
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#544D42]">
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                <strong className="block text-sm font-semibold text-[#1F1D1A] mb-0.5">Luggage Assistance</strong>
                Our bellhop team is ready to deliver your luggage directly to Room 408.
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                <strong className="block text-sm font-semibold text-[#1F1D1A] mb-0.5">Valet & Parking</strong>
                Your vehicle has been registered under your room number.
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                <strong className="block text-sm font-semibold text-[#1F1D1A] mb-0.5">Late Check-Out</strong>
                Check-out is standard at 11:00 AM. Speak with Aria or reception for late departure requests.
              </div>
            </div>

            <button
              onClick={() => setShowAmenitiesModal(false)}
              className="w-full mt-2 py-2.5 bg-[#2B2723] hover:bg-[#433D37] text-white text-xs font-medium rounded-lg transition-colors"
            >
              Back to Room Key
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
