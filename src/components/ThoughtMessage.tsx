import { Separator } from "./ui/separator";

type ThoughtMessageProps = {
  thought: string;
}

const ThoughtMessage = (props: ThoughtMessageProps) => {
  return (
    <div>
      <span className="italic text-sm px-2 py-1 bg-secondary rounded-lg">
        AI thought:
      </span>
      <div className="m-2 p-2 relative rounded text-muted-foreground text-sm flex bg-slate-800 opacity-25">
        <Separator
          orientation="vertical"
          className="absolute left-0 top-4 h-[calc(100%-2rem)] w-[3px]"
        />
        <p className="flex-1 whitespace-pre-line italic border-l-4 border-slate-500 pl-4">{props.thought.trim()}</p>
      </div>
    </div>
  );
};

export default ThoughtMessage