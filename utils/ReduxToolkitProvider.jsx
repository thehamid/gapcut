'use client'

import React from 'react'
import { Provider } from "react-redux"
import store from "@/lib/redux/store"

const ReduxToolkitProvider = ({children}) => {
  return (
      <Provider store={store}>
          {children}
    </Provider>
  )
}

export default ReduxToolkitProvider

