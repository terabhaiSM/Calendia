# Calendia: Calendar Booking System

Calendia is a Calendar Booking System designed to facilitate seamless scheduling for Calendar Owners and their Invitees. This system supports features like setting availability, booking appointments, and listing upcoming appointments, all built with a robust and scalable tech stack.

**Note** :- For latest developments please visit the [dev](https://github.com/terabhaiSM/Calendia/tree/mdl/dev) branch.

## Tech Stack
- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: PostgreSQL (managed by Supabase)  
- **ORM**: Prisma  
- **Testing**: Jest, jest-mock-extended
- **Tools**: [API Documentation with Postman](https://web.postman.co/workspace/17dfd6c7-9f9b-4da3-ae59-0be50c334370) 

## Features
1. **User Registration**  
   - Register a calendar owner with a name and email.  

2. **Availability Setup**  
   - Define availability for a calendar owner by specifying days and time slots.  

3. **Search Available Slots**  
   - Find available slots for a calendar owner on a specific date.  

4. **Book Appointment**  
   - Book an available time slot for an invitee with their details.  

5. **List Upcoming Appointments**  
   - Retrieve all upcoming appointments for a calendar owner.  

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:
- **Node.js**: v16.x or later  
- **npm or Yarn**: Latest version  
- **PostgreSQL**: 13.x or later  
- **Supabase Account**: Create a Supabase account  

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Calendia
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
DIRECT_URL=postgresql://<username>:<password>@<host>:<port>/<database>
PORT = 5001
```

- Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL or Supabase credentials.

### 4. Initialize Prisma

Generate the Prisma Client and migrate the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the Application

Run the development server:

```bash
npm run dev
```

### 6. Run Tests

Run the Jest test suite:

```bash
npm run test
```

## API Documentation

### Base URL

`http://localhost:5001/api`

### Endpoints

#### 1. User Registration

**POST** `/users/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-12-21T00:00:00.000Z"
  }
}
```

#### 2. Set Availability

**POST** `/availability/setup`

**Request Body:**

```json
{
  "ownerId": "uuid",
  "availability": [
    {
      "dayOfWeek": "Monday",
      "startTime": "10:00",
      "endTime": "17:00"
    }
  ]
}
```

**Response:**

```json
{
  "message": "Availability setup successfully",
  "records": {
    "count": 1
  }
}
```

#### 3. Search Available Slots

**POST** `/slots/search`

**Request Body:**

```json
{
  "ownerId": "uuid",
  "date": "2024-12-21"
}
```

**Response:**

```json
{
  "availableSlots": [
    {
      "startTime": "10:00",
      "endTime": "11:00"
    },
    {
      "startTime": "11:00",
      "endTime": "12:00"
    }
  ]
}
```

#### 4. Book Appointment

**POST** `/appointments/book`

**Request Body:**

```json
{
  "ownerId": "uuid",
  "inviteeName": "Jane Doe",
  "inviteeEmail": "jane@example.com",
  "date": "2024-12-21",
  "timeSlot": "10:00-11:00"
}
```

**Response:**

```json
{
  "message": "Appointment booked successfully",
  "appointment": {
    "id": "uuid",
    "date": "2024-12-21",
    "timeSlot": "10:00-11:00",
    "inviteeName": "Jane Doe",
    "inviteeEmail": "jane@example.com"
  }
}
```

#### 5. List Upcoming Appointments

**GET** `/appointments/upcoming?ownerId=uuid`

**Response:**

```json
{
  "owner": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "appointments": [
    {
      "id": "uuid",
      "date": "2024-12-22",
      "timeSlot": "10:00-11:00",
      "inviteeName": "Jane Doe",
      "inviteeEmail": "jane@example.com"
    }
  ]
}
```

## Directory Structure

```
.
├── src
│   ├── controllers
│   ├── routes
│   ├── utils
│   ├── tests
│   └── app.ts
├── prisma
│   └── schema.prisma
├── .env
├── package.json
└── README.md
```

## Key Scripts
- **Development**: `npm run dev`  
- **Testing**: `npm run test`  
- **Database Migration**: `npx prisma migrate dev`  
- **Generate Prisma Client**: `npx prisma generate`  

Feel free to reach out for any questions or issues!

