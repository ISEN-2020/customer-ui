const authService = {
  login: async (email, password) => {
    // Simulated login request
    return Promise.resolve({ token: 'mockToken', user: { email } });
  },
  register: async (email, password) => {
    // Simulated registration request
    return Promise.resolve({ message: 'Registration successful' });
  },
};

export default authService;