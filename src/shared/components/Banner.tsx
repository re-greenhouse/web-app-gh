import { ReactElement } from "react";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";



export const BannerComponent= (): ReactElement => {
    const { company } = useCompanyPage();

    return (
        <div className="relative">
            <img src="public/bannerImage.svg" alt="bannerImage" className="absolute w-full hidden md:block"/>
            <div className="relative z-10 flex md:flex-row flex-col md:items-end items-center md:text-left text-center md:px-28 px-12 md:pt-32 pb-10 md:gap-5 gap-2">
                <img
                    src={company?.logoUrl}
                    alt={`${company?.name} logo`}
                    className="size-32 md:size-48 object-cover object-center bg-no-repeat bg-transparent rounded-2xl border-2 border-secondary"
                />
                <div className="items-end">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-third whitespace-nowrap">
                        {company?.name}
                    </h2>
                    <h2 className="text-base sm:text-xs md:text-sm lg:text-lg text-secondary">
                        {company?.tin}
                    </h2>
                </div>
            </div>
        </div>
    )
}