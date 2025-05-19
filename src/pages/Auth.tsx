
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [isLogin, setIsLogin] = useState(mode === 'login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();
  
  const toggleMode = () => {
    setIsLogin(!isLogin);
    navigate(`/auth?mode=${isLogin ? 'signup' : 'login'}`);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in."
        });
      } else {
        await signup(name, email, password);
        toast({
          title: "Account created!",
          description: "Your account has been successfully created."
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{isLogin ? 'Login' : 'Create an account'}</CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill out the form to create your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-orange hover:bg-brand-orange/90"
                disabled={loading}
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
              </Button>
              
              <div className="text-center text-sm">
                <button 
                  type="button" 
                  className="text-brand-purple hover:underline" 
                  onClick={toggleMode}
                >
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
