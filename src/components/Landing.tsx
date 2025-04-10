import React, { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/usePortfolioData';
import bgPattern from '../assets/bg-pattern.svg';

const Landing = () => {
  const { setActiveSection } = useActiveSection();
  const [typing, setTyping] = useState('');
  const fullText = '프론트엔드 개발자 오승재입니다.';
  
  useEffect(() => {
    if (typing === fullText) return;
    
    const timeoutId = setTimeout(() => {
      setTyping(fullText.slice(0, typing.length + 1));
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [typing, fullText]);

  const scrollToAbout = () => {
    setActiveSection('about');
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="landing" className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-blue-900 to-purple-900 opacity-30 absolute"></div>
        <div className="w-full h-full bg-repeat opacity-5 absolute" style={{ backgroundImage: `url(${bgPattern})` }}></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glitch-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              DavidClimbing
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300 min-h-[2.5rem]">
            {typing}<span className="animate-blink">|</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-12 animate-fadeIn animation-delay-300">
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full text-white font-medium transform hover:scale-105 transition duration-300"
          >
            더 알아보기
          </button>
          <a
            href="https://github.com/davidclimbing"
            target="_blank"
            className="px-8 py-3 border border-gray-500 hover:border-gray-300 rounded-full text-gray-300 hover:text-white font-medium transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
          >
            <span>GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5"></path>
            <path d="M7 6l5 5 5-5"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Landing; 