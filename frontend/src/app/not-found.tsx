import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-dark-600 to-dark-800 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-green">
              404
            </span>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Looks like this page has been disconnected. The circuit is broken, but we can help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-neon-cyan text-dark-900 font-semibold rounded-xl hover:bg-neon-cyan/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/tutorials"
            className="px-8 py-3 bg-dark-700 text-white font-semibold rounded-xl border border-white/10 hover:border-neon-cyan/30 transition-colors"
          >
            Browse Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
