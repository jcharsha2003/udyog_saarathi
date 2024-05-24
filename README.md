**Udyog Saarathi Application Deployment Guide**

This guide offers a straightforward walkthrough to deploy the Udyog Saarathi application. It includes setup instructions for both client and server folders, as well as running the application.

### Pre-Installation Steps

1. **Replace MongoDB Credentials:**
   - Navigate to the server folder and replace the MongoDB credentials in the `.env` file with your own.

### Installation Steps

**Client Folder (Frontend):**

1. **Install Dependencies:**
   - Open a terminal.
   - Change directory to the client folder.
   ```
   cd client
   npm install
   ```

**Server Folder (Backend):**

2. **Install Dependencies:**
   - Open a terminal.
   - Change directory to the server folder.
   ```
   cd server
   npm install
   ```

### Running the Application

3. **Start the Server:**
   - In the server folder terminal:
   ```
   nodemon app.js
   ```

4. **Start the Client:**
   - In the client folder terminal:
   ```
   npm start
   ```

### Post-Installation Steps

- Once both the client and server are running, you can access the Udyog Saarathi application.

**Note:**
- Ensure MongoDB credentials are replaced before running the application.
- For the server side, run `nodemon app.js`.
- For the client side, run `npm start`.
- This guide simplifies the deployment process for a smooth setup experience.

By following these steps, you can deploy and run the Udyog Saarathi application effortlessly.
