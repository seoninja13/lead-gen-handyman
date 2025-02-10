'use client'

import { Provider } from "react-redux"
import { store } from "../store/store"
import ScrollToTop from "@/components/common/ScrollTop"
import { useEffect } from "react"

export function Providers({ children }) {
  useEffect(() => {
    // Load bootstrap on the client side
    require("bootstrap/dist/js/bootstrap")
  }, [])

  return (
    <Provider store={store}>
      {children}
      <ScrollToTop />
    </Provider>
  )
}
