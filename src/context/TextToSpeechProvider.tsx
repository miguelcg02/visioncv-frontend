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
  const rate = 1.1;

  const loadVoices = useCallback(() => {
    if (synth) {
      const availableVoices = synth.getVoices();
      const spanishVoice = availableVoices.find((voice) => voice.name === 'Google español');
      setSelectedVoice(spanishVoice || null);
      setVoicesLoaded(true);
    }
  }, [synth]);

  const chunkify = (text: string, chunkSize: number = 160): string[] => {
    const regex = new RegExp(`.{1,${chunkSize}}([.!?]\\s|\\s|$)`, 'g');
    return text.match(regex) || [];
  };

  const speak = useCallback(
    (text: string) => {
      if (synth && voicesLoaded) {
        const chunks = chunkify(text);
        let currentChunkIndex = 0;

        const speakChunk = () => {
          if (currentChunkIndex >= chunks.length) return;

          const utterThis = new SpeechSynthesisUtterance(chunks[currentChunkIndex]);
          if (selectedVoice) {
            utterThis.voice = selectedVoice;
          }
          utterThis.pitch = pitch;
          utterThis.rate = rate;

          utterThis.onend = () => {
            currentChunkIndex++;
            // eslint-disable-next-line no-console
            console.log(`Chunk ${currentChunkIndex} terminado.`);
            speakChunk();
          };

          utterThis.onerror = (e) => {
            // eslint-disable-next-line no-console
            console.error('Error durante la síntesis de voz:', e);
          };

          // eslint-disable-next-line no-console
          console.log(`Reproduciendo chunk ${currentChunkIndex}:`, chunks[currentChunkIndex]);
          synth.speak(utterThis); // Habla el fragmento actual
        };

        speakChunk(); // Inicia la reproducción
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
