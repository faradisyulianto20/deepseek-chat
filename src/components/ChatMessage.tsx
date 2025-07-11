import ReactMarkdown from 'react-markdown'

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAssistant = role === "assistant";


  return (
    <div
      className={`flex items-start gap-4 ${
        isAssistant ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div
        className={`rounded-xl p-4 max-w-[80%] ${
            isAssistant
            ? 'bg-gray-800 text-white'
            : 'bg-purple-600 text-white'
        }`}
        >
            <div className="prose dark:prose-invert">
              <ReactMarkdown>{content.trim()}</ReactMarkdown>
            </div>
        </div>
    </div>
  );
};

export default ChatMessage
