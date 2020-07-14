FROM nginx
COPY ./web/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY ./web/my-blog /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]