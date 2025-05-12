# **Smart Crop Disease Prediction and Monitoring System (Farmsense)**

## **Description**

This system helps farmers detect crop diseases early by using AI-based image recognition and expert analysis. Farmers can upload images of affected crops, receive disease predictions, and get recommendations for treatment. The system also allows administrators and researchers to manage cases and improve prediction accuracy over time.

## **Features**

- Farmer registration and authentication
- Image-based crop disease prediction
- Issue reporting to agricultural centers
- Task assignment for field agents
- Research-based disease analysis and recommendations
- Admin panel for monitoring and managing the system

## **Project Setup**

### **Client Setup**

Navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```

### **Server Setup**

Navigate to the root directory:

```bash
cd ..
npm install
npm run dev
```

### **Mobile Setup**

Navigate to the "mobileapp" directory:

```bash
cd mobileapp
npm install
npm start
npm run android
```

### **Environment Variables**

To run the project, you need to set up the following environment variables in a `.env` file in the root directory:

- `PORT`: The port on which the server will run (default: 5050)
- `MONGO_URI`: The MongoDB connection string for the database
- `MAILTRAP_CLIENT`: The Mailtrap client URL for email services
- `MAILTRAP_API_KEY`: The API key for Mailtrap to send emails
