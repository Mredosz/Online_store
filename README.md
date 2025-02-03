# Online Store

## Overview
Online Store is a full-stack e-commerce application built using **React (frontend)** and **Express.js with MongoDB (backend)**. The project provides a seamless shopping experience, featuring user authentication, product browsing, cart management, and order processing.

## Features
- User authentication (registration, login, JWT authentication)
- Product listing and search functionality
- Shopping cart with item quantity management
- Order processing and checkout
- Admin panel for managing products and orders
- Responsive design for mobile and desktop

## Tech Stack
### Frontend
- React (Vite)
- Redux Toolkit for state management
- React Query for API data fetching
- Tailwind CSS for styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- Nodemailer for email notifications

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- **Node.js**: v18+
- **MongoDB**: v6+

### Backend Setup
```sh
# Clone the repository
git clone https://github.com/Mredosz/Online_store.git

# Navigate to the backend directory
cd Online_store/backend

# Install dependencies
npm install

# Create a .env file and configure the following variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MailTrapUser=your_mailtrap_username
MailTrapPass=your_mailtrap_password

# Start the backend server
npm run dev
```

### Mongo Setup
```sh
# Navigate to the docker directory
cd Online_store/backend/docker

# Start the Mongo
docker-compose up -d
```

### Frontend Setup
```sh
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```

The frontend will be available at `http://localhost:5173`, and the backend API at `http://localhost:3000`.

## API Endpoints
### Authentication
| Method | Endpoint           | Description           |
|--------|-------------------|-----------------------|
| GET    | /account/logout   | Logout user          |
| POST   | /account/register | Register a new user  |
| POST   | /account/login    | Login user & get JWT |

### Products
| Method | Endpoint                        | Description                        |
|--------|--------------------------------|------------------------------------|
| GET    | /products                      | Get all products                  |
| GET    | /products/recommended/:productId | Get recommended products          |
| GET    | /products/:productId           | Get a single product              |
| POST   | /products/filter               | Filter and sort products          |
| POST   | /products                      | Create a product (Admin)          |
| PUT    | /products/:productId           | Update a product (Admin)          |
| DELETE | /products/:productId           | Delete a product (Admin)          |

### Reviews
| Method | Endpoint                        | Description                        |
|--------|--------------------------------|------------------------------------|
| GET    | /review                        | Get all reviews                   |
| GET    | /review/:productId             | Get all reviews for a product     |
| POST   | /review/:productId             | Add a review                      |
| PUT    | /review/:reviewId              | Accept a review                   |
| DELETE | /review/:reviewId              | Delete a review                   |

### Cart
| Method | Endpoint     | Description            |
|--------|-------------|------------------------|
| GET    | /cart       | Get user's cart        |
| POST   | /cart       | Add item to cart       |
| DELETE | /cart/:id   | Remove item from cart  |
| DELETE | /cart       | Remove entire cart     |

### Orders
| Method | Endpoint          | Description                 |
|--------|------------------|-----------------------------|
| GET    | /order           | Get all orders              |
| GET    | /order/reports   | Get order reports           |
| GET    | /order/:orderId  | Get order details           |
| POST   | /order           | Create a new order          |
| PUT    | /order/:orderId  | Change order status         |

### Categories
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| GET    | /category       | Get all categories           |
| GET    | /category/:id   | Get a single category        |
| POST   | /category       | Add a new category (Admin)   |
| PUT    | /category/:id   | Update a category (Admin)    |
| DELETE | /category/:id   | Delete a category (Admin)    |

### Users
| Method | Endpoint      | Description              |
|--------|--------------|--------------------------|
| GET    | /user        | Get all users (Admin)    |
| PUT    | /user        | Update user details      |
| DELETE | /user/:id    | Delete a user (Admin)    |

## License
This project is open-source under the MIT license.
