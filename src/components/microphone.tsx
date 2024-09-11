'use client';

import { Mic, MicOff } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useRecordVoice } from '@/hooks/useRecordVoice';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';

import { Button } from './ui/button';

// eslint-disable-next-line no-unused-vars
const Microphone = ({ onAudioCapture }: { onAudioCapture: (audioBlob: Blob) => void }) => {
  const { startRecording, stopRecording } = useRecordVoice();
  const [isRecording, setIsRecording] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const { speak, voicesLoaded } = useTextToSpeechContext();

  // Function to stop recording and send the audio blob
  const handleStopRecording = () => {
    stopRecording().then((audioBlob) => {
      setIsRecording(false);
      if (audioBlob !== null) {
        onAudioCapture(audioBlob);
      }
    });
  };

  // Start recording with spacebar or enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (!isRecording) {
        startRecording();
        setIsRecording(true);
        setHasInitialized(true);
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

  useEffect(() => {
    if (hasInitialized && voicesLoaded) {
      if (isRecording) {
        speak('Grabación iniciada');
      } else {
        speak('Grabación detenida');
      }
    }
  }, [isRecording, speak, voicesLoaded, hasInitialized]);

  return (
    <div>
      <Button
        onMouseDown={() => {
          startRecording();
          setIsRecording(true);
          setHasInitialized(true);
        }}
        onMouseUp={() => {
          handleStopRecording();
        }}
        onTouchStart={() => {
          startRecording();
          setIsRecording(true);
          setHasInitialized(true);
        }}
        onTouchEnd={() => {
          handleStopRecording();
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-pressed={isRecording}
        aria-label='Botón de micrófono para grabar audio. Presiona y mantén la barra espaciadora para grabar. Suelta para detener.'
        className='flex items-center gap-2 px-4'
      >
        {isRecording ? <Mic size={24} color='#121712' /> : <MicOff size={24} color='#121712' />}
        Grabar
      </Button>
    </div>
  );
};

export { Microphone };
