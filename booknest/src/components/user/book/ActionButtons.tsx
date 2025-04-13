const ActionButtons = () => {
    return (
      <div className="flex justify-center space-x-4 mt-4">
        <button className="px-4 py-2 bg-[#F5ECE3] border border-[#8B5E3B] text-[#8B5E3B] rounded hover:bg-[#E8D9C7] transition text-sm">
          Add to list
        </button>
        <button className="px-4 py-2 bg-[#F5ECE3] border border-[#8B5E3B] text-[#8B5E3B] rounded hover:bg-[#E8D9C7] transition text-sm">
          Review this book
        </button>
      </div>
    );
  };
  
  export default ActionButtons;