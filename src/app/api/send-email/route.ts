import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with your API key
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error("SENDGRID_API_KEY is not set in environment variables");
}
sgMail.setApiKey(apiKey || "");

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
    } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
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

    // Create the email content
    const msg = {
      to: customerEmail,
      from: fromEmail,
      subject: "Your Massage Booking Confirmation",
      text: `
Dear ${customerName},

Thank you for booking with us! Here are your booking details:

Service: ${service}
Date: ${date}
Time: ${time}
${addOns.length > 0 ? `Add-ons: ${addOns.join(", ")}` : ""}
Total Price: $${totalPrice}

We look forward to seeing you!

Best regards,
Needle & Knead Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">Booking Confirmation</h2>
          <p>Dear ${customerName},</p>
          <p>Thank you for booking with us! Here are your booking details:</p>
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            ${
              addOns.length > 0
                ? `<p><strong>Add-ons:</strong> ${addOns.join(", ")}</p>`
                : ""
            }
            <p><strong>Total Price:</strong> $${totalPrice}</p>
          </div>
          <p>We look forward to seeing you!</p>
          <p>Best regards,<br>Needle & Knead Team</p>
        </div>
      `,
    };

    // Send the email
    const response = await sgMail.send(msg);
    console.log("SendGrid response:", response);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
