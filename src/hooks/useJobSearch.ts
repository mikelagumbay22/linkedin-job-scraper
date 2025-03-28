
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
      // In a production app, this would send data to your backend API
      // that would then trigger your Python script
      toast({
        title: "Search initiated",
        description: `Searching for ${searchParams.keywords} jobs in ${searchParams.location}`,
      });
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock data for demonstration
        const mockJobListings: JobListing[] = [
          {
            title: "Senior Media Buyer",
            company: "Digital Marketing Inc",
            location: searchParams.location,
            posted_time: "2 days ago",
            industry: "Marketing and Advertising",
            employees_range: "51-200",
            linkedin_employees: "120",
            description: "We are looking for an experienced Media Buyer to join our team. The ideal candidate will have strong analytical skills and experience with digital advertising platforms.",
            recruiter_name: "Jane Smith",
            recruiter_linkedin: "https://linkedin.com/in/jane-smith",
            url: "https://linkedin.com/jobs/view/123456",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "Media Buying Specialist",
            company: "Ad Agency Group",
            location: searchParams.location,
            posted_time: "1 week ago",
            industry: "Advertising",
            employees_range: "1001-5000",
            linkedin_employees: "3500",
            description: "Join our media team to help clients maximize their advertising ROI across multiple channels including social media, search, and display networks.",
            recruiter_name: "John Doe",
            recruiter_linkedin: "https://linkedin.com/in/john-doe",
            url: "https://linkedin.com/jobs/view/789012",
            logo_url: "https://via.placeholder.com/150"
          }
        ];
        
        setJobListings(mockJobListings);
        setIsLoading(false);
        
        toast({
          title: "Search completed",
          description: `Found ${mockJobListings.length} job listings`,
        });
      }, 2000);
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to search for jobs. Please try again.",
        variant: "destructive",
      });
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
