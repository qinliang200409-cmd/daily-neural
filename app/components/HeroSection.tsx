import React from 'react';
import { Article } from '../types';

interface HeroSectionProps {
  article: Article;
}

const HeroSection: React.FC<HeroSectionProps> = ({ article }) => {
  return (
    <section className="col-span-12 lg:col-span-8 pr-0 lg:pr-8 mb-8 lg:mb-0 border-r-0 lg:border-r border-stone-300">
      <div className="mb-2 flex items-center space-x-2">
        <span className="bg-black text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
            {article.category}
        </span>
        <span className="text-stone-500 text-xs font-mono-data">{article.timestamp}</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif-headline font-bold leading-tight mb-4 text-stone-900">
        {article.headline}
      </h2>
      
      {article.subhead && (
        <h3 className="text-xl md:text-2xl font-sans-body font-light text-stone-700 mb-6 italic leading-snug">
          {article.subhead}
        </h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-video bg-stone-300 relative overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
           <img 
             src="https://picsum.photos/800/600?grayscale" 
             alt="Headline visual" 
             className="object-cover w-full h-full mix-blend-multiply"
           />
           <div className="absolute inset-0 bg-stone-200/10 pointer-events-none"></div>
        </div>
        
        <div className="flex flex-col justify-between">
          <p className="font-sans-body text-lg leading-relaxed text-stone-800 first-letter:text-5xl first-letter:font-serif-headline first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
            {article.content}
          </p>
          <div className="mt-4 border-t border-stone-300 pt-2">
            <p className="text-xs font-mono-data uppercase text-stone-500">
              文 / <span className="text-black font-bold">{article.author}</span> — 每日神经报编辑部
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;