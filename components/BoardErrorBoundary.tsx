"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { hasError: boolean };

export class BoardErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
          Das Whiteboard konnte nicht geladen werden. Seite neu laden.
        </div>
      );
    }

    return this.props.children;
  }
}
