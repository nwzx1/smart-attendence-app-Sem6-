import { Button } from "@/components/ui/button";
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

export default function LiveStatus() {
  const [on, setOn] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const detected = await axios.get("/api/getrowstatus");
      let detectedfinaldata = []
      for (const i of detected.data) {
        // setData((prev) => [...prev, i]);
        try {
          detectedfinaldata.push(await axios.get(`/api/names?childName=${i.Child_Name}&parentName=${i.Parent_Name}&status=0`))
        } catch (e) {
          console.log(e)
        }
      }
      console.log(detectedfinaldata)
      setData(detectedfinaldata)
    };



    fetchData();
  }, []);

  return (
    <div className=" w-full h-full ">
      <div className=" w-full h-12 flex justify-between pl-3 pr-3">
        Records Attendance
      </div>
      <Table>
        <TableCaption>A list of parent and child information</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Class teacher Name</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className=" cursor-pointer">
              <TableCell>{row.data[0].parent_name}</TableCell>
              <TableCell>{row.data[0].child_name}</TableCell>
              <TableCell>{row.data[0].timestamp}</TableCell>
              <TableCell><Button onClick={(e) => {
                row.data[0].id
                axios.put(`/api/records/${row.data[0].id}?status=1`)
              }}>ok</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
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
