import React from 'react';
import { Word } from './Word';

interface TranslationLineProps {
  reference: (string | null)[];
  translation: (string | null)[];
  mapper: (number | null)[];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

export const TranslationLine: React.FC<TranslationLineProps> = ({
  reference,
  translation,
  mapper,
  hoveredIndex,
  onHover,
}) => {
  return (
    <div className="mb-2 bg-white p-2 rounded shadow-sm border border-gray-100">
      <div className="mb-1">
        {reference.map((word, idx) => (
          <Word
            key={`ref-${idx}`}
            word={word}
            index={idx}
            isReference={true}
            mapper={mapper}
            isHighlighted={hoveredIndex === idx}
            onHover={onHover}
          />
        ))}
      </div>
      <div className="border-l-2 border-gray-200 pl-2">
        {translation.map((word, idx) => (
          <Word
            key={`trans-${idx}`}
            word={word}
            index={idx}
            isReference={false}
            mapper={mapper}
            isHighlighted={mapper[idx] === hoveredIndex}
            onHover={(index) => onHover(index !== null ? mapper[index] : null)}
          />
        ))}
      </div>
    </div>
  );
};
