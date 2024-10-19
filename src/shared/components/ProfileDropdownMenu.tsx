import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from "react-router-dom";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";

export const ProfileDropdownMenu = () => {
  const profile = useAuthStore(state => state.profile)!;
  const logout = useAuthStore(state => state.logout);

  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton className="flex justify-center items-center text-primary p-2 gap-2">
            <img
              src={profile.iconUrl}
              alt={`${profile.firstName} foto de perfil`}
              className="h-10 w-10 object-cover object-center rounded-full"
            />
            <span className="md:hidden font-semibold">
              {profile.firstName.at(0)?.toUpperCase()}
              {profile.lastName.at(0)?.toUpperCase()}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-4 ${open ? "rotate-180" : ""} duration-200`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
            </svg>
          </MenuButton>
          <MenuItems anchor="bottom end" className="bg-white rounded-lg divide-y-[1px] drop-shadow">
            <MenuItem>
              <Link className="flex items-center data-[focus]:bg-neutral-100 p-2 gap-1" to="/profile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
                Mi perfil
              </Link>
            </MenuItem>
            <MenuItem>
              <button onClick={logout} className="flex items-center whitespace-nowrap data-[focus]:bg-neutral-100 p-2 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/>
                </svg>
                Cerrar sesión
              </button>
            </MenuItem>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}