import React, { useState } from 'react';
import { Check, Edit3, ArrowLeft, ShieldCheck, Hotel, Calendar, Key, AlertCircle } from 'lucide-react';

/**
 * Confirmation Component
 * Review screen presented when all required information has been collected.
 * The guest can review all 10 fields, make adjustments, and explicitly confirm.
 */
export default function Confirmation({
  guestData,
  onUpdateGuestData,
  onConfirmCheckIn,
  onBackToDialogue,
  isSubmitting
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...guestData });
  const [errorMsg, setErrorMsg] = useState('');

  // Handle local edit field changes
  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Save edits back to parent state
  const handleSaveEdits = (e) => {
    e.preventDefault();
    // Validate that required fields are not empty
    const requiredKeys = ['fullName', 'phone', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
    const missing = requiredKeys.filter((key) => !editFormData[key] || editFormData[key].trim() === '');
    
    if (missing.length > 0) {
      setErrorMsg('Please ensure all mandatory contact fields are completed.');
      return;
    }

    setErrorMsg('');
    onUpdateGuestData(editFormData);
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setEditFormData({ ...guestData });
    setIsEditing(false);
    setErrorMsg('');
  };

  const fieldsDisplayList = [
    { key: 'fullName', label: 'Full Name', required: true },
    { key: 'phone', label: 'Phone Number', required: true },
    { key: 'email', label: 'Email Address', required: true },
    { key: 'address', label: 'Address', required: true },
    { key: 'city', label: 'City', required: true },
    { key: 'state', label: 'State', required: true },
    { key: 'zipCode', label: 'ZIP Code', required: true },
    { key: 'country', label: 'Country', required: true },
    { key: 'company', label: 'Company', required: false },
    { key: 'birthDate', label: 'Date of Birth', required: false },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      
      {/* Navigation Return */}
      <div className="mb-4">
        <button
          onClick={onBackToDialogue}
          className="text-xs font-medium text-[#7C7467] hover:text-[#1F1D1A] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Aria Conversation</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 border-b border-[#EFE9DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C6D2B]">
              Step 2 · Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F1D1A] mt-1">
              Review Your Details
            </h2>
            <p className="text-sm text-[#6E6659] mt-1">
              Please verify the information collected by Aria before completing check-in.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-xs font-medium text-[#38332A] bg-white border border-[#DDD5C6] hover:bg-[#F5EFE6] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#8C6D2B]" />
                <span>Edit Details</span>
              </button>
            ) : (
              <button
                onClick={cancelEdits}
                className="px-4 py-2 text-xs font-medium text-[#6B6357] hover:bg-[#EFEAE0] rounded-lg transition-colors"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* Room & Stay Overview Card */}
        <div className="px-6 sm:px-8 py-5 bg-[#F9F7F3] border-b border-[#EFE9DF] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#8C6D2B] shrink-0">
              <Hotel className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#8C8476] uppercase tracking-wider text-[10px] block">Room Category</span>
              <span className="font-semibold text-[#1F1D1A] text-sm">Deluxe King Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#8C6D2B] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#8C8476] uppercase tracking-wider text-[10px] block">Stay Duration</span>
              <span className="font-semibold text-[#1F1D1A] text-sm">3 Nights · Room 408</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#8C6D2B] shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#8C8476] uppercase tracking-wider text-[10px] block">Key Access</span>
              <span className="font-semibold text-[#1F1D1A] text-sm">Digital & Card Ready</span>
            </div>
          </div>
        </div>

        {/* Guest Details Section */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isEditing ? (
            /* Editing Form */
            <form onSubmit={handleSaveEdits} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldsDisplayList.map(({ key, label, required }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-[#4A443B] mb-1">
                      {label} {required ? <span className="text-[#C5A059]">*</span> : <span className="text-[#A39B8E]">(Optional)</span>}
                    </label>
                    <input
                      type="text"
                      value={editFormData[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full text-sm bg-[#FAF8F5] border border-[#DDD5C6] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-lg px-3 py-2 outline-none text-[#1F1D1A]"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EFE9DF]">
                <button
                  type="button"
                  onClick={cancelEdits}
                  className="px-4 py-2 text-xs font-medium text-[#6B6357] hover:bg-[#EFEAE0] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium bg-[#2B2723] hover:bg-[#433D37] text-white rounded-lg transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* Read-Only Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {fieldsDisplayList.map(({ key, label, required }) => {
                const value = guestData[key];
                const hasValue = Boolean(value && value.trim() !== '');

                return (
                  <div key={key} className="py-2 border-b border-[#F2ECE1]">
                    <div className="flex items-center justify-between text-xs text-[#7A7265] mb-0.5">
                      <span>{label}</span>
                      <span className="text-[10px] text-[#A69E90]">
                        {required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[#1F1D1A]">
                      {hasValue ? value : <span className="text-[#A8A093] italic">Not provided</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer & Confirmation Action */}
        <div className="bg-[#FAF8F5] px-6 sm:px-8 py-5 border-t border-[#EFE9DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#7A7265]">
            <ShieldCheck className="w-4 h-4 text-[#8C6D2B]" />
            <span>I confirm that these details are accurate for this stay.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onConfirmCheckIn}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 bg-[#2B2723] hover:bg-[#433D37] disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Check-In...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#C5A059]" />
                  <span>Confirm & Complete Check-In</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
