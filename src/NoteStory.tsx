import NoteWord from "./NoteWord";
import { ClefType } from "./StoryEditor";

// matches words longer than 2 characters made up of only A-G

const musicNoteRegex: RegExp = /^([A-Ga-g]{2,})[:\-.,!()\\[\]]?$/;
interface NoteStoryProps {
  story: string;
  clef: ClefType;
  maxLedgerLines: number;
}
const NoteStory = ({ story, clef, maxLedgerLines }: NoteStoryProps) => {
  return (
    <div className="p-4 text-lg">
      {story.split("\n").map((paragraph, ix) => (
        <div
          key={`p_${ix}`}
          className="flex flex-wrap flex-row gap-x-1 content-start items-center"
        >
          {paragraph.split(" ").map((s, ix) => {
            const match = s.trimEnd().trimStart().match(musicNoteRegex);
            if (match && match?.length > 0) {
              return <NoteWord word={match[1]} clef={clef} maxLedgerLines={maxLedgerLines} key={`${match[1]}_${ix}`} />;
            }
            return s.length ? <div key={`${s}_${ix}`}>{s}</div> : "";
          })}
        </div>
      ))}
    </div>
  );
};

export default NoteStory;
