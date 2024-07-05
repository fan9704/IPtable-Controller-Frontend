# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
FROM node:20-slim AS builder
# Arguments
ARG VITE_APP_TITLE="IPtable-Controller-Frontend"
ARG VITE_HOST_IP="127.0.0.1"
# Environment Variables
ENV PNPM_HOME="/pnpm"
ENV VITE_APP_TITLE="IPtable-Controller-Frontend"
ENV VITE_HOST_IP=$VITE_HOST_IP
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package*.json ./
# 刪除 node_modules 目錄和 package-lock.json 文件
RUN rm -rf node_modules package-lock.json
COPY . .

RUN pnpm install
RUN pnpm run build

FROM nginx:1.21 AS prod
EXPOSE 80
COPY --from=builder ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
