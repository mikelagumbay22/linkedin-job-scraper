import { useState } from 'react';
import { SearchParams, JobListing } from '@/types/job';
import { useToast } from '@/hooks/use-toast';

export function useJobSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    email: '',
    password: '',
    keywords: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      toast({
        title: "Search initiated",
        description: `Searching for ${searchParams.keywords || 'all'} jobs in ${searchParams.location || 'any location'}`,
      });
      
      // Call the Flask API
      console.log('Sending request to:', 'http://localhost:5000/api/scrape-jobs');
      console.log('Request payload:', searchParams);
      
      const response = await fetch('http://localhost:5000/api/scrape-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(searchParams),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setJobListings(data.jobs);
        toast({
          title: "Search completed",
          description: `Found ${data.count} job listings`,
        });
      } else {
        throw new Error(data.error || 'Failed to fetch job listings');
      }
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to search for jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchParams,
    isLoading,
    jobListings,
    handleInputChange,
    handleSubmit,
  };
}
