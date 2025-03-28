
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
        description: `Searching for ${searchParams.keywords || 'all'} jobs in ${searchParams.location || 'any location'}`,
      });
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock data for demonstration - extended to 11 entries
        const mockJobListings: JobListing[] = [
          {
            title: "Senior Media Buyer",
            company: "Digital Marketing Inc",
            location: searchParams.location || "New York, NY",
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
            location: searchParams.location || "Remote",
            posted_time: "1 week ago",
            industry: "Advertising",
            employees_range: "1001-5000",
            linkedin_employees: "3500",
            description: "Join our media team to help clients maximize their advertising ROI across multiple channels including social media, search, and display networks.",
            recruiter_name: "John Doe",
            recruiter_linkedin: "https://linkedin.com/in/john-doe",
            url: "https://linkedin.com/jobs/view/789012",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "Digital Media Planner",
            company: "Global Media Partners",
            location: searchParams.location || "Chicago, IL",
            posted_time: "3 days ago",
            industry: "Digital Media",
            employees_range: "201-500",
            linkedin_employees: "310",
            description: "Seeking a Digital Media Planner to develop and implement strategic media plans for our clients across various digital platforms.",
            recruiter_name: "Robert Johnson",
            recruiter_linkedin: "https://linkedin.com/in/robert-johnson",
            url: "https://linkedin.com/jobs/view/234567",
            logo_url: "N/A"
          },
          {
            title: "Social Media Buyer",
            company: "Social First Agency",
            location: searchParams.location || "Los Angeles, CA",
            posted_time: "5 days ago",
            industry: "Social Media Marketing",
            employees_range: "11-50",
            linkedin_employees: "35",
            description: "Looking for a Social Media Buyer to manage paid social campaigns across Facebook, Instagram, TikTok, and other platforms.",
            recruiter_name: "Sarah Williams",
            recruiter_linkedin: "https://linkedin.com/in/sarah-williams",
            url: "https://linkedin.com/jobs/view/345678",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "Programmatic Media Buyer",
            company: "Data Driven Media",
            location: searchParams.location || "San Francisco, CA",
            posted_time: "1 day ago",
            industry: "AdTech",
            employees_range: "501-1000",
            linkedin_employees: "750",
            description: "Experienced Programmatic Media Buyer needed to optimize campaigns using DSPs like DV360, The Trade Desk, and other demand-side platforms.",
            recruiter_name: "Michael Chen",
            recruiter_linkedin: "https://linkedin.com/in/michael-chen",
            url: "https://linkedin.com/jobs/view/456789",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "Performance Media Manager",
            company: "Growth Marketing Ltd",
            location: searchParams.location || "Austin, TX",
            posted_time: "2 weeks ago",
            industry: "Performance Marketing",
            employees_range: "51-200",
            linkedin_employees: "75",
            description: "Seeking a Performance Media Manager to drive growth through paid channels with a focus on CAC, LTV, and ROAS.",
            recruiter_name: "Olivia Martinez",
            recruiter_linkedin: "https://linkedin.com/in/olivia-martinez",
            url: "https://linkedin.com/jobs/view/567890",
            logo_url: "N/A"
          },
          {
            title: "Media Buying Director",
            company: "Brand Solutions Inc",
            location: searchParams.location || "Miami, FL",
            posted_time: "4 days ago",
            industry: "Brand Marketing",
            employees_range: "201-500",
            linkedin_employees: "320",
            description: "Media Buying Director needed to lead a team of media buyers and planners for our growing agency.",
            recruiter_name: "Daniel Wilson",
            recruiter_linkedin: "https://linkedin.com/in/daniel-wilson",
            url: "https://linkedin.com/jobs/view/678901",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "PPC Media Buyer",
            company: "Search Specialists",
            location: searchParams.location || "Seattle, WA",
            posted_time: "6 days ago",
            industry: "Search Marketing",
            employees_range: "11-50",
            linkedin_employees: "42",
            description: "PPC Media Buyer needed to manage Google Ads, Microsoft Ads, and other search engine marketing campaigns.",
            recruiter_name: "Emily Thompson",
            recruiter_linkedin: "https://linkedin.com/in/emily-thompson",
            url: "https://linkedin.com/jobs/view/789012",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "eCommerce Media Buyer",
            company: "Retail Media Experts",
            location: searchParams.location || "Boston, MA",
            posted_time: "1 week ago",
            industry: "eCommerce",
            employees_range: "51-200",
            linkedin_employees: "120",
            description: "eCommerce Media Buyer needed to optimize campaigns on Amazon, Walmart, Target, and other retail media networks.",
            recruiter_name: "Alex Rodriguez",
            recruiter_linkedin: "https://linkedin.com/in/alex-rodriguez",
            url: "https://linkedin.com/jobs/view/890123",
            logo_url: "N/A"
          },
          {
            title: "Media Planning Associate",
            company: "Full Service Agency",
            location: searchParams.location || "Denver, CO",
            posted_time: "3 days ago",
            industry: "Advertising and Marketing",
            employees_range: "201-500",
            linkedin_employees: "250",
            description: "Entry-level Media Planning Associate position for recent graduates with interest in advertising and media.",
            recruiter_name: "Jessica Lee",
            recruiter_linkedin: "https://linkedin.com/in/jessica-lee",
            url: "https://linkedin.com/jobs/view/901234",
            logo_url: "https://via.placeholder.com/150"
          },
          {
            title: "Senior Paid Media Strategist",
            company: "Digital Strategy Partners",
            location: searchParams.location || "Atlanta, GA",
            posted_time: "5 days ago",
            industry: "Digital Strategy",
            employees_range: "51-200",
            linkedin_employees: "110",
            description: "Senior Paid Media Strategist needed to develop comprehensive media strategies across paid search, social, display, and video platforms.",
            recruiter_name: "Thomas Brown",
            recruiter_linkedin: "https://linkedin.com/in/thomas-brown",
            url: "https://linkedin.com/jobs/view/012345",
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
