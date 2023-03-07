import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./styles/index.scss"
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { DesignerContext, designer } from "./context/designer.context";
import './services/service'

(function () {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  const theme: any = {
    token: {
      borderRadius: 0
    }
  }
  root.render(
    <BrowserRouter>
      <ConfigProvider theme={theme}>
          <App />
      </ConfigProvider>
    </BrowserRouter>
  )
  
})()