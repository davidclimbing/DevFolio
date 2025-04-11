import { useAboutData } from '../hooks/usePortfolioData';
import profileImage from '../assets/profileImage.jpeg';
import ScrollAnimation from './ScrollAnimation';

const About = () => {
  const { about, isLoading } = useAboutData();
  
  const basicInfo = {
    location: "경기도 용인시 수지구",
    email: "general.davidclimbing@gmail.com",
    github: "https://github.com/davidclimbing"
  };

  if (isLoading) return <div className="py-16 text-center">Loading...</div>;
  if (!about) return null;

  return (
    <section id="about" className="py-20 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <ScrollAnimation animationType="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block">
            <span className="relative z-10">ABOUT</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
          </h2>
        </ScrollAnimation>
        
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 max-w-5xl mx-auto">
          <ScrollAnimation animationType="fade-in-right" className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative mb-6 animate-float group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <img
                src={profileImage as string}
                alt="Profile"
                className="relative w-48 h-64 object-cover rounded-xl shadow-xl"
              />
            </div>
            
            <div className="flex gap-4 mt-4 justify-center">
              <a 
                href={`mailto:${basicInfo.email}`} 
                aria-label="email"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              
              <a 
                href={basicInfo.github} 
                aria-label="github"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/%EC%8A%B9%EC%9E%AC-%EC%98%A4-558631251/" 
                aria-label="linkedin"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animationType="fade-in-left" className="w-full md:w-2/3 max-w-xl">
            <h3 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {about.name}
            </h3>
            
            <div className="space-y-4">
              {about.details.map((detail, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 pt-1 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="flex-1 text-gray-300">{detail}</p>
                </div>
              ))}
            </div>
            
            <ScrollAnimation animationType="fade-in-up" delay="delay-200" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h4 className="font-medium mb-2 text-blue-400">위치</h4>
                <p className="text-sm text-gray-400">{basicInfo.location}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h4 className="font-medium mb-2 text-blue-400">이메일</h4>
                <a className="text-sm text-gray-400 hover:text-gray-200 transition duration-300" href={`mailto:${basicInfo.email}`}>{basicInfo.email}</a>
              </div>
            </ScrollAnimation>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default About;