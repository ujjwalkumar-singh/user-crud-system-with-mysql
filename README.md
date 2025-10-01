# user-crud-system-with-sql

A simple Node.js and Express web application that implements CRUD (Create, Read, Update, Delete) operations for user management using a MySQL database.

## Features

- **Create**: Add new users with unique username and email.
- **Read**: View all users and user details.
- **Update**: Edit user information securely with password verification.
- **Delete**: Remove users from the database with email and password confirmation.

## Technologies Used

- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templates)
- method-override (for HTTP verbs support)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/user-crud-system-with-sql.git
   cd user-crud-system-with-sql
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MySQL**
   - Create a database named `delta`.
   - Run the SQL script in `schema.sql` to create the `user` table.

4. **Update database credentials**
   - Edit `index.js` and set your MySQL username and password.

5. **Start the server**
   ```bash
   node index.js
   ```

6. **Access the app**
   - Open [http://localhost:8000](http://localhost:8000) in your browser.

## Folder Structure

- `index.js` - Main application file
- `views/` - EJS templates for rendering pages
- `schema.sql` - SQL script for database schema

