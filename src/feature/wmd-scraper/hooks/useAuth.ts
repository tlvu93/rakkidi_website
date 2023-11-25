import { useState, useEffect } from 'react';

// const BASE_URL = 'http://165.232.69.129';
const BASE_URL = 'http://localhost:3001';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check the session storage to set the initial authentication state
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (user: string, password: string) => {
    const userObject = {
      user: user,
      pass: password
    };

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(userObject).toString()
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        console.log(response.status);
        console.log(response);
      }
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
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'GET'
    });

    setIsAuthenticated(false);

    // sessionStorage.removeItem('authToken'); // Remove the token
    // setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout
  };
};

export default useAuth;
