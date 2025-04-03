import React from "react";

interface PollOption {
  text: string;
  votes: number;
  // ... các thuộc tính khác của option nếu có
}

interface PollCardProps {
  question: string;
  options: PollOption[]; // 'options' là một mảng các đối tượng 'PollOption'
}

const PollCard: React.FC<PollCardProps> = ({ question, options }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-2">{question}</h3>
      {options.map((option, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <span>{option.text}</span>
          <span className="text-gray-600">{option.votes} votes</span>
        </div>
      ))}
    </div>
  );
};

export default PollCard;