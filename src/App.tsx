import { useState } from "react";
import "./App.css";
import NoteStory from "./NoteStory";
import StoryEditor from "./StoryEditor";

// default story from the original exercise book
const story = `While helping their Dad in the garden, Abe and Ada asked for a bag of seeds to plant their very own little bed of flowers along the edge of the cabbage patch. Soon the pretty flowers grew, and one day they saw a bee gathering honey to store away and feed upon during the winter months. They watered the flower bed each day and added special flower feed to the soil. With the coming of Fall the flowers faded and to their great dismay, they were all dead when the frost arrived. But Dad told Ada and Abe they could plant another garden in the spring.`;

function App() {
  const [text, setText] = useState<string>(story);

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen print:h-auto overflow-hidden print:overflow-visible bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md print:shadow-none print:border-b print:border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          NoteStory
        </h1>
      </header>
      <div className="grid grid-cols-4 print:grid-cols-1 overflow-hidden print:m-1 p-4 print:p-0 gap-4">
        <div className="col-span-1 print:hidden overflow-y-auto max-h-full">
          <StoryEditor story={text} setText={setText} />
        </div>
        <div className="col-span-3 print:col-span-1 flex flex-col min-h-0">
          <div className="bg-white border border-gray-200 print:border-0 rounded-md shadow-md print:shadow-none p-6 print:p-0 overflow-y-auto min-h-0">
            <NoteStory story={text} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
