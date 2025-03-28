
import React from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import SearchForm from './SearchForm';
import JobCard from './JobCard';
import { useJobSearch } from '@/hooks/useJobSearch';
import { Loader2 } from 'lucide-react';

const JobSearchForm: React.FC = () => {
  const { searchParams, isLoading, jobListings, handleInputChange, handleSubmit } = useJobSearch();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
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
          <h2 className="text-2xl font-bold mb-6">Job Listings ({jobListings.length})</h2>
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchForm;
