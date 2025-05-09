import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            About Knead & Needles
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Your journey to wellness and healing begins here
          </p>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <video
                src="/images/intro-22.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Studio</h2>
              <p className="text-gray-600 text-lg mb-6">
                Welcome to Knead & Needles, a sanctuary of healing and wellness
                located in the heart of our community. Our studio is designed to
                provide a peaceful and comfortable environment where you can
                escape the stresses of daily life and focus on your well-being.
              </p>
              <p className="text-gray-600 text-lg">
                We combine traditional healing practices with modern techniques
                to offer a comprehensive approach to wellness. Our commitment to
                excellence and personalized care ensures that each client
                receives the attention and treatment they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner/Therapist Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">
                Meet Luis A. Fernandez
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                With over 15 years of experience in massage therapy and
                traditional healing practices, Luis A. Fernandez is a dedicated
                practitioner committed to helping others achieve optimal health
                and wellness. His journey in holistic healing began with a deep
                fascination for the body's natural ability to heal itself.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Luis's expertise spans multiple disciplines, including Swedish
                massage, deep tissue therapy, sports massage, acupuncture, and
                traditional Chinese medicine. He has trained extensively in both
                Eastern and Western healing modalities, allowing him to provide
                a unique and comprehensive approach to treatment.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Certifications & Training:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Licensed Massage Therapist</li>
                  <li>Certified Acupuncturist</li>
                  <li>Sports Massage Specialist</li>
                  <li>Traditional Chinese Medicine Practitioner</li>
                  <li>Reflexology Certification</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src="/images/goku.webp"
                alt="Luis A. Fernandez"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-gray-600 text-lg mb-6">
              At Knead & Needles, we believe in treating the whole person –
              body, mind, and spirit. Our approach combines ancient wisdom with
              modern techniques to create a truly holistic healing experience.
            </p>
            <p className="text-gray-600 text-lg">
              We are committed to providing personalized care that addresses
              your unique needs and helps you achieve your wellness goals. Your
              journey to better health starts here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
