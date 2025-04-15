import { createRoot } from 'react-dom/client'
import "./index.css"
import Routes from './routes'

createRoot(document.getElementById('root')!).render(
  <div className=' w-screen h-screen bg-background overflow-hidden  flex-row'>
    <Routes />
  </div>
)