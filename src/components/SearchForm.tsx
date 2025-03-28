
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';

interface SearchFormProps {
  keywords: string;
  location: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ keywords, location, onChange, disabled }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Search Parameters</CardTitle>
        <CardDescription>
          Enter the job keywords and location you want to search for on LinkedIn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="keywords">Keywords</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="keywords"
                name="keywords"
                placeholder="Media Buyer, Marketing Manager, etc."
                value={keywords}
                onChange={onChange}
                className="pl-10"
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                placeholder="United States, Remote, New York, etc."
                value={location}
                onChange={onChange}
                className="pl-10"
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
