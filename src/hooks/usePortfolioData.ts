import useSWR from 'swr';
import axios from 'axios';
import { AboutData, CareerData, Project, PortfolioData, SkillsData } from '../types';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

const S3_DATA_URL = 'https://s3.ap-northeast-2.amazonaws.com/portfolio-contents.davidclimbing/contents.json';

const fetchPortfolioData = async (): Promise<PortfolioData> => {
  try {
    const response = await axiosInstance.get<PortfolioData>(S3_DATA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
  }
};

// 사용자 정보는 S3에서 가져오는 것으로 변경
const fetchAboutData = async (): Promise<AboutData> => {
  // S3에서 about 데이터 가져오기
  // 실제 구현에서는 S3에 저장된 데이터를 가져오도록 구현
  return {
    name: "오승재",
    details: [
      "새로운 기술, 지속적인 성장을 탐구, 추구하는 개발자 오승재입니다"
    ]
  };
};

// 경력 정보도 S3에서 가져오기
const fetchCareerData = async (): Promise<CareerData> => {
  // S3에서 career 데이터 가져오기
  // 실제 구현에서는 S3에 저장된 데이터를 가져오도록 구현
  return {
    company: "7일",
    positions: [
      {
        title: "프론트엔드 개발자",
        period: "2022.11.14 ~ 현재",
        department: "개발팀"
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

// 프로젝트 데이터는 S3에서 가져옴
const fetchProjectsData = async (): Promise<Project[]> => {
  const data = await fetchPortfolioData();
  return data.projects;
};

// 프로젝트 데이터에서 스킬 목록 추출
const fetchSkillsData = async (): Promise<SkillsData> => {
  const projects = await fetchProjectsData();

  // 프로젝트의 모든 스킬을 수집하고 중복 제거
  const allSkills = projects.flatMap(project => project.skills);
  const uniqueSkills = Array.from(new Set(allSkills));

  // 스킬 분류 (단순화를 위해 임의로 분류)
  const languages = uniqueSkills.filter(skill =>
    ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'].includes(skill)
  );

  const frameworks = uniqueSkills.filter(skill =>
    ['Angular', 'React', 'Scss', 'Vite', 'Streamlit'].includes(skill)
  );

  const tools = uniqueSkills.filter(skill =>
    !languages.includes(skill) && !frameworks.includes(skill)
  );

  return {
    languages,
    frameworks,
    tools
  };
};

const fetchActivitiesData = async (): Promise<string[]> => {
  // S3에서 activities 데이터 가져오기
  // 실제 구현에서는 S3에 저장된 데이터를 가져오도록 구현
  return [
    "개인 사이드 프로젝트: 어쩌고 서비스 개발",
    "어쩌고 저쩌고 참여",
    "2023 어쩌고 해커톤 참가",
    "온라인 코딩 스터디 운영중",
    "어쩌고 스터디 참여"
  ];
};

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

type SectionType = 'about' | 'career' | 'projects' | 'skills' | 'activity';
const activeSectionKey = 'activeSection';

/**
 * 현재 활성화된 섹션을 관리하는 훅
 * 페이지 로드 시 'about' 섹션 자동 활성화
 * 스크롤 감지 기능 제거 - 사용자가 메뉴 클릭 시에만 활성 섹션 변경
 */
export function useActiveSection() {
  const getInitialData = (): SectionType => 'about';
  const { data, mutate } = useSWR<SectionType>(activeSectionKey, getInitialData);
  
  // 페이지 최초 로드 시 'about' 섹션 활성화
  React.useEffect(() => {
    mutate('about', false);
  }, [mutate]);
  
  return {
    activeSection: data,
    setActiveSection: (section: SectionType) => mutate(section, false)
  };
}
