"use client";
import React, { useState, useEffect } from 'react';
import Masthead from './components/Masthead';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import Ticker from './components/Ticker';
import { NewspaperData } from './types';
import { fetchHeadlines, fetchMarketData, fetchTechBriefs, fetchWeather } from './services/apiService';
import JSZip from 'jszip';
import { projectFiles } from './projectFiles';

const App = () => {
  const [data, setData] = useState<NewspaperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 4 "API" calls in parallel
        const [newsData, techData, marketData, weatherData] = await Promise.all([
          fetchHeadlines(),
          fetchTechBriefs(),
          fetchMarketData(),
          fetchWeather(),
        ]);

        setData({
          heroStory: newsData.hero,
          sideStories: newsData.side,
          techBriefs: techData,
          marketData: marketData,
          weather: weatherData,
        });

      } catch (err) {
        console.error("Failed to load news feed", err);
        setError("无法获取最新版面，印刷机故障。");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDownload = async () => {
    try {
        const zip = new JSZip();
        
        Object.entries(projectFiles).forEach(([path, content]) => {
            zip.file(path, content);
        });
        
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "daily-neural-cn.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error("Failed to zip files", e);
        alert("打包下载失败");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] p-4 text-center">
        <div className="max-w-md border-4 border-black p-8 bg-white">
           <h1 className="text-4xl font-masthead mb-4">号外！号外！</h1>
           <p className="font-mono-data text-red-600 mb-6">{error}</p>
           <button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-2 font-sans-body font-bold hover:bg-stone-800">
             重试
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900 pb-12 overflow-x-hidden selection:bg-stone-300 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        <Masthead />
        
        {loading ? (
            // Loading Skeleton
            <div className="animate-pulse">
                <div className="h-8 bg-stone-300 w-full mb-8"></div>
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8">
                        <div className="h-64 bg-stone-300 w-full mb-4"></div>
                        <div className="h-4 bg-stone-300 w-3/4 mb-2"></div>
                        <div className="h-4 bg-stone-300 w-full mb-2"></div>
                        <div className="h-4 bg-stone-300 w-5/6"></div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 space-y-4">
                         <div className="h-32 bg-stone-300 w-full"></div>
                         <div className="h-32 bg-stone-300 w-full"></div>
                         <div className="h-32 bg-stone-300 w-full"></div>
                    </div>
                </div>
            </div>
        ) : (
            data && (
                <>
                    <Ticker data={data.marketData} />
                    
                    <main className="grid grid-cols-12 gap-y-8 lg:gap-x-8">
                        <HeroSection article={data.heroStory} />
                        <Sidebar 
                            articles={data.sideStories} 
                            techBriefs={data.techBriefs} 
                            weather={data.weather}
                        />
                    </main>

                    <footer className="mt-16 border-t-4 border-black pt-8 text-center pb-8">
                        <p className="font-serif-headline italic text-stone-600 mb-2">
                            “民主死于延迟”
                        </p>
                        <div className="flex justify-center space-x-6 text-xs font-mono-data uppercase text-stone-500 mb-4">
                            <span>服务条款</span>
                            <span>隐私政策</span>
                            <span>关于我们</span>
                            <span>加入我们</span>
                        </div>
                        <p className="text-xs font-sans-body text-stone-400 mb-6">
                            &copy; 2024 每日神经报 | Powered by Gemini
                        </p>
                        
                        <button 
                            onClick={handleDownload}
                            className="bg-stone-800 text-white hover:bg-black px-4 py-2 text-sm font-mono-data rounded shadow-lg transition-transform active:scale-95"
                        >
                            ⬇ 下载项目源代码 (ZIP)
                        </button>
                    </footer>
                </>
            )
        )}
      </div>
    </div>
  );
};

export default App;
