'use client';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  onClick,
  children,
  variant = 'primary',
}: ButtonProps) {
  const styles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary:
      'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold transition-all duration-200 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none`}
    >
      {children}
    </button>
  );
}
