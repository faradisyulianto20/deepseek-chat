import ReactMarkdown from 'react-markdown'
import ThoughtMessage from './ThoughtMessage';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  thought?: string;
}

const ChatMessage = ({ role, content, thought }: ChatMessageProps) => {
  const isAssistant = role === "assistant";


  return (
    <>
      {
        !!thought && <ThoughtMessage thought={thought}/>
      }
      <div
        className={`flex items-start gap-4 ${
          isAssistant ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div
          className={`rounded-xl px-4 py-2 max-w-[80%] ${
              isAssistant
              ? 'bg-gray-800 text-white'
              : 'bg-purple-700 text-white'
          }`}
          >
              <div className="prose dark:prose-invert">
                <ReactMarkdown>{content.trim()}</ReactMarkdown>
              </div>
          </div>
      </div>
    </>
  );
};

export default ChatMessage
