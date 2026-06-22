import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useMeStore } from "./zustand/useMeStore"
import { Toaster } from "@/components/ui/sonner"
import { apiUpdateViews } from "./apis/user"
import { ChatbotWidget } from "@/components/chatbot"

const App = () => {
  const { getMe, token } = useMeStore()

  useEffect(() => {
    const updateViews = async () => {
      await apiUpdateViews()
    }
    updateViews()
  }, [])

  useEffect(() => {
    getMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <main className="relative font-sans">
      <Outlet />
      <Toaster position="top-center" expand={false} richColors />
      <ChatbotWidget />
    </main>
  )
}

export default App

