import {Component, type ReactNode} from "react";
import type {NavigateFunction} from "react-router-dom";

type Props = {
    children: ReactNode;
    navigate: NavigateFunction;
};

export default class ErrorBoundary extends Component<Props> {
    componentDidCatch(error: Error) {
        console.error("Caught by ErrorBoundary:", error);
        this.props.navigate("/error", { state: { error } });
    }

    render() {
        return this.props.children;
    }
}