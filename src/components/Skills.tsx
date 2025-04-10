import { useSkillsData } from '../hooks/usePortfolioData';
import ScrollAnimation from './ScrollAnimation';

const Skills = () => {
  const { skills, isLoading } = useSkillsData();

  const updatedSkills = {
    languages: ["TypeScript", "JavaScript", "Python"],
    frontend: ["Angular", "React", "Next.js", "RxJS", "Zustand", "Tailwindcss", "Styled components", "Sass"],
    cloud: ["AWS"],
    tools: ["Git", "Figma", "Jira"]
  };

  if (isLoading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <section id="skills" className="py-20 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <ScrollAnimation animationType="fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
              <span className="relative z-10">SKILLS</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
            </h2>
          </div>
        </ScrollAnimation>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollAnimation animationType="fade-in-right" delay="delay-100">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full hover:border-blue-400 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {updatedSkills.languages.map((skill, index) => (
                  <ScrollAnimation 
                    key={index} 
                    animationType="fade-in-up" 
                    delay={`delay-${index * 100}` as any}
                    className="inline-block"
                  >
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm">
                      {skill}
                    </span>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animationType="fade-in-left" delay="delay-200">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full hover:border-blue-400 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {updatedSkills.frontend.map((skill, index) => (
                  <ScrollAnimation 
                    key={index} 
                    animationType="fade-in-up" 
                    delay={`delay-${index * 70}` as any}
                    className="inline-block"
                  >
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm">
                      {skill}
                    </span>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animationType="fade-in-right" delay="delay-300">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full hover:border-blue-400 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Cloud
              </h3>
              <div className="flex flex-wrap gap-2">
                {updatedSkills.cloud.map((skill, index) => (
                  <ScrollAnimation 
                    key={index} 
                    animationType="fade-in-up" 
                    delay={`delay-${index * 70}` as any}
                    className="inline-block"
                  >
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm">
                      {skill}
                    </span>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animationType="fade-in-left" delay="delay-400">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full hover:border-blue-400 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {updatedSkills.tools.map((skill, index) => (
                  <ScrollAnimation 
                    key={index} 
                    animationType="fade-in-up" 
                    delay={`delay-${index * 70}` as any}
                    className="inline-block"
                  >
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm">
                      {skill}
                    </span>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default Skills;