# SOIA Back-End

- This is the back-end of the **SOIA Project**

- ### [Visit the project homepage](https://soia.home.kg)

## Features

- **API Endpoints**: Provides data and functionality to the front end.
- **Authentication**: Secure authentication using **JWT**.
- **Data Validation**: Input validation with **Celebrate**.
- **Rate Limiting**: Protects against brute-force attacks with **express-rate-limit**.
- **Secure Headers**: Enhanced security with **Helmet**.
- **Cloud Storage Integration**: Handles file storage and retrieval using **Google Cloud Storage**.
- **Logging**: Centralized logging with **Winston** and **express-winston**.

## Technologies Used

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Framework for building robust API services.
- **MongoDB**: Database for storing and managing data.
- **Mongoose**: ODM for MongoDB, enabling schema-based solutions.
- **Celebrate**: Validation middleware for ensuring robust API requests.
- **Google Cloud Storage**: Handles file management.
- **Helmet**: Adds security-related HTTP headers to Express apps.
- **Winston**: Logging library for monitoring server activity.

## Installation

### Prerequisites

- **Node.js**
- **npm**
- **MongoDB** (running instance or access to a remote MongoDB server)
- **Google Key**: For accessing the public Google Cloud bucket, you need to configure your own Google credentials. See the [Google Cloud Configuration](#google-cloud-configuration) section below for setup details.

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Bree-Mass/soia_backend.git

   ```

2. Navigate to the project directory:

   ```bash
   cd soia_backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a .env file in the root of the project and add the following variables:

   ```bash
   BEARER_TOKEN=Create your own token
   CAMPAIGN_ID=10874905
   JWT_SECRET=Create your own Secret
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-file.json
   MONGODB_URI=mongodb://127.0.0.1:27017/soia_db
   PORT=3001
   ```

5. **Start MongoDB** (If you don't have it running locally, follow these steps):

   - Ensure you have MongoDB installed on your system. If not, [install MongoDB](https://www.mongodb.com/try/download/community).

   - Create the database directory:
     (choose the location of your database)

     ```bash
     mkdir c:\data\soia_db
     ```

   - Run MongoDB with the following command:

     (your paths may differ depending on where it is installed)

     ```bash
     "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="c:\data\soia_db"
     ```

     This should connect you to the MongoDB shell if it's running correctly.

6. Run the development server:

   ```bash
   npm run dev
   ```

7. Proceed with instructions on [SOIA Front-End](https://github.com/Bree-Mass/soia_frontend/blob/main/README.md).

### Google Cloud Configuration

The project uses a Google Cloud Storage bucket to manage assets. Although the bucket is public, authentication is required to access its contents. Follow these steps to set up your credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or use an existing service account.
3. Download the service account key file in JSON format.
4. For safety, place your **google-key.json** _outside_ of the root directory.
5. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of your key file:

   ```bash
   GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
   ```

**Note**:
Be sure not to expose your service account key file.
