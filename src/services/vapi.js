/**
 * StayOS - Vapi Live Voice Assistant Service
 * 
 * Manages real-time WebRTC audio connection to Vapi with AI Receptionist Aria.
 * Configured with Vapi credentials and event listeners for live two-way WebRTC speech,
 * transcription, and conversational turns.
 */
import Vapi from '@vapi-ai/web';

// Vapi Public Key configured for StayOS
export const VAPI_PUBLIC_KEY =
  import.meta.env.VITE_VAPI_PUBLIC_KEY || 'b67a9094-5547-4d52-8ead-e6f066963d93';

export const VAPI_ASSISTANT_ID =
  import.meta.env.VITE_VAPI_ASSISTANT_ID || '';

/**
 * Full inline assistant configuration for Aria.
 * Vapi accepts this directly via client.start(ARIA_ASSISTANT_CONFIG)
 * using the public API key.
 */
export const ARIA_ASSISTANT_CONFIG = {
  name: 'Aria - StayOS Receptionist',
  firstMessage: "Hi, welcome to StayOS. I'm Aria, your virtual hotel receptionist. May I have your full name to begin your check-in?",
  model: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content: `You are Aria, an elegant luxury hotel receptionist at StayOS - The Grand Heritage.
Your task is to warmly greet guests and collect 8 required check-in fields through a polite, natural spoken conversation:
1. Full Name
2. Phone Number
3. Email Address
4. Street Address
5. City
6. State
7. ZIP Code
8. Country
And 2 optional fields:
- Company Name
- Date of Birth

Guidelines:
- Keep your speech concise and conversational (1-2 sentences at a time).
- Ask for 1 or 2 fields at a time.
- Acknowledge each answer gracefully before asking for the next.
- When the guest shares information, thank them by name once you have it.
- When all required details are gathered, state clearly: "Wonderful! All your check-in details have been captured. Please review and confirm your reservation on screen."`
      }
    ]
  },
  voice: {
    provider: '11labs',
    voiceId: '21m00Tcm4TlvDq8ikWAM' // Rachel - elegant hospitality voice
  }
};

// Singleton Vapi instance
let vapiInstance = null;

/**
 * Returns or initializes the Vapi client instance
 */
export function getVapiClient() {
  if (!vapiInstance && VAPI_PUBLIC_KEY) {
    try {
      vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    } catch (err) {
      console.warn('StayOS: Could not initialize Vapi Web SDK:', err);
    }
  }
  return vapiInstance;
}

/**
 * Checks whether Vapi credentials are ready
 */
export function isVapiConfigured() {
  return Boolean(VAPI_PUBLIC_KEY && VAPI_PUBLIC_KEY.trim() !== '');
}

/**
 * Starts a live WebRTC voice session with Aria via Vapi
 * @param {Object} handlers - Callbacks for call events
 * @returns {Promise<Object>} session object with stop() method
 */
export async function startVapiSession(handlers = {}) {
  const {
    onCallStart,
    onCallEnd,
    onSpeechStart,
    onSpeechEnd,
    onMessage,
    onError,
    onVolumeLevel
  } = handlers;

  const client = getVapiClient();

  if (!client) {
    throw new Error('Vapi client could not be initialized.');
  }

  // Remove existing listeners to prevent duplicates
  client.removeAllListeners();

  // Attach live event handlers
  client.on('call-start', () => {
    console.log('StayOS: Live Vapi WebRTC session connected with Aria!');
    if (onCallStart) onCallStart();
  });

  client.on('call-end', () => {
    console.log('StayOS: Vapi session ended.');
    if (onCallEnd) onCallEnd();
  });

  client.on('speech-start', () => {
    if (onSpeechStart) onSpeechStart();
  });

  client.on('speech-end', () => {
    if (onSpeechEnd) onSpeechEnd();
  });

  client.on('volume-level', (vol) => {
    if (onVolumeLevel) onVolumeLevel(vol);
  });

  client.on('message', (message) => {
    if (onMessage) onMessage(message);
  });

  client.on('error', (err) => {
    console.warn('StayOS Vapi session error:', err);
    if (onError) onError(err);
  });

  // Target assistant: custom ID if valid, otherwise inline assistant configuration
  const targetAssistant = (VAPI_ASSISTANT_ID && VAPI_ASSISTANT_ID.trim()) 
    ? VAPI_ASSISTANT_ID.trim() 
    : ARIA_ASSISTANT_CONFIG;

  try {
    console.log('StayOS: Connecting to live Vapi agent Aria...');
    await client.start(targetAssistant);

    return {
      type: 'vapi',
      stop: () => {
        try {
          client.stop();
        } catch (e) {
          console.warn('Error stopping Vapi call:', e);
        }
      }
    };
  } catch (startErr) {
    console.warn('Vapi start with assistant target failed, retrying with fallback config:', startErr);
    try {
      await client.start(ARIA_ASSISTANT_CONFIG);
      return {
        type: 'vapi',
        stop: () => client.stop()
      };
    } catch (fallbackErr) {
      console.error('Vapi live call failed to start:', fallbackErr);
      if (onError) onError(fallbackErr);
      throw fallbackErr;
    }
  }
}

/**
 * Stops any active Vapi session
 */
export function stopVapiSession() {
  if (vapiInstance) {
    try {
      vapiInstance.stop();
    } catch (e) {
      console.warn('StayOS error stopping Vapi:', e);
    }
  }
}
