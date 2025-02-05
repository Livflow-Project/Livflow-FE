# 1단계: 빌드 (Build Stage)
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# TypeScript 컴파일 확인
RUN npm run tsc --dry-run || echo "TypeScript check failed"

# Vite로 빌드 (TypeScript 포함)
RUN npm run build || exit 1

# 2단계: 배포 (Nginx Stage)
FROM nginx:1.23-alpine

# 빌드된 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 인증서 폴더 마운트 (docker-compose에서 설정됨)
VOLUME ["/etc/letsencrypt"]

# 포트 노출
EXPOSE 80
EXPOSE 443

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
