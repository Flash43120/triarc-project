import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
export default function Login() {
    
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            TRIARC
          </h1>

          <p className="text-gray-500 mt-2">
            Staff Login
          </p>

        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            className="w-full border rounded-2xl p-4"
          />

          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="w-full border rounded-2xl p-4"
          />

          <button
            className="w-full bg-black text-white rounded-2xl p-4 font-semibold"
          >
            เข้าสู่ระบบ
          </button>

        </div>

      </div>

    </div>
  )
}