import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-container text-on-primary border-t border-outline-variant/20 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-lg py-xl max-w-container-max mx-auto">
        <span className="font-h3 text-h3 text-on-primary mb-md md:mb-0">DeliBook</span>
        <p className="font-body-sm text-body-sm text-on-primary/80 text-center md:text-left mb-md md:mb-0">
          © 2024 DeliBook. All rights reserved.
        </p>
        <div className="flex items-center space-x-lg">
          <Link
            href="#"
            className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
