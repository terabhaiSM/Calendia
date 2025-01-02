"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Copy, Link, Pencil, Trash } from "lucide-react";

const bookingLinks = [
  {
    id: 1,
    name: "30 Min Meeting",
    url: "https://cal.com/john/30min",
    bookings: 24,
  },
  {
    id: 2,
    name: "60 Min Consultation",
    url: "https://cal.com/john/60min",
    bookings: 12,
  },
];

export function BookingLinksList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookingLinks.map((link) => (
        <Card key={link.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4" />
              <h3 className="font-semibold">{link.name}</h3>
            </div>
            <div className="space-x-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground truncate">
              {link.url}
            </div>
            <div className="mt-2 text-lg font-semibold">
              {link.bookings} bookings
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full gap-2">
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}