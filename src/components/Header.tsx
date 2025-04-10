import { useState, useEffect } from 'react';

const Header = () => {
  const BLOG_URL = 'https://blog.davidclimbing.com';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: 'about' | 'career' | 'projects' | 'skills' | 'activity') => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`py-4 fixed top-0 left-0 right-0 z-30 transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'bg-opacity-80 shadow-lg' : 'bg-opacity-0'
      } bg-gray-800`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 id="header-logo" className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              DavidClimbing
            </span>
          </h1>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-700" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {['about', 'career', 'projects', 'skills', 'activity'].map((section) => (
                <li key={section} className="cursor-pointer relative">
                  <button
                    onClick={() => scrollToSection(section as any)}
                    className={`py-2 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center">
              <a 
                id="blog-link" 
                className="px-4 py-2 rounded-full border border-gray-600 hover:border-blue-400 text-sm hover:bg-blue-500/10 transition-all duration-300" 
                href={BLOG_URL} 
                target="_blank"
              >
                BLOG
              </a>
            </div>
          </nav>
        </div>
        
        {/* 모바일 메뉴 */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-3 py-2">
            {['about', 'career', 'projects', 'skills', 'activity'].map((section) => (
              <li key={section} className="cursor-pointer">
                <button
                  onClick={() => scrollToSection(section as any)}
                  className={`py-2 text-white font-semibold`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
            <li className="border-t border-gray-700 mt-2 pt-2">
              <a 
                id="blog-link-mobile" 
                className="inline-block px-4 py-2 rounded-full border border-gray-600 hover:border-blue-400 text-sm hover:bg-blue-500/10 transition-all duration-300" 
                href={BLOG_URL} 
                target="_blank"
              >
                BLOG
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
