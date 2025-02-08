import mongoose from "mongoose";
// MongoDB Atlas connection string
// const dbURI = 'mongodb+srv://dbUser:password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority';
  const dbURI = 'mongodb://localhost:27017/mydatabase';
// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define a Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a Mongoose Model based on the Schema
const User = mongoose.model('User', userSchema);

// Create and save a new user instance
const newUser = new User({
  name: 'John Doe',
  email: 'john.doe@example.com',
});

newUser.save()
  .then((user) => {
    console.log('User saved:', user);
  })
  .catch((err) => {
    console.error('Error saving user:', err);
  });

