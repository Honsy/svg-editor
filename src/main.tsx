import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./styles/index.scss"
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { DesignerContext, designer } from "./context/designer.context";
import jQueryPluginSpinButton from './plugins/jquery/jQuery.SpinButton'
import NiceModal from '@ebay/nice-modal-react';
import 'antd/dist/reset.css';

// SpinButton插件
jQueryPluginSpinButton($);


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
        <NiceModal.Provider>
          <App />
        </NiceModal.Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
  
})()