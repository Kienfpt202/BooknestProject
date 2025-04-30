// components/BookSkeleton.tsx
export default function BookSkeleton() {
    return (
      <div className="animate-pulse space-y-2 p-4 border rounded">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-full rounded"></div>
        <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
      </div>
    );
  }
  