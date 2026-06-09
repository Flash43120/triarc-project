import { useNavigate } from "react-router-dom"
import { House, User, LogIn } from "lucide-react"

// Layout กลางของระบบ
export default function Layout({ children }) {

  // ใช้เปลี่ยนหน้า
  const navigate = useNavigate()

  return (

    // พื้นหลังทั้งจอ
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/* กล่องมือถือ */}
      <div className="w-full max-w-sm bg-white min-h-screen shadow-xl flex flex-col">

        {/* เนื้อหาแต่ละหน้า */}
        <div className="flex-1">

          {/* children = หน้า Home / Staff / Login */}
          {children}

        </div>

        {/* Bottom Navigation */}
        <div className="border-t p-4 flex justify-around bg-white sticky bottom-0">

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center text-sm"
          >

            <House size={22} />

            หน้าแรก

          </button>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex flex-col items-center text-sm"
          >

            <LogIn size={22} />

            Login

          </button>

          {/* Staff */}
          <button
            onClick={() => navigate("/staff")}
            className="flex flex-col items-center text-sm"
          >

            <User size={22} />

            Staff

          </button>

        </div>

      </div>

    </div>
  )
}