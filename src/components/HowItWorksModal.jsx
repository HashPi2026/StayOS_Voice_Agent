import React from 'react';
import { X, Mic, Cpu, CheckCircle2, Key, Database, Workflow } from 'lucide-react';

/**
 * HowItWorksModal Component
 * Clearly outlines the system architecture and user flow.
 * Specifically crafted to assist during academic viva evaluations.
 */
export default function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl border border-[#E8E2D8] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#EFE9DF] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C6D2B]">
              System Architecture & Flow
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1F1D1A]">
              How StayOS Works
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7C7467] hover:text-[#1F1D1A] rounded-lg hover:bg-[#EFE9DF] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#4A443B]">
          
          {/* Concept Summary */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE4D5]">
            <h4 className="font-semibold text-[#1F1D1A] mb-1">Project Concept</h4>
            <p className="text-xs leading-relaxed text-[#6E6659]">
              StayOS is an AI-powered hotel guest check-in system where guests interact with a virtual 
              receptionist named <strong>Aria</strong> using natural voice conversation. 
              Instead of filling out traditional lengthy paper or digital forms, guests speak naturally 
              while Aria intelligently extracts the required guest profile fields in real-time.
            </p>
          </div>

          {/* 4-Step Guest Flow */}
          <div>
            <h4 className="font-semibold text-[#1F1D1A] mb-3 text-xs uppercase tracking-wider text-[#8C6D2B]">
              Guest Experience Journey
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-[#EFE9DF] bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center font-bold">1</div>
                  <strong className="text-[#1F1D1A]">Natural Voice Dialogue</strong>
                </div>
                <p className="text-[#6E6659]">
                  Guest taps the mic or speaks naturally. Aria introduces herself and asks conversational questions.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#EFE9DF] bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center font-bold">2</div>
                  <strong className="text-[#1F1D1A]">Real-Time Progress</strong>
                </div>
                <p className="text-[#6E6659]">
                  As information is spoken, required fields (Name, Phone, Email, Address, etc.) are verified and tracked dynamically.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#EFE9DF] bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center font-bold">3</div>
                  <strong className="text-[#1F1D1A]">Explicit Verification</strong>
                </div>
                <p className="text-[#6E6659]">
                  Guest reviews all captured details on the Confirmation Screen with the option to edit before final submission.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#EFE9DF] bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#FAF5EB] text-[#8C6D2B] flex items-center justify-center font-bold">4</div>
                  <strong className="text-[#1F1D1A]">Digital Room Key</strong>
                </div>
                <p className="text-[#6E6659]">
                  Upon confirmation, the system creates the guest record and issues room credentials and hotel amenities.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Architecture Stack */}
          <div className="pt-2 border-t border-[#EFE9DF]">
            <h4 className="font-semibold text-[#1F1D1A] mb-3 text-xs uppercase tracking-wider text-[#8C6D2B]">
              Integrated System Architecture
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#FAF8F5] rounded-lg">
                <Mic className="w-4 h-4 text-[#8C6D2B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F1D1A]">Vapi Voice Platform:</strong>
                  <span className="text-[#6E6659] ml-1">Provides low-latency speech-to-text, assistant conversational turns, and text-to-speech.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#FAF8F5] rounded-lg">
                <Workflow className="w-4 h-4 text-[#8C6D2B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F1D1A]">n8n Automation Engine:</strong>
                  <span className="text-[#6E6659] ml-1">Manages webhooks, backend session state, and payload orchestration.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#FAF8F5] rounded-lg">
                <Cpu className="w-4 h-4 text-[#8C6D2B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F1D1A]">OpenRouter AI Models:</strong>
                  <span className="text-[#6E6659] ml-1">Powers natural language understanding to extract structured guest parameters.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#FAF8F5] rounded-lg">
                <Database className="w-4 h-4 text-[#8C6D2B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F1D1A]">Google Sheets Database:</strong>
                  <span className="text-[#6E6659] ml-1">Persists finalized guest check-in records for hotel reception management.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#EFE9DF] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2B2723] hover:bg-[#433D37] text-white text-xs font-medium rounded-lg transition-colors"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
