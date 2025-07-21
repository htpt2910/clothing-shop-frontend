# Clothing Shop Frontend

Next.js frontend for the clothing shopping web application.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Node.js 22.17.1
- Docker & Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine

### Initial Setup

1. First, initialize the Next.js project (if not already done):
```bash
docker run --rm -it -v $(pwd):/app -w /app node:22.17.1 npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Answer the prompts:
- Would you like to use ESLint? → Yes
- Would you like to use `src/` directory? → No (already specified)
- Would you like to use App Router? → Yes (already specified)
- Would you like to customize the default import alias? → No

2. Build and start the container:
```bash
docker-compose up --build
```

### Running the Application

Start the frontend:
```bash
docker-compose up
```

The application will be available at `http://localhost:4001`

### Environment Variables

The following environment variables are configured:
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:4000/api/v1`)

### Common Commands

- Install new dependencies:
```bash
docker-compose exec frontend npm install <package-name>
```

- Run linting:
```bash
docker-compose exec frontend npm run lint
```

- Build for production:
```bash
docker-compose exec frontend npm run build
```

- View logs:
```bash
docker-compose logs -f frontend
```

## Development

- The application runs in development mode with hot reload
- Changes to your code will automatically refresh the browser
- The backend API should be running on port 4000

## Project Structure

```
.
├── app/                # App Router pages and layouts
├── components/         # React components
├── public/            # Static files
├── styles/            # Global styles
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile         # Docker configuration
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## Stopping the Application

Stop the container:
```bash
docker-compose down
```