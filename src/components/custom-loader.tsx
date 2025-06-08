
'use client'

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const CustomLoaderDeep = () => {
    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]`}>
            <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl" />
        </div>
    );
}

export const CustomLoaderDeeper = () => {
    return (
        <div className={`fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]`}>
            <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl" />
        </div>
    );
}