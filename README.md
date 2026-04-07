# Anonymously

An anonymous messaging platform built with Next.js, allowing users to send and receive messages without revealing their identity.

## Features

- **Anonymous Messaging**: Send and receive messages without authentication
- **User Registration**: Optional user accounts for managing messages
- **Message Validation**: Robust input validation using Zod schemas
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Database Integration**: MongoDB with Mongoose for data persistence

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Development**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/avichal090294/Anonymously.git
cd anonymously
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
MONGODB_URI=your_mongodb_connection_string_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
anonymously/
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   ├── lib/           # Utility functions
│   │   └── dbConnect.ts
│   ├── model/         # Database models
│   │   └── User.ts
│   └── schemas/       # Zod validation schemas
│       ├── acceptMessageSchema.ts
│       ├── messageSchema.ts
│       ├── signInSchema.ts
│       ├── signUpSchema.ts
│       └── verifySchema.ts
├── public/            # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

- `MONGODB_URI` - Your MongoDB connection string

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)
