import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught React Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl font-black mb-6">
            Z
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-3">Zentixx IT</h1>
          <p className="text-text-muted text-sm max-w-md mb-8">
            An unexpected error occurred while loading this section. Click below to refresh the page.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-black font-black text-sm rounded-full transition-all uppercase tracking-wider cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
