import { createContext, useContext, useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/utils';

export type ThemeMode = 'light' | 'dark';

interface ThemeModeContextProps {
  mode: ThemeMode;
  changeThemeMode: () => void;
}

export const ThemeModeContext = createContext<ThemeModeContextProps | null>(null);

interface ThemeModeProviderProps {
  children: React.ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({ children }) => {
  const mode = (loadFromLocalStorage('theme') as 'light' | 'dark') ?? 'light';
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.add(mode);
    setIsDarkMode(mode === 'dark');
  }, [mode]);

  if (!mode || isDarkMode === null) return null;

  const changeThemeMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.remove(mode);
    document.documentElement.classList.add(newTheme);
    saveToLocalStorage('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return <ThemeModeContext.Provider value={{ mode, changeThemeMode }}>{children}</ThemeModeContext.Provider>;
};

export const useThemeMode = () => {
  const themeMode = useContext(ThemeModeContext);

  if (!themeMode) throw new Error('Theme mode has to be used within <ThemeModeContext.Provider>');

  return themeMode;
};
