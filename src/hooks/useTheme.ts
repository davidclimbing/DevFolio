import { useState, useEffect } from 'react';

export type Theme = 'dark';

/**
 * 테마 상태를 관리하는 커스텀 훅
 * 다크 테마만 지원
 */
export const useTheme = () => {
  // 항상 다크 테마 반환
  const getInitialTheme = (): Theme => {
    return 'dark';
  };

  const [theme, setTheme] = useState<Theme>('dark');
  
  // 컴포넌트 마운트 시 다크 테마 설정
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);
  
  // 테마 설정 적용
  useEffect(() => {
    // HTML에 다크 테마 클래스 적용
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, [theme]);
  
  // 빈 토글 함수 (기능 제거)
  const toggleTheme = () => {
    // 다크 테마만 지원하므로 아무 동작도 하지 않음
  };
  
  return { theme, toggleTheme };
}; 