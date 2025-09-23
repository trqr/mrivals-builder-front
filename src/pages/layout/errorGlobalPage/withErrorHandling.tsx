import {type ComponentType, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.tsx";

export default function withErrorHandling(Component: ComponentType) {
    return function Wrapped() {
        const navigate = useNavigate();

        useEffect(() => {
            window.onerror = (_msg, _src, _line, _col, err) => {
                if (err instanceof Error) navigate("/error", { state: { error: err } });
            };
            window.onunhandledrejection = (event) => {
                const err =
                    event.reason instanceof Error
                        ? event.reason
                        : new Error(String(event.reason));
                navigate("/error", { state: { error: err } });
            };
        }, [navigate]);

        return (
            <ErrorBoundary navigate={navigate}>
                <Component />
            </ErrorBoundary>
        );
    };
}
