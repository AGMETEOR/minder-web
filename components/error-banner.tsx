"use client"
import { useStore } from "@/store"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ErrorBanner() {
    const error = useStore((state) => state.errorBannerMessage);
    const setErrorBannerMessage = useStore((state) => state.setErrorBannerMessage);

    if (error) {
        setTimeout(() => setErrorBannerMessage(''), 1000);
        return (
            <div className="font-fig w-full bg-red-500 absolute top-0 left-0 right-0 transition-all p-2 text-center z-50 text-white">
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="ml-2 font-fig">{error}</span>
            </div>
        )
    }

    return null;
}