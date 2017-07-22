FROM node:8.2.1
USER node
ENV HOME=/home/node
# Create app directory
RUN mkdir $HOME/app
WORKDIR $HOME/app
# Install dependencies without source code to take advantage of docker cache
COPY package.json $HOME/app
COPY package-lock.json $HOME/app
RUN npm install
# Copy application code
COPY . $HOME/app
# Start application
USER node
EXPOSE 8000
CMD ["npm", "start"]
