export const AssetButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#f8f9fa1a] hover:bg-[#f8f9fa33] transition-all text-nowrap flex items-center  px-3 py-1.5 rounded-full text-white text-sm"
    >
      <img className="mr-1" width="25" src="/metamask.svg" alt="Metamask" />
      &nbsp;{children}
    </button>
  );
};
