import { NextResponse } from "next/server";

// Import the same booking logic from send-email route
// In a real app, this would be in a shared module
const AVAILABLE_HOURS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

// In-memory storage for booked appointments (in production, use a database)
// This should be shared with the send-email route
const bookedAppointments: Array<{
  id: string;
  date: string;
  time: string;
  duration: number;
  customerName: string;
  customerEmail: string;
  service: string;
}> = [];

// Function to check if a time slot is available
function isTimeSlotAvailable(
  date: string,
  time: string,
  duration: number
): boolean {
  const appointmentStart = new Date(`${date} ${time}`);
  const appointmentEnd = new Date(
    appointmentStart.getTime() + duration * 60 * 1000
  );

  // Add buffer time (90 minutes before and after for travel and setup)
  const bufferTime = 90 * 60 * 1000; // 90 minutes in milliseconds
  const slotStart = new Date(appointmentStart.getTime() - bufferTime);
  const slotEnd = new Date(appointmentEnd.getTime() + bufferTime);

  // Check against existing appointments
  for (const appointment of bookedAppointments) {
    if (appointment.date === date) {
      const existingStart = new Date(`${appointment.date} ${appointment.time}`);
      const existingEnd = new Date(
        existingStart.getTime() + appointment.duration * 60 * 1000
      );
      const existingBufferStart = new Date(
        existingStart.getTime() - bufferTime
      );
      const existingBufferEnd = new Date(existingEnd.getTime() + bufferTime);

      // Check for overlap
      if (slotStart < existingBufferEnd && slotEnd > existingBufferStart) {
        return false;
      }
    }
  }

  return true;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const duration = parseInt(searchParams.get("duration") || "60");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Check each available time slot
    const availableTimes = AVAILABLE_HOURS.filter((time) =>
      isTimeSlotAvailable(date, time, duration)
    );

    return NextResponse.json({
      date,
      duration,
      availableTimes,
      allTimes: AVAILABLE_HOURS,
    });
  } catch (error) {
    console.error("Error getting available times:", error);
    return NextResponse.json(
      { error: "Failed to get available times" },
      { status: 500 }
    );
  }
}
