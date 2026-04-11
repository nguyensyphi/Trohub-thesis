import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiGetGoogleCredentials } from "@/apis/external"

/**
 * Chỉ mount khi root đã bọc GoogleOAuthProvider và có VITE_CLIENT_GG_ID — tránh gọi GSI khi thiếu client_id.
 */
export default function LoginGoogleButton({ setGoogleData, setIsSetUpPassword }) {
  const handleLoginGoogle = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async (response) => {
      if (!response.access_token) return toast.error("Có lỗi, hãy thử lại nhé~")
      try {
        const credentialsRes = await apiGetGoogleCredentials(response.access_token)
        if (credentialsRes.status === 200 && credentialsRes.data?.email) {
          toast.success("Đăng nhập thành công.")
          const payload = {
            fullname: credentialsRes.data.name || credentialsRes.data.email,
            email: credentialsRes.data.email,
            avatar: credentialsRes.data.picture,
          }
          setGoogleData(payload)
          setIsSetUpPassword(true)
        } else {
          toast.error("Không lấy được thông tin tài khoản Google.")
        }
      } catch (err) {
        console.error("Google userinfo:", err)
        toast.error("Không lấy được thông tin tài khoản Google.")
      }
    },
    onError: (error) => {
      console.error("Google OAuth:", error)
      const t = error?.type || error?.error
      if (t === "popup_closed_by_user" || t === "user_cancelled") {
        toast.error("Bạn đã đóng cửa sổ đăng nhập Google.")
        return
      }
      toast.error(
        "Đăng nhập Google thất bại. Nếu bạn đổi domain: vào Google Cloud Console → Credentials → OAuth 2.0 Client (Web) → Authorized JavaScript origins — thêm đúng origin (vd: https://tenmien.com, không có dấu / cuối; thêm cả http://localhost:5173 khi dev)."
      )
    },
  })

  return (
    <Button className="w-full" type="button" onClick={() => handleLoginGoogle()} variant="outline">
      <img src="/Google.svg" alt="google logo" className="w-5 h-5 mr-3 object-cover" />
      <span>Đăng nhập với Google</span>
    </Button>
  )
}
