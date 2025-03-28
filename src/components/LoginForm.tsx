
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';

interface LoginFormProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, password, onChange, disabled }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>LinkedIn Credentials</CardTitle>
        <CardDescription>
          Enter your LinkedIn login information to scrape job listings.
          Your credentials are only used to log into LinkedIn and are not stored.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                placeholder="your.email@example.com"
                type="email"
                value={email}
                onChange={onChange}
                className="pl-10"
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={password}
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

export default LoginForm;
