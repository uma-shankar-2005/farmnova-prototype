import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-600">
          Something went wrong: {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
