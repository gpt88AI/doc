import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// gpt88.cc 文档站入口
// 不依赖任何后端 API、登录或主题切换持久化系统
const rootElement = document.getElementById('root')!
const application = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, application)
} else {
  createRoot(rootElement).render(application)
}
