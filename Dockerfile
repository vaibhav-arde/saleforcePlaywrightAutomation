FROM node:20-bookworm-slim

ENV CI=true \
    HUSKY=0 \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN apt-get update --fix-missing \
    && apt-get install -y \
    && npx playwright install --with-deps chromium \
    && rm -rf /var/lib/apt/lists/*

COPY . .

CMD ["npm", "run", "test:api:chromium"]
