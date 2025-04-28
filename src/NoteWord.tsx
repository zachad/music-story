import { useEffect, useRef } from "react";
import { Factory } from "vexflow";
import { ClefType } from "./StoryEditor";

interface NoteWordProps {
  word: string;
  clef: ClefType;
  maxLedgerLines: number;
}

const NoteWord = ({ word, clef: clefType, maxLedgerLines }: NoteWordProps) => {
  const staffRef = useRef(null);

  useEffect(() => {
    if (staffRef.current) {
      (staffRef.current as HTMLDivElement).innerHTML = "";

      const vf = new Factory({
        renderer: {
          elementId: staffRef.current,
          width: word.length * 25 + 50,
          height: 150,
        },
      });
      const score = vf.EasyScore();
      const system = vf.System();

      // If clefType is 'both', randomly select 'treble' or 'bass', otherwise use specified clef
      const clef = clefType === "both" ? (Math.random() < 0.5 ? "treble" : "bass") : clefType;
      
      // Define note ranges based on staff and maxLedgerLines
      // For each note, we define the octave ranges that fall within the allowed ledger lines
      const noteRanges = {
        treble: {
          // Treble clef staff: E4 to F5 (no ledger lines)
          // Below staff ledger lines: C4(1), A3(2), F3(3)
          // Above staff ledger lines: A5(1), C6(2), E6(3)
          'A': maxLedgerLines >= 1 ? [4, 5] : [4],
          'B': [4],
          'C': maxLedgerLines >= 1 ? [4, 5] : [5],
          'D': [4, 5],
          'E': [4, 5],
          'F': [4, 5],
          'G': [4, 5],
        },
        bass: {
          // Bass clef staff: G2 to A3 (no ledger lines)
          // Below staff ledger lines: E2(1), C2(2), A1(3)  
          // Above staff ledger lines: C4(1), E4(2), G4(3)
          'A': [3],
          'B': [3],
          'C': maxLedgerLines >= 1 ? [3, 4] : [3],
          'D': [3],
          'E': maxLedgerLines >= 1 ? [2, 3] : [3],
          'F': [3],
          'G': maxLedgerLines >= 1 ? [2, 3] : [3],
        }
      };
      
      const time = `${word.length * 2}/2`;
      const notes = word
        .split("")
        .map((c, ix) => {
          const note = c.toUpperCase();
          const possibleOctaves = noteRanges[clef][note] || [clef === 'treble' ? 4 : 3];
          const octave = possibleOctaves[Math.floor(Math.random() * possibleOctaves.length)];
          
          return ix === 0 ? `${note}${octave}/w` : `${note}${octave}`;
        })
        .join(", ");

      system
        .addStave({
          voices: [score.voice(score.notes(notes, { clef }), { time })],
        })
        .addClef(clef);

      vf.draw();
    }
    return () => {};
  }, [word, clefType, maxLedgerLines]);

  return <div ref={staffRef} className=""></div>;
};

export default NoteWord;
