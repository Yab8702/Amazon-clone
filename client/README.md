# Amazon-FrontEnd

# Amazon Full Stack Clone

This is a full stack clone of the Amazon website, built using the following technologies:

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: Firebase Firestore
- Payment Method: Stripe

## Features

- User authentication and authorization using Firebase Authentication
- Product listing and search functionality
- Shopping cart and checkout process
- Order history and tracking

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/amazon-clone.git
   ```

2. Install the dependencies for both the frontend and backend:

   ```bash
   cd amazon-clone/client
   npm install

   cd ../server
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the `server` directory and add the following variables:

     ```

     FIREBASE_API_KEY=<your-firebase-api-key>
     FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
     FIREBASE_PROJECT_ID=<your-firebase-project-id>
     FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
     FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
     FIREBASE_APP_ID=<your-firebase-app-id>
     STRIPE_SECRET_KEY=<your-stripe-secret-key>
     STRIPE_PUBLIC_KEY=<your-stripe-public-key>
     ```

4. Start the development server:

   ```bash
   cd ../client
   npm start
   ```

   ```bash
   cd ../server
   npm start
   ```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
