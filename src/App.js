import React, { Component } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Routes from './Components/Routes/Routes'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

export default class App extends Component {
  render () {
    return (
      <div>
        <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes />
        </QueryClientProvider>
      </div>
    )
  }
}
