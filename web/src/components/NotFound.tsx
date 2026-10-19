import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link
        to="/books"
        className="mt-2 inline-block text-indigo-600 hover:underline"
      >
        Go to books
      </Link>
    </div>
  );
}
