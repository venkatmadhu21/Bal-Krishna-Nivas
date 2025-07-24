// Voice Command Testing Utility
// Add this to browser console to test voice commands manually

export const testVoiceCommand = (command) => {
  console.log(`🎤 Testing voice command: "${command}"`);
  
  // Simulate voice command
  if (window.accessibilityContext && window.accessibilityContext.handleVoiceCommand) {
    window.accessibilityContext.handleVoiceCommand(command);
  } else {
    console.error('❌ Accessibility context not found. Make sure the app is running.');
  }
};

export const testAllVoiceCommands = () => {
  console.log('🧪 Testing all voice commands...');
  
  const commands = [
    'increase font',
    'decrease font',
    'bigger font',
    'smaller font',
    'increase spacing',
    'decrease spacing',
    'more spacing',
    'less spacing',
    'high contrast',
    'toggle contrast',
    'reset',
    'default',
    'go home',
    'home page'
  ];
  
  commands.forEach((command, index) => {
    setTimeout(() => {
      console.log(`Testing: ${command}`);
      testVoiceCommand(command);
    }, index * 2000);
  });
};

export const checkVoiceSupport = () => {
  console.log('🔍 Checking voice recognition support...');
  
  const hasWebkitSpeech = 'webkitSpeechRecognition' in window;
  const hasSpeech = 'SpeechRecognition' in window;
  
  console.log('Browser Support:', {
    webkitSpeechRecognition: hasWebkitSpeech,
    SpeechRecognition: hasSpeech,
    supported: hasWebkitSpeech || hasSpeech
  });
  
  if (hasWebkitSpeech || hasSpeech) {
    console.log('✅ Voice recognition is supported!');
    console.log('💡 To test: testVoiceCommand("increase font")');
  } else {
    console.log('❌ Voice recognition not supported in this browser');
    console.log('💡 Try Chrome, Edge, or Safari');
  }
  
  return hasWebkitSpeech || hasSpeech;
};

export const debugVoiceRecognition = () => {
  console.log('🐛 Voice Recognition Debug Info:');
  console.log('Current window.speechRecognition:', window.speechRecognition);
  console.log('Navigator info:', {
    userAgent: navigator.userAgent,
    language: navigator.language,
    onLine: navigator.onLine
  });
  
  // Test microphone permissions
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'microphone' }).then((result) => {
      console.log('Microphone permission:', result.state);
    });
  }
};

// Add to window for easy testing
if (typeof window !== 'undefined') {
  window.voiceCommandTester = {
    testVoiceCommand,
    testAllVoiceCommands,
    checkVoiceSupport,
    debugVoiceRecognition
  };
}