# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
FROM node:20-slim AS builder
# Environment Variables
ENV PNPM_HOME="/pnpm"
ENV VITE_APP_TITLE="IPtable-Controller-Frontend"
ENV VITE_HOST_IP="127.0.0.1"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . .

RUN pnpm install
RUN pnpm run build

FROM nginx:1.21 AS prod
EXPOSE 80
COPY --from=builder ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
