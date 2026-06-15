FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN mkdir -p /data && chown -R node:node /data /app

ENV NODE_ENV=production
ENV PORT=7860
ENV DATA_DIR=/data

EXPOSE 7860

USER node

CMD ["npm", "start"]
