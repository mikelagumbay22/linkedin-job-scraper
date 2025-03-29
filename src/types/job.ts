
export interface JobListing {
  title: string;
  company: string;
  location: string;
  posted_time: string;
  industry: string;
  employees_range: string;
  linkedin_employees: string;
  description: string;
  recruiter_name: string;
  recruiter_linkedin: string;
  url: string;
  logo_url: string;
  companyUrl: string;
  domain: string;
}

export interface SearchParams {
  email: string;
  password: string;
  keywords: string;
  location: string;
}
