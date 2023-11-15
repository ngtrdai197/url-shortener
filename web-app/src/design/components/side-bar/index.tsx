import React, { useEffect, useRef, useState } from 'react';
import { mapModifiers } from '../../libs/components';
import { Icon, IconShape } from '../icon';
import { Link } from 'react-router-dom';

export interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sideBarRef.current) return;

    const sideBarEl = sideBarRef.current;

    sideBarEl.addEventListener('mouseenter', () => {
      setIsExpanded(true);
    });
    sideBarEl.addEventListener('mouseleave', () => {
      setIsExpanded(false);
    });

    return () => {
      if (!sideBarEl) return;

      sideBarEl.removeEventListener('mouseenter', () => {
        setIsExpanded(true);
      });
      sideBarEl.removeEventListener('mouseleave', () => {
        setIsExpanded(false);
      });
    };
  }, []);

  return (
    <div
      className={`${mapModifiers('c-side-bar', isExpanded && 'expanded')} hidden
      pc:block
      fixed top-[15%] left-0 text-white z-[1000]`}
      ref={sideBarRef}
    >
      <div className="c-side-bar__container min-h-[300px] px-[15px] w-[56px] bg-dark-side-bar dark:bg-white">
        <ul className={`c-side-bar__items top-1/2 translate-y-[-50%] bg-dark-side-bar dark:bg-white absolute`}>
          {children}
        </ul>
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
  <li className={`${mapModifiers('c-side-bar__item', isActivated && 'activated')} relative block`}>
    <Link className={mapModifiers('c-side-bar__item-link')} to={href}>
      <span className="c-side-bar__icon">
        <Icon name={icon} />
      </span>
      <span className="c-side-bar__item-name block overflow-hidden">{children}</span>
    </Link>
  </li>
);
