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

EXPOSE 80
