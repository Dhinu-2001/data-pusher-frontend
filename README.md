# React (Vite) & Django Project

This repository contains a full-stack web application with a **React (Vite) frontend** and a **Django backend**.

## **Getting Started**

Follow these steps to set up the project locally.

---

## **Frontend (React + Vite)**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/Dhinu-2001/data-pusher-frontend.git
   cd your-repo/frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

### **Configuration**
- The frontend expects the backend API to run at `http://127.0.0.1:8000/`.
- To change the API URL, update the `.env` file:
  ```sh
  VITE_API_URL=http://127.0.0.1:8000/api/
  ```

---

## **Backend (Django + Django REST Framework)**

### **Prerequisites**
- [Python 3](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)
- [virtualenv](https://virtualenv.pypa.io/)

### **Setup**
1. Navigate to the backend folder:
   ```sh
   cd ../backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply database migrations:
   ```sh
   python manage.py migrate
   ```
5. Start the development server:
   ```sh
   python manage.py runserver
   ```
6. The backend will be running at:
   ```
   http://127.0.0.1:8000/
   ```

### **Environment Variables**
- Create a `.env` file in the `backend` folder and configure the following:
  ```sh
  SECRET_KEY=your_secret_key
  DEBUG=True
  ALLOWED_HOSTS=*
  DATABASE_NAME=mydb
  DATABASE_USER=myuser
  DATABASE_PASSWORD=mypassword
  DATABASE_HOST=localhost
  DATABASE_PORT=5432

  CORS_ALLOWED_ORIGINS=http://localhost:5173,
  CSRF_TRUSTED_ORIGINS=http://localhost:5173,
  ```

### **API Documentation (Optional)**
If you're using Django REST Framework, you can access API docs at:
```
http://127.0.0.1:8000/api/
```

---

## **Running the Full Stack App**
1. Start the Django backend.
2. Start the React frontend.
3. Open `http://localhost:5173` in your browser.

---

## **Deployment**
### **Frontend (Vercel)**
1. Push your frontend code to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Select **Vite** as the framework.
4. Deploy!

### **Backend (Render/Heroku)**
1. Push your backend code to GitHub.
2. Use [Render](https://render.com/) or [Heroku](https://www.heroku.com/) to deploy.
3. Configure environment variables in the hosting platform.
4. Deploy!

---

## **Contributing**
Feel free to fork this repo and submit pull requests!

---

