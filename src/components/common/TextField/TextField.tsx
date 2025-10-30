type Props = {
  value?: string;
  onChange?: (_value: string) => void;
};

export const TextField = ({ value: inputValue, onChange }: Props) => {
  return (
    <input
      placeholder="Enter your name"
      className="px-5 py-3 border-2 border-slate-200 rounded-xl text-base 
    bg-slate-50 dark:bg-gray-800 focus:outline-none 
    focus:border-orange-500 dark:focus:border-gray-800
    focus:bg-white focus:ring-4 focus:ring-gray-100
    text-black dark:text-slate-50 placeholder:text-slate-400 transition"
      data-testid="name-input"
      type="text"
      value={inputValue ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
