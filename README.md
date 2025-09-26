# Adfinis Website

This repository contains the main sources and components of our company website (adfinis.com).

This is a full-stack web application built with:
- **Frontend**: Next.js 14 (React framework)
- **Backend**: Strapi 5 (Headless CMS)
- **Database**: PostgreSQL

## Prerequisites

### System Requirements (Linux)

1. **Node.js**: This project uses two different Node.js versions
   - Next.js: Node.js v20.17.0
   - Strapi: Node.js v22.11.0

2. **Node Version Manager ([nvm](https://github.com/nvm-sh/nvm))**: Recommended for managing multiple Node.js versions
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   # Restart your terminal or source your profile
   source ~/.bashrc
   ```

3. **Docker**: Required for PostgreSQL database
   ```bash
   # Fedora/RHEL/CentOS
   sudo dnf install docker docker-compose
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER

   # Ubuntu/Debian
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER
   # Log out and back in for group changes to take effect
   ```

## Development Setup

### 1. Database Setup

Start the PostgreSQL database container:

```bash
docker run -d \
  -p 5432:5432 \
  --name adfinis-website-postgres \
  -e POSTGRES_DB=postgres \
  -e POSTGRES_PASSWORD=supersecret \
  postgres
```

### 2. Strapi Backend Setup

Navigate to the Strapi directory and set up the backend:

```bash
cd strapi

# Use the correct Node.js version
nvm use

# Install dependencies
npm install

# Start Strapi in development mode
npm run develop
```

Strapi will be available at: http://localhost:1337

#### Initial Strapi Configuration

1. **Create Admin Account**: When you first access http://localhost:1337/admin, create your admin account

2. **Configure Locales**:
   - Go to Settings → Internationalization
   - Add these locales (remove any others):
     - `en` (English)
     - `en-au` (English Australia)
     - `nl` (Dutch)
     - `de-ch` (German Switzerland)
     - `de-de` (German Germany)

3. **Create Collection Types**:
   Create the following collection types in Content-Types Builder:
   - `footer`
   - `homepage`
   - `navigation-menu`
   - `heroes` (or multiple hero types as needed)

   For each collection type, make sure to:
   - Enable localization in the advanced settings
   - Configure appropriate fields based on your content needs

4. **Set Collection Permissions**:
   Navigate to Settings → Users & Permissions plugin → Roles → Public

   For each collection type (`footer`, `homepage`, `navigation-menu`, `heroes`, etc, etc), enable:
   - `find` permission (to retrieve multiple entries)
   - `findOne` permission (to retrieve single entries)

   This allows the Next.js frontend to fetch content from these collections via the Strapi API.

### 3. Next.js Frontend Setup

Open a new terminal and navigate to the Next.js directory:

```bash
cd nextjs

# Use the correct Node.js version
nvm use

# Install dependencies
npm install

# Start the development server
npm run dev
```

Next.js will be available at: http://localhost:3000

### 4. Environment Configuration

Make sure to configure the appropriate environment variables in both applications:

- **Strapi**: Check `.env.example` in the `strapi/` directory
- **Next.js**: Check `.env.local` or `.env` in the `nextjs/` directory

## Available Scripts

### Strapi (Backend)
```bash
npm run develop    # Start development server
npm run start      # Start production server
npm run build      # Build for production
```

### Next.js (Frontend)
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture

This project follows a headless CMS architecture:

- **Strapi** serves as the content management system and API backend
- **Next.js** consumes the Strapi API to render the frontend
- **PostgreSQL** stores all content and configuration data
- Content is managed through Strapi's admin interface and delivered via API to the Next.js frontend

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 1337 (Strapi) and 3000 (Next.js) are available
2. **Node version mismatch**: Always use `nvm use` in each directory to ensure correct Node.js versions
3. **Database connection**: Ensure PostgreSQL container is running: `docker ps`
4. **Missing locales**: Frontend only supports the 5 specified locales; others will cause issues

### Database Management

```bash
# Stop the database
docker stop adfinis-website-postgres

# Start the database
docker start adfinis-website-postgres

# Remove the database (warning: this will delete all data)
docker rm adfinis-website-postgres
```

## License

...
