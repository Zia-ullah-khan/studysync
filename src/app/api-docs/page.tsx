'use client';

import { useState, useEffect } from 'react';

const API_DOCS_URL = 'https://studysyncapi.rfas.software';

export default function ApiDocsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex-grow flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">API Documentation</h1>
        
        {isLoading && (
          <div className="flex justify-center items-center flex-grow">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-400">Loading documentation...</p>
          </div>
        )}

        <iframe
          src={API_DOCS_URL}
          title="API Documentation"
          className={`w-250 flex-grow border-0 rounded ${isLoading ? 'hidden' : 'block'}`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
