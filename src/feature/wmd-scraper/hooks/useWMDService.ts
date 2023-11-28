import { Moment } from 'moment';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://api.rakkidi.de';

const useWMDService = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch(`${BASE_URL}/check-authentication`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'include'
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const login = async (user: string, password: string) => {
    const userObject = {
      user: user,
      pass: password
    };

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'include',
        body: new URLSearchParams(userObject).toString()
      });

      setIsAuthenticated(response.ok ? true : false);
      toast.success('Login successful');
    } catch (error) {
      setIsAuthenticated(false);
      toast.error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'include'
      });
    } catch (error) {
      toast.error('Logout failed');
    } finally {
      setIsAuthenticated(false);
      toast.success('Logout successful');
    }
  };

  const getInvoicesZipped = async (startDate: Moment, endDate: Moment) => {
    try {
      const response = await fetch(
        `${BASE_URL}/invoices/zip?startDate=${startDate.format(
          'YYYY-MM-DD'
        )}&endDate=${endDate.format('YYYY-MM-DD')}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );

      if (response.ok) {
        let filename = 'invoices.zip';

        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary link and trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);

        // Append link to the body, trigger click and remove it
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
      } else {
        console.error('Response not OK', response.statusText);
      }
    } catch (error) {
      toast.error(`Getting zipped invoices failed`);
    }
  };
  return {
    isAuthenticated,
    login,
    logout,
    getInvoicesZipped
  };
};

export default useWMDService;
