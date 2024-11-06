import React, { useEffect, useState } from 'react';

function PlayButton({ translatedText, language }) {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const voices = synth.getVoices();
      setVoices(voices);
    //  console.log('Available voices:', voices);
    //  voices.forEach(voice => console.log(`${voice.name} (${voice.lang})`));
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const handlePlay = () => {
    console.log('Play button clicked');
    console.log('Translated Text:', translatedText);
    console.log('Language:', language);

    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = language;

      // Find a voice that matches the language
      const voice = voices.find(voice => voice.lang === language);
      if (voice) {
        utterance.voice = voice;
      } else {
        console.warn('No matching voice found for language:', language);
        // Use a fallback voice
        utterance.voice = voices[0];
      }
      console.log('Selected voice:', utterance.voice.name);

      try{
            utterance.onstart = () => console.log('Speech started');
            utterance.onend = () => console.log('Speech ended');
            utterance.onerror = (event) => console.error('Speech error', event);

      }catch(error){
        console.error('Error:', error);
      }
      
      // Ensure the voice is loaded before speaking
      if (utterance.voice) {
        window.speechSynthesis.speak(utterance);
        console.log('Playing:', translatedText);
      } else {
        console.error('Voice not loaded');
      }
    }
  };

  return <button onClick={handlePlay}>Play</button>;
}

export default PlayButton;