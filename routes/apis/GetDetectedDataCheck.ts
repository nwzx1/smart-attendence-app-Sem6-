import { Database } from "bun:sqlite";
import Papa from 'papaparse';  // CSV parser library

export default async (c: any, db: Database) => {
    const filePath = 'assets/data/detectedData.csv';  // Ensure the file exists on the server

    // Read the CSV file
    const fileContent = await Bun.file(filePath).text();

    // Parse the CSV into JSON using PapaParse
    const parsedData = Papa.parse(fileContent, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Skip empty lines
    });

    0

    // Send the parsed JSON as a response
    return c.json(parsedData.data);

};





