"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface Event {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

interface EventDetailsModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export function EventDetailsModal({ event, open, onClose }: EventDetailsModalProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.day}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{event.attendees.join(", ")}</span>
            </div>
          )}

          {event.description && (
            <div className="pt-4 text-sm text-muted-foreground">
              {event.description}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}