import fs from "node:fs/promises";

const filePath = "userData.json";

// Create file
async function createFile(content) {
    try {
        await fs.writeFile(filePath, content);
        console.log("File created successfully");
    } catch (error) {
        console.log("Error creating file:", error);
    }
}

// Read file
async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        console.log(data);
    } catch (error) {
        console.log("Error reading file:", error);
    }
}

// Update file
async function updateFile(content) {
    try {
        await fs.writeFile(filePath, content);
        console.log("File updated successfully");
    } catch (error) {
        console.log("Error updating file:", error);
    }
}

// Delete file
async function deleteFile() {
    try {
        await fs.unlink(filePath);
        console.log("File deleted successfully");
    } catch (error) {
        console.log("Error deleting file:", error);
    }
}

// Calling functions
await createFile("Hello World 121   .Welcome to the backend Programming");

await readFile();

await updateFile("Hello JavaScript");

await readFile();

await deleteFile();