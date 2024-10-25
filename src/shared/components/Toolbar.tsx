import {ReactElement, useEffect, useState, useRef } from "react";
import {Link} from "react-router-dom";
import {ProfileDropdownMenu} from "@/shared/components/ProfileDropdownMenu.tsx";


export const Toolbar = (): ReactElement => {
  const [activePage, setActivePage] = useState('');
  const [dropDownToolbar, setDropDownToolbar] = useState(false);

  const menuRef = useRef(null);
  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName === '/'){
      setActivePage('cropsInProgress');
      setDropDownToolbar(!dropDownToolbar);
    } else if (pathName === '/archive'){
      setActivePage('archives');
      setDropDownToolbar(!dropDownToolbar);
    } else if (pathName === '/company'){
      setActivePage('company');
      setDropDownToolbar(!dropDownToolbar);
    } 
  }, []);

  const getDesigns = (item: string) => {
    if (item === activePage) return "flex gap-3 items-center font-sans p-3 hover:scale-95 duration-300 border-b-2 border-primary text-primary";
    return "flex gap-3 items-center font-sans p-3 border-b-2 border-background hover:scale-95 duration-300"
  }

  return (
    <header className="flex justify-between items-center p-6 lg:p-5">
      <Link to="/" className="flex justify-center items-center text-primary hover:scale-95 duration-300 gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-8 w-8">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
        <p className="max-md:hidden font-bold font-sans text-2xl">Greenhouse</p>
      </Link>
      <div id="sections" className="flex lg:flex-row flex-row-reverse justify-center items-center lg:gap-24 gap-5">
        <div className="items-center gap-24 hidden lg:flex">
          <div className="flex gap-24 text-secondary">
            <Link to="/" className={getDesigns('cropsInProgress')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4203 12.2626C14.0687 12.342 14.7178 12.4079 15.3019 12.4258L15.3135 12.4262H15.325C15.3807 12.4262 15.4366 12.4285 15.5084 12.4318L15.5179 12.4322C15.5831 12.4352 15.6654 12.4389 15.75 12.4389C17.6156 12.4389 18.75 10.7398 18.75 8.85714C18.75 7.51429 18.2853 5.61868 16.9422 4.04622C15.5758 2.44656 13.3586 1.25 10 1.25C6.64145 1.25 4.4244 2.44654 3.05811 4.04432C1.71509 5.61489 1.25 7.5073 1.25 8.84445C1.25 10.7271 2.38442 12.4262 4.25 12.4262H4.26017C4.38847 12.4262 4.55917 12.4262 4.73572 12.4121C5.2997 12.3855 5.91895 12.3255 6.54318 12.2514C6.44918 12.6979 6.32405 13.2523 6.15903 13.9359C5.82421 15.2846 5.87584 16.5455 6.59718 17.4595C7.31728 18.3848 8.53989 18.75 9.9625 18.75H10C11.424 18.75 12.6477 18.3841 13.3675 17.4567L13.3687 17.4552C14.0721 16.544 14.1262 15.288 13.8045 13.9402L13.8045 13.9402L13.8037 13.9367C13.6393 13.2626 13.5144 12.7091 13.4203 12.2626Z" stroke="#4C6444" stroke-width="1.5"/>
              </svg>
              Cultivos en progreso
            </Link>
            <Link to="/archive" className={getDesigns('archives')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.54 2.23L16.15 0.55C15.88 0.21 15.47 0 15 0H3C2.53 0 2.12 0.21 1.84 0.55L0.46 2.23C0.17 2.57 0 3.02 0 3.5V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V3.5C18 3.02 17.83 2.57 17.54 2.23ZM3.24 2H14.76L15.57 2.97H2.44L3.24 2ZM2 16V5H16V16H2ZM10.45 7H7.55V10H5L9 14L13 10H10.45V7Z" fill="#898989"/>
            </svg>
              Cultivos finalizados
            </Link>
            <Link to="/company" className={getDesigns('company')}>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4997 15H14.6663V17H16.4997M16.4997 11H14.6663V13H16.4997M18.333 19H10.9997V17H12.833V15H10.9997V13H12.833V11H10.9997V9H18.333M9.16634 7H7.33301V5H9.16634M9.16634 11H7.33301V9H9.16634M9.16634 15H7.33301V13H9.16634M9.16634 19H7.33301V17H9.16634M5.49967 7H3.66634V5H5.49967M5.49967 11H3.66634V9H5.49967M5.49967 15H3.66634V13H5.49967M5.49967 19H3.66634V17H5.49967M10.9997 7V3H1.83301V21H20.1663V7H10.9997Z" fill="#898989"/>
            </svg>
              Mi empresa
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden sm:flex">
          <button onClick={()=> {setDropDownToolbar(!dropDownToolbar)}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </button>  
        </div>
        <div className={`absolute z-20 translate-y-24  ${dropDownToolbar ? "hidden" : ""} bg-white border rounded-lg lg:hidden`} ref={menuRef}>
          <div className="flex flex-col text-secondary">
          <Link to="/" className={getDesigns('cropsInProgress')}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4203 12.2626C14.0687 12.342 14.7178 12.4079 15.3019 12.4258L15.3135 12.4262H15.325C15.3807 12.4262 15.4366 12.4285 15.5084 12.4318L15.5179 12.4322C15.5831 12.4352 15.6654 12.4389 15.75 12.4389C17.6156 12.4389 18.75 10.7398 18.75 8.85714C18.75 7.51429 18.2853 5.61868 16.9422 4.04622C15.5758 2.44656 13.3586 1.25 10 1.25C6.64145 1.25 4.4244 2.44654 3.05811 4.04432C1.71509 5.61489 1.25 7.5073 1.25 8.84445C1.25 10.7271 2.38442 12.4262 4.25 12.4262H4.26017C4.38847 12.4262 4.55917 12.4262 4.73572 12.4121C5.2997 12.3855 5.91895 12.3255 6.54318 12.2514C6.44918 12.6979 6.32405 13.2523 6.15903 13.9359C5.82421 15.2846 5.87584 16.5455 6.59718 17.4595C7.31728 18.3848 8.53989 18.75 9.9625 18.75H10C11.424 18.75 12.6477 18.3841 13.3675 17.4567L13.3687 17.4552C14.0721 16.544 14.1262 15.288 13.8045 13.9402L13.8045 13.9402L13.8037 13.9367C13.6393 13.2626 13.5144 12.7091 13.4203 12.2626Z" stroke="#4C6444" stroke-width="1.5"/>
                  </svg>
                  <h1 className="whitespace-nowrap">Cultivos en progreso</h1>
                </Link>
                <Link to="/archive" className={getDesigns('archives')}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.54 2.23L16.15 0.55C15.88 0.21 15.47 0 15 0H3C2.53 0 2.12 0.21 1.84 0.55L0.46 2.23C0.17 2.57 0 3.02 0 3.5V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V3.5C18 3.02 17.83 2.57 17.54 2.23ZM3.24 2H14.76L15.57 2.97H2.44L3.24 2ZM2 16V5H16V16H2ZM10.45 7H7.55V10H5L9 14L13 10H10.45V7Z" fill="#898989"/>
                </svg>
                  Cultivos finalizados
                </Link>
                <Link to="/company" className={getDesigns('company')}>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4997 15H14.6663V17H16.4997M16.4997 11H14.6663V13H16.4997M18.333 19H10.9997V17H12.833V15H10.9997V13H12.833V11H10.9997V9H18.333M9.16634 7H7.33301V5H9.16634M9.16634 11H7.33301V9H9.16634M9.16634 15H7.33301V13H9.16634M9.16634 19H7.33301V17H9.16634M5.49967 7H3.66634V5H5.49967M5.49967 11H3.66634V9H5.49967M5.49967 15H3.66634V13H5.49967M5.49967 19H3.66634V17H5.49967M10.9997 7V3H1.83301V21H20.1663V7H10.9997Z" fill="#898989"/>
                </svg>
                  Mi empresa
                </Link>
          </div>
        </div>
        <div className="flex justify-center items-center lg:gap-24 gap-5">
          <Link to="/" className="text-primary hover:scale-95 duration-300">
            <svg className="w-7 h-7 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2.0} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
            </svg>
          </Link>
          <ProfileDropdownMenu />
        </div>
      </div>
    </header>
  );
}