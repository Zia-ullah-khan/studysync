import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Image src="/logo.svg" alt="StudySync logo" width={24} height={24} priority />
            </div>
            <span className="text-xl font-bold">StudySync</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-4 md:mt-0">
            <Link href="/free-software" className="hover:text-blue-600 transition-colors text-sm">Our Philosophy</Link>
            <Link href="/tos" className="hover:text-blue-600 transition-colors text-sm">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors text-sm">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} StudySync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}