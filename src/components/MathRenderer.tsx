import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  inline?: boolean;
}

export const MathRenderer = ({ content, inline = false }: MathRendererProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Parse content and render math
      const parts = content.split(/(\$\$?[^$]+\$\$?)/g);
      containerRef.current.innerHTML = '';
      
      parts.forEach(part => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Display math
          const math = part.slice(2, -2);
          const span = document.createElement('span');
          katex.render(math, span, { displayMode: true, throwOnError: false });
          containerRef.current?.appendChild(span);
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Inline math
          const math = part.slice(1, -1);
          const span = document.createElement('span');
          katex.render(math, span, { displayMode: false, throwOnError: false });
          containerRef.current?.appendChild(span);
        } else {
          // Regular text
          const textNode = document.createTextNode(part);
          containerRef.current?.appendChild(textNode);
        }
      });
    }
  }, [content]);

  return <span ref={containerRef} className={inline ? 'inline' : 'block'} />;
};
