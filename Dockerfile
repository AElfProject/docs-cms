FROM cgr.dev/chainguard/nginx:latest

WORKDIR /usr/share/nginx/html
COPY out .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080