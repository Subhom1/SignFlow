type Props = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  href?: string;
  target?: string;
  rel?: string;
};

export const Button = ({
  text,
  disabled = false,
  onClick,
  variant = 'primary',
  href,
  target,
  rel,
}: Props) => {
  const baseClasses =
    'md:px-6 md:py-3 px-5 py-4 font-semibold md:text-base text-sm rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition';

  const variantClasses =
    variant === 'primary'
      ? 'bg-primary dark:bg-btnDark text-white'
      : 'bg-blue-500 dark:bg-blue-700 text-white';

  const className = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
        {text}
      </a>
    );
  }

  return (
    <button className={className} disabled={disabled} data-testid="sign-btn" onClick={onClick}>
      {text}
    </button>
  );
};
