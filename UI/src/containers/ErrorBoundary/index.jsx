import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={{ margin: '5%' }}>
                    <h6>Oops, something went wrong!</h6>
                    <h6> Please check your credentials or network connection.</h6>
                </div>
            );
        }
        // Render children if there's no error
        return this.props.children;
    }
}

export default ErrorBoundary;