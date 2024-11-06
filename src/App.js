import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TranscriptDisplay from './components/TranscriptDisplay';
import LanguageSelector from './components/LanguageSelector';
import SpeakButton from './components/SpeakButton';
import PlayButton from './components/PlayButton';
import { startSpeechRecognition } from './services/speechRecognition';
import { translateText, testAPI } from './services/translation';
import './styles.css';

function App() {
  const [originalTranscript, setOriginalTranscript] = useState('');
  const [translatedTranscript, setTranslatedTranscript] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('es');

  useEffect(() => {
    // Call testAPI when the component mounts
    testAPI();
  }, []);

  const handleSpeechRecognition = () => {
    console.log('Starting speech recognition...');
    startSpeechRecognition(async (transcript) => {
      console.log('Speech recognition result:', transcript);
      setOriginalTranscript(transcript);
      const translated = await translateText(transcript, outputLanguage);
      console.log('Translated text:', translated);
      setTranslatedTranscript(translated);
    });
  };

  return (
    <div>
      <Header />
      <LanguageSelector
        languages={[{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }]}
        selectedLanguage={inputLanguage}
        onChange={(e) => setInputLanguage(e.target.value)}
      />
      <LanguageSelector
        languages={[{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }]}
        selectedLanguage={outputLanguage}
        onChange={(e) => setOutputLanguage(e.target.value)}
      />
      <TranscriptDisplay original={originalTranscript} translated={translatedTranscript} />
      <SpeakButton onClick={handleSpeechRecognition} />
      <PlayButton translatedText={translatedTranscript} language={outputLanguage+'-US'} />
    </div>
  );
}

export default App;