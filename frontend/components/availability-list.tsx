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
import { Edit2, Trash2 } from "lucide-react";

const availabilityRules = [
  {
    id: 1,
    days: ["Monday", "Wednesday", "Friday"],
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    id: 2,
    days: ["Tuesday", "Thursday"],
    startTime: "10:00",
    endTime: "18:00",
  },
];

export function AvailabilityList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Days</TableHead>
          <TableHead>Time Range</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availabilityRules.map((rule) => (
          <TableRow key={rule.id}>
            <TableCell>{rule.days.join(", ")}</TableCell>
            <TableCell>
              {rule.startTime} - {rule.endTime}
            </TableCell>
            <TableCell className="space-x-2">
              <Button variant="ghost" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}