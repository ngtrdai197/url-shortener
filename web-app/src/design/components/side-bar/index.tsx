import React, { useEffect, useRef, useState } from 'react';
import { mapModifiers } from '../../libs/components';
import { Icon, IconShape } from '../icon';

export interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sideBarRef?.current) {
      const sideBarEl = sideBarRef.current;

      sideBarEl.style.setProperty('--menu-items-width', isExpanded ? '200px' : '41px');
    }
  }, [isExpanded]);

  return (
    <div className={mapModifiers('c-side-bar', isExpanded && 'expanded')} ref={sideBarRef}>
      <button
        className="c-side-bar__button"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      />

      <div className="c-side-bar__container">
        <div className="c-side-bar__logo"></div>
        <ul className="c-side-bar__items">{children}</ul>
      </div>
    </div>
  );
};

export interface SideBarItemProps {
  children: string;
  icon: IconShape;
  href: string;
  isActivated?: boolean;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ icon, children, href, isActivated }) => (
  <li className={mapModifiers('c-side-bar__item', isActivated && 'activated')}>
    <a className={mapModifiers('c-side-bar__item-link')} href={href}>
      <span className="c-side-bar__icon">
        <Icon name={icon} />
      </span>
      <span className="c-side-bar__item-name">{children}</span>
    </a>
  </li>
);
