'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const TextToSpeechContext = createContext<any>(null);

export const useTextToSpeechContext = () => {
  return useContext(TextToSpeechContext);
};

export const TextToSpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const pitch = 0.9;
  const rate = 1;

  const loadVoices = useCallback(() => {
    if (synth) {
      const availableVoices = synth.getVoices();
      const spanishVoice = availableVoices.find((voice) => voice.name === 'Google español');
      setSelectedVoice(spanishVoice || null);
      setVoicesLoaded(true);
    }
  }, [synth]);

  const speak = useCallback(
    (text: string) => {
      if (synth && voicesLoaded) {
        const utterThis = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
          utterThis.voice = selectedVoice;
        }
        utterThis.pitch = pitch;
        utterThis.rate = rate;
        synth.speak(utterThis);
      }
    },
    [pitch, rate, selectedVoice, synth, voicesLoaded],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synthInstance = window.speechSynthesis;
      setSynth(synthInstance);
      if (synthInstance.getVoices().length > 0) {
        loadVoices();
      } else {
        synthInstance.onvoiceschanged = loadVoices;
      }
    }
  }, [loadVoices]);

  return <TextToSpeechContext.Provider value={{ speak, voicesLoaded }}>{children}</TextToSpeechContext.Provider>;
};
