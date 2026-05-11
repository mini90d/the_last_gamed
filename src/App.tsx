import { Dashboard } from './components/Dashboard'
import { ProductSelector } from './components/ProductSelector'
import { Minimap } from './components/Minimap'
import { WorkflowPaths } from './components/WorkflowPaths'
import { GrandFinale } from './components/GrandFinale'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
      <WorkflowPaths />
      <ProductSelector />
      <Dashboard />
      <Minimap />
      <GrandFinale />
    </div>
  )
}

export default App
