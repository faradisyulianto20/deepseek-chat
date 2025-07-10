interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-4 ${
        role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div
        className={`rounded-xl p-4 max-w-[80%] ${
            role === 'assistant'
            ? 'bg-gray-800 text-white'
            : 'bg-purple-600 text-white'
        }`}
        >
            <p className="whitespace-pre-wrap">{content.trim()}</p>
        </div>
    </div>
  );
};

export default ChatMessage
