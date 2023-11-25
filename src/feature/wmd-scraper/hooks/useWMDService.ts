import { Moment } from 'moment';
import { useState, useEffect } from 'react';

// const BASE_URL = 'http://165.232.69.129';
const BASE_URL = 'http://localhost:3001';

const useWMDService = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check the session storage to set the initial authentication state
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
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }

    // const data = await response.json();

    // if (data.token) {
    //   sessionStorage.setItem('authToken', data.token); // Store the token
    //   setIsAuthenticated(true);
    // }
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
      console.log(error);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const getInvoicesZipped = async (startDate: Moment, endDate: Moment) => {
    try {
      const response = await fetch(
        `${BASE_URL}/invoices/zip?startDate=${startDate.format(
          'DD.MM.YYYY'
        )}&endDate=${endDate.format('DD.MM.YYYY')}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );

      if (response.ok) {
        // Get the filename from the Content-Disposition header

        let filename = 'invoices.zip';

        // Create a blob URL
        console.log(response);
        const blob = await response.blob();

        console.log(blob);
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
      console.log(error);
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
