export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} Spofity Stats. All rights reserved.
        </p>
        <div className="space-x-4">
          <a href="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
