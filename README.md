# APP Tasks - Django + React

This project includes a backend built with Django + Django REST Framework and a frontend developed using React with Vite.

## **Prerequisites**

Make sure you have the following installed on your system:

- **Python** (version 3.10 or higher): [Download Python](https://www.python.org/)
- **Node.js** (version 16 or higher): [Download Node.js](https://nodejs.org/)
- **PostgreSQL** (if not using Docker): [Download PostgreSQL](https://www.postgresql.org/)
- **npm** or **yarn**: Included with Node.js.
- **Docker** to run the database in containers.

### Clone the repository:

```bash
git clone https://github.com/jesusrafaell/tasks-django-react.git
cd tasks-django-react
```

## Backend Setup

1. Navigate to the frontend directory:

   ```bash
   cd api-task
   ```

2. Create a virtual environment and install dependencies:

   ```bash
   python -m venv env
   source env/bin/activate
   # or
   .\env\Scripts\activate

   pip install -r requirements.txt
   ```

3. Check environment variables: `.env` file in the `api-task/` directory with the following content:

   ```plaintext
   DEBUG=True
   DB_NAME=task_app
   DB_USER=userdb
   DB_PASSWORD=passworddb
   DB_HOST=localhost
   DB_PORT=5432
   ```

4. Running the Database with Docker Compose:

   If you need to set up the PostgreSQL database, use the provided `docker-compose.yml` file.

   - Navigate to the `api-task/` directory of the project where the `docker-compose.yml` file is located.

   - Run the following command to start the database:

   ```bash
   docker-compose up -d
   ```

5. Apply database migrations:

   Run the following command to apply migrations to the database:

   ```bash
   python manage.py migrate
   ```

6. Start the development server:

   To start the Django development server, use:

   ```bash
   python manage.py runserver
   ```

   By default, the server will be accessible at:

   ```
   http://127.0.0.1:8000
   ```

## Frontend

### **Prerequisites**

1. Navigate to the frontend directory:

   ```bash
   cd task-app
   ```

2. Install the required dependencies:

   ```bash
   npm install

   # or

   yarn install
   ```

## **Run in Development**

To start the Vite development server:

```bash
npm run dev

# or if you use Yarn

yarn dev
```

This will run the development server on the default port, usually [http://localhost:3000](http://localhost:3000).

## **Build for Production**

To generate a production-ready build:

```bash
npm run build

# or if you use Yarn

yarn build
```

## **Customization**

If you need to customize the server or ports:

1. Edit the `vite.config.ts` file.
2. Modify the port configuration or any additional options as needed.
