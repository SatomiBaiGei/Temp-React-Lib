import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ToDoListErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    console.log('123')
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Catch error:', error, errorInfo)
  }

  render() {
    console.log(this.state)
    if (this.state.hasError) {
      return (
      //should return original page.
         <>
         </>
      )
    }

    return this.props.children
  }
}

export default ToDoListErrorBoundary
