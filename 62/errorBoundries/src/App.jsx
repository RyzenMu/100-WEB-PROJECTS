import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({error, resetErrorBoundry}) {
  return (
    <div role="alert" className="p-4 bg-red-100  border border-red-400 rounded">
      <p className="font-bold">Something went wrong:</p>
      <pre className="text-sm text-red-700">{error.message}</pre>
      <button onClick={resetErrorBoundry} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Try again</button>
    </div>
  )
}

function MyComponent(){
  if(Math.random() > 0.5) {
    throw new Error('Random Failure')
  }
  return <div>All is well ✅</div>
}

export default function App(){
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{
      alert('Reset is on')
    }} >
      <MyComponent/>
    </ErrorBoundary>

  )
}