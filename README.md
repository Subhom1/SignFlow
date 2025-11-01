# SignFlow

> A modern, mobile-first PDF signing application built for the real world.

SignFlow is a full-stack prototype that lets users upload PDFs, sign them digitally, and download the signed document—all through a clean, responsive interface. Built as a monorepo with a React + TypeScript frontend (powered by Vite) and a lightweight Express.js backend, it's designed to showcase solid architecture, thoughtful UX, and production-ready patterns.

<img src="https://raw.githubusercontent.com/Subhom1/mygitsrc/refs/heads/master/src/mobile-screen.png" alt="mobile-light-preview">

---

## Architecture

- **Vite** - Lightning-fast dev server and build times. HMR that actually works.
- **TypeScript** - Type safety across the entire codebase. Fewer bugs, better DX.
- **Recoil** - Lightweight state management that scales. No Redux boilerplate.
- **Tailwind CSS** - Utility-first styling with a custom theme. Consistent spacing, colors, and responsive design without writing CSS files.
- **Framer Motion** - Declarative animations that feel natural, not gimmicky.
- **Jest + Testing Library** - Comprehensive test coverage for components and hooks.
- **Express.js** - Lightweight backend for PDF signing.

## Project Structure

```
SignFlow/
├── .husky/                      # Git hooks for code quality
│   ├── pre-commit              # Runs lint-staged before commits
│   └── pre-push                # Runs tests before pushing
│
├── api/                        # Serverless API endpoints (Vercel)
│   ├── health.ts              # Health check endpoint
│   ├── index.js               # Main API handler
│   ├── middleware/            # Express middleware
│   └── tmp/                   # Temporary file storage
│       ├── uploads/           # Uploaded PDFs
│       └── signed/            # Signed PDFs
│
├── public/                     # Static assets
│   └── vite.svg               # App favicon
│
├── src/
│   ├── assets/                # Images, fonts, etc.
│   │
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── FallBackLoader/
│   │   │   │   ├── FallBackLoader.tsx
│   │   │   │   ├── FallBackLoader.test.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── FileUpload/
│   │   │   │   ├── FileUpload.tsx
│   │   │   │   ├── FileUpload.test.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── ProgressIndicator/
│   │   │   │   ├── ProgressIndicator.tsx
│   │   │   │   ├── ProgressIndicator.test.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── TextField/
│   │   │   │   ├── TextField.tsx
│   │   │   │   ├── TextField.test.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── ThemeToggle/
│   │   │       ├── ThemeToggle.tsx
│   │   │       ├── ThemeToggle.test.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── layout/           # Layout components
│   │       ├── Header/
│   │       │   ├── Header.tsx
│   │       │   ├── Header.test.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── MainContent/
│   │       │   ├── MainContent.tsx
│   │       │   ├── MainContent.test.tsx
│   │       │   └── index.ts
│   │       │
│   │       └── index.tsx     # Main layout wrapper with lazy loading
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useSignPdf.ts    # PDF signing logic with progress tracking
│   │
│   ├── recoil/              # Recoil state management
│   │   └── atoms.ts         # Global state atoms and selectors
│   │
│   ├── App.css              # App-specific styles
│   ├── App.tsx              # Root component with lazy loading
│   ├── App.test.tsx         # App integration tests
│   ├── index.css            # Global styles and Tailwind imports
│   ├── main.tsx             # React entry point with Recoil provider
│   └── services.ts          # API service layer (axios calls)
│
├── types/                    # TypeScript type definitions
│   ├── api.ts               # API request/response types
│   ├── pdf.ts               # PDF metadata types
│   └── index.d.ts           # Type exports
│
├── .editorconfig            # Editor configuration
├── .env                     # Environment variables (gitignored)
├── .env.example             # Example environment variables
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── .nvmrc                   # Node version specification
├── .prettierrc              # Prettier configuration
├── .vercel.json             # Vercel deployment config
├── index.html               # HTML entry point
├── jest.config.ts           # Jest test configuration
├── jest.setup.ts            # Jest setup file with mocks
├── LICENSE                  # CC0 1.0 Universal license
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── README.md                # Project documentation
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript base config
├── tsconfig.app.json        # TypeScript app config
├── tsconfig.node.json       # TypeScript Node config
├── vite-env.d.ts            # Vite environment types
└── vite.config.ts           # Vite configuration
```

## Key Features

### Frontend

- **Lazy Loading & Code Splitting**: Components are dynamically imported to reduce initial bundle size
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: System preference detection with manual toggle
- **Drag & Drop File Upload**: Intuitive file selection with visual feedback
- **Progress Tracking**: Real-time progress indicator during PDF signing
- **Type-Safe**: Full TypeScript coverage with strict mode enabled

### Backend

- **PDF Watermarking**: Adds signer name and timestamp to every page
- **File Validation**: Only accepts PDF files up to 10MB
- **Temporary Storage**: Storing uploaded and signed files in temp folder
- **CORS Enabled**: Supports cross-origin requests
- **Health Check**: `/health` endpoint for monitoring

### Test Coverage

- **Unit Tests**: All common components (`Button`, `TextField`, `FileUpload`, etc.)
- **Integration Tests**: Layout components (`Header`, `MainContent`)

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Performance Optimizations

### Code Splitting

- **Route-level**: Main layout lazy loaded
- **Component-level**: Heavy components (Framer Motion) dynamically imported

---

## Development Workflow

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure:
   ```bash
   VITE_API_URL=http://localhost:5050
   ```
3. Node version: 25.1.0
4. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

```bash
npm run dev          # Start both frontend and backend
npm run dev:frontend # Frontend only (port 5173)
npm run dev:backend  # Backend only (port 5050)
```

### Code Quality

```bash
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript validation
```

### Git Hooks

- **Pre-commit**: Runs `lint-staged` (formats and lints staged files)
- **Pre-push**: Runs full test suite to prevent broken code

---

## State Management

### Recoil Atoms

```typescript
userNameState; // User's name input
pdfFileState; // Uploaded PDF file
pdfFileNameState; // Derived: PDF filename
isUploadReadyState; // Derived: Ready to upload flag
```

### Benefits

- Minimal boilerplate compared to Redux
- Built-in selectors for derived state
- Easy testing with `RecoilRoot`
- TypeScript support out of the box

---

## Styling System

### Tailwind Configuration

- **Custom Colors**: `primary`, `primaryAccent`, `primaryDark`, etc.
- **Dark Mode**: Class-based (`class="dark"`)
- **Responsive**: Mobile-first breakpoints
- **Utilities**: Extended with custom spacing and shadows
