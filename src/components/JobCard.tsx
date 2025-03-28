
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Users, Briefcase, User } from 'lucide-react';
import { JobListing } from '@/types/job';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="w-full mb-6 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center overflow-hidden">
              {job.logo_url !== "N/A" ? (
                <img src={job.logo_url} alt={`${job.company} logo`} className="object-cover" />
              ) : (
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
              <CardDescription className="text-sm">{job.company}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="ml-auto">
            {job.posted_time}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.industry}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.employees_range} employees</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Recruiter: {job.recruiter_name}</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <h4 className="font-semibold text-foreground mb-2">Description</h4>
          <p className="line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 pt-3 pb-3 flex justify-between">
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-2" />
          View Recruiter
        </Button>
        <Button size="sm" onClick={() => window.open(job.url, '_blank')}>
          <ExternalLink className="h-4 w-4 mr-2" />
          View Job
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
