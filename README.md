# Anonymously

An anonymous messaging platform built with Next.js, allowing users to send and receive messages without revealing their identity.

# Anonymously

An anonymous messaging platform built with Next.js, allowing users to send and receive messages without revealing their identity.

## Features

- **Anonymous Messaging**: Send and receive messages without authentication
- **User Registration**: Secure user accounts with email verification
- **Email Verification**: OTP-based account verification using Resend
- **Password Security**: Bcrypt hashing for secure password storage
- **Message Validation**: Robust input validation using Zod schemas
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Database Integration**: MongoDB with Mongoose for data persistence
- **Email Templates**: Professional React Email templates for notifications

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Bcrypt for password hashing
- **Email Service**: Resend for email delivery
- **Email Templates**: React Email components
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
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=your-verified-email@yourdomain.com
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

```
anonymously/
├── emails/            # Email templates
│   └── VerificationEmail.tsx
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── api/       # API routes
│   │   │   └── signup/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   ├── helpers/       # Utility helper functions
│   │   └── sendVerificationEmail.ts
│   ├── lib/           # Library configurations
│   │   ├── dbConnect.ts
│   │   └── resend.ts
│   ├── model/         # Database models
│   │   └── User.ts
│   ├── schemas/       # Zod validation schemas
│   │   ├── acceptMessageSchema.ts
│   │   ├── messageSchema.ts
│   │   ├── signInSchema.ts
│   │   ├── signUpSchema.ts
│   │   └── verifySchema.ts
│   └── types/         # TypeScript type definitions
│       └── ApiResponse.ts
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

## API Endpoints

### Authentication
- `POST /api/signup` - User registration with email verification
  - Request body: `{ username, email, password }`
  - Sends verification email with OTP code
  - Returns success/error response

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

- `MONGODB_URI` - Your MongoDB connection string
- `RESEND_API_KEY` - Your Resend API key for email delivery
- `EMAIL_FROM` - Verified sender email address (e.g., `noreply@yourdomain.com`)

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
