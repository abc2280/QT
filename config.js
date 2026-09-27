/**
 * =========================================================================
 * MOMENT — PERSONALIZED EXPERIENCE CONFIGURATION
 * =========================================================================
 * 
 * Edit your details below. Only honest, grounded memories and natural
 * reflections are used (no fabricated lore or fake inside jokes).
 * Replace or add your actual photos, dates, and notes whenever you are ready.
 */

const MOMENT_CONFIG = {
  // Names
  recipientName: "", // Leave empty for neutral "you", or put her name (e.g. "Maya")
  senderName: "Yusuf",

  // Contact options for the final screen
  contact: {
    // If she clicks "talk to me":
    // Enter your WhatsApp phone number with international country code (no '+' or dashes, e.g. "12345678901")
    // If left empty, it opens WhatsApp web/app with the pre-filled message.
    whatsappNumber: "", 
    
    // The pre-filled message that appears when she clicks "talk to me"
    message: "Hey Yusuf...",
    
    // Optional custom URL (e.g. Instagram profile, mailto: link, etc.)
    customUrl: ""
  },

  // Chapter 0: The Envelope
  envelope: {
    heading: "for the person\nI should've talked to sooner.",
    note: "open when you're ready."
  },

  // Chapter 1: Grounded Universal Friendship Memories
  chapter1: {
    intro: "Before I explain anything...",
    lead: "I want you to remember something.",
    highlight: "You were my bestie.",
    memories: [
      { text: "the random conversations" },
      { text: "the stupid little things" },
      { text: "the times you were just there" },
      { text: "the ordinary days that somehow became memories" }
    ]
  },

  // Chapter 2: The Disappearance & Timeline
  chapter2: {
    timelineSteps: [
      { label: "US" },
      { label: "more conversations" },
      { label: "more memories" },
      { label: "..." },
      { label: "I disappeared." }
    ],
    confession: "I ghosted you.",
    realization: "And honestly,\nyou didn't deserve that."
  },

  // Chapter 3: Distance & Silence
  chapter3: {
    chatUser: "you",
    lastSeen: "last seen a long time ago",
    lead: "I thought not talking would make things easier.",
    pauseText: "It didn't.",
    conclusion: "It just made me realize how much I had taken your presence for granted."
  },

  // Chapter 4: The Realization (Emotional Centerpiece)
  chapter4: {
    opening: "Funny thing about losing someone's presence...",
    sub: "You notice all the little places they used to exist.",
    fragments: [
      { id: "text", text: "who I'd randomly text" },
      { id: "tell-first", text: "who I'd tell this to first" },
      { id: "normally-tell", text: "who I'd normally tell this to" },
      { id: "presence", text: "who I expected to be there" },
      { id: "used-to", text: "whose presence I got used to" }
    ],
    closingLead: "That's when I realized...",
    closingNotJust: "I didn't just miss talking to you.",
    closingFinal: "I missed YOU."
  },

  // Chapter 5: The Apology (Direct, accountable, no excuses)
  chapter5: {
    title: "I'm sorry.",
    reasons: [
      "Not because I feel lonely now.",
      "Not because I want things to go back to how they were.",
      "But because I know I hurt someone who mattered to me."
    ],
    accountability: [
      "I should've communicated.",
      "I should've explained.",
      "I shouldn't have disappeared."
    ],
    verdict: "I was wrong."
  },

  // Chapter 6: No Pressure / Mature Freedom
  chapter6: {
    lines: [
      "I don't know what you feel about me now.",
      "And I don't expect you to forgive me.",
      "I don't expect things to magically become the way they were.",
      "You don't owe me a reply.",
      "You don't owe me forgiveness.",
      "I just felt like you deserved to hear the apology I should've given you a long time ago."
    ]
  },

  // Chapter 7: The Memory Box (Keepsakes / Photos)
  // Simplified placeholders: Add your actual photos, dates, and captions here when ready.
  // If an item has no image path, an elegant minimal keepsake card is displayed instead.
  memoryBox: [
    {
      id: "memory-1",
      date: "A quiet afternoon",
      caption: "the random conversations",
      note: "Talking about absolutely nothing for hours, and it somehow being the best part of the day.",
      image: "" // e.g. "photos/memory1.jpg"
    },
    {
      id: "memory-2",
      date: "An ordinary day",
      caption: "the stupid little things",
      note: "Things nobody else would ever care about, but we somehow found completely hilarious.",
      image: ""
    },
    {
      id: "memory-3",
      date: "Back then",
      caption: "just being around",
      note: "Having someone whose company didn't require effort or explanation.",
      image: ""
    },
    {
      id: "memory-4",
      date: "Looking back",
      caption: "unspoken comfort",
      note: "I took for granted how rare it is to have a friend you can simply be yourself around.",
      image: ""
    }
  ],

  // Chapter 8: The Handwritten Letter
  letter: {
    salutation: "Hey.",
    paragraphs: [
      "I don't really know how to make up for disappearing from someone's life like that.",
      "I know an apology doesn't undo it.",
      "And I know I can't ask you to forget it.",
      "I just wanted you to know that I remember the friendship. I remember what you meant to me. And I realize now that I didn't treat that friendship with the care it deserved.",
      "I'm sorry.",
      "For disappearing.\nFor leaving questions instead of answers.\nFor making someone who mattered feel like they didn't.",
      "I don't know where we go from here.",
      "But I'm grateful that I got to call you my bestie in the first place.",
      "And if this is the last thing I ever say to you...",
      "thank you.\nFor being there."
    ],
    signoff: "— Yusuf"
  },

  // Final Screen: "Your Turn"
  finalScreen: {
    lead: "That's all I wanted to say.",
    sub: "Whatever you feel,\nI'll understand.",
    leaveOption: "leave it here",
    talkOption: "talk to me",
    dismissMessage: {
      line1: "That's okay.",
      line2: "You don't owe me anything.",
      signature: "— Yusuf"
    }
  }
};