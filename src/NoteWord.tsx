import { useEffect, useRef, useMemo } from "react";
import { Factory } from "vexflow";
import { ClefType } from "./StoryEditor";
import { computeNotes } from "./utils/noteUtils";

interface NoteWordProps {
  word: string;
  clef: ClefType;
  maxLedgerLines: number;
}

const NoteWord = ({ word, clef: clefType, maxLedgerLines }: NoteWordProps) => {
  const staffRef = useRef(null);
  
  // Compute the notes outside of useEffect
  const notesData = useMemo(() => 
    computeNotes(word, clefType, maxLedgerLines),
    [word, clefType, maxLedgerLines]
  );

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

      system
        .addStave({
          voices: [score.voice(score.notes(notesData.notes, { clef: notesData.clef }), { time: notesData.time })],
        })
        .addClef(notesData.clef);

      vf.draw();
    }
    return () => {};
  }, [word, notesData]);

  return <div ref={staffRef} className=""></div>;
};

export default NoteWord;