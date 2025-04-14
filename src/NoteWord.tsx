import { useEffect, useRef } from "react";
import { Factory } from "vexflow";

interface NoteWordProps {
  word: string;
}

const NoteWord = ({ word }: NoteWordProps) => {
  const staffRef = useRef(null);

  useEffect(() => {
    if (staffRef.current) {
      (staffRef.current as HTMLDivElement).innerHTML = "";
      const vf = new Factory({
        renderer: {
          elementId: staffRef.current,
          width: word.length * 25 + 50,
          height: 125,
        },
      });
      const score = vf.EasyScore();
      const system = vf.System();

      const clef = Math.random() < 0.5 ? "treble" : "bass";
      const octave = { bass: 3, treble: 4 };
      const time = `${word.length * 2}/2`;
      const notes = word
        .split("")
        .map((c, ix) =>
          ix == 0 ? `${c}${octave[clef]}/w` : `${c}${octave[clef]}`
        )
        .join(", ");

      system
        .addStave({
          voices: [score.voice(score.notes(notes, { clef }), { time })],
        })
        .addClef(clef);

      vf.draw();
    }
    return () => {
      if (staffRef.current) {
        (staffRef.current as HTMLDivElement).innerHTML = "";
      }
    };
  }, []);

  return <div ref={staffRef}></div>;
};

export default NoteWord;
