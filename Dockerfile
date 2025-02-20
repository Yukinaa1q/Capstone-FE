#Instruction so that container may now how to build

FROM node:22

WORKDIR /app

# copy package.json and package-lock.json
COPY package.json ./

# Copy the rest of the code to the container
COPY . . 

# Install app dependencies
RUN corepack enable
RUN yarn install

# Expose the port the app runs in
EXPOSE 8080

# Run the app
CMD ["yarn", "dev"]
