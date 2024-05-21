# Spend Smart Backend

Welcome to the backend repository of Spend Smart - your go-to platform for effortless financial management. This repository contains all the backend code necessary to power the Spend Smart application.

<hr/>

## Getting Started

Follow these steps to set up the Spend Smart backend on your local machine:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or accessible via a cloud service
- Git installed on your machine

### Clone the repository:

```bash
git clone https://github.com/SaxenaShourya/spend-smart.git
```

### Backend Setup

#### Make the .env file in backend directory -

Create a `.env` file based of `env.example` in the backend directory and save it as .env.

#### Example .env file

```bash
# .env.example
PORT=3000
MONGO_URI=mongodb://localhost:27017/spend_smart
JWT_SECRET_KEY=your_secret_key_here
NODE_ENV=development
ENCRYPTION_SALT=10
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password_here
```

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up your MongoDB database and obtain the connection URI.

4. Create a .env file based on the .env.example file.

5. Start the backend server:

```bash
npm run dev
```

- The development server will start running at http://localhost:3000, and you can access Spend Smart's backend routes from there.

<hr/>

## API Endpoints

```bash
# User Route
/api/v1/users
```

```bash
# Income Route
/api/v1/incomes
```

```bash
# Expense Route
/api/v1/expenses
```

### User Routes

```bash
GET /api/v1/users
# Get the current user's profile.
```

```bash
POST /api/v1/users
# Register a new user.
```

```bash
PUT /api/v1/users
# Update the current user's profile.
```

```bash
PUT /api/v1/users/reset-password
# Reset the current user's password.
```

```bash
POST /api/v1/users/send-otp
# Send OTP (One Time Password) for password reset.
```

```bash
POST /api/v1/users/verify-otp
# Verify OTP (One Time Password) for password reset.
```

```bash
POST /api/v1/users/login
# User login.
```

```bash
DELETE /api/v1/users/logout
# Logout the current user.
```

### Income Routes

```bash
GET /api/v1/incomes
# Get all incomes for the current user.
```

```bash
POST /api/v1/incomes
# Add a new income.
```

```bash
GET /api/v1/incomes/all
# Get all incomes for all users.
```

```bash
PUT /api/v1/incomes/:id
# Update an income by ID.
```

```bash
DELETE /api/v1/incomes/:id
# Delete an income by ID.
```

### Expenses Routes

```bash
GET /api/v1/expenses
# Get all expenses for the current user.
```

```bash
POST /api/v1/expenses
# Add a new expense.
```

```bash
GET /api/v1/expenses/all
# Get all expenses for all users.
```

```bash
PUT /api/v1/expenses/:id
# Update an expense by ID.
```

```bash
DELETE /api/v1/expenses/:id
# Delete an expense by ID.
```

<hr/>

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- nodemailer for sending emails
- dotenv for environment variables
- otp-generator for generating otps

<hr/>

## License:

- Spend Smart is licensed under the [MIT License](../LICENSE).

<hr/>

## For more Content

- For feedback and support, email us at saxenashourya000@gmail.com 📧
- Follow me on [Linkedin](https://www.linkedin.com/in/shouryasaxena) for updates. 🔗
