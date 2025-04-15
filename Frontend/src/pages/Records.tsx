import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import axios from "axios";

import { PlusSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Link } from "react-router-dom";

export default function Records() {
  return (
    <div className=" w-full h-full ">
      <TopBox />
      <DataTables />
    </div>
  );
}

function TopBox() {
  return (
    <div className=" w-full h-12 flex justify-between pl-3 pr-3">
      Records
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="">
            <PlusSquare /> New
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Click "Continue" if You'r fine</AlertDialogTitle>
            <AlertDialogDescription>
              This will create new entry to the Record Table
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link to="/Records/AddNew">Continue</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// // Example usage:
// const data = [
//     {
//         id: "1",
//         parent_name: "John Doe",
//         parent_email: "john.doe@example.com",
//         parent_phone_number: "123-456-7890",
//         parent_pickup_code: "ABC123",
//         child_name: "Jane Doe",
//         timestamp: "2025-01-23 10:00 AM",
//         parent_img_url: "https://via.placeholder.com/50",
//         child_img_url: "https://via.placeholder.com/50",
//     },
//     {
//         id: "2",
//         parent_name: "Sarah Smith",
//         parent_email: "sarah.smith@example.com",
//         parent_phone_number: "987-654-3210",
//         parent_pickup_code: "XYZ456",
//         child_name: "Tom Smith",
//         timestamp: "2025-01-23 11:00 AM",
//         parent_img_url: "https://via.placeholder.com/50",
//         child_img_url: "https://via.placeholder.com/50",
//     },
// ];

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
  const ref0 = useRef(null) as any;

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/records"); // Fetch data from API
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
          <TableRow
            key={index}
            className=" cursor-pointer"
            onClick={() => {
              ref0.current?.click();
            }}
          >
            <Drawer>
              <DrawerTrigger
                ref={ref0}
                className=" hidden w-0 h-0"
              ></DrawerTrigger>
              <DrawerContent>
                <TableRow>
                  <TableCell>Child name</TableCell>
                  <TableCell>{row.child_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parent name</TableCell>
                  <TableCell>{row.parent_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parent email</TableCell>
                  <TableCell>{row.parent_email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parent name</TableCell>
                  <TableCell>{row.parent_phone_number}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parent pickup code</TableCell>
                  <TableCell>{row.parent_pickup_code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parent image</TableCell>
                  <TableCell>
                    <div className=" w-10 h-10">
                      <img src={row.parent_img_url} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parent image</TableCell>
                  <TableCell>
                    <div className=" w-10 h-10">
                      <img src={row.parent_img_url} />
                    </div>
                  </TableCell>
                </TableRow>
              </DrawerContent>
            </Drawer>

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
