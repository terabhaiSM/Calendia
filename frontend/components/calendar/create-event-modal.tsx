"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  selectedSlot: { day: string; time: string } | null;
  onCreateEvent: (eventData: any) => void;
}

export function CreateEventModal({
  open,
  onClose,
  selectedSlot,
  onCreateEvent,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    attendees: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateEvent({
      ...formData,
      day: selectedSlot?.day,
      startTime: selectedSlot?.time,
      endTime: incrementHour(selectedSlot?.time || ""),
      id: Math.random().toString(),
    });
    onClose();
  };

  const incrementHour = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    return `${(hour + 1).toString().padStart(2, "0")}:00`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Selected Time</Label>
            <div className="text-sm text-muted-foreground">
              {selectedSlot?.day} at {selectedSlot?.time}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees</Label>
            <Input
              id="attendees"
              placeholder="Comma separated email addresses"
              value={formData.attendees}
              onChange={(e) =>
                setFormData({ ...formData, attendees: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}