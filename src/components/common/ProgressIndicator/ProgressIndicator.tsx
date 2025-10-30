import { motion } from 'framer-motion';

type Props = {
  progress: number;
};

export const ProgressIndicator = ({ progress }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <motion.div
        className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-primary dark:border-t-primaryDarkAccent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        data-testid="loading-spinner"
      />
      <h2
        className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100"
        data-testid="signing-title"
      >
        Signing your document...
      </h2>
      <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-full bg-primary dark:bg-primaryDarkAccent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
          data-testid="progress-bar"
        />
      </div>
      {/* <p className="text-sm text-slate-500 dark:text-slate-400">{Math.round(progress)}%</p> */}
    </div>
  );
};
