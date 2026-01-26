import { useEffect, useRef } from 'react';
import styles from './Visualizer.module.scss';

const Visualizer = ({ isActive = false, small = false }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = small ? 100 : 200;
    const height = small ? 30 : 60;
    
    canvas.width = width;
    canvas.height = height;

    let analyser;
    let dataArray;
    let audioContext;

    // Initialize Web Audio API
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      } catch (error) {
        console.warn('Microphone access denied, using simulated data');
        // Fallback to simulated data
        dataArray = new Uint8Array(128);
      }
    };

    const draw = () => {
      if (!ctx || !analyser) return;

      animationRef.current = requestAnimationFrame(draw);

      // Get frequency data
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Simulate data if no microphone access
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = Math.random() * 255 * Math.random();
        }
      }

      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / dataArray.length) * 2.5;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * height;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    initAudio().then(() => {
      draw();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isActive, small]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.visualizer} ${small ? styles.small : ''}`}
      style={{ display: isActive ? 'block' : 'none' }}
    />
  );
};

export default Visualizer;