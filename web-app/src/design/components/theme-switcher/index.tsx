import React, { useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../../brand/utils/utils';
import { Icon } from '../../components/icon';
import { mapModifiers } from '../../libs/components';

export const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentThemeSetting = loadFromLocalStorage('theme');
  const theme = currentThemeSetting ?? 'light';

  const handleChangeTheme = () => {
    saveToLocalStorage('theme', isDarkMode ? 'dark' : 'light');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={mapModifiers('c-theme-switcher', theme)} onClick={handleChangeTheme}>
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
