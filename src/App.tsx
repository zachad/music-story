import "./App.css";
import NoteWord from "./NoteWord";

// default story from the original exercise book
const story = `While helping their Dad in the garden, Abe and Ada asked for a bag of seeds to plant their very own little bed of flowers along the edge of the cabbage patch. Soon the pretty flowers grew, and one day they saw a bee gathering honey to store away and feed upon during the winter months. They watered the flower bed each day and added special flower feed to the soil. With the coming of Fall the flowers faded and to their great dismay, they were all dead when the frost arrived. But Dad told Ada and Abe they could plant another garden in the spring.`;

// matches words longer than 2 characters made up of only A-G
const musicNoteRegex: RegExp = /^[A-Ga-g]{2,}$/;

function App() {
  return (
    <div className="p-2 text-xl flex flex-wrap flex-row gap-x-1 gap-y-4 content-start items-center">
      {story.split(" ").map((s, ix) => {
        if (musicNoteRegex.test(s.trimEnd().trimStart())) {
          return <NoteWord word={s} key={`${s}_${ix}`} />;
        }
        return (
          <div className="" key={`${s}_${ix}`}>
            {s}
          </div>
        );
      })}
    </div>
  );
}

export default App;
