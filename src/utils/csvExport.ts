
import { JobListing } from '@/types/job';

/**
 * Converts job listings to CSV format and triggers a download
 */
export const exportJobsToCSV = (jobs: JobListing[]) => {
  // Define the columns we want to include in the CSV
  const headers = [
    'Title',
    'Company',
    'Location',
    'Posted Time',
    'Industry',
    'Employee Size',
    'LinkedIn Employees',
    'Recruiter Name',
    'URL'
  ];

  // Create CSV header row
  let csvContent = headers.join(',') + '\n';

  // Add data rows
  jobs.forEach(job => {
    // Format each value and handle commas by wrapping in quotes if needed
    const row = [
      formatCSVField(job.title),
      formatCSVField(job.company),
      formatCSVField(job.location),
      formatCSVField(job.posted_time),
      formatCSVField(job.industry),
      formatCSVField(job.employees_range),
      formatCSVField(job.linkedin_employees),
      formatCSVField(job.recruiter_name),
      formatCSVField(job.url)
    ];
    
    csvContent += row.join(',') + '\n';
  });

  // Create a Blob containing the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger click
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `linkedin-jobs-${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Format a field for CSV export (handle commas, quotes, etc.)
 */
const formatCSVField = (value: string | number | undefined): string => {
  if (value === undefined || value === null) return '""';
  
  const stringValue = String(value);
  
  // If the value contains commas, quotes, or newlines, wrap it in quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Replace any double quotes with two double quotes (CSV escape for quotes)
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
};
