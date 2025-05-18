import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Loading } from "../Loading"
import { getCookie } from "@/utils/helpers/auth"
import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants"

export function DashboardLayout() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME)
    if (!token.length) {
      navigate("/")
    }
    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return <Loading />
  }

  return <Outlet />
}
