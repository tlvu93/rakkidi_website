import axios from 'axios';
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

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Credentials': 'true'
    }
  });

  const checkAuthentication = async () => {
    try {
      const response = await axiosInstance.get('/check-authentication');

      setIsAuthenticated(response.status === 200);
      return response.status === 200;
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    }
  };

  const login = async (user: string, password: string) => {
    const userObject = new URLSearchParams({
      user: user,
      pass: password
    }).toString();

    try {
      const response = await axiosInstance.post('/login', userObject, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      setIsAuthenticated(response.status === 200);
      toast.success('Login successful');
    } catch (error) {
      setIsAuthenticated(false);
      toast.error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/logout');
      setIsAuthenticated(false);
      toast.success('Logout successful');
    } catch (error) {
      setIsAuthenticated(false);
      toast.error('Logout failed');
    }
  };

  const getInvoicesZipped = async (startDate: Moment, endDate: Moment) => {
    try {
      const response = await axiosInstance.get(
        `/invoices/zip?startDate=${startDate.format(
          'YYYY-MM-DD'
        )}&endDate=${endDate.format('YYYY-MM-DD')}`,
        {
          responseType: 'blob'
        }
      );

      let filename = 'invoices.zip';
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

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
