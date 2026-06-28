import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  value: string | number;
  duration?: number;
  delay?: number;
}

export function CountUp({ value, duration = 1.2, delay = 0 }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setDisplayValue(String(value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    const valStr = String(value);
    
    if (!shouldAnimate) {
      const match = valStr.match(/([\d,.]+)/);
      if (match) {
        const numStr = match[1];
        const prefix = valStr.substring(0, match.index || 0);
        const suffix = valStr.substring((match.index || 0) + numStr.length);
        const zeroNumStr = numStr.replace(/\d/g, "0");
        setDisplayValue(`${prefix}${zeroNumStr}${suffix}`);
      } else {
        setDisplayValue(valStr);
      }
      return;
    }

    if (hasAnimated.current) {
      setDisplayValue(valStr);
      return;
    }

    const match = valStr.match(/([\d,.]+)/);
    if (!match) {
      setDisplayValue(valStr);
      return;
    }

    const numStr = match[1];
    const prefix = valStr.substring(0, match.index || 0);
    const suffix = valStr.substring((match.index || 0) + numStr.length);

    const target = parseFloat(numStr.replace(/,/g, ""));
    if (isNaN(target)) {
      setDisplayValue(valStr);
      return;
    }

    const decimalMatch = numStr.match(/\.(\d+)/);
    const decimals = decimalMatch ? decimalMatch[1].length : 0;

    let startTime: number | null = null;
    let animationFrameId: number;
    let delayTimeoutId: any;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easedProgress = progress * (2 - progress);
      const current = target * easedProgress;

      let formatted = current.toFixed(decimals);
      if (numStr.includes(",")) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        hasAnimated.current = true;
      }
    };

    delayTimeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      if (delayTimeoutId) clearTimeout(delayTimeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, delay, shouldAnimate]);

  return <span ref={containerRef} className="inline-block">{displayValue}</span>;
}
