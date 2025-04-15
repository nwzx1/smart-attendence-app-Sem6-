import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";




export default function Dropped() {
    return (
        <div className=" w-full h-full ">
            <TopBox />
            <DataTables />
        </div>
    )
}


function TopBox() {
    return <div className=" w-full h-12 flex justify-between pl-3 pr-3">
        Records of Present Students
    </div>

}

type TableRowData = {
    id: string;
    parent_name: string;
    parent_email: string;
    parent_phone_number: string;
    parent_pickup_code: string;
    child_name: string;
    timestamp: string;
    parent_img_url: string;
    child_img_url: string;
};

function DataTables() {


    const [data, setData] = useState<TableRowData[]>([]); // State for table data
    const [loading, setLoading] = useState<boolean>(true); // State for loading
    const [error, setError] = useState<string | null>(null); // State for error

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/records/status/1"); // Fetch data from API
                setData(response.data); // Update state with fetched data
                setLoading(false); // Set loading to false
            } catch (err) {
                setError("Failed to fetch data. Please try again later."); // Handle errors
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show loading message
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Show error message
    }


    return (
        <Table>
            <TableCaption>A list of parent and child information</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>UIN Code</TableHead>
                    <TableHead>Class teacher Name</TableHead>
                    <TableHead>Timestamp</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={index} className=" cursor-pointer">
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.parent_name}</TableCell>
                        <TableCell>{row.parent_email}</TableCell>
                        <TableCell>{row.parent_phone_number}</TableCell>
                        <TableCell>{row.parent_pickup_code}</TableCell>
                        <TableCell>{row.child_name}</TableCell>
                        <TableCell>{row.timestamp}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

