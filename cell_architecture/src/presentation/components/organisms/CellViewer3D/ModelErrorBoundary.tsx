import { Component, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
  resetKey?: string;
}

interface State {
  hasError: boolean;
}

export default class ModelErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn('[CellViewer3D] GLB load failed, falling back to procedural model.', error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
