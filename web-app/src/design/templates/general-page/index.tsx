import React from 'react';
import { useAppSelector } from '../../../brand/store/hook';
import { LoadingSpinner } from '../../components/loading-spinner';
import { SideBar, SideBarItem } from '../../components/side-bar';
import PATHES from '../../../brand/constants/pathes';
import { Link } from 'react-router-dom';

interface GeneralPageProps {
  children: React.ReactNode;
}

const GeneralPage: React.FC<GeneralPageProps> = ({ children }) => {
  const { isLoading } = useAppSelector(state => state.loadingSpinner);

  return (
    <>
      <header className="relative bg-light-header px-[16px] pc:px-[32px] h-[50px] pc:h-[72px] flex items-center pc:justify-center">
        <Link to={PATHES.HOME_PAGE} className="block w-[178px]">
          <img src="https://placehold.co/500x102/gray/white?text=Logo" alt="Logo" />
        </Link>
        <Link
          to={PATHES.LOGIN_PAGE}
          className="absolute right-[16px] pc:right-[32px] block px-[16px] py-[7px] bg-gradient-to-r from-dark-moderate-blue to-moderate-blue text-white rounded-[10px]"
        >
          Sign in
        </Link>
      </header>
      <main className="lg:max-w-screen-lg my-0 mx-auto px-[16px] pc:px-[80px] py-[16px] h-[calc(100vh-82px)] pc:h-[calc(100vh-104px)]">
        {children}
        <aside>
          <SideBar>
            <SideBarItem icon="check" href={PATHES.HOME_PAGE} isActivated>
              Home
            </SideBarItem>
            <SideBarItem icon="notification" href="#">
              Contact
            </SideBarItem>
            <SideBarItem icon="sun" href="#">
              Logout
            </SideBarItem>
          </SideBar>
        </aside>
        <LoadingSpinner open={isLoading} />
      </main>
      <footer className="bg-[#dcdcdc] px-[16px] pc:px-[32px] text-center py-[5px] text-dark-gray font-medium">
        All Rights Reserved | Copyright&#169; 2023 Mr.ToanNT & Mr.DaiNT
      </footer>
    </>
  );
};

export default GeneralPage;
