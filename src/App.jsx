import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MyComponent from './MyComponent'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CreateUser from './CreateUser'
import Pagination from './Pagination'

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Pagination/>
      <CreateUser/>
      <MyComponent/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </>
  )
}

export default App
