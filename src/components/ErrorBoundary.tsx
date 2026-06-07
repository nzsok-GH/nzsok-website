import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  /** What to render if a child island throws. Defaults to nothing (the
   *  island quietly disappears, leaving the surrounding static HTML intact). */
  fallback?: ReactNode;
  /** Label used in the console warning, to identify which island failed. */
  name?: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Contains a client-side throw inside a single hydrated island. Since each
 * island hydrates independently, a render/lifecycle error here can't take the
 * rest of the page down — but without a boundary React unmounts the whole
 * island tree and leaves a blank gap. This catches that and renders `fallback`
 * (nothing by default) so the page degrades gracefully.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      `[ErrorBoundary${this.props.name ? `: ${this.props.name}` : ""}] island crashed and was hidden`,
      error,
      info.componentStack,
    );
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
