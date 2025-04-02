const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[#F4ECE4] shadow-md container mx-auto">
      <div className="text-xl text-[#5B3B1D]">🔔</div>
      <button className="bg-[#6B4226] text-white px-4 py-2 rounded-lg">
        Log out
      </button>
    </header>
  );
};

export default Navbar;
