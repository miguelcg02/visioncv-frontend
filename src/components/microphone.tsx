'use client';

import { Mic, MicOff } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useRecordVoice } from '@/hooks/useRecordVoice';

import { Button } from './ui/button';

// eslint-disable-next-line no-unused-vars
const Microphone = ({ onAudioCapture }: { onAudioCapture: (audioBlob: Blob) => void }) => {
  const { startRecording, stopRecording } = useRecordVoice();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const pitch = 0.9;
  const rate = 1;

  // Function to stop recording and send the audio blob
  const handleStopRecording = () => {
    stopRecording().then((audioBlob) => {
      setIsRecording(false);
      if (audioBlob !== null) {
        onAudioCapture(audioBlob);
      }
    });
  };

  // Function to load available voices
  const loadVoices = () => {
    if (synth) {
      const availableVoices = synth.getVoices();
      const spanishIndexVoice = availableVoices.findIndex((voice) => voice.name === 'Google español');
      const voice = availableVoices[spanishIndexVoice];
      setSelectedVoice(voice || null);
    }
  };

  // Start recording with spacebar or enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (!isRecording) {
        startRecording();
        setIsRecording(true);
      }
    }
  };

  // Stop recording when spacebar or enter is released
  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (isRecording) {
        handleStopRecording();
      }
    }
  };

  // Audio feedback
  const giveAudioFeedback = (message: string) => {
    if (synth) {
      const utterThis = new SpeechSynthesisUtterance(message);
      if (selectedVoice) utterThis.voice = selectedVoice;
      utterThis.pitch = pitch;
      utterThis.rate = rate;
      synth.speak(utterThis);
    }
  };

  useEffect(() => {
    if (isRecording) {
      giveAudioFeedback('Grabación iniciada');
    } else {
      giveAudioFeedback('Grabación detenida');
    }
  }, [isRecording]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synthInstance = window.speechSynthesis;
      setSynth(synthInstance);

      if (synthInstance.onvoiceschanged !== undefined) {
        synthInstance.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }
  }, [synth]);

  return (
    <div>
      <Button
        onMouseDown={() => {
          startRecording();
          setIsRecording(true);
        }}
        onMouseUp={() => {
          handleStopRecording();
        }}
        onTouchStart={() => {
          startRecording();
          setIsRecording(true);
        }}
        onTouchEnd={() => {
          handleStopRecording();
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-pressed={isRecording}
        aria-label='Botón para grabar audio. Presiona y mantén la barra espaciadora para grabar. Suelta para detener.'
        className='flex items-center gap-2 px-4'
      >
        {isRecording ? <Mic size={24} color='#121712' /> : <MicOff size={24} color='#121712' />}
        Grabar
      </Button>
    </div>
  );
};

export { Microphone };
