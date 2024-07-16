import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-241px)] w-full bg-gray-100 mb-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
}
