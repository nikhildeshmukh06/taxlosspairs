import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full">
        <div className="text-6xl mb-6">📉</div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Page Not Found</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          We couldn't find the ticker or page you were looking for. It might have been moved or doesn't exist in our database yet.
        </p>
        
        <Link 
          href="/" 
          className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          Return to Search
        </Link>
      </div>
      
      <div className="mt-8 text-slate-400 text-sm">
        TaxLossPairs.com
      </div>
    </div>
  );
}
