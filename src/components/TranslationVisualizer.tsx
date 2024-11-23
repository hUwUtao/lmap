import React, { useState } from 'react';
import { TranslationLine } from './TranslationLine';
import { JsonEditor } from './JsonEditor';
import { debounce } from './utils';

// @ts-ignore
import defaultContent from '../assets/tetoris.json';

type SCHEMA = {
  lines: {
    reference: string[];
    translation: string[];
    mapper: (number | null)[];
  }[];
};

const DEFAULT_DATA = defaultContent as SCHEMA;

export const TranslationVisualizer: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(DEFAULT_DATA, null, 2)
  );
  const [data, setData] = useState(DEFAULT_DATA);
  const [error, setError] = useState<string | null>(null);

  const [leftPanel, setLeftPanel] = useState<boolean>(false);

  const updateData = (input: string) => {
    try {
      const parsedData = JSON.parse(input);
      setData(parsedData);
      setError(null);
    } catch (e) {
      setError('Invalid JSON format: ' + (e as Error).message);
    }
  };

  const debouncedUpdate = debounce(updateData, 300);

  const handleJsonChange = (newValue: string) => {
    setJsonInput(newValue);
    debouncedUpdate(newValue);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50">
      <div className="flex gap-4">
        <div
          className={`transition-all ${
            leftPanel ? `w-2/5 opacity-100` : 'w-0 opacity-0'
          }`}
        >
          <JsonEditor
            value={jsonInput}
            onChange={handleJsonChange}
            error={error}
          />
        </div>

        <div className={`${leftPanel ? 'w-3/5 ml-2' : 'w-full ml-0'}`}>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1 text-gray-900">
              Translation Mapping
            </h2>
            <p className="text-sm text-gray-500">
              <span
                className="text-xl text-blue-500"
                onClick={() => {
                  setLeftPanel(!leftPanel);
                }}
              >
                (Editor)
              </span>{' '}
              Hover to highlight order
            </p>
          </div>
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {data.lines.map((line, idx) => (
              <TranslationLine
                key={idx}
                reference={line.reference}
                translation={line.translation}
                mapper={line.mapper}
                hoveredIndex={hoveredLine === idx ? hoveredIndex : null}
                onHover={(index) => {
                  setHoveredIndex(index);
                  setHoveredLine(index !== null ? idx : null);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationVisualizer;
