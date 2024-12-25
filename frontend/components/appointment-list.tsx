"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, RotateCcw, XCircle } from "lucide-react";

const appointments = [
  {
    id: 1,
    date: "2024-03-20",
    time: "10:00",
    invitee: "John Doe",
    email: "john@example.com",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "2024-03-21",
    time: "14:30",
    invitee: "Jane Smith",
    email: "jane@example.com",
    status: "Cancelled",
  },
];

export function AppointmentList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Invitee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>
              <div>
                <div>{appointment.invitee}</div>
                <div className="text-sm text-muted-foreground">{appointment.email}</div>
              </div>
            </TableCell>
            <TableCell>{appointment.status}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="ghost" size="icon" title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Reschedule">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Cancel">
                <XCircle className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}