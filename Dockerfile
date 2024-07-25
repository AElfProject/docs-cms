FROM cgr.dev/chainguard/nginx:latest

WORKDIR /usr/share/nginx/html
COPY out .

EXPOSE 8080