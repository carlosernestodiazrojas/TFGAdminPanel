import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const CustomLoader = () => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl" />
        </div>
    );
}