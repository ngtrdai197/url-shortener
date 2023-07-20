import React, { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../../brand/utils/utils';
import { Icon } from '../../components/icon';
import { mapModifiers } from '../../libs/components';

export const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentThemeSetting = loadFromLocalStorage('theme');
    const theme = currentThemeSetting ?? 'light';

    document.documentElement.setAttribute('data-theme', theme);
    setIsDarkMode(theme === 'dark');
  }, []);

  const handleChangeTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';

    saveToLocalStorage('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={mapModifiers('c-theme-switcher', isDarkMode && 'dark')} onClick={handleChangeTheme}>
      <span className="c-theme-switcher__indicator" />
      <span className={mapModifiers('c-theme-switcher__icon', 'light-mode')}>
        <Icon name="sun" />
      </span>
      <span className={mapModifiers('c-theme-switcher__icon', 'dark-mode')}>
        <Icon name="moon" />
      </span>
    </div>
  );
};
