import React from 'react';

const Masthead = () => {
  const today = new Date().toLocaleDateString('zh-CN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="flex flex-col items-center border-b-4 border-black mb-8 pb-2">
      <div className="w-full flex justify-between items-end border-b border-stone-800 pb-1 mb-2">
        <span className="text-xs font-mono-data uppercase tracking-widest text-stone-600">第 254 卷 第 12 期</span>
        <span className="text-xs font-mono-data uppercase tracking-widest text-stone-600">创刊于 2024 年</span>
        <span className="text-xs font-mono-data uppercase tracking-widest text-stone-600">¥4.00</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-masthead font-black tracking-tight text-center my-4 leading-normal">
        每日神经报
      </h1>
      
      <div className="w-full border-t-2 border-b-2 border-stone-800 py-1 flex justify-between items-center px-4">
        <div className="text-sm font-sans-body font-bold uppercase">{today}</div>
        <div className="italic font-serif-headline text-stone-600 hidden md:block">“尽录所有值得打印的 Token”</div>
        <div className="text-sm font-sans-body font-bold uppercase">全球版</div>
      </div>
    </header>
  );
};

export default Masthead;