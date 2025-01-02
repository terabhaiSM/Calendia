# Calendia Project

Calendia is a comprehensive calendar booking system consisting of a backend and a frontend application. The project aims to provide a seamless scheduling experience for calendar owners and their invitees.

## Project Structure

```
Calendia/
├── backend/     # Backend application
├── frontend/    # Frontend application
└── README.md    # Project documentation
```

## Tech Stack

### Backend
- **Framework**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (managed by Supabase)
- **ORM**: Prisma
- **Testing**: Jest, jest-mock-extended
- **Documentation**: OpenAPI/Swagger

### Frontend
- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **UI Components**: ShadCN (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Form Handling**: React Hook Form + Zod
- **API Communication**: Axios

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v16.x or later
- **npm or Yarn**: Latest version
- **PostgreSQL**: 13.x or later

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Calendia
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Follow the [backend README](./backend/README.md) for setup instructions.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Follow the [frontend README](./frontend/README.md) for setup instructions.

### 4. Run the Applications

- Start the backend server by navigating to the `backend` directory and running:
  ```bash
  npm run dev
  ```

- Start the frontend application by navigating to the `frontend` directory and running:
  ```bash
  npm run dev
  ```

The backend will be available at `http://localhost:3000/api`, and the frontend will be available at `http://localhost:3000`.

## Directory Structure

```
.
├── backend
│   ├── src
│   ├── prisma
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend
│   ├── components
│   ├── pages
│   ├── styles
│   ├── .env.local
│   ├── package.json
│   └── README.md
└── README.md
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License.

