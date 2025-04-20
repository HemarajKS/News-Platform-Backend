# News Platform Backend

This is the backend for the News Platform project, which provides an API for managing articles, categories, authors, and tags. The backend is built using **Node.js**, **Express**, and **TypeScript**, with **MongoDB** as the database.

---

## Features

- **Article Management**: Create, read, update, delete, and filter articles.
- **Category Management**: Manage categories for articles, including adding, editing, and deleting categories.
- **Author Management**: Manage author details and their associated articles.
- **Tag Management**: Manage tags for articles.

---

## Project Structure

```
backend/
├── src/
│   ├── app.ts                # Entry point of the application
│   ├── controllers/          # Controllers for handling requests and responses
│   ├── models/               # Mongoose models for database schemas
│   ├── routes/               # Route definitions for API endpoints
│   ├── services/             # Business logic for handling data operations
│   ├── lib/                  # Utility functions (e.g., database seeding)
│   └── tests/                # Unit and integration tests
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest configuration for testing
└── README.md                 # Project documentation
```

---

## Installation

### Prerequisites

- **Node.js**: Install the latest LTS version from [Node.js Official Website](https://nodejs.org/).
- **MongoDB**: Follow the instructions below to install MongoDB locally.

### Installing MongoDB Locally

#### On Windows

1. Download the MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Run the installer and follow the setup wizard.
   - Select "Complete" setup.
   - Ensure "Install MongoDB as a Service" is checked.
3. Once installed, MongoDB will run as a Windows service.
4. Verify the installation:
   ```bash
   mongod --version
   ```
5. Start the MongoDB server:
   ```bash
   net start MongoDB
   ```

#### On Mac

1. Install MongoDB using Homebrew:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
2. Start the MongoDB service:
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```
3. Verify the installation:
   ```bash
   mongod --version
   ```

#### On Ubuntu

1. Import the MongoDB public GPG key:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```
2. Create a MongoDB source list file:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```
3. Update the package database:
   ```bash
   sudo apt update
   ```
4. Install MongoDB:
   ```bash
   sudo apt install -y mongodb-org
   ```
5. Start the MongoDB service:
   ```bash
   sudo systemctl start mongod
   ```
6. Verify the installation:
   ```bash
   mongod --version
   ```

---

## Running the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```bash
   cd news-platform/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the MongoDB server (if not already running):

   ```bash
   # Windows
   net start MongoDB

   # Mac
   brew services start mongodb/brew/mongodb-community

   # Ubuntu
   sudo systemctl start mongod
   ```

5. Seed the database (optional):
   ```bash
   npm run seed
   ```
6. Start the backend server:
   ```bash
   npm start
   ```
7. The server will run on `http://localhost:5000` by default.

---

## API Documentation

### Articles

- `GET /api/articles`: Fetch all articles.
- `GET /api/articles/:id`: Fetch an article by ID.
- `POST /api/articles`: Create a new article.
- `PUT /api/articles/:id`: Update an article by ID.
- `DELETE /api/articles/:id`: Delete an article by ID.
- `GET /api/articles/filter`: Filter articles by category, author, tags, or type.

### Categories

- `GET /api/categories`: Fetch all categories.
- `POST /api/categories`: Add a new category.
- `PUT /api/categories/:id`: Update a category by ID.
- `DELETE /api/categories/:id`: Delete a category by ID.

### Authors

- `GET /api/authors`: Fetch all authors.
- `GET /api/authors/:id`: Fetch an author by ID.
- `POST /api/authors`: Create a new author.
- `PUT /api/authors/:id`: Update an author by ID.
- `DELETE /api/authors/:id`: Delete an author by ID.

### Tags

- `GET /api/tags`: Fetch all tags.
- `POST /api/tags`: Add a new tag.
- `DELETE /api/tags/:id`: Delete a tag by ID.

---

## Testing

The backend includes unit and integration tests for controllers, services, and models.

### Run Tests

To run all tests:

```bash
npm test
```

### Test Coverage

- **Controllers**: Tests for handling HTTP requests and responses.
- **Services**: Tests for business logic and database interactions.
- **Models**: Tests for schema validation and database operations.

---

## Database Seeding

To seed the database with initial data:

```bash
npm run seed
```

This will populate the database with sample categories, articles, and authors.

---

## Environment Variables

Create a `.env` file in the `backend` directory to configure environment variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/news-platform
```

---

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

---

## License

This project is licensed under the MIT License.
