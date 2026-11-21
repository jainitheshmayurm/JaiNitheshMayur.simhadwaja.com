import { useState, useEffect } from 'react';

export function useTypingEffect(strings, options = {}) {
  const {
    minSpeed = 30,
    maxSpeed = 80,
    pauseDuration = 1400,
    loop = true,
  } = options;

  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    let timeoutId;
    let charIdx = 0;
    const currentLine = strings[lineIndex % strings.length];
    setText('');
    setIsTyping(true);

    const typeNextChar = () => {
      if (charIdx < currentLine.length) {
        setText(currentLine.slice(0, charIdx + 1));
        charIdx++;
        // Randomized natural typing cadence
        const randomDelay = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
        timeoutId = setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTyping(false);
        if (loop) {
          timeoutId = setTimeout(() => {
            setLineIndex((prev) => (prev + 1) % strings.length);
          }, pauseDuration);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, minSpeed);

    return () => clearTimeout(timeoutId);
  }, [lineIndex, strings, minSpeed, maxSpeed, pauseDuration, loop]);

  return { text, isTyping, lineIndex };
}
