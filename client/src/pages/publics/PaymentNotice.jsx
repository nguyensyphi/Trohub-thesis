import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import pathnames from "@/lib/pathnames"
import { BadgeCheck, CircleX } from "lucide-react"
import Confetti from "react-confetti"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useWindowSize } from "react-use"

/**
 * MoMo redirectUrl nên là GET /api/v1/payment/momo-return (backend xử lý rồi redirect /thanh-toan/00).
 * Nếu env cũ trỏ thẳng /thanh-toan/?... thì chuyển hướng lên API một lần.
 */
function useMomoReturnRedirect() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/"
    const parts = path.split("/").filter(Boolean)
    const ti = parts.indexOf("thanh-toan")
    const pathCode = ti >= 0 && parts[ti + 1] ? parts[ti + 1] : undefined
    const sp = new URLSearchParams(window.location.search)
    const looksLikeMomoReturn =
      Boolean(sp.get("partnerCode")) &&
      Boolean(sp.get("orderId")) &&
      (sp.get("resultCode") !== null || sp.get("message") !== null)
    if (looksLikeMomoReturn && !pathCode) {
      const base = (import.meta.env.VITE_SERVER_URL || "").replace(/\/+$/, "")
      if (base) {
        window.location.replace(`${base}/payment/momo-return?${sp.toString()}`)
        return
      }
    }
    setDone(true)
  }, [])
  return done
}

const PaymentNotice = () => {
  const { width, height } = useWindowSize()
  const { code: codeParam } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const momoRedirectDone = useMomoReturnRedirect()

  const code = useMemo(() => {
    if (codeParam === "00" || codeParam === "02") return codeParam
    const rc = searchParams.get("resultCode")
    if (rc === "0" || rc === "9000") return "00"
    if (rc != null && rc !== "") return "02"
    return codeParam
  }, [codeParam, searchParams])

  if (!momoRedirectDone) {
    return (
      <div className="min-h-screen bg-muted/40 grid place-content-center p-4 text-muted-foreground text-sm">
        Đang xử lý kết quả thanh toán…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 grid place-content-center p-4">
      {code === "00" && (
        <Confetti
          initialVelocityY={{ min: 1, max: 15 }}
          recycle={false}
          numberOfPieces={500}
          gravity={0.03}
          width={width}
          height={height}
        />
      )}
      {code === "00" && (
        <Card>
          <CardHeader className="grid place-content-center pb-2">
            <CardTitle className="my-4 grid place-content-center">
              <BadgeCheck className="text-green-600" size={28} />
            </CardTitle>
            <CardDescription className="text-2xl font-bold">Thanh toán thành công!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center">Quá trình thanh toán của bạn đã hoàn tất.</p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button onClick={() => navigate("/" + pathnames.user.layout + pathnames.user.balanceInfo)}>
              Về trang cá nhân
            </Button>
          </CardFooter>
        </Card>
      )}
      {code && code !== "00" && (
        <Card>
          <CardHeader className="grid place-content-center pb-2">
            <CardTitle className="my-4 grid place-content-center">
              <CircleX className="text-red-600" size={28} />
            </CardTitle>
            <CardDescription className="text-2xl font-bold">Thanh toán không thành công!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center">Quá trình thanh toán của bạn không thành công.</p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button onClick={() => navigate("/" + pathnames.user.layout + pathnames.user.balanceInfo)}>
              Về trang cá nhân
            </Button>
          </CardFooter>
        </Card>
      )}
      {!code && (
        <Card>
          <CardHeader>
            <CardDescription className="text-lg font-semibold">Không tìm thấy trạng thái thanh toán</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground text-sm">
              Hãy mở link sau khi hoàn tất thanh toán, hoặc vào mục nạp tiền / lịch sử giao dịch.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/")}>Về trang chủ</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default PaymentNotice
