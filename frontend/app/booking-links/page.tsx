"use client";

import { BookingLinksList } from "@/components/booking-list";

export default function BookingLinksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Links</h1>
        <p className="text-muted-foreground">
          Manage your booking links and track their performance.
        </p>
      </div>

      <BookingLinksList />
    </div>
  );
}