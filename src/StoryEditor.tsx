export type ClefType = "treble" | "bass" | "both";

interface StoryEditorProps {
  story: string;
  setText: (t: string) => void;
  clef: ClefType;
  setClef: (clef: ClefType) => void;
  maxLedgerLines: number;
  setMaxLedgerLines: (lines: number) => void;
}

const StoryEditor = ({ story, setText, clef, setClef, maxLedgerLines, setMaxLedgerLines }: StoryEditorProps) => (
  <div className="flex flex-col h-full">
    <div className="flex-grow mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Story Text</label>
      <textarea
        className="bg-white border border-gray-200 p-5 w-full h-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
        onChange={(e) => setText(e.target.value)}
        value={story}
      />
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
      <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-2">Clef</label>
          <div className="flex border rounded-lg overflow-hidden shadow-sm">
            <button
              className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
                clef === "treble" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setClef("treble")}
            >
              Treble
            </button>
            <button
              className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
                clef === "bass" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setClef("bass")}
            >
              Bass
            </button>
            <button
              className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
                clef === "both" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setClef("both")}
            >
              Both
            </button>
          </div>
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">Max Ledger Lines</label>
          <div className="flex border rounded-lg overflow-hidden shadow-sm">
            {[0, 1, 2, 3].map((lines) => (
              <button
                key={`ledger-${lines}`}
                className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
                  maxLedgerLines === lines ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMaxLedgerLines(lines)}
              >
                {lines}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StoryEditor;
