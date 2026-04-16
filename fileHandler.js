// Import Some Build-in Module.
import fs from 'fs/promises';
// Store .json file path.
export const filePath = './tasks.json';
// Check if file exists, create if it doesn't
try {
    await fs.access(filePath);
} catch {
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
}
// Opne file here.
export const fileContent = await fs.readFile(filePath, 'utf8');
