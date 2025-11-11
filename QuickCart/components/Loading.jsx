import React from 'react';

const Loading = () => {
  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg skeleton"></div>
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded skeleton"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 skeleton"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;