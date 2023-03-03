import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./styles/index.scss"
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Service } from './services/service'

Service.init();

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