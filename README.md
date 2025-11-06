# Medical Appointment System - Fullstack Application

A containerized Medical Appointment System built with React.js, Node.js (Express), and MySQL, designed for cloud-native deployment using Docker.

## Features

- **User Authentication**: Secure registration and login with JWT
- **Doctor Management**: Browse doctors by specialization
- **Appointment Booking**: Book, manage, and track medical appointments
- **Medical Records**: View appointment history and status
- **Responsive UI**: Modern React-based user interface
- **RESTful API**: Express.js backend with comprehensive endpoints
- **Containerized**: Fully dockerized for easy deployment and scalability

## Architecture

- **Frontend**: React.js with React Router for SPA navigation
- **Backend**: Node.js with Express.js framework
- **Database**: MySQL 8.0 for data persistence
- **Containerization**: Docker and Docker Compose for orchestration

## Tech Stack

### Frontend
- React 18.2
- React Router DOM 6.16
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js 18
- Express.js 4.18
- MySQL2 for database connection
- JWT for authentication
- bcryptjs for password hashing

### Database
- MySQL 8.0

### DevOps
- Docker
- Docker Compose
- Nginx (for frontend serving)

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/2300031215/in-sem-2.git
cd in-sem-2
```

### 2. Start the application with Docker Compose

```bash
docker-compose up -d
```

This command will:
- Build the frontend and backend Docker images
- Pull the MySQL Docker image
- Create a Docker network for service communication
- Initialize the database with sample data
- Start all services

### 3. Access the application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000

### 4. Default Sample Data

The database is initialized with 5 sample doctors:
- Dr. Sarah Johnson - Cardiology
- Dr. Michael Chen - Neurology
- Dr. Emily Rodriguez - Pediatrics
- Dr. James Wilson - Orthopedics
- Dr. Lisa Anderson - Dermatology

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/specialization/:specialization` - Get doctors by specialization
- `POST /api/doctors` - Create doctor (requires auth)
- `PUT /api/doctors/:id` - Update doctor (requires auth)
- `DELETE /api/doctors/:id` - Delete doctor (requires auth)

### Appointments
- `GET /api/appointments` - Get all appointments (requires auth)
- `GET /api/appointments/my-appointments` - Get user's appointments (requires auth)
- `GET /api/appointments/:id` - Get appointment by ID (requires auth)
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments (requires auth)
- `POST /api/appointments` - Create appointment (requires auth)
- `PUT /api/appointments/:id` - Update appointment (requires auth)
- `PATCH /api/appointments/:id/status` - Update appointment status (requires auth)
- `DELETE /api/appointments/:id` - Delete appointment (requires auth)

## Docker Commands

### Build and start services
```bash
docker-compose up -d
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (reset database)
```bash
docker-compose down -v
```

### Rebuild services
```bash
docker-compose up -d --build
```

### Scale services (horizontal scaling)
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3
```

## Development Setup

### Backend Development

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Frontend Development

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Database Setup (without Docker)

```bash
# Install MySQL locally
# Create database
mysql -u root -p

# Run the initialization script
source database/init.sql
```

## Testing

### Test Backend API

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get all doctors
curl http://localhost:5000/api/doctors
```

### Test Frontend
1. Open http://localhost in browser
2. Register a new account
3. Login with credentials
4. Browse doctors
5. Book an appointment
6. View your appointments

## Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── doctorController.js  # Doctor management
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Doctor.js            # Doctor model
│   │   └── Appointment.js       # Appointment model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── doctors.js           # Doctor routes
│   │   └── appointments.js      # Appointment routes
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── server.js                # Main server file
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js        # Navigation component
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Doctors.js
│   │   │   ├── Appointments.js
│   │   │   └── BookAppointment.js
│   │   ├── services/
│   │   │   ├── api.js           # Axios configuration
│   │   │   └── index.js         # API service functions
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── database/
│   └── init.sql                 # Database initialization script
├── docker-compose.yml           # Docker Compose configuration
└── README.md
```

## Environment Variables

### Backend (.env)
```
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=medical_appointment_db
DB_PORT=3306
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Networking

All services communicate via a custom Docker bridge network named `medical_network`. This ensures:
- Isolated network environment
- Service discovery by service name
- Secure inter-container communication

## Scalability

The application is designed for horizontal scaling:

1. **Database**: Can be configured with read replicas
2. **Backend**: Stateless design allows multiple instances
3. **Frontend**: Static files served by Nginx, easily scalable

Example scaling command:
```bash
docker-compose up -d --scale backend=3 --scale frontend=2
```

## Security Considerations

- JWT tokens for authentication
- Password hashing with bcryptjs
- Environment variables for sensitive data
- SQL injection prevention with parameterized queries
- CORS configuration for API security

## Troubleshooting

### Database connection failed
```bash
# Check if MySQL is running
docker-compose ps

# Check MySQL logs
docker-compose logs mysql

# Wait for MySQL to be healthy
docker-compose ps mysql
```

### Backend not starting
```bash
# Check backend logs
docker-compose logs backend

# Verify environment variables
docker-compose exec backend env
```

### Frontend not loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

### Port already in use
```bash
# Change ports in docker-compose.yml
# For example, change "80:80" to "8080:80"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Author

Cognizant Cloud-Native Modernization Team

## Support

For issues and questions, please open an issue in the GitHub repository.
