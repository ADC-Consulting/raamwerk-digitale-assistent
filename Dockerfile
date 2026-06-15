# Static site: index.html + js/ (JSX compiled in-browser via Babel) + css/ + committed js/data.js.
# No build step needed (js/data.js is committed); just serve the repo root with nginx on port 80.
FROM nginx:alpine
COPY . /usr/share/nginx/html
