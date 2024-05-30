import { useState, useEffect, useCallback, useRef } from "react";

const useSpeechRecognition = (onResult, onError) => {
  const recognition = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.lang = "ko-KR";
      recognition.current.continuous = true;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.current.onerror = (event) => {
        onError(event);
      };

      recognition.current.onend = () => {
        setIsListening(false);
        console.log("Speech recognition ended");
      };
    }
  }, [onResult, onError]);

  const startSpeechRecognition = useCallback(() => {
    if (recognition.current && !isListening) {
      recognition.current.start();
      setIsListening(true);
      console.log("Speech recognition started");
    }
  }, [isListening]);

  const stopSpeechRecognition = useCallback(() => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
      console.log("Speech recognition stopped");
    }
  }, [isListening]);

  const restartSpeechRecognition = useCallback(() => {
    stopSpeechRecognition();
    startSpeechRecognition();
  }, [startSpeechRecognition, stopSpeechRecognition]);

  return {
    startSpeechRecognition,
    stopSpeechRecognition,
    restartSpeechRecognition,
    isListening,
  };
};

export default useSpeechRecognition;
