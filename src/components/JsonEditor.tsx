import React from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold mb-2 text-gray-900">JSON Input</h2>
      <div className="space-y-2">
        <textarea
          className="w-full h-[600px] p-2 font-mono text-sm border rounded-md text-gray-800 bg-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};
