# Needle & Knead - Massage Studio Website

A modern, responsive website for Needle & Knead massage studio built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern and clean user interface with sophisticated animations
- Service showcase with detailed pricing
- Online booking system with real-time availability
- Stripe payment integration for secure transactions
- Email confirmations with SendGrid
- Add-ons and enhancements selection
- Contact information and business hours
- Instagram social media integration

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/knead-n-needles.git
cd knead-n-needles
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_email@example.com

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

4. Set up Stripe:

   - Create a Stripe account at [stripe.com](https://stripe.com)
   - Get your API keys from the Stripe Dashboard
   - Replace the placeholder keys in `.env.local` with your actual keys
   - For testing, use Stripe's test keys (they start with `sk_test_` and `pk_test_`)

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
knead-n-needles/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── package.json
└── README.md
```

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS 4
- TypeScript
- Stripe (Payment Processing)
- SendGrid (Email Service)
- Lucide React (Icons)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# knead-n-needles

# knead-n-needles

# knead-n-needles

# knead-n-needles

# massage-studio
