import useSWR from 'swr';
import { AboutData, CareerData, Project, SkillsData } from '../types';

// Mock API 함수들 (실제 API가 있다면 여기서 fetch 호출)
const fetchAboutData = async (): Promise<AboutData> => {
  // API 대신 하드코딩된 데이터 반환
  return {
    name: "오소영",
    details: [
      "1997년 5월 6일(26살) | 경기도 수원시, 서울 관악구 거주",
      "하고 싶은 일을 담대하게 하는 사람",
      "다양한 경험을 통해 재밌는 일을 찾고 싶어요"
    ]
  };
};

const fetchCareerData = async (): Promise<CareerData> => {
  return {
    company: "그릿",
    positions: [
      {
        title: "프론트엔드 개발자(인턴)",
        period: "2023.05.08 ~ 현재",
        department: "소셜벤처팀 & 플랫폼개발팀"
      }
    ],
    projects: [
      {
        team: "소셜벤처팀",
        title: "어쩌고저쩌 영어 학습 사이트 구축(1인 개발)",
        tasks: [
          "프론트엔드 코딩 구현",
          "리팩토링 & 코드 최적화"
        ]
      },
      {
        team: "플랫폼개발팀",
        title: "그릿 메인 서비스 어쩌고 개발",
        tasks: [
          "프론트엔드 코드 주요 기능 및 디자인 컴포넌트 개발",
          "어쩌고 저쩌고 담당"
        ]
      }
    ]
  };
};

const fetchProjectsData = async (): Promise<Project[]> => {
  return [
    {
      id: 1,
      title: "PROJECT 1",
      tags: ["New", "React"]
    },
    {
      id: 2,
      title: "PROJECT 2",
      tags: ["New", "React", "Node.js", "API"]
    }
  ];
};

const fetchSkillsData = async (): Promise<SkillsData> => {
  return {
    languages: ["JavaScript", "TypeScript", "HTML/CSS", "Python"],
    frameworks: ["React", "Next.js"],
    tools: ["Git"]
  };
};

const fetchActivitiesData = async (): Promise<string[]> => {
  return [
    "개인 사이드 프로젝트: 어쩌고 서비스 개발",
    "어쩌고 저쩌고 참여",
    "2023 어쩌고 해커톤 참가",
    "온라인 코딩 스터디 운영중",
    "어쩌고 스터디 참여"
  ];
};

// SWR Custom Hooks
export function useAboutData() {
  const { data, error, isLoading, mutate } = useSWR<AboutData, Error>('about', fetchAboutData);

  return {
    about: data,
    isLoading,
    isError: error,
    updateAbout: (newData: Partial<AboutData>) => mutate({ ...data, ...newData } as AboutData, false)
  };
}

export function useCareerData() {
  const { data, error, isLoading, mutate } = useSWR<CareerData, Error>('career', fetchCareerData);

  return {
    career: data,
    isLoading,
    isError: error,
    updateCareer: (newData: Partial<CareerData>) => mutate({ ...data, ...newData } as CareerData, false)
  };
}

export function useProjectsData() {
  const { data, error, isLoading, mutate } = useSWR<Project[], Error>('projects', fetchProjectsData);

  return {
    projects: data || [],
    isLoading,
    isError: error,
    addProject: (newProject: Project) => mutate([...(data || []), newProject], false),
    updateProjects: (newProjects: Project[]) => mutate(newProjects, false)
  };
}

export function useSkillsData() {
  const { data, error, isLoading, mutate } = useSWR<SkillsData, Error>('skills', fetchSkillsData);

  return {
    skills: data,
    isLoading,
    isError: error,
    updateSkills: (newData: Partial<SkillsData>) => mutate({ ...data, ...newData } as SkillsData, false)
  };
}

export function useActivitiesData() {
  const { data, error, isLoading, mutate } = useSWR<string[], Error>('activities', fetchActivitiesData);

  return {
    activities: data || [],
    isLoading,
    isError: error,
    updateActivities: (newData: string[]) => mutate(newData, false),
    addActivity: (newActivity: string) => mutate([...(data || []), newActivity], false)
  };
}

// 활성 섹션 추적을 위한 전역 상태 관리
type SectionType = 'about' | 'career' | 'projects' | 'skills' | 'activity';
const activeSectionKey = 'activeSection';

export function useActiveSection() {
  const getInitialData = (): SectionType => 'about';

  const { data, mutate } = useSWR<SectionType>(activeSectionKey, getInitialData);

  return {
    activeSection: data,
    setActiveSection: (section: SectionType) => mutate(section, false)
  };
}
