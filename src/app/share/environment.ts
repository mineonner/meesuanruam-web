// URL นี้เบราว์เซอร์เป็นคนเรียก ไม่ใช่ container
// จึงต้องเป็น localhost + พอร์ตที่ compose map ออกมา ไม่ใช่ชื่อ service อย่าง http://api:8080
const local = "http://localhost:5156";

export const environment = {
  apis: {
    server: local
  }
}
