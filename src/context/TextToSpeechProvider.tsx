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
    const chunks: string[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      if (remainingText.length <= chunkSize) {
        // Si el texto restante es menor que el tamaño del chunk, se añade como está.
        chunks.push(remainingText.trim());
        break;
      }

      // Encuentra el mejor lugar para cortar
      const slice = remainingText.slice(0, chunkSize);

      // Prioriza los cortes en los signos de puntuación
      const punctuationIndex = Math.max(slice.lastIndexOf('.'), slice.lastIndexOf('!'), slice.lastIndexOf('?'));

      // Si hay un signo de puntuación en el rango, corta ahí
      if (punctuationIndex > -1) {
        chunks.push(slice.slice(0, punctuationIndex + 1).trim());
        remainingText = remainingText.slice(punctuationIndex + 1).trim();
      } else {
        // Si no hay signos de puntuación, busca el último espacio para evitar cortar palabras
        const lastSpaceIndex = slice.lastIndexOf(' ');
        if (lastSpaceIndex > -1) {
          chunks.push(slice.slice(0, lastSpaceIndex).trim());
          remainingText = remainingText.slice(lastSpaceIndex + 1).trim();
        } else {
          // Si no hay espacios, corta directamente en el límite
          chunks.push(slice.trim());
          remainingText = remainingText.slice(chunkSize).trim();
        }
      }
    }

    return chunks;
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

        speakChunk();
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
