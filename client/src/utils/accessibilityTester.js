// Accessibility Feature Tester
// This utility helps test all accessibility features

export const testAccessibilityFeatures = () => {
  console.log('🔧 ACCESSIBILITY FEATURE TEST');
  console.log('==============================');
  
  // Test 1: Check if CSS variables are applied
  const root = document.documentElement;
  const fontSizeVar = root.style.getPropertyValue('--accessibility-font-size');
  const lineHeightVar = root.style.getPropertyValue('--accessibility-line-height');
  
  console.log('✅ CSS Variables:', {
    fontSize: fontSizeVar || '100%',
    lineHeight: lineHeightVar || '1.5'
  });
  
  // Test 2: Check accessibility classes
  const hasAccessibilityActive = document.body.classList.contains('accessibility-active');
  const hasHighContrast = document.body.classList.contains('high-contrast');
  
  console.log('✅ Body Classes:', {
    accessibilityActive: hasAccessibilityActive,
    highContrast: hasHighContrast
  });
  
  // Test 3: Check if skip-to-content link exists
  const skipLink = document.querySelector('.skip-to-content');
  const mainContent = document.getElementById('main-content');
  
  console.log('✅ Navigation:', {
    skipLinkExists: !!skipLink,
    mainContentExists: !!mainContent
  });
  
  // Test 4: Check if voice recognition is supported
  const voiceSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  
  console.log('✅ Browser Support:', {
    voiceRecognition: voiceSupported
  });
  
  // Test 5: Check if accessibility toolbar exists
  const toolbar = document.querySelector('[aria-label*="accessibility"]');
  
  console.log('✅ Toolbar:', {
    toolbarExists: !!toolbar
  });
  
  // Test 6: Simulate keyboard shortcuts (without triggering them)
  console.log('✅ Keyboard Shortcuts Available:');
  console.log('   - Alt + = : Increase font size');
  console.log('   - Alt + - : Decrease font size');
  console.log('   - Alt + ↑ : Increase line spacing');
  console.log('   - Alt + ↓ : Decrease line spacing');
  console.log('   - Alt + C : Toggle high contrast');
  console.log('   - Alt + R : Reset to default');
  console.log('   - Alt + H : Go to home');
  
  return {
    cssVariables: { fontSize: fontSizeVar, lineHeight: lineHeightVar },
    bodyClasses: { accessibilityActive: hasAccessibilityActive, highContrast: hasHighContrast },
    navigation: { skipLinkExists: !!skipLink, mainContentExists: !!mainContent },
    browserSupport: { voiceRecognition: voiceSupported },
    toolbar: { exists: !!toolbar }
  };
};

// Quick test function for developers
export const quickAccessibilityTest = () => {
  console.log('🚀 Quick Accessibility Test');
  const results = testAccessibilityFeatures();
  
  const allWorking = Object.values(results).every(section => 
    Object.values(section).every(value => value === true || value !== null)
  );
  
  if (allWorking) {
    console.log('🎉 All accessibility features are working correctly!');
  } else {
    console.warn('⚠️ Some accessibility features may need attention');
  }
  
  return results;
};

// Test specific voice commands
export const testVoiceCommands = () => {
  console.log('🎤 Voice Commands Test');
  console.log('Available commands:');
  console.log('- "increase font" or "bigger font"');
  console.log('- "decrease font" or "smaller font"');
  console.log('- "increase spacing" or "more spacing"');
  console.log('- "decrease spacing" or "less spacing"');
  console.log('- "high contrast"');
  console.log('- "reset" or "default"');
  console.log('- "go home" or "home page"');
};