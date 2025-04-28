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
  <div className="flex flex-col gap-4 grow content-stretch">
    <div className="mb-4">
      <textarea
        className="bg-white border border-gray-200 p-5 w-full h-52 rounded-md"
        onChange={(e) => setText(e.target.value)}
        value={story}
      />
    </div>
    <div className="bg-white border border-gray-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-3">Configuration</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Clef</label>
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`flex-1 py-2 text-center ${
              clef === "treble" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setClef("treble")}
          >
            Treble
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              clef === "bass" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setClef("bass")}
          >
            Bass
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              clef === "both" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setClef("both")}
          >
            Both
          </button>
        </div>
      </div>
      <div className="mb-2 mt-4">
        <label className="block text-sm font-medium mb-1">Max Ledger Lines</label>
        <div className="flex border rounded-md overflow-hidden">
          {[0, 1, 2, 3].map((lines) => (
            <button
              key={`ledger-${lines}`}
              className={`flex-1 py-2 text-center ${
                maxLedgerLines === lines ? "bg-blue-500 text-white" : "bg-gray-100"
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
);

export default StoryEditor;
