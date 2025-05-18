"use client";

import Image from "next/image";
// import { useSearchParams } from "next/navigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            About Needle & Knead
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Your journey to wellness and healing begins here at Knead
          </p>
        </div>
      </section>

      {/* Centered Image Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-me.jpg"
              alt="Luis A. Fernandez"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
              unoptimized
              onError={(e) => {
                console.error("Error loading image:", e);
              }}
            />
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Our Studio */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 text-amber-700">
                Meet the Company
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Welcome to Needle & Knead, a sanctuary of healing and wellness
                located in the heart of our community. Our studio is designed to
                provide a peaceful and comfortable environment where you can
                escape the stresses of daily life and focus on your well-being.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                We combine traditional healing practices with modern techniques
                to offer a comprehensive approach to wellness. Our commitment to
                excellence and personalized care ensures that each client
                receives the attention and treatment they deserve.
              </p>
              <p className="text-gray-600 text-lg">
                Understanding the demands of modern life, we bring our expertise
                directly to you. Our professional at-home massage services
                ensure you receive the same high-quality treatment in the
                comfort of your own space. Whether you&apos;re recovering from a
                long day, need a quick stress relief, or want to treat yourself
                to a wellness session, our mobile service brings the spa
                experience to your doorstep. We arrive fully equipped with
                everything needed for a complete massage experience, making it
                convenient for you to enjoy our services without leaving home.
              </p>
            </div>

            {/* Meet Luis */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 text-amber-700">
                Meet Luis A. Fernandez, LMT
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                With over 15 years of experience in massage therapy and
                traditional healing practices, Luis A. Fernandez is a dedicated
                practitioner committed to helping others achieve optimal health
                and wellness. His journey in holistic healing began with a deep
                fascination for the body&#39;s natural ability to heal itself.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Luis&#39;s expertise spans multiple disciplines, including
                Swedish massage, deep tissue therapy, sports massage,
                acupuncture, and traditional Chinese medicine. He has trained
                extensively in both Eastern and Western healing modalities,
                allowing him to provide a unique and comprehensive approach to
                treatment.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-700">
                  Certifications & Training:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Licensed Massage Therapist</li>
                  <li>Certified Acupuncturist (Coming Soon)</li>
                  <li>Sports Massage Specialist</li>
                  <li>Traditional Chinese Medicine Practitioner</li>
                  <li>Reflexology Certification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-amber-700">
              Our Philosophy
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              At Needle & Knead, we believe in treating the whole person - body,
              mind, and spirit. Our approach combines ancient wisdom with modern
              techniques to create a truly holistic healing experience.
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
