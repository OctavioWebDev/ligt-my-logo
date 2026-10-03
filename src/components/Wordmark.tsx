import { siteConfig } from '@/config/site';

export default function Wordmark({ className = 'text-xl' }: { className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text font-semibold text-transparent ${className}`}>
      {siteConfig.name}
    </span>
  );
}
