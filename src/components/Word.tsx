import React from 'react';

interface WordProps {
  word: string | null;
  index: number;
  isReference: boolean;
  mapper: (number | null)[];
  isHighlighted: boolean;
  onHover: (index: number | null) => void;
}

const COLORS = [
  'bg-red-200 border-red-400',
  'bg-blue-200 border-blue-400',
  'bg-green-200 border-green-400',
  'bg-yellow-200 border-yellow-400',
  'bg-purple-200 border-purple-400',
  'bg-pink-200 border-pink-400',
  'bg-indigo-200 border-indigo-400',
  'bg-orange-200 border-orange-400',
  'bg-teal-200 border-teal-400',
  'bg-cyan-200 border-cyan-400',
];

export const Word: React.FC<WordProps> = ({
  word,
  index,
  isReference,
  mapper,
  isHighlighted,
  onHover,
}) => {
  const getMappedIndex = () => {
    if (isReference) {
      return mapper.indexOf(index);
    }
    return mapper[index] !== null ? index : -1;
  };

  const hasMapping = () => {
    if (isReference) {
      return mapper.includes(index);
    }
    return index < mapper.length && mapper[index] !== null;
  };

  const mappedIndex = getMappedIndex();
  const validMapping = hasMapping();

  return (
    <span
      className={`inline-block px-1.5 py-0.5 m-0.5 text-sm rounded transition-all duration-200 border-b border-solid border-1 border-b-solid border-b-4
        ${
          validMapping
            ? COLORS[mappedIndex % COLORS.length]
            : 'bg-gray-100 border-gray-3'
        }
        ${isHighlighted && validMapping ? 'ring-2 ring-blue-500' : ''}
        ${word === null ? 'italic text-gray-400' : 'text-gray-800'}
        hover:shadow-sm`}
      onMouseEnter={() => validMapping && onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {word === null ? '(+)' : word}
    </span>
  );
};
