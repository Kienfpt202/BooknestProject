// components/NewDiscussionModal.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle content change in the contentEditable div
  const handleContentChange = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.innerText;
      setContent(newContent);
    }
  };

  // Set placeholder behavior
  useEffect(() => {
    if (contentRef.current && !content) {
      contentRef.current.innerText = 'Huy, What do you think?';
      contentRef.current.classList.add('text-gray-400');
    }
  }, [content]);

  // Handle focus to clear placeholder
  const handleFocus = () => {
    if (contentRef.current && contentRef.current.innerText === 'Huy, What do you think?') {
      contentRef.current.innerText = '';
      contentRef.current.classList.remove('text-gray-400');
    }
  };

  // Handle blur to restore placeholder if empty
  const handleBlur = () => {
    if (contentRef.current && !contentRef.current.innerText.trim()) {
      contentRef.current.innerText = 'Huy, What do you think?';
      contentRef.current.classList.add('text-gray-400');
    }
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && content !== 'Huy, What do you think?') {
      onSubmit(content);
      setContent('');
      onClose();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Close modal on click outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
      aria-label="Create a new discussion"
    >
      <div
        ref={modalRef}
        className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">Create a new Discussion</h3>
        <hr className="border-gray-300 mb-4" />

        {/* User Info */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-gray-800 font-semibold">Hoang Huy</p>
        </div>

        {/* Content Input */}
        <form onSubmit={handleSubmit}>
          <div
            ref={contentRef}
            contentEditable
            onInput={handleContentChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full min-h-[60px] text-gray-800 focus:outline-none mb-4"
          />

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-4">
            <button
              type="button"
              className="flex items-center px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-3m-7-3h7m-7 0V3m0 3l-3-3m3 3l-3 3"
                />
              </svg>
              Add book
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Add poll
            </button>
          </div>

          {/* Post Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDiscussionModal;