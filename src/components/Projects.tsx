import { useProjectsData } from '../hooks/usePortfolioData';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ScrollAnimation from './ScrollAnimation';

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const autoSlideIntervalRef = useRef<number | null>(null);
    
  const getImagePath = (path: string) => {    
    return `https://s3.ap-northeast-2.amazonaws.com/portfolio-contents.davidclimbing${path}`;
  };

  // 슬라이드 시작/중지 함수
  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    
    if (project.images && project.images.length > 1) {
      autoSlideIntervalRef.current = window.setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
  }, [project.images]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideIntervalRef.current !== null) {
      window.clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
  }, []);

  // 모달 초기 설정 - ESC, 외부 클릭 처리
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
    
    // 모달이 마운트되면 즉시 자동 슬라이드 시작
    if (autoSlide && project.images && project.images.length > 1) {
      startAutoSlide();
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
      stopAutoSlide();
    };
  }, [onClose, autoSlide, project.images, startAutoSlide, stopAutoSlide]);

  // autoSlide 상태 변경 시 타이머 업데이트
  useEffect(() => {
    if (autoSlide) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  }, [autoSlide, startAutoSlide, stopAutoSlide]);

  // 프로젝트 변경 시 초기화
  useEffect(() => {
    setCurrentImageIndex(0);
    if (autoSlide) {
      startAutoSlide();
    }
  }, [project.id, autoSlide, startAutoSlide]);

  const nextImage = () => {
    if (project.images && project.images.length > 0) {
      setAutoSlide(false);
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 0) {
      setAutoSlide(false);
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setAutoSlide(false);
    setCurrentImageIndex(index);
  };

  const toggleAutoSlide = () => {
    setAutoSlide(prev => !prev);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
      >
        <div className="sticky top-0 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 flex justify-between items-center p-4 z-10">
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {project.title}

            <div className="flex flex-wrap gap-2 items-center my-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  프로젝트 방문
                </a>
              )}
            </div>
          </h2>
          <button
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
            onClick={onClose}
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {project.images && project.images.length > 0 ? (
            <div className="relative rounded-lg overflow-hidden border border-gray-700">
              <div className="relative aspect-video">
                {project.images[currentImageIndex].endsWith('.mov') ? (
                  <video 
                    src={getImagePath(project.images[currentImageIndex])} 
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"%3E%3Crect width="800" height="450" fill="%23111827"/%3E%3Cpath d="M400 225C400 225 400 225 400 225C400 225 400 225 400 225C400 225 400 225 400 225Z" stroke="%236B7280" stroke-width="8"/%3E%3Ctext x="400" y="225" font-family="sans-serif" font-size="24" text-anchor="middle" fill="%236B7280"%3E비디오를 불러올 수 없습니다%3C/text%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <img 
                    src={getImagePath(project.images[currentImageIndex])} 
                    alt={`${project.title} - 이미지 ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"%3E%3Crect width="800" height="450" fill="%23111827"/%3E%3Cpath d="M400 225C400 225 400 225 400 225C400 225 400 225 400 225C400 225 400 225 400 225Z" stroke="%236B7280" stroke-width="8"/%3E%3Ctext x="400" y="225" font-family="sans-serif" font-size="24" text-anchor="middle" fill="%236B7280"%3E이미지를 불러올 수 없습니다%3C/text%3E%3C/svg%3E';
                      e.currentTarget.onerror = null;
                    }}
                  />
                )}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button 
                  onClick={prevImage}
                  className="p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 text-white transition-colors transform hover:scale-110 cursor-pointer"
                  aria-label="이전 이미지"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 text-white transition-colors transform hover:scale-110 cursor-pointer"
                  aria-label="다음 이미지"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {project.images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 py-1.5">
                  <button
                    onClick={toggleAutoSlide}
                    className={`absolute left-1 p-1.5 rounded-full transition-colors cursor-pointer ${
                      autoSlide ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                    aria-label={autoSlide ? "자동 슬라이드 중지" : "자동 슬라이드 시작"}
                  >
                    {autoSlide ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  
                  {project.images.map((_, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-blue-400 w-5' 
                          : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                      aria-label={`이미지 ${index + 1}로 이동`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : project.image ? (
            <div className="rounded-lg overflow-hidden border border-gray-700">
              {project.image.endsWith('.mov') ? (
                <video 
                  src={getImagePath(project.image)} 
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"%3E%3Crect width="800" height="450" fill="%23111827"/%3E%3Cpath d="M400 225C400 225 400 225 400 225C400 225 400 225 400 225C400 225 400 225 400 225Z" stroke="%236B7280" stroke-width="8"/%3E%3Ctext x="400" y="225" font-family="sans-serif" font-size="24" text-anchor="middle" fill="%236B7280"%3E비디오를 불러올 수 없습니다%3C/text%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <img 
                  src={getImagePath(project.image)} 
                  alt={project.title} 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"%3E%3Crect width="800" height="450" fill="%23111827"/%3E%3Cpath d="M400 225C400 225 400 225 400 225C400 225 400 225 400 225C400 225 400 225 400 225Z" stroke="%236B7280" stroke-width="8"/%3E%3Ctext x="400" y="225" font-family="sans-serif" font-size="24" text-anchor="middle" fill="%236B7280"%3E이미지를 불러올 수 없습니다%3C/text%3E%3C/svg%3E';
                    e.currentTarget.onerror = null;
                  }}
                />
              )}
            </div>
          ) : null}
          
          <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50">
            <h3 className="text-lg text-white font-medium mb-3">프로젝트 소개</h3>
            <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50">
              <h3 className="flex items-center text-lg text-white font-medium mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.623-9-1.746M3 16V8a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                </svg>
                기여한 부분
              </h3>
              <ul className="space-y-2">
                {project.role.map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50">
              <h3 className="flex items-center text-lg text-white font-medium mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                주요 성과
              </h3>
              <ul className="space-y-2">
                {project.result.map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-green-400 mr-2 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50">
            <h3 className="text-lg text-white font-medium mb-3">사용 기술</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${index % 3 === 0 ? 'bg-blue-500/20 text-blue-300' : 
                      index % 3 === 1 ? 'bg-purple-500/20 text-purple-300' : 
                      'bg-teal-500/20 text-teal-300'}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {project.github && (
            <div className="text-center pt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub 저장소 보기
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const Projects = () => {
  const { projects, isLoading } = useProjectsData();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  if (isLoading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <>
      <section id="projects" className="py-20 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <ScrollAnimation animationType="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
                <span className="relative z-10">PROJECTS</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ScrollAnimation 
                key={project.id} 
                animationType={index % 2 === 0 ? 'fade-in-right' : 'fade-in-left'} 
                delay={`delay-${(index % 4) * 100}` as any}
              >
                <div
                  className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative p-5 border-b border-gray-700/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <div className="flex space-x-1 items-center">
                            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                            <span className="h-2 w-2 rounded-full bg-blue-300"></span>
                          </div>
                          <span className="text-xs text-gray-400">{project.period}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 relative">
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 3).map((skill: string, index: number) => (
                        <span
                          key={index}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            index % 3 === 0 ? 'bg-blue-500/20 text-blue-300' : 
                            index % 3 === 1 ? 'bg-purple-500/20 text-purple-300' : 
                            'bg-teal-500/20 text-teal-300'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700/80 text-gray-300">
                          +{project.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`absolute bottom-3 right-3 transition-all duration-300 ${
                    hoveredId === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <div 
                      className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        `}
      </style>
    </>
  );
}

export default Projects;
