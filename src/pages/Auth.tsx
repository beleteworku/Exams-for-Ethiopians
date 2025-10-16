import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().trim().min(2, { message: "Full name must be at least 2 characters" }).max(100),
});

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isSignUp) {
        const result = signUpSchema.safeParse({ email, password, fullName });
        if (!result.success) {
          const newErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) newErrors[err.path[0] as string] = err.message;
          });
          setErrors(newErrors);
          setIsLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (!error) navigate('/');
      } else {
        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
          const newErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) newErrors[err.path[0] as string] = err.message;
          });
          setErrors(newErrors);
          setIsLoading(false);
          return;
        }
        const { error } = await signIn(email, password);
        if (!error) navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            {isSignUp ? 'Create your Exam Account' : 'Sign in to your Exam Account'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp ? 'Start your learning journey today' : 'Welcome back! Continue your learning'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`mt-1 ${errors.fullName ? 'border-destructive focus:ring-destructive' : ''}`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 ${errors.email ? 'border-destructive focus:ring-destructive' : ''}`}
                placeholder="student@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 ${errors.password ? 'border-destructive focus:ring-destructive' : ''}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">{errors.password}</p>
              )}
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-input focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm cursor-pointer">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign in'}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
            }}
            className="font-medium text-primary hover:text-primary/80"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;