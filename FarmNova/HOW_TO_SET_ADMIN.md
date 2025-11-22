# How to Set a User as Admin in MongoDB

## Using MongoDB Compass (GUI)
1. Open MongoDB Compass and connect to your database (e.g., `mongodb://localhost:27017`).
2. Select your database (e.g., `farmnova`).
3. Click on the `farmers` collection.
4. Find the user you want to make admin (search by username or email).
5. Click the "Edit" button (pencil icon) for that user.
6. Add or change the `role` field to `"admin"` (as a string).
7. Click "Update" to save.

## Using Mongo Shell
1. Open your terminal and run:
   ```
   mongosh
   ```
2. Switch to your database:
   ```
   use farmnova
   ```
3. Update the user's role:
   ```
   db.farmers.updateOne(
     { username: "youradminusername" },
     { $set: { role: "admin" } }
   )
   ```
4. Exit the shell:
   ```
   exit
   ```

**After this, log in as that user and you will have admin access.**
