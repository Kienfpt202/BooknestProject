const Pagination = () => {
    return (
      <div className="flex justify-center gap-2 py-4">
        {[1, 2].map((num) => (
          <button
            key={num}
            className={`px-3 py-2 rounded-full ${num === 1 ? "bg-brown-700 text-white" : "bg-gray-300"}`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  