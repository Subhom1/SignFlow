export const Button = ({ text }: { text: string }) => {
  return (
    <button
      className="px-8 py-3 bg-[#cc844d] dark:bg-[#3a4e6a] text-white font-semibold text-base rounded-xl shadow-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition"
      disabled
      data-testid="sign-btn"
    >
      {text}
    </button>
  );
};
