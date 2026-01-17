import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const baseStyles = cn(
    'bg-brand-surface rounded-2xl border border-brand-border/20',
    'shadow-sm',
    paddingStyles[padding],
    className
  );

  if (hover) {
    return (
      <motion.div
        className={baseStyles}
        whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(120, 175, 173, 0.2)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseStyles}>{children}</div>;
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

const aspectRatioStyles = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
};

export function CardImage({ src, alt, className, aspectRatio = 'square' }: CardImageProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl', aspectRatioStyles[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-800 line-clamp-1', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm text-gray-600 mt-1 line-clamp-2', className)}>
      {children}
    </p>
  );
}
