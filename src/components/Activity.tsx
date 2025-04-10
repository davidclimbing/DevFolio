import { useActivitiesData } from '../hooks/usePortfolioData';
import ScrollAnimation from './ScrollAnimation';

const Activity = () => {
  const { activities, isLoading } = useActivitiesData();

  // 업데이트된 활동 정보
  const updatedActivities = {
    translation: [
      {
        title: "요즘IT 번역 활동",
        period: "2024년 11월 ~ 현재",
        articles: [
          { title: "Redis와 SQLite 아키텍처 비교 번역", url: "https://yozm.wishket.com/magazine/detail/2838/" },
          { title: "파이썬 비동기는 성능 향상의 답이 아닙니다", url: "https://yozm.wishket.com/magazine/detail/2853/" },
          { title: "Python 3.13 성능 개선 관련 기술 번역", url: "https://yozm.wishket.com/magazine/detail/2872/" },
          { title: "웹소켓으로 AWS 비용 10억을 날리고 얻은 교훈", url: "https://yozm.wishket.com/magazine/detail/2902/" },
          { title: "비동기/대기보다 스레드가 유리한 이유", url: "https://yozm.wishket.com/magazine/detail/2918/" },
          { title: "1년동안 LLM과 프로그래밍하며 얻은 교훈", url: "https://yozm.wishket.com/magazine/detail/3002/" },
          { title: "2025년 리액트 기술 스택 가이드", url: "https://yozm.wishket.com/magazine/detail/3029/" }
        ]
      }
    ]
  };

  if (isLoading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <section id="activity" className="py-20">
      <div className="container mx-auto px-4">
        <ScrollAnimation animationType="fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
              <span className="relative z-10">ACTIVITY</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
            </h2>
          </div>
        </ScrollAnimation>
        
        <div className="max-w-3xl mx-auto">
          <ScrollAnimation animationType="fade-in-scale">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">기술 글 번역 활동</h3>
              {updatedActivities.translation.map((activity, index) => (
                <div key={index} className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 text-center sm:text-left">
                    <h4 className="font-medium text-lg text-white mb-1 sm:mb-0">{activity.title}</h4>
                    <span className="text-sm text-gray-400">{activity.period}</span>
                  </div>
                  
                  <ul className="space-y-2 max-w-2xl mx-auto">
                    {activity.articles.map((article, articleIndex) => (
                      <ScrollAnimation 
                        key={articleIndex} 
                        animationType="fade-in-left" 
                        delay={`delay-${articleIndex * 70}` as any}
                      >
                        <li className="flex items-start text-sm text-gray-300 group">
                          <span className="mr-2 text-blue-400 pt-0.5 group-hover:text-blue-300 transition-colors duration-300 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </span>
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hover:text-blue-300 transition-colors duration-300"
                          >
                            {article.title}
                          </a>
                        </li>
                      </ScrollAnimation>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default Activity;