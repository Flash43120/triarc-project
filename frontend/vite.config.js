// นำเข้า defineConfig สำหรับตั้งค่า Vite
import { defineConfig } from "vite";

// นำเข้า React Plugin
import react from "@vitejs/plugin-react";

// นำเข้า Tailwind Plugin
import tailwindcss from "@tailwindcss/vite";

// Export การตั้งค่า Vite
export default defineConfig({

  // Plugins ที่ใช้ในโปรเจกต์
  plugins: [
    react(),       // รองรับ React
    tailwindcss(), // รองรับ Tailwind CSS
  ],

  // ตั้งค่า Development Server
  server: {

    // Proxy สำหรับเชื่อม Frontend -> Backend
    proxy: {

      // ทุก Request ที่ขึ้นต้นด้วย /api
      "/api": {

        // ส่งต่อไปยัง ASP.NET Core Backend
        target: "http://localhost:5247",

        // เปลี่ยน Origin Header ให้อัตโนมัติ
        changeOrigin: true,

      },
       "/uploads": {
    target: "http://localhost:5247",
    changeOrigin: true,
  },

    },

  },

});