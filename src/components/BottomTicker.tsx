import { tickerMessages } from '@/data/mockData';

export const BottomTicker = () => {
  const repeatedMessages = [...tickerMessages, ...tickerMessages, ...tickerMessages];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-card/90 backdrop-blur-md border-t border-primary/20 flex items-center overflow-hidden z-20">
      <div className="flex items-center gap-8 ticker-scroll whitespace-nowrap">
        {repeatedMessages.map((message, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">{message}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
