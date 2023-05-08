import { createContext, useContext, useEffect, useState } from "react";

// 데이터를 담고있는 context
const DarkModeContext = createContext();

// 데이터를 잘 가지고 보여주는 우산 (컴포넌트)
export function DarkModeProvider({ children }) {
  // { children } : 자식들을 받아옴
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((mode) => !mode);
    updateDarkMode(!darkMode);
  };
  useEffect(() => {
    // 사용자 브라우저의 테마를 먼저 확인하여 isDark에 저장
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    console.log("브라우저 다크모드 설정여부:", isDark);
    setDarkMode(isDark); // DarkModeProvider의 내부 state를 먼저 업데이트
    updateDarkMode(isDark); // 그 다음 우리 페이지에 dark클래스를 넣을지 말지 결정
  }, []);
  return (
    // 자식 컴포넌트들 {children}을 DarkModeContext.Provider로 감싸줌
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

// DarkModeContext라는걸 외부로 노출하는게 아니라(외부에서 DarkModeContext를 사용할때 일일이 선언해야하는게 아니라) useDarkMode라는 훅을 만들어 함수 내부적으로 DarkModeContext를 가져와 사용할수있도록 만들어줌
export const useDarkMode = () => useContext(DarkModeContext);
