
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, Briefcase } from 'lucide-react';
import { JobListing } from '@/types/job';
import { Badge } from '@/components/ui/badge';

interface JobTableProps {
  jobs: JobListing[];
}

const JobTable: React.FC<JobTableProps> = ({ jobs }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Recruiter</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    {job.logo_url !== "N/A" ? (
                      <img src={job.logo_url} alt={`${job.company} logo`} className="object-cover" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="font-medium truncate max-w-[150px]">{job.company}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium truncate max-w-[200px]">
                {job.title}
              </TableCell>
              <TableCell className="truncate max-w-[150px]">{job.location}</TableCell>
              <TableCell>
                <Badge variant="outline">{job.posted_time}</Badge>
              </TableCell>
              <TableCell className="truncate max-w-[150px]">{job.industry}</TableCell>
              <TableCell>{job.employees_range}</TableCell>
              <TableCell className="truncate max-w-[150px]">{job.recruiter_name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Recruiter
                  </Button>
                  <Button size="sm" onClick={() => window.open(job.url, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" onClick={() => window.open(job.companyUrl, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Company
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
