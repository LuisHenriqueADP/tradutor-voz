import { useState, useEffect, useRef } from 'react';

const VoiceTranslator = () => {
  const [listening, setListening] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('pt');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const recognitionRef = useRef(null);
  const isPressingRef = useRef(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Seu navegador não suporta Web Speech API');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = `${sourceLanguage}-${sourceLanguage.toUpperCase()}`;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim();
      if (transcript) {
        setOriginalText(transcript);
        setLoading(true);

        const translated = await translateText(transcript, targetLanguage);
        setTranslatedText(translated);

        // Pequeno delay antes de falar (200ms)
        setTimeout(() => {
          speakText(translated, targetLanguage);
          playDing(); // toca som de notificação
          setLoading(false);
        }, 200);
      }
    };

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, [listening, sourceLanguage, targetLanguage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isPressingRef.current) {
        isPressingRef.current = true;
        startListening();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        isPressingRef.current = false;
        stopListening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
      );
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error('Erro na tradução:', error);
      return 'Erro na tradução';
    }
  };

  const speakText = (text, lang) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const playDing = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/ding.ogg');
    audio.play();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <p><strong>Pressione e segure espaço para falar</strong> 🎙️</p>

      {loading && <p>🔄 Traduzindo...</p>}

      <div style={{ marginTop: '2rem' }}>
        <h3>Texto Original ({sourceLanguage.toUpperCase()}):</h3>
        <p style={{ minHeight: '50px' }}>{originalText || '-'}</p>

        <h3>Tradução ({targetLanguage.toUpperCase()}):</h3>
        <p style={{ minHeight: '50px' }}>{translatedText || '-'}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <label>Idioma de Entrada:</label>
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        >
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
          <option value="fr">Francês</option>
        </select>

        <label>Idioma de Saída:</label>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        >
          <option value="en">Inglês</option>
          <option value="pt">Português</option>
          <option value="es">Espanhol</option>
          <option value="fr">Francês</option>
        </select>
      </div>
    </div>
  );
};

export default VoiceTranslator;
