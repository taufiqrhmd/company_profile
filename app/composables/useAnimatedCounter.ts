export const useAnimatedCounter = () => {
  const animateValue = (
    start: number, 
    end: number, 
    duration: number, 
    callback: (val: number) => void
  ) => {
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Menggunakan easing "easeOutQuad" untuk gerakan yang smooth
      callback(Math.floor(start + (end - start) * (progress * (2 - progress))));
      if (progress < 1) requestAnimationFrame(update);
      else callback(end);
    };
    requestAnimationFrame(update);
  };

  return { animateValue };
};