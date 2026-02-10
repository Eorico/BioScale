import { useEffect } from "react";

declare global {
    interface Window {
        frameWorkReady?: () => void;
    }
}

export function useFrameWorkReady() {
    useEffect(() => {
        window.frameWorkReady?.();
    })
}