import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

/**
 * 테마 상태를 관리하는 커스텀 훅
 * 로컬 스토리지에 테마 설정 저장 및 시스템 테마 감지
 */
export const useTheme = () => {
  // 초기 테마 설정 (로컬 스토리지 또는 시스템 기본값)
  const getInitialTheme = (): Theme => {
    // 로컬 스토리지에서 테마 설정 확인
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // 시스템 테마 감지
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // 기본값은 다크 테마
    return 'dark';
  };

  const [theme, setTheme] = useState<Theme>('dark');
  
  // 컴포넌트 마운트 시 초기 테마 설정
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);
  
  // 테마 변경 시 로컬 스토리지 저장 및 HTML 클래스 적용
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // HTML에 테마 클래스 적용
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  return { theme, toggleTheme };
}; 