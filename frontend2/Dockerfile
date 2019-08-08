# base image
FROM node:9.4
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.0 -g --silent
COPY . /usr/src/app
RUN npm run build
# start app
CMD ["serve", "-s", "build"]