
import { Button } from "@/components/ui/button";
import JobSearchForm from "@/components/JobSearchForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">LinkedIn Job Scraper</h1>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm" onClick={() => window.open("https://github.com/", "_blank")}>
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Find Your Perfect Job on LinkedIn
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Enter your LinkedIn credentials and search parameters to scrape job listings that match your criteria.
            Your data stays private and is only used to access LinkedIn.
          </p>
        </section>

        <JobSearchForm />
      </main>

      <footer className="bg-white border-t mt-24">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LinkedIn Job Scraper. This tool is for educational purposes only. 
            Please use responsibly and in accordance with LinkedIn's Terms of Service.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
