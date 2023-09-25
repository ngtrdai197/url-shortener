import React from 'react';
import { useThemeMode } from '../../../brand/contexts/theme-mode';
import { Icon } from '../../components/icon';
import { mapModifiers } from '../../libs/components';

export const ThemeSwitcher: React.FC = () => {
  const { mode, changeThemeMode } = useThemeMode();

  return (
    <div className={mapModifiers('c-theme-switcher', mode)} onClick={changeThemeMode}>
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
