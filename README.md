# Duulmn - Mongolian Music Discovery Platform

This is a modern [Next.js](https://nextjs.org) 16 project with the App Router, TypeScript, and Tailwind CSS.

## Project Structure

```
duulmn/
├── app/                    # Next.js App Router pages and routes
│   ├── api/               # API routes
│   ├── artist/            # Artist-related pages
│   ├── location/          # Location-based pages  
│   ├── profile/           # User profile pages
│   ├── signin/            # Authentication pages
│   ├── signup/            # Registration pages
│   ├── song/              # Song-related pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React providers
├── components/            # Shared UI components
├── config/                # Application configuration
├── lib/                   # Shared utilities and business logic
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│   ├── validations/      # Validation schemas
│   └── actions/          # Server actions
├── public/                # Static assets
├── server/                # Backend server code
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
├── utils/                 # Shared utilities
├── middleware.ts          # Next.js middleware
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Context7 Integration

This project is optimized for use with Context7, an AI coding assistance tool that provides live documentation. When using Context7-enabled editors like Cursor or Windsurf, you can use "use context7" in your prompts to get up-to-date documentation for Next.js APIs and other technologies.

## Learn More

To learn more about Next.js 16 and the App Router, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
