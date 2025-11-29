import React from 'react';
import { StockData } from '../types';

interface TickerProps {
  data: StockData[];
}

const Ticker: React.FC<TickerProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden bg-stone-100 border-y border-stone-300 py-2 mb-6">
      <div className="flex animate-marquee space-x-8 whitespace-nowrap">
        {data.concat(data).map((stock, idx) => (
          <div key={`${stock.symbol}-${idx}`} className="flex items-center space-x-2 font-mono-data text-xs">
            <span className="font-bold">{stock.symbol}</span>
            <span>{stock.price}</span>
            <span className={`${stock.trend === 'up' ? 'text-green-700' : stock.trend === 'down' ? 'text-red-700' : 'text-stone-500'}`}>
              {stock.trend === 'up' ? '▲' : stock.trend === 'down' ? '▼' : '▬'} {stock.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;