import { useCareerData } from '../hooks/usePortfolioData';
import ScrollAnimation from './ScrollAnimation';

const Career = () => {
  const { career, isLoading } = useCareerData();

  // S3에서 회사 로고 이미지 가져오기
  const companyLogoUrl = "https://s3.ap-northeast-2.amazonaws.com/portfolio-contents.davidclimbing/assets/career/companyLogo.png";

  // 업데이트된 경력 정보
  const updatedCareer = {
    totalExperience: "2년 6개월+",
    companies: [
      {
        name: "하베스트(HAVEST)",
        period: "2023.2 ~ 현재",
        description: "전문직군 대상 글로벌 온라인 LMS 서비스",
        department: "개발팀",
        position: "Front-end 개발자",
        projects: [
          "직군별 맞춤형 UI 개발 및 성능 개선",
          "서비스 파일 관리자 시스템 구축",
          "관리자 페이지 레이아웃 개발",
          "사용자 설정 테마 시스템 개발",
          "자격 증명 관리 및 검색 기능 구현"
        ]
      },
      {
        name: "(주)7일",
        period: "2022.11 ~ 2023.01",
        description: "기업 소개 홈페이지, 온보딩 프로젝트",
        department: "개발팀",
        position: "Front-end 개발자",
        projects: [
          "JSON 기반 컨텐츠 관리 시스템 구축",
          "다국어 지원 (i18n) 기능 구현",
          "반응형 웹 디자인 적용"
        ]
      }
    ]
  };

  if (isLoading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <section id="career" className="py-20 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <ScrollAnimation animationType="fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              <span className="relative z-10">CAREER</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
            </h2>
          </div>
        </ScrollAnimation>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <ScrollAnimation animationType="fade-in-right" className="w-full md:w-1/3 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-full">
                  <div className="rounded-full w-20 h-20 bg-gray-800/80 flex items-center justify-center">
                    <img
                      src={companyLogoUrl}
                      alt="Company Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                  <span className="font-semibold">{updatedCareer.totalExperience}</span>
                </div>
              </div>
              
              {updatedCareer.companies.map((company, index) => (
                <div key={index} className="mb-4 w-full">
                  <ScrollAnimation 
                    animationType="fade-in-up" 
                    delay={index === 0 ? "delay-100" : "delay-200"}
                  >
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-400 transition duration-300">
                      <p className="font-medium text-white mb-1">{company.name}</p>
                      <p className="text-blue-300 text-sm mb-1">{company.period}</p>
                      <p className="text-gray-400 text-sm">{company.position} | {company.department}</p>
                    </div>
                  </ScrollAnimation>
                </div>
              ))}
            </ScrollAnimation>
            
            <ScrollAnimation animationType="fade-in-left" className="w-full md:w-2/3">
              <div className="relative pl-8 border-l-2 border-gray-700">
                {updatedCareer.companies.map((company, companyIndex) => (
                  <div key={companyIndex} className="mb-10 last:mb-0">
                    <ScrollAnimation 
                      animationType="fade-in-up" 
                      delay={companyIndex === 0 ? "delay-100" : "delay-200"}
                    >
                      <div className="absolute -left-[41px] top-4 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300">
                        <div className="mb-4 pb-2 border-b border-gray-700/50">
                          <p className="font-semibold text-lg text-white">
                            {company.name}
                            <span className="ml-2 text-sm font-normal text-blue-300">{company.period}</span>
                          </p>
                          <p className="text-gray-300 text-sm">{company.description}</p>
                        </div>
                        <ul className="space-y-2">
                          {company.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="flex items-start text-sm text-gray-300">
                              <span className="mr-2 text-blue-400 pt-1 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Career;