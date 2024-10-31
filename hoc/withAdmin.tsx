import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAdmin = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
      if (!loading && !isAdmin){
        router.push('/');
      }
    }, [isAuthenticated, isAdmin, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // or a loading spinner
    }

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdmin;