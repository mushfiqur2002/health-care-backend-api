import { loadEnvFile } from "node:process";
import app from "./app";

loadEnvFile()

const port = process.env.PORT

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});