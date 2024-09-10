import { useEffect, useState, useRef, useCallback } from 'react';

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const initialMediaRecorder = useCallback((stream: MediaStream) => {
    const mediaRecorderInstance = new MediaRecorder(stream);

    mediaRecorderInstance.onstart = () => {
      chunks.current = [];
    };

    mediaRecorderInstance.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev.data);
    };

    mediaRecorderInstance.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
      // eslint-disable-next-line no-console
      console.log(audioBlob, 'audioBlob');

      // TODO: send audioBlob to backend
    };

    setMediaRecorder(() => mediaRecorderInstance);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(initialMediaRecorder);
    }
  }, [initialMediaRecorder]);

  return { recording, startRecording, stopRecording };
};
