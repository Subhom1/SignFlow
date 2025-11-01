export const FallBackLoader = ({ minHeight = true }: { minHeight?: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${minHeight && 'min-h-screen'}`}>
      <div
        className={`w-12 h-12 border-4  border-primary border-t-transparent dark:border-primaryDarkAccent dark:border-t-transparent  rounded-full animate-spin`}
      />
    </div>
  );
};
