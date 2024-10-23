import { ReactElement, useState, useEffect } from "react";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";



export const BannerComponent= (): ReactElement => {
    const [activePage, setActivePage] = useState(false);

    const { company } = useCompanyPage();

    useEffect(() => {
        const pathName = window.location.pathname;
        if (pathName === '/company'){
            setActivePage(true);
        } else {
            setActivePage(false);
        }
    }, []);

    return (
        <div className="relative">
            <img src="public/bannerImage.svg" alt="bannerImage" className="absolute w-full hidden sm:hidden md:hidden lg:block xl:block 2xl:block"/>
            <div className="relative z-10 flex md:flex-row flex-col md:items-end items-center md:text-left text-center md:px-28 px-12 2xl:pt-40 xl:pt-16 lg:pt-5 pb-10 md:gap-5 gap-2">
                <img
                    src={company?.logoUrl}
                    alt={`${company?.name} logo`}
                    className="size-32 md:size-48 object-cover object-center bg-no-repeat bg-transparent rounded-2xl border-2 border-secondary"
                />
                <button className={`absolute md:translate-x-40 md:translate-y-4 translate-x-16 translate-y-24 ${activePage ? "" : "hidden"}`}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                        <circle cx="24.0001" cy="23.9999" r="16.5333" fill="white"/>
                        <path d="M24 4C12.94 4 4 12.94 4 24C4 35.06 12.94 44 24 44C35.06 44 44 35.06 44 24C44 12.94 35.06 4 24 4ZM30.2 14.14C30.48 14.14 30.76 14.24 31 14.46L33.54 17C34 17.44 34 18.14 33.54 18.56L31.54 20.56L27.44 16.46L29.44 14.46C29.64 14.24 29.92 14.14 30.2 14.14ZM26.26 17.62L30.38 21.74L18.26 33.86H14.14V29.74L26.26 17.62Z" fill="#4C6444"/>
                    </svg>
                </button>
                <div className="items-end">
                    <div className="flex">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-third whitespace-nowrap">
                            {company?.name}
                        </h2>
                        <button className={`${activePage ? "" : "hidden"} px-2`}>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <mask id="path-1-outside-1_655_1370" maskUnits="userSpaceOnUse" x="3" y="4.5" width="17" height="17" fill="black">
                                    <rect fill="white" x="3" y="4.5" width="17" height="17"/>
                                    <path d="M13.5858 7.91421L6.39171 15.1083C6.19706 15.3029 6.09974 15.4003 6.03276 15.5186C5.96579 15.6368 5.93241 15.7704 5.86564 16.0374L5.20211 18.6915C5.11186 19.0526 5.06673 19.2331 5.16682 19.3332C5.2669 19.4333 5.44742 19.3881 5.80844 19.2979L5.80845 19.2979L8.46257 18.6344C8.72963 18.5676 8.86316 18.5342 8.98145 18.4672C9.09974 18.4003 9.19706 18.3029 9.39171 18.1083L16.5858 10.9142L16.5858 10.9142C17.2525 10.2475 17.5858 9.91421 17.5858 9.5C17.5858 9.08579 17.2525 8.75245 16.5858 8.08579L16.4142 7.91421C15.7475 7.24755 15.4142 6.91421 15 6.91421C14.5858 6.91421 14.2525 7.24755 13.5858 7.91421Z"/>
                                </mask>
                                <path d="M6.39171 15.1083L7.80593 16.5225L7.80593 16.5225L6.39171 15.1083ZM13.5858 7.91421L12.1716 6.5L12.1716 6.5L13.5858 7.91421ZM16.4142 7.91421L15 9.32843L15 9.32843L16.4142 7.91421ZM16.5858 8.08579L18 6.67157L18 6.67157L16.5858 8.08579ZM16.5858 10.9142L18 12.3284L16.5858 10.9142ZM9.39171 18.1083L7.9775 16.6941L7.9775 16.6941L9.39171 18.1083ZM5.86564 16.0374L7.80593 16.5225L7.80593 16.5225L5.86564 16.0374ZM5.20211 18.6915L3.26183 18.2065H3.26183L5.20211 18.6915ZM5.80845 19.2979L5.32338 17.3576L5.23624 17.3794L5.15141 17.4089L5.80845 19.2979ZM8.46257 18.6344L7.97751 16.6941L7.9775 16.6941L8.46257 18.6344ZM5.16682 19.3332L6.58103 17.919L6.58103 17.919L5.16682 19.3332ZM5.80844 19.2979L6.29351 21.2382L6.38065 21.2164L6.46549 21.1869L5.80844 19.2979ZM8.98145 18.4672L7.99605 16.7268L7.99605 16.7268L8.98145 18.4672ZM16.5858 10.9142L18 12.3284L18 12.3284L16.5858 10.9142ZM6.03276 15.5186L4.29236 14.5332L4.29236 14.5332L6.03276 15.5186ZM7.80593 16.5225L15 9.32843L12.1716 6.5L4.9775 13.6941L7.80593 16.5225ZM15 9.32843L15.1716 9.5L18 6.67157L17.8284 6.5L15 9.32843ZM15.1716 9.5L7.9775 16.6941L10.8059 19.5225L18 12.3284L15.1716 9.5ZM3.92536 15.5524L3.26183 18.2065L7.1424 19.1766L7.80593 16.5225L3.92536 15.5524ZM6.29352 21.2382L8.94764 20.5746L7.9775 16.6941L5.32338 17.3576L6.29352 21.2382ZM3.26183 18.2065C3.233 18.3218 3.15055 18.6296 3.12259 18.9155C3.0922 19.2261 3.06509 20.0599 3.7526 20.7474L6.58103 17.919C6.84671 18.1847 6.99914 18.5005 7.06644 18.7928C7.12513 19.0478 7.10965 19.2429 7.10358 19.3049C7.09699 19.3724 7.08792 19.404 7.097 19.3631C7.10537 19.3253 7.11788 19.2747 7.1424 19.1766L3.26183 18.2065ZM5.15141 17.4089L5.1514 17.4089L6.46549 21.1869L6.46549 21.1869L5.15141 17.4089ZM5.32338 17.3576C5.22531 17.3821 5.17467 17.3946 5.13694 17.403C5.09595 17.4121 5.12762 17.403 5.19506 17.3964C5.25712 17.3903 5.45223 17.3749 5.70717 17.4336C5.99955 17.5009 6.31535 17.6533 6.58103 17.919L3.7526 20.7474C4.44011 21.4349 5.27387 21.4078 5.58449 21.3774C5.87039 21.3494 6.17822 21.267 6.29351 21.2382L5.32338 17.3576ZM7.9775 16.6941C7.95279 16.7188 7.9317 16.7399 7.91214 16.7593C7.89271 16.7787 7.87671 16.7945 7.86293 16.808C7.84916 16.8215 7.83911 16.8312 7.83172 16.8382C7.82812 16.8416 7.82545 16.8441 7.8236 16.8458C7.82176 16.8475 7.8209 16.8483 7.82092 16.8482C7.82094 16.8482 7.82198 16.8473 7.82395 16.8456C7.82592 16.8439 7.82893 16.8413 7.83291 16.838C7.84086 16.8314 7.85292 16.8216 7.86866 16.8098C7.88455 16.7979 7.90362 16.7843 7.92564 16.7699C7.94776 16.7553 7.97131 16.7408 7.99605 16.7268L9.96684 20.2076C10.376 19.976 10.6864 19.6421 10.8059 19.5225L7.9775 16.6941ZM8.94764 20.5746C9.11169 20.5336 9.55771 20.4393 9.96685 20.2076L7.99605 16.7268C8.02079 16.7128 8.0453 16.7001 8.06917 16.6886C8.09292 16.6772 8.11438 16.6678 8.13277 16.6603C8.15098 16.6529 8.16553 16.6475 8.17529 16.6441C8.18017 16.6424 8.18394 16.6412 8.18642 16.6404C8.1889 16.6395 8.19024 16.6391 8.19026 16.6391C8.19028 16.6391 8.18918 16.6395 8.18677 16.6402C8.18435 16.6409 8.18084 16.6419 8.17606 16.6432C8.16625 16.6459 8.15278 16.6496 8.13414 16.6544C8.11548 16.6593 8.09368 16.6649 8.0671 16.6716C8.04034 16.6784 8.0114 16.6856 7.97751 16.6941L8.94764 20.5746ZM15.1716 9.5C15.3435 9.67192 15.4698 9.79842 15.5738 9.90785C15.6786 10.018 15.7263 10.0752 15.7457 10.1007C15.7644 10.1252 15.7226 10.0764 15.6774 9.96782C15.6254 9.84332 15.5858 9.68102 15.5858 9.5H19.5858C19.5858 8.67978 19.2282 8.07075 18.9258 7.6744C18.6586 7.32421 18.2934 6.96493 18 6.67157L15.1716 9.5ZM18 12.3284L18 12.3284L15.1716 9.49999L15.1716 9.5L18 12.3284ZM18 12.3284C18.2934 12.0351 18.6586 11.6758 18.9258 11.3256C19.2282 10.9292 19.5858 10.3202 19.5858 9.5H15.5858C15.5858 9.31898 15.6254 9.15668 15.6774 9.03218C15.7226 8.92362 15.7644 8.87476 15.7457 8.89927C15.7263 8.92482 15.6786 8.982 15.5738 9.09215C15.4698 9.20157 15.3435 9.32807 15.1716 9.5L18 12.3284ZM15 9.32843C15.1719 9.1565 15.2984 9.03019 15.4078 8.92615C15.518 8.82142 15.5752 8.77375 15.6007 8.75426C15.6252 8.73555 15.5764 8.77736 15.4678 8.82264C15.3433 8.87455 15.181 8.91421 15 8.91421V4.91421C14.1798 4.91421 13.5707 5.27177 13.1744 5.57417C12.8242 5.84136 12.4649 6.20664 12.1716 6.5L15 9.32843ZM17.8284 6.5C17.5351 6.20665 17.1758 5.84136 16.8256 5.57417C16.4293 5.27177 15.8202 4.91421 15 4.91421V8.91421C14.819 8.91421 14.6567 8.87455 14.5322 8.82264C14.4236 8.77736 14.3748 8.73555 14.3993 8.75426C14.4248 8.77375 14.482 8.82142 14.5922 8.92615C14.7016 9.03019 14.8281 9.1565 15 9.32843L17.8284 6.5ZM4.9775 13.6941C4.85793 13.8136 4.52401 14.124 4.29236 14.5332L7.77316 16.5039C7.75915 16.5287 7.7447 16.5522 7.73014 16.5744C7.71565 16.5964 7.70207 16.6155 7.69016 16.6313C7.67837 16.6471 7.66863 16.6591 7.66202 16.6671C7.65871 16.6711 7.65613 16.6741 7.65442 16.6761C7.65271 16.678 7.65178 16.6791 7.65176 16.6791C7.65174 16.6791 7.65252 16.6782 7.65422 16.6764C7.65593 16.6745 7.65842 16.6719 7.66184 16.6683C7.66884 16.6609 7.67852 16.6508 7.692 16.6371C7.7055 16.6233 7.72132 16.6073 7.74066 16.5879C7.76013 16.5683 7.78122 16.5472 7.80593 16.5225L4.9775 13.6941ZM7.80593 16.5225C7.8144 16.4886 7.82164 16.4597 7.82839 16.4329C7.8351 16.4063 7.84068 16.3845 7.84556 16.3659C7.85043 16.3472 7.85407 16.3337 7.8568 16.3239C7.85813 16.3192 7.85914 16.3157 7.85984 16.3132C7.86054 16.3108 7.86088 16.3097 7.86088 16.3097C7.86087 16.3098 7.86046 16.3111 7.85965 16.3136C7.85884 16.3161 7.85758 16.3198 7.85588 16.3247C7.85246 16.3345 7.84713 16.349 7.8397 16.3672C7.8322 16.3856 7.82284 16.4071 7.81141 16.4308C7.79993 16.4547 7.78717 16.4792 7.77316 16.5039L4.29236 14.5332C4.06071 14.9423 3.96637 15.3883 3.92536 15.5524L7.80593 16.5225Z" fill="#898989" mask="url(#path-1-outside-1_655_1370)"/>
                                <path d="M12.5 8L16.5 12" stroke="#898989" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex">
                        <h2 className="text-base sm:text-xs md:text-sm lg:text-lg text-secondary">
                            {company?.tin}
                        </h2>
                        <button className={`${activePage ? "" : "hidden"} px-2`}>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activePage ? "" : "hidden"}`}>
                                <mask id="path-1-outside-1_655_1370" maskUnits="userSpaceOnUse" x="3" y="4.5" width="17" height="17" fill="black">
                                    <rect fill="white" x="3" y="4.5" width="17" height="17"/>
                                    <path d="M13.5858 7.91421L6.39171 15.1083C6.19706 15.3029 6.09974 15.4003 6.03276 15.5186C5.96579 15.6368 5.93241 15.7704 5.86564 16.0374L5.20211 18.6915C5.11186 19.0526 5.06673 19.2331 5.16682 19.3332C5.2669 19.4333 5.44742 19.3881 5.80844 19.2979L5.80845 19.2979L8.46257 18.6344C8.72963 18.5676 8.86316 18.5342 8.98145 18.4672C9.09974 18.4003 9.19706 18.3029 9.39171 18.1083L16.5858 10.9142L16.5858 10.9142C17.2525 10.2475 17.5858 9.91421 17.5858 9.5C17.5858 9.08579 17.2525 8.75245 16.5858 8.08579L16.4142 7.91421C15.7475 7.24755 15.4142 6.91421 15 6.91421C14.5858 6.91421 14.2525 7.24755 13.5858 7.91421Z"/>
                                </mask>
                                <path d="M6.39171 15.1083L7.80593 16.5225L7.80593 16.5225L6.39171 15.1083ZM13.5858 7.91421L12.1716 6.5L12.1716 6.5L13.5858 7.91421ZM16.4142 7.91421L15 9.32843L15 9.32843L16.4142 7.91421ZM16.5858 8.08579L18 6.67157L18 6.67157L16.5858 8.08579ZM16.5858 10.9142L18 12.3284L16.5858 10.9142ZM9.39171 18.1083L7.9775 16.6941L7.9775 16.6941L9.39171 18.1083ZM5.86564 16.0374L7.80593 16.5225L7.80593 16.5225L5.86564 16.0374ZM5.20211 18.6915L3.26183 18.2065H3.26183L5.20211 18.6915ZM5.80845 19.2979L5.32338 17.3576L5.23624 17.3794L5.15141 17.4089L5.80845 19.2979ZM8.46257 18.6344L7.97751 16.6941L7.9775 16.6941L8.46257 18.6344ZM5.16682 19.3332L6.58103 17.919L6.58103 17.919L5.16682 19.3332ZM5.80844 19.2979L6.29351 21.2382L6.38065 21.2164L6.46549 21.1869L5.80844 19.2979ZM8.98145 18.4672L7.99605 16.7268L7.99605 16.7268L8.98145 18.4672ZM16.5858 10.9142L18 12.3284L18 12.3284L16.5858 10.9142ZM6.03276 15.5186L4.29236 14.5332L4.29236 14.5332L6.03276 15.5186ZM7.80593 16.5225L15 9.32843L12.1716 6.5L4.9775 13.6941L7.80593 16.5225ZM15 9.32843L15.1716 9.5L18 6.67157L17.8284 6.5L15 9.32843ZM15.1716 9.5L7.9775 16.6941L10.8059 19.5225L18 12.3284L15.1716 9.5ZM3.92536 15.5524L3.26183 18.2065L7.1424 19.1766L7.80593 16.5225L3.92536 15.5524ZM6.29352 21.2382L8.94764 20.5746L7.9775 16.6941L5.32338 17.3576L6.29352 21.2382ZM3.26183 18.2065C3.233 18.3218 3.15055 18.6296 3.12259 18.9155C3.0922 19.2261 3.06509 20.0599 3.7526 20.7474L6.58103 17.919C6.84671 18.1847 6.99914 18.5005 7.06644 18.7928C7.12513 19.0478 7.10965 19.2429 7.10358 19.3049C7.09699 19.3724 7.08792 19.404 7.097 19.3631C7.10537 19.3253 7.11788 19.2747 7.1424 19.1766L3.26183 18.2065ZM5.15141 17.4089L5.1514 17.4089L6.46549 21.1869L6.46549 21.1869L5.15141 17.4089ZM5.32338 17.3576C5.22531 17.3821 5.17467 17.3946 5.13694 17.403C5.09595 17.4121 5.12762 17.403 5.19506 17.3964C5.25712 17.3903 5.45223 17.3749 5.70717 17.4336C5.99955 17.5009 6.31535 17.6533 6.58103 17.919L3.7526 20.7474C4.44011 21.4349 5.27387 21.4078 5.58449 21.3774C5.87039 21.3494 6.17822 21.267 6.29351 21.2382L5.32338 17.3576ZM7.9775 16.6941C7.95279 16.7188 7.9317 16.7399 7.91214 16.7593C7.89271 16.7787 7.87671 16.7945 7.86293 16.808C7.84916 16.8215 7.83911 16.8312 7.83172 16.8382C7.82812 16.8416 7.82545 16.8441 7.8236 16.8458C7.82176 16.8475 7.8209 16.8483 7.82092 16.8482C7.82094 16.8482 7.82198 16.8473 7.82395 16.8456C7.82592 16.8439 7.82893 16.8413 7.83291 16.838C7.84086 16.8314 7.85292 16.8216 7.86866 16.8098C7.88455 16.7979 7.90362 16.7843 7.92564 16.7699C7.94776 16.7553 7.97131 16.7408 7.99605 16.7268L9.96684 20.2076C10.376 19.976 10.6864 19.6421 10.8059 19.5225L7.9775 16.6941ZM8.94764 20.5746C9.11169 20.5336 9.55771 20.4393 9.96685 20.2076L7.99605 16.7268C8.02079 16.7128 8.0453 16.7001 8.06917 16.6886C8.09292 16.6772 8.11438 16.6678 8.13277 16.6603C8.15098 16.6529 8.16553 16.6475 8.17529 16.6441C8.18017 16.6424 8.18394 16.6412 8.18642 16.6404C8.1889 16.6395 8.19024 16.6391 8.19026 16.6391C8.19028 16.6391 8.18918 16.6395 8.18677 16.6402C8.18435 16.6409 8.18084 16.6419 8.17606 16.6432C8.16625 16.6459 8.15278 16.6496 8.13414 16.6544C8.11548 16.6593 8.09368 16.6649 8.0671 16.6716C8.04034 16.6784 8.0114 16.6856 7.97751 16.6941L8.94764 20.5746ZM15.1716 9.5C15.3435 9.67192 15.4698 9.79842 15.5738 9.90785C15.6786 10.018 15.7263 10.0752 15.7457 10.1007C15.7644 10.1252 15.7226 10.0764 15.6774 9.96782C15.6254 9.84332 15.5858 9.68102 15.5858 9.5H19.5858C19.5858 8.67978 19.2282 8.07075 18.9258 7.6744C18.6586 7.32421 18.2934 6.96493 18 6.67157L15.1716 9.5ZM18 12.3284L18 12.3284L15.1716 9.49999L15.1716 9.5L18 12.3284ZM18 12.3284C18.2934 12.0351 18.6586 11.6758 18.9258 11.3256C19.2282 10.9292 19.5858 10.3202 19.5858 9.5H15.5858C15.5858 9.31898 15.6254 9.15668 15.6774 9.03218C15.7226 8.92362 15.7644 8.87476 15.7457 8.89927C15.7263 8.92482 15.6786 8.982 15.5738 9.09215C15.4698 9.20157 15.3435 9.32807 15.1716 9.5L18 12.3284ZM15 9.32843C15.1719 9.1565 15.2984 9.03019 15.4078 8.92615C15.518 8.82142 15.5752 8.77375 15.6007 8.75426C15.6252 8.73555 15.5764 8.77736 15.4678 8.82264C15.3433 8.87455 15.181 8.91421 15 8.91421V4.91421C14.1798 4.91421 13.5707 5.27177 13.1744 5.57417C12.8242 5.84136 12.4649 6.20664 12.1716 6.5L15 9.32843ZM17.8284 6.5C17.5351 6.20665 17.1758 5.84136 16.8256 5.57417C16.4293 5.27177 15.8202 4.91421 15 4.91421V8.91421C14.819 8.91421 14.6567 8.87455 14.5322 8.82264C14.4236 8.77736 14.3748 8.73555 14.3993 8.75426C14.4248 8.77375 14.482 8.82142 14.5922 8.92615C14.7016 9.03019 14.8281 9.1565 15 9.32843L17.8284 6.5ZM4.9775 13.6941C4.85793 13.8136 4.52401 14.124 4.29236 14.5332L7.77316 16.5039C7.75915 16.5287 7.7447 16.5522 7.73014 16.5744C7.71565 16.5964 7.70207 16.6155 7.69016 16.6313C7.67837 16.6471 7.66863 16.6591 7.66202 16.6671C7.65871 16.6711 7.65613 16.6741 7.65442 16.6761C7.65271 16.678 7.65178 16.6791 7.65176 16.6791C7.65174 16.6791 7.65252 16.6782 7.65422 16.6764C7.65593 16.6745 7.65842 16.6719 7.66184 16.6683C7.66884 16.6609 7.67852 16.6508 7.692 16.6371C7.7055 16.6233 7.72132 16.6073 7.74066 16.5879C7.76013 16.5683 7.78122 16.5472 7.80593 16.5225L4.9775 13.6941ZM7.80593 16.5225C7.8144 16.4886 7.82164 16.4597 7.82839 16.4329C7.8351 16.4063 7.84068 16.3845 7.84556 16.3659C7.85043 16.3472 7.85407 16.3337 7.8568 16.3239C7.85813 16.3192 7.85914 16.3157 7.85984 16.3132C7.86054 16.3108 7.86088 16.3097 7.86088 16.3097C7.86087 16.3098 7.86046 16.3111 7.85965 16.3136C7.85884 16.3161 7.85758 16.3198 7.85588 16.3247C7.85246 16.3345 7.84713 16.349 7.8397 16.3672C7.8322 16.3856 7.82284 16.4071 7.81141 16.4308C7.79993 16.4547 7.78717 16.4792 7.77316 16.5039L4.29236 14.5332C4.06071 14.9423 3.96637 15.3883 3.92536 15.5524L7.80593 16.5225Z" fill="#898989" mask="url(#path-1-outside-1_655_1370)"/>
                                <path d="M12.5 8L16.5 12" stroke="#898989" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}