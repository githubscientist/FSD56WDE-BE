# Backend Application Repository

This repository contains the backend application for the [Frontend Application Repository]().

Backend application is a RESTful API built with Node.js and Express.js. It uses MongoDB as the database.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
   - `MONGODB_URI`: MongoDB connection string
   - `PORT`: Port number for the server
4. Run `npm run dev` to start the server

## API Endpoints

### Users

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user
- `GET /api/users/profile`: Get the user profile
- `PUT /api/users/profile`: Update the user profile
- `DELETE /api/users/profile`: Delete the user profile
- `GET /api/users/logout`: Logout the user

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Libraries Used

- mongoose: MongoDB object modeling tool. It is used to interact with MongoDB database. We use this instead of mongodb driver because it provides a simple schema-based solution to model our application data.
