import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Needle & Knead
            </h3>
            <p className="text-gray-600 text-sm">
              Professional at-home massage therapy services for your wellness
              and relaxation needs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/services/swedish"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Swedish Massage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/deep-tissue"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Deep Tissue
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sports"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Sports Massage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sports"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  TMJ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 text-sm">Miami, Florida</li>
              <li className="text-gray-600 text-sm">(786) 417-3948</li>
              <li className="text-gray-600 text-sm">
                NeedleAndKneadServices @gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Hours
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 text-sm">
                Monday - Friday: 10am - 8pm
              </li>
              <li className="text-gray-600 text-sm">Saturday: 10am - 8pm</li>
              <li className="text-gray-600 text-sm">Sunday: 10am - 8pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Needle & Knead. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
