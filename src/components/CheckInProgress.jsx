import React from 'react';
import { CheckCircle2, Circle, ShieldCheck } from 'lucide-react';

/**
 * CheckInProgress Component
 * Displays a live summary of all mandatory and optional check-in details.
 * Features friendly human labels, visual completion indicators, and progress tracking.
 */
export default function CheckInProgress({ guestData, onFieldClick }) {
  // Required fields specification
  const requiredFields = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'email', label: 'Email Address' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'ZIP Code' },
    { key: 'country', label: 'Country' }
  ];

  // Optional fields specification
  const optionalFields = [
    { key: 'company', label: 'Company' },
    { key: 'birthDate', label: 'Date of Birth' }
  ];

  // Calculate required completion percentage
  const completedRequiredCount = requiredFields.filter(
    (field) => Boolean(guestData[field.key] && guestData[field.key].trim() !== '')
  ).length;

  const totalRequired = requiredFields.length;
  const progressPercent = Math.round((completedRequiredCount / totalRequired) * 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E8E2D8] shadow-sm p-5 flex flex-col justify-between">
      
      {/* Title & Progress Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DF]">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-[#1F1D1A]">
              Check-In Progress
            </h3>
            <p className="text-xs text-[#7A7367] mt-0.5">
              Live guest details parsed by Aria
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-xs font-semibold text-[#8C6D2B] tabular-nums">
              {completedRequiredCount}/{totalRequired}
            </span>
            <span className="text-[11px] text-[#8C8476] ml-1">Required</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-[#EFE9DF] h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-[#C5A059] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Required Fields Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D2B]">
              Mandatory Details
            </span>
            <span className="text-[10px] text-[#A69E90]">Required for room key</span>
          </div>

          <div className="space-y-1.5">
            {requiredFields.map(({ key, label }) => {
              const value = guestData[key];
              const isFilled = Boolean(value && value.trim() !== '');

              return (
                <div
                  key={key}
                  onClick={() => onFieldClick && onFieldClick(key)}
                  className={`
                    flex items-center justify-between p-2 rounded-lg text-xs transition-colors
                    ${isFilled ? 'bg-[#F9F7F3] border border-[#EBE4D5]/60' : 'bg-transparent text-[#6D6559]'}
                  `}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isFilled ? (
                      <CheckCircle2 className="w-4 h-4 text-[#8C6D2B] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#C9BFB0] shrink-0" />
                    )}
                    <span className={`font-medium ${isFilled ? 'text-[#1F1D1A]' : 'text-[#6D6559]'}`}>
                      {label}
                    </span>
                  </div>

                  <div className="text-right pl-2 max-w-[55%] truncate">
                    {isFilled ? (
                      <span className="text-[#3A352D] font-normal truncate block">
                        {value}
                      </span>
                    ) : (
                      <span className="text-[#A39B8E] italic text-[11px]">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Fields Section */}
        <div className="mt-4 pt-3 border-t border-[#EFE9DF]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#787166]">
              Optional Information
            </span>
            <span className="text-[10px] text-[#A69E90]">For customized stay</span>
          </div>

          <div className="space-y-1.5">
            {optionalFields.map(({ key, label }) => {
              const value = guestData[key];
              const isFilled = Boolean(value && value.trim() !== '');

              return (
                <div
                  key={key}
                  className={`
                    flex items-center justify-between p-2 rounded-lg text-xs transition-colors
                    ${isFilled ? 'bg-[#F9F7F3] border border-[#EBE4D5]/60' : 'bg-transparent text-[#7A7367]'}
                  `}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isFilled ? (
                      <CheckCircle2 className="w-4 h-4 text-[#8C6D2B] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#D8D0C3] shrink-0" />
                    )}
                    <span className={isFilled ? 'text-[#1F1D1A] font-medium' : 'text-[#7A7367]'}>
                      {label}
                    </span>
                  </div>

                  <div className="text-right pl-2 max-w-[55%] truncate">
                    {isFilled ? (
                      <span className="text-[#3A352D] truncate block">
                        {value}
                      </span>
                    ) : (
                      <span className="text-[#B5AD9F] italic text-[11px]">
                        Not provided
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security note footer */}
      <div className="mt-5 pt-3 border-t border-[#EFE9DF] flex items-center gap-2 text-[11px] text-[#7A7265]">
        <ShieldCheck className="w-4 h-4 text-[#8C6D2B] shrink-0" />
        <span>Encrypted StayOS guest protocol</span>
      </div>

    </div>
  );
}
