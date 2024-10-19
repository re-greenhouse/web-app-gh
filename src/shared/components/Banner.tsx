import { ReactElement } from "react";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";



export const BannerComponent= (): ReactElement => {
    const { company } = useCompanyPage();

    return (
        <div className="relative">
            <img src="public/bannerImage.svg" alt="bannerImage" className="absolute w-full"/>
            <div className="relative z-10 flex items-end px-28 pt-32 pb-16 gap-5">
                <img
                    src={company?.logoUrl}
                    alt={`${company?.name} logo`}
                    className="size-24 md:size-48 object-cover object-center bg-no-repeat bg-transparent rounded-2xl border-2 border-secondary"
                />
                <div className="items-end">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-third">
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