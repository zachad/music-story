interface StoryEditorProps {
  story: string;
  setText: (t: string) => void;
}

const StoryEditor = ({ story, setText }: StoryEditorProps) => (
  <div className="flex flex-col gap-4 grow content-stretch">
    <div className="">
      <textarea
        className="bg-white border border-gray-200 p-5 w-full h-52 rounded-md"
        onChange={(e) => setText(e.target.value)}
        value={story}
      />
    </div>
  </div>
);

export default StoryEditor;
