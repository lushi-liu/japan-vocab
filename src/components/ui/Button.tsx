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
    primary:
      'bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 hover:scale-[1.02]',
    secondary:
      'bg-transparent border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} inline-flex items-center justify-center rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-300 focus:outline-none active:scale-95`}
    >
      {children}
    </button>
  );
}
