FROM node:20-bookworm

ENV CI=true \
    HUSKY=0 \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npx playwright install --with-deps chromium

COPY . .

CMD ["npm", "run", "test:api:chromium"]
