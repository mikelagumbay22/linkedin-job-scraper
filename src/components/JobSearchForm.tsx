
import React from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import SearchForm from './SearchForm';
import JobTable from './JobTable';
import { useJobSearch } from '@/hooks/useJobSearch';
import { Loader2, Download } from 'lucide-react';
import { exportJobsToCSV } from '@/utils/csvExport';

const JobSearchForm: React.FC = () => {
  const { searchParams, isLoading, jobListings, handleInputChange, handleSubmit } = useJobSearch();

  const handleExportCSV = () => {
    exportJobsToCSV(jobListings);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      {/* <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Important Information</h3>
        <p className="text-yellow-700 mb-2">
          This application will run a Python script that requires:
        </p>
        <ul className="list-disc pl-5 text-yellow-700 mb-2">
          <li>Python 3.7 or higher installed on your system</li>
          <li>Flask API running locally on port 5000</li>
          <li>Chrome browser installed</li>
        </ul>
        <p className="text-yellow-700">
          To run the Flask API: navigate to the api folder and run <code className="bg-yellow-100 px-2 py-1 rounded">pip install -r requirements.txt</code> followed by <code className="bg-yellow-100 px-2 py-1 rounded">python app.py</code>
        </p>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoginForm 
            email={searchParams.email}
            password={searchParams.password}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <SearchForm 
            keywords={searchParams.keywords}
            location={searchParams.location}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isLoading}
            className="w-full md:w-auto px-8"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Searching..." : "Search LinkedIn Jobs"}
          </Button>
        </div>
      </form>

      {isLoading && (
        <div className="mt-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            Scraping LinkedIn jobs... This may take a few minutes.
          </p>
        </div>
      )}

      {!isLoading && jobListings.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Job Listings ({jobListings.length})</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          </div>
          <JobTable jobs={jobListings} />
        </div>
      )}
    </div>
  );
};

export default JobSearchForm;
