FROM node:20-alpine AS build
WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration production

FROM nginx:alpine
# Angular 17+ (builder "application") วางไฟล์ไว้ใน browser/ ไม่ใช่รากของ outputPath
COPY --from=build /src/dist/meesuanruam-web/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY ยกสิทธิ์ของไฟล์ต้นทางเข้ามาด้วย ถ้าเครื่องที่ build มีไฟล์ mode 600
# nginx worker (user nginx) จะอ่านไม่ได้และตอบ 403 ทั้งที่ไฟล์อยู่ครบ
RUN chmod -R a+rX /usr/share/nginx/html

EXPOSE 80
