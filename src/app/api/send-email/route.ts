import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with your API key
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error("SENDGRID_API_KEY is not set in environment variables");
}
sgMail.setApiKey(apiKey || "");

// In-memory storage for booked appointments (in production, use a database)
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

// Function to add a new booking to the calendar
function addBookingToCalendar(
  date: string,
  time: string,
  duration: number,
  customerName: string,
  customerEmail: string,
  service: string
): boolean {
  if (!isTimeSlotAvailable(date, time, duration)) {
    return false;
  }

  const bookingId = `${date}-${time}-${customerName.replace(/\s+/g, "-")}`;

  bookedAppointments.push({
    id: bookingId,
    date,
    time,
    duration,
    customerName,
    customerEmail,
    service,
  });

  console.log(
    `Booking added to calendar: ${date} at ${time} for ${customerName}`
  );
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      service,
      date,
      time,
      addOns,
      totalPrice,
      customerName,
      customerEmail,
      duration,
      notes,
      paymentOption,
    } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the time slot is available
    const appointmentDuration = duration || 60; // Default to 60 minutes if not specified
    if (!isTimeSlotAvailable(date, time, appointmentDuration)) {
      return NextResponse.json(
        {
          error:
            "This time slot is no longer available. Please select a different time.",
        },
        { status: 409 }
      );
    }

    // Add booking to calendar
    const bookingAdded = addBookingToCalendar(
      date,
      time,
      appointmentDuration,
      customerName,
      customerEmail,
      service
    );

    if (!bookingAdded) {
      return NextResponse.json(
        { error: "Failed to book appointment. Please try again." },
        { status: 500 }
      );
    }

    // Get the sender email from environment variables
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    if (!fromEmail) {
      console.error("SENDGRID_FROM_EMAIL is not set in environment variables");
      return NextResponse.json(
        { error: "Email configuration error" },
        { status: 500 }
      );
    }

    // Create the email content with improved formatting
    const msg = {
      to: customerEmail,
      cc: "needleandkneadservices@gmail.com",
      from: {
        email: fromEmail,
        name: "Needle & Knead Massage Studio",
      },
      subject: "Booking Confirmation - Needle & Knead Massage",
      text: `
Dear ${customerName},

Thank you for booking your massage appointment with Needle & Knead!

BOOKING DETAILS:
================
Service: ${service}
Date: ${date}
Time: ${time}
Duration: ${appointmentDuration} minutes
${addOns.length > 0 ? `Add-ons: ${addOns.join(", ")}` : ""}
Total Price: $${totalPrice}
Payment: ${paymentOption === "now" ? "Paid Now" : "Pay After Service"}
${notes ? `Additional Notes: ${notes}` : ""}

We look forward to providing you with an exceptional massage experience.

If you need to make any changes to your appointment, please contact us as soon as possible.

IMPORTANT: To ensure you receive future booking confirmations and updates, please add ${fromEmail} to your email contacts or address book.

Best regards,
The Needle & Knead Team
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #92400e; margin: 0; font-size: 24px;">Needle & Knead</h1>
              <p style="color: #666; margin: 5px 0;">Massage Studio</p>
            </div>
            
            <h2 style="color: #92400e; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">Booking Confirmation</h2>
            
            <p>Dear ${customerName},</p>
            
            <p>Thank you for booking your massage appointment with us! We're excited to provide you with an exceptional experience.</p>
            
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin-top: 0; color: #92400e;">Appointment Details</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Duration:</strong> ${appointmentDuration} minutes</p>
              ${
                addOns.length > 0
                  ? `<p><strong>Add-ons:</strong> ${addOns.join(", ")}</p>`
                  : ""
              }
              <p><strong>Total Price:</strong> $${totalPrice}</p>
              <p><strong>Payment:</strong> ${
                paymentOption === "now" ? "Paid Now" : "Pay After Service"
              }</p>
              ${
                notes
                  ? `<p><strong>Additional Notes:</strong> ${notes}</p>`
                  : ""
              }
            </div>
            
            <p>We look forward to seeing you for your appointment!</p>
            
            <p>If you need to make any changes to your appointment, please contact us as soon as possible.</p>
            
            <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 4px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #0369a1;">
                <strong>📧 Email Delivery Tip:</strong> To ensure you receive future booking confirmations and updates, please add <strong>${fromEmail}</strong> to your email contacts or address book. This helps prevent our emails from going to your spam folder.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0;"><strong>Best regards,</strong><br>The Needle & Knead Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Mailer": "Needle & Knead Booking System",
      },
      categories: ["booking-confirmation", "massage-appointment"],
      customArgs: {
        type: "booking-confirmation",
        customer: customerName,
      },
    };

    // Send the email
    const emailResponse = await sgMail.send(msg);
    console.log("SendGrid response:", emailResponse);

    return NextResponse.json(
      {
        message: "Booking confirmed and email sent successfully",
        bookingId: `${date}-${time}-${customerName.replace(/\s+/g, "-")}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing booking:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    return NextResponse.json(
      { error: "Failed to process booking. Please try again later." },
      { status: 500 }
    );
  }
}
