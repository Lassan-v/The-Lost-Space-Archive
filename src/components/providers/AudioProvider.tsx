/**
 * AudioProvider — The Lost Space Archive
 * Manages sound effects and narration using Web Audio API and Speech Synthesis
 */

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import type { AudioContextValue } from '../../types';
import { useAccessibility } from './AccessibilityProvider';
import { useLanguage } from '../../i18n';
import { announce } from '../../utils/accessibility';

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [volume, setVolumeState] = useState(1);
  const audioContextRef = useRef<AudioContext | null>(null);
  const { audioEnabled, narrationEnabled } = useAccessibility();
  const { language } = useLanguage();

  // Resume on user interaction
  useEffect(() => {
    const resumeAudio = () => {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    document.addEventListener('click', resumeAudio, { once: true });
    document.addEventListener('keydown', resumeAudio, { once: true });

    return () => {
      document.removeEventListener('click', resumeAudio);
      document.removeEventListener('keydown', resumeAudio);
    };
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextConstructor = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextConstructor();
    }
    return audioContextRef.current;
  }, []);

  // Suppress the @typescript-eslint/no-explicit-any for Web Audio API types
  // These types are intentionally broad to avoid complex generic constraints

  const playSound = useCallback((sound: 'success' | 'error' | 'place' | 'hint' | 'click') => {
    if (!audioEnabled) return;
    let ctx: AudioContext;
    try {
      ctx = getAudioContext();
    } catch {
      return;
    }
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    gainNode.gain.value = volume * 0.3;
    oscillator.start();

    switch (sound) {
      case 'success':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        oscillator.stop(ctx.currentTime + 0.5);
        break;
      case 'error':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(220, ctx.currentTime); // A3
        oscillator.frequency.setValueAtTime(164.81, ctx.currentTime + 0.15); // E3
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
      case 'place':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.stop(ctx.currentTime + 0.2);
        break;
      case 'hint':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
        oscillator.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1); // C#5
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
      case 'click':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.stop(ctx.currentTime + 0.05);
        break;
    }
  }, [volume, getAudioContext, audioEnabled]);

  const speak = useCallback((text: string) => {
    if (!narrationEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const requestedLocale = language === 'es' ? 'es-ES' : 'en-US';
    utterance.lang = requestedLocale;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = volume;

    // Try to find a child-friendly voice
    const languagePrefix = language === 'es' ? 'es' : 'en';
    const matchingVoices = window.speechSynthesis.getVoices().filter(voice =>
      voice.lang.toLowerCase().startsWith(languagePrefix),
    );
    const preferredVoice = matchingVoices.find(voice =>
      voice.name.includes('Google') || voice.name.includes('Microsoft'),
    ) ?? matchingVoices[0];

    if (!preferredVoice) {
      // The visible dialogue/instruction remains on screen; announce it as a text alternative.
      announce(text, 'polite');
      return;
    }
    utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  }, [volume, narrationEnabled, language]);

  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
  }, []);

  const mute = useCallback(() => {
    setVolumeState(0);
  }, []);

  const unmute = useCallback(() => {
    setVolumeState(1);
  }, []);

  const value: AudioContextValue = {
    playSound,
    speak,
    setVolume,
    mute,
    unmute,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
