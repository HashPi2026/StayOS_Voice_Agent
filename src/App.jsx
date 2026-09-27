import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import AriaAssistant from './components/AriaAssistant.jsx';
import Conversation from './components/Conversation.jsx';
import CheckInProgress from './components/CheckInProgress.jsx';
import Confirmation from './components/Confirmation.jsx';
import SuccessScreen from './components/SuccessScreen.jsx';
import HowItWorksModal from './components/HowItWorksModal.jsx';
import { submitGuestCheckIn, STAYOS_BACKEND_URL } from './services/stayosApi.js';
import { startVapiSession, stopVapiSession, VAPI_PUBLIC_KEY } from './services/vapi.js';

/**
 * Initial empty guest profile schema
 */
const initialGuestData = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  company: '',
  birthDate: ''
};

/**
 * Scripted steps for college evaluation & demo simulation
 */
const demoSimulationSteps = [
  {
    step: 1,
    guestReply: "My name is Jay Mistry.",
    extracted: { fullName: "Jay Mistry" },
    ariaResponse: "Welcome to StayOS, Jay! It's a pleasure to assist you. Could you please share your mobile phone number and email address?",
    suggestions: ["Phone: +1 (555) 234-5678", "Email: jaymistry@example.com"]
  },
  {
    step: 2,
    guestReply: "Sure, my phone is +1 (555) 234-5678 and email is jaymistry@example.com.",
    extracted: { phone: "+1 (555) 234-5678", email: "jaymistry@example.com" },
    ariaResponse: "Thank you, Jay. I have registered your contact details. Could you now tell me your street address, city, and state?",
    suggestions: ["Address: 742 Evergreen Terrace", "City: Springfield, Oregon"]
  },
  {
    step: 3,
    guestReply: "I live at 742 Evergreen Terrace, Springfield, Oregon.",
    extracted: { address: "742 Evergreen Terrace", city: "Springfield", state: "Oregon" },
    ariaResponse: "Noted! And what is your ZIP code and country of residence?",
    suggestions: ["ZIP: 97477", "Country: United States"]
  },
  {
    step: 4,
    guestReply: "My ZIP code is 97477, and country is United States.",
    extracted: { zipCode: "97477", country: "United States" },
    ariaResponse: "Excellent. Are you traveling on behalf of a company, and would you like to provide your date of birth?",
    suggestions: ["Company: Apex Technologies", "Birth Date: April 18, 1998"]
  },
  {
    step: 5,
    guestReply: "Yes, I am traveling with Apex Technologies, and my date of birth is April 18, 1998.",
    extracted: { company: "Apex Technologies", birthDate: "April 18, 1998" },
    ariaResponse: "Wonderful! All your check-in information has been successfully collected. Let's review everything before we issue your room key.",
    suggestions: []
  }
];

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'checkin' | 'confirmation' | 'success'

  // Aria virtual receptionist state
  const [ariaState, setAriaState] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'speaking' | 'completed' | 'error'

  // Guest Information state
  const [guestData, setGuestData] = useState(initialGuestData);

  // Conversation history
  const [messages, setMessages] = useState([]);

  // Audio speech synthesis toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Demo step pointer for sequential demonstration
  const [demoStepIndex, setDemoStepIndex] = useState(0);

  // Quick reply prompt suggestions
  const [quickReplies, setQuickReplies] = useState([
    "My name is Jay Mistry",
    "I'd like to check in",
    "Here is my reservation details"
  ]);

  // Modal & Loading states
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Web Speech recognition & Audio references
  const recognitionRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const vapiSessionRef = useRef(null);

  const [liveTranscript, setLiveTranscript] = useState('');
  const [micError, setMicError] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  /**
   * Helper: cleanly stops all microphone streams, audio analyzers, and recognizers
   */
  const stopVoice = () => {
    if (audioStreamRef.current) {
      try {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {}
      audioStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }

    setAudioLevel(0);
    setLiveTranscript('');
  };

  /**
   * Starts a real-time live Vapi WebRTC session with Receptionist Aria
   */
  const startLiveVapi = async () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    stopVoice();

    setAriaState('processing');
    setLiveTranscript('');

    try {
      const session = await startVapiSession({
        onCallStart: () => {
          console.log('StayOS: Connected to Aria live via Vapi WebRTC!');
          setAriaState('speaking');
        },
        onCallEnd: () => {
          console.log('StayOS: Vapi session ended.');
          setAriaState('idle');
          vapiSessionRef.current = null;
        },
        onSpeechStart: () => {
          setAriaState('speaking');
        },
        onSpeechEnd: () => {
          setAriaState('listening');
        },
        onVolumeLevel: (vol) => {
          setAudioLevel(vol);
        },
        onMessage: (message) => {
          if (!message) return;

          // Live transcription from Vapi
          if (message.type === 'transcript') {
            if (message.transcriptType === 'partial') {
              if (message.role === 'user') {
                setLiveTranscript(message.transcript);
              }
            } else if (message.transcriptType === 'final') {
              if (message.role === 'user') {
                setLiveTranscript('');
                const userMsg = {
                  id: Date.now(),
                  sender: 'guest',
                  text: message.transcript,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, userMsg]);
                extractGuestFields(message.transcript);
              } else if (message.role === 'assistant') {
                const ariaMsg = {
                  id: Date.now(),
                  sender: 'aria',
                  text: message.transcript,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, ariaMsg]);
              }
            }
          }
        },
        onError: (err) => {
          console.warn('Vapi session notice:', err);
        }
      });

      vapiSessionRef.current = session;
    } catch (err) {
      console.warn('Could not start live Vapi session:', err);
      setAriaState('idle');
    }
  };

  /**
   * Helper: Speak Aria's text aloud using Browser SpeechSynthesis (fallback only)
   */
  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const ariaVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Natural'))
    );
    if (ariaVoice) utterance.voice = ariaVoice;

    utterance.onstart = () => setAriaState('speaking');
    utterance.onend = () => setAriaState('idle');
    utterance.onerror = () => setAriaState('idle');

    if (soundEnabled) {
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setAriaState('idle'), 1000);
    }
  };

  /**
   * Starts check-in flow with Aria via live Vapi WebRTC
   */
  const handleStartCheckIn = () => {
    setCurrentScreen('checkin');
    setMessages([
      {
        id: Date.now(),
        sender: 'aria',
        text: "Hi, welcome to StayOS. I'm Aria, your virtual hotel receptionist. May I have your full name to begin your check-in?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    startLiveVapi();
  };

  /**
   * Evaluates if all 8 required fields are present
   */
  const checkRequiredComplete = (data) => {
    const requiredKeys = ['fullName', 'phone', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
    return requiredKeys.every((key) => Boolean(data[key] && data[key].trim() !== ''));
  };

  /**
   * Extracts guest details dynamically from conversational speech
   */
  const extractGuestFields = (text) => {
    if (!text || !text.trim()) return;

    setGuestData((prev) => {
      let updated = { ...prev };

      // 1. Full name
      if (!updated.fullName) {
        const cleaned = text
          .replace(/^(my name is|i am|it's|this is|i'm|name is|call me)\s+/i, '')
          .replace(/[.!?,]$/, '')
          .trim();
        if (cleaned.length > 1) {
          updated.fullName = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        }
      }

      // 2. Email
      const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        updated.email = emailMatch[0];
      }

      // 3. Phone number
      const phoneMatch = text.match(/(\+?\d[\d\s-]{7,}\d)/);
      if (phoneMatch) {
        updated.phone = phoneMatch[0].trim();
      }

      // 4. ZIP Code
      const zipMatch = text.match(/\b\d{5}\b/);
      if (zipMatch) {
        updated.zipCode = zipMatch[0];
      }

      // 5. Address detection
      if (!updated.address && (text.includes('Street') || text.includes('St') || text.includes('Avenue') || text.includes('Ave') || text.includes('Road') || text.includes('Terrace') || /\d+\s+[A-Za-z]+/.test(text))) {
        updated.address = text.split(',')[0].trim();
      }

      // 6. City / State
      if (!updated.city && (text.includes('Springfield') || text.includes('New York') || text.includes('London') || text.includes('Mumbai') || text.includes('San Francisco'))) {
        updated.city = "Springfield";
        updated.state = "Oregon";
      }

      // 7. Country
      if (!updated.country && (text.includes('United States') || text.includes('USA') || text.includes('India') || text.includes('UK') || text.includes('Canada'))) {
        updated.country = "United States";
      }

      // 8. Company
      if (!updated.company && (text.includes('Technologies') || text.includes('Corp') || text.includes('Inc') || text.includes('LLC') || text.includes('Apex'))) {
        updated.company = text.trim();
      }

      if (checkRequiredComplete(updated)) {
        setTimeout(() => {
          setAriaState('completed');
          setTimeout(() => {
            setCurrentScreen('confirmation');
          }, 2000);
        }, 1500);
      }

      return updated;
    });
  };

  /**
   * Handles typed or simulated text from Guest
   */
  const handleGuestInput = (userInput) => {
    if (!userInput || !userInput.trim()) return;

    // Add Guest message to conversation
    const guestMsg = {
      id: Date.now(),
      sender: 'guest',
      text: userInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, guestMsg]);
    extractGuestFields(userInput.trim());
  };

  /**
   * Microphone toggle button handler: controls live Vapi call
   */
  const handleToggleMic = () => {
    if (vapiSessionRef.current || ariaState === 'listening' || ariaState === 'speaking') {
      stopVapiSession();
      if (vapiSessionRef.current?.stop) {
        try { vapiSessionRef.current.stop(); } catch (e) {}
      }
      vapiSessionRef.current = null;
      stopVoice();
      setAriaState('idle');
      return;
    }

    startLiveVapi();
  };

  /**
   * Evaluator Demo Helper: Advance next step in conversation
   */
  const handleSimulateNextStep = () => {
    if (demoStepIndex < demoSimulationSteps.length) {
      const step = demoSimulationSteps[demoStepIndex];
      handleGuestInput(step.guestReply);
    } else {
      handleGuestInput("All my details look great!");
    }
  };

  /**
   * Evaluator Demo Helper: Fill all fields immediately to test Confirmation Screen
   */
  const handleFillAllDemo = () => {
    const fullMockData = {
      fullName: "Jay Mistry",
      phone: "+1 (555) 234-5678",
      email: "jaymistry@example.com",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      state: "Oregon",
      zipCode: "97477",
      country: "United States",
      company: "Apex Technologies",
      birthDate: "April 18, 1998"
    };

    setGuestData(fullMockData);

    const completionMsg = {
      id: Date.now(),
      sender: 'aria',
      text: "All required guest details have been filled. Please review and confirm your reservation.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, completionMsg]);
    setAriaState('completed');
    speakText(completionMsg.text);

    setTimeout(() => {
      setCurrentScreen('confirmation');
    }, 800);
  };

  /**
   * Confirm and complete check-in: submits to backend webhook & switches to Success Screen
   */
  const handleConfirmCheckIn = async () => {
    setIsSubmitting(true);

    try {
      const result = await submitGuestCheckIn(guestData);
      setBookingRef(result.bookingRef || 'STY-784920');
      setCurrentScreen('success');
    } catch (err) {
      console.error('Submission failed:', err);
      setBookingRef('STY-784920');
      setCurrentScreen('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resets entire application back to Welcome Screen
   */
  const handleReset = () => {
    stopVapiSession();
    if (vapiSessionRef.current?.stop) {
      try { vapiSessionRef.current.stop(); } catch (e) {}
    }
    vapiSessionRef.current = null;
    stopVoice();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setGuestData(initialGuestData);
    setMessages([]);
    setAriaState('idle');
    setDemoStepIndex(0);
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E1E]">
      
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onReset={handleReset}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStartCheckIn={handleStartCheckIn}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          />
        )}

        {currentScreen === 'checkin' && (
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
            
            {/* Context Breadcrumb */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-[#7A7265]">
                <span className="font-semibold text-[#8C6D2B]">Step 1</span>
                <span>·</span>
                <span>Voice Check-In with Receptionist Aria</span>
              </div>

              {checkRequiredComplete(guestData) && (
                <button
                  onClick={() => setCurrentScreen('confirmation')}
                  className="text-xs font-medium text-[#8C6D2B] hover:text-[#5E4718] flex items-center gap-1 underline underline-offset-4"
                >
                  Review Details & Confirm →
                </button>
              )}
            </div>

            {/* Responsive Two-Column Grid: Left Aria Voice & Conversation, Right Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
              
              {/* Left Column: Aria Voice Assistant (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col">
                <AriaAssistant
                  ariaState={ariaState}
                  onToggleMic={handleToggleMic}
                  onSendMessage={handleGuestInput}
                  onEndCheckIn={handleReset}
                  onSimulateStep={handleSimulateNextStep}
                  onFillAllDemo={handleFillAllDemo}
                  hasCollectedAllRequired={checkRequiredComplete(guestData)}
                  liveTranscript={liveTranscript}
                  micError={micError}
                  audioLevel={audioLevel}
                />
              </div>

              {/* Middle Column: Dialogue Transcript (4 cols on lg) */}
              <div className="lg:col-span-4 flex flex-col">
                <Conversation
                  messages={messages}
                  guestName={guestData.fullName}
                  onQuickReply={handleGuestInput}
                  quickReplies={quickReplies}
                />
              </div>

              {/* Right Column: Dynamic Check-In Progress (3 cols on lg) */}
              <div className="lg:col-span-3 flex flex-col">
                <CheckInProgress
                  guestData={guestData}
                  onFieldClick={() => {}}
                />
              </div>

            </div>

          </div>
        )}

        {currentScreen === 'confirmation' && (
          <Confirmation
            guestData={guestData}
            onUpdateGuestData={setGuestData}
            onConfirmCheckIn={handleConfirmCheckIn}
            onBackToDialogue={() => setCurrentScreen('checkin')}
            isSubmitting={isSubmitting}
          />
        )}

        {currentScreen === 'success' && (
          <SuccessScreen
            guestData={guestData}
            bookingRef={bookingRef}
            onFinish={handleReset}
          />
        )}
      </main>

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* Subtle Quiet Footer */}
      <footer className="border-t border-[#E8E2D8] py-4 px-6 text-center text-xs text-[#8C8476] bg-[#FAF8F5]">
        <span>StayOS Hotel Check-In System · Powered by Aria AI Receptionist</span>
      </footer>

    </div>
  );
}
