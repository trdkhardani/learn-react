import { Component, type ErrorInfo, type ReactNode } from 'react';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Component crashed: ${error} ${errorInfo}`);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>
    }

    return this.props.children;
  }
}

export default ErrorBoundary