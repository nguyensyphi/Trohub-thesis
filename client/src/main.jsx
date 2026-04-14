import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes"
import { GoogleOAuthProvider } from "@react-oauth/google"

const googleClientId = (import.meta.env.VITE_CLIENT_GG_ID || "").trim()
if (!googleClientId) {
  console.warn(
    "[TroHub] Không có VITE_CLIENT_GG_ID — đăng nhập Google tắt. Thêm biến khi build và Authorized JS origins trong Google Cloud Console."
  )
}

const router = createBrowserRouter(routes)

const app = <RouterProvider router={router} />

createRoot(document.getElementById("root")).render(
  googleClientId ? <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider> : app
)
