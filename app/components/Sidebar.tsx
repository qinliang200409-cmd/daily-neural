import React from 'react';
import { Article, TechBrief, WeatherData } from '../types';

interface SidebarProps {
  articles: Article[];
  techBriefs: TechBrief[];
  weather: WeatherData;
}

const Sidebar: React.FC<SidebarProps> = ({ articles, techBriefs, weather }) => {
  return (
    <aside className="col-span-12 lg:col-span-4 pl-0 lg:pl-4 flex flex-col h-full">
      
      {/* Weather Widget (Top of Sidebar) */}
      <div className="border-2 border-stone-800 p-4 mb-8 bg-stone-200/50">
        <h4 className="font-sans-body font-bold text-xs uppercase tracking-widest mb-2 border-b border-stone-400 pb-1">全球气象站</h4>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-2xl font-serif-headline font-bold">{weather.city}</p>
                <p className="text-sm font-mono-data text-stone-600">{weather.condition}</p>
            </div>
            <div className="text-right">
                <p className="text-4xl font-sans-body font-bold">{weather.temp}</p>
            </div>
        </div>
        <p className="mt-2 text-xs font-serif-headline italic">“{weather.forecast}”</p>
      </div>

      {/* Side Articles */}
      <div className="mb-8">
        <h4 className="font-sans-body font-bold text-xs uppercase tracking-widest mb-4 border-b-2 border-black pb-1">其他新闻</h4>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.id} className="group cursor-pointer">
              <span className="text-xs font-mono-data text-red-700 uppercase mb-1 block">{article.category}</span>
              <h5 className="text-xl font-serif-headline font-bold leading-tight mb-2 group-hover:underline decoration-1 underline-offset-2">
                {article.headline}
              </h5>
              <p className="text-sm font-sans-body text-stone-600 line-clamp-3 leading-relaxed">
                {article.content}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Briefs (Bottom Sidebar) */}
      <div className="mt-auto bg-stone-800 text-stone-100 p-4 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <h4 className="font-mono-data font-bold text-xs uppercase tracking-widest mb-4 text-cyan-400">
            // 科技快讯_FEED
        </h4>
        <ul className="space-y-4">
            {techBriefs.map((brief, idx) => (
                <li key={idx} className="border-b border-stone-700 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between mb-1">
                         <span className="text-xs font-bold text-stone-300 uppercase">{brief.tag}</span>
                         <span className="text-[10px] font-mono-data text-stone-500">0{idx + 1}</span>
                    </div>
                    <p className="font-sans-body text-sm leading-snug hover:text-cyan-200 transition-colors cursor-pointer">
                        {brief.title}
                    </p>
                </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;