import { loadEnvFile } from "node:process";
import app from "./app";
import { envVars } from "./config/env";

loadEnvFile()

// Start the server
app.listen(envVars.PORT, () => {
    console.log(`Server is running on http://localhost:${envVars.PORT}`);
});