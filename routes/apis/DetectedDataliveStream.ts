import csvParse from 'csv-parser';
import fs from 'fs';
import { Readable } from 'stream';

export default (c: any) => {
    const filePath = 'assets\\data\\detectedData.csv'; // Specify your CSV file path here

    const readStream = fs.createReadStream(filePath);
    const parser = csvParse();

    // Pipe the file to the CSV parser and then to the response
    readStream.pipe(parser);

    // Convert the parser into a stream that Hono can use
    const responseStream = new Readable({
        async read() {
            parser.on('data', (row) => {
                this.push(JSON.stringify(row) + '\n'); // Convert row to JSON or any format you need
            });
            parser.on('end', () => {
                this.push(null); // End the stream
            });
        },
    });

    // Delay the response by 4000 milliseconds (4 seconds)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(c.body(responseStream));
        }, 4000);
    });
};
