FROM node:8.2.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install dependencies without source code to take advantage of docker cache
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install
# Copy application code
COPY . /usr/src/app
# Start application
USER node
EXPOSE 8000
CMD ["npm", "start"]
