# 베이스 이미지 선택 (Node.js)
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY package.json package-lock.json ./

# 패키지 설치
RUN npm install

# 프로젝트 소스 코드 복사
COPY . .

# TypeScript 컴파일 상태 확인
RUN npm run tsc --dry-run || echo "TypeScript check failed"

# 현재 디렉토리 상태 확인
RUN ls -la

# Vite로 빌드 (TypeScript 컴파일 포함)
RUN npm run build || exit 1

# 빌드 후 dist 디렉토리 확인
RUN ls -la dist || echo "dist directory not found"

# Nginx로 정적 파일 제공
FROM nginx:1.23-alpine

# 기본 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 빌드된 파일 복사
COPY --from=0 /app/dist /usr/share/nginx/html

# 사용자 정의 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# Nginx 컨테이너 포트 노출
EXPOSE 80
EXPOSE 443

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
