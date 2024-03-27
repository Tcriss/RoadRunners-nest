FROM node:20.11-alpine


# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN corepack enable pnpm
RUN corepack use pnpm@latest
RUN pnpm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the production build
CMD ["pnpm", "run", "start:prod"]