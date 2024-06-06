import { ReactElement, useState } from "react";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import { PrimaryButton } from "@/shared/components/Buttons";

export const UserProfile = (): ReactElement => {
    const profile = useAuthStore(state => state.profile)!;
    const logout = useAuthStore(state => state.logout);
    const username = useAuthStore(state => state.username);
    const password = useAuthStore(state => state.password);
    const [show, set] = useState(false);

    const toggleVisibility = () => {
    set(!show);
    }

    return (
    <div className="grid grid-rows-[auto_1fr] bg-light min-h-dvh">
        <div className="flex justify-between items-center p-6 lg:p-12">
        <div className="flex justify-center items-center text-primary hover:scale-95 duration-300 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-8 w-8">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <p className="font-bold text-2xl">Greenhouse</p>
        </div>
        <svg className="w-7 h-7 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        </div>
        <main className="p-2 lg:p-2 text-center flex flex-col items-center justify-center min-h-screen">
            <div className="w-52 h-52 flex items-center justify-center mb-4">
                <img className="rounded-full" src={profile.iconUrl} alt="Profile Photo" />
            </div>
            <ul>
                <li className="p-2">
                    <p className="text-2xl p-2 text-left">Full name:</p>
                    <p className="text-2xl bg-gray-50 rounded-lg p-2 w-52">{profile.firstName} {profile.lastName}</p>
                </li>
                <li className="p-2">
                    <p className="text-2xl p-2 text-left">Username:</p>
                    <p className="text-2xl bg-gray-50 rounded-lg p-2 w-52">{username}</p>
                </li>
                <li className="p-2">
                    <p className="text-2xl p-2 text-left">Password:</p>
                    <div className="flex">
                        <p className="text-2xl bg-gray-50 rounded-lg p-2 w-52">
                        {show ? password : '•'.repeat(String(password).length)}
                        </p>
                        <button onClick={toggleVisibility} className="ml-2">
                        {show ? (
                            <svg className="w-7 h-7 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.273 0-8.111 2.45-9.6 6.3a9.978 9.978 0 0019.2 0C20.111 6.95 16.273 4.5 12 4.5zM12 15a3 3 0 110-6 3 3 0 010 6z" />
                            </svg>
                        ) : (
                            <svg className="w-7 h-7 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.273 0-8.111 2.45-9.6 6.3a9.978 9.978 0 0019.2 0C20.111 6.95 16.273 4.5 12 4.5zM12 15a3 3 0 110-6 3 3 0 010 6z" />
                            </svg>
                        )}
                        </button>
                    </div>
                </li>
                <li className="px-2 py-8">
                    <PrimaryButton onClick={logout} label="Cerrar sesión" />
                </li>
            </ul>
        </main>
    </div>
    );
};
