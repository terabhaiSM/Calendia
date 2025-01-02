# Calendia Frontend

This is the frontend application for the Calendia Calendar Booking System, built using Next.js, TypeScript, and ShadCN. It provides an intuitive interface for calendar owners and invitees to manage appointments, set availability, and book time slots seamlessly.

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **UI Components**: ShadCN (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **API Communication**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

## Features

- **User Registration**: Register new calendar owners.
- **Set Availability**: Define available time slots.
- **Search Available Slots**: Find available slots for a specific date.
- **Book Appointments**: Book appointments seamlessly.
- **View Upcoming Appointments**: See a list of all scheduled appointments.

## Prerequisites

Before running the project, ensure the following are installed:

- **Node.js**: v16.x or later
- **npm or Yarn**: Latest version

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd calendia-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

Replace `http://localhost:3000/api` with the base URL of your backend.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Directory Structure

```
.
├── components
│   ├── ui
│   ├── forms
├── pages
│   ├── api
│   ├── availability
│   ├── appointments
├── public
├── styles
│   └── globals.css
├── utils
├── .env.local
├── next.config.js
└── tsconfig.json
```

## Scripts

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

## API Integration

Each API endpoint in the backend is integrated into the frontend via Axios. Ensure the base URL is correctly configured in the `.env.local` file.

### Example Usage

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const registerUser = async (data: { name: string; email: string }) => {
  const response = await api.post('/users/register', data);
  return response.data;
};
```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Ensure you follow the coding standards and guidelines.

## License

This project is licensed under the MIT License.

