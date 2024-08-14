import express from 'express';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// Define the folder path where text files will be stored
const folderPath = path.join(__dirname, 'TimeStamp');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// a. Create an API endpoint to create a text file with the current timestamp
app.get('/write-file', (req, res) => {
  // Format the current date and time
  const today = format(new Date(), 'dd-MM-yyyy-HH-mm-ss');
  console.log("today:", today);

  // Define the file path and name
  const filepath = path.join(folderPath, `${today}.txt`);

  // Write the timestamp to the file
  fs.writeFileSync(filepath, today, 'utf8');

  // Send a success message with the filename
  res.status(200).send(`File created: ${today}.txt`);
});

// b. Create an API endpoint to retrieve all text files in the folder
app.get('/read-files', (req, res) => {
  // Read the contents of the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files');
    }

    // Send the list of files as the response
    res.status(200).json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
