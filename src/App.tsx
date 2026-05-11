import { Dashboard } from './components/Dashboard'
import { ProductSelector } from './components/ProductSelector'
import { Minimap } from './components/Minimap'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
      <ProductSelector />
      <Dashboard />
      <Minimap />
    </div>
  )
}

export default App
