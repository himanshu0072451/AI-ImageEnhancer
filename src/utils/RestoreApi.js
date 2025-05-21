// utils/RestoreApi.js

export const loadApiKeys = () => {
  const storedData = localStorage.getItem('apiKeys');
  if (storedData) {
    return JSON.parse(storedData);
  }

  // Default API key and usage data
  return {
    users: [
      {
        apiKey: import.meta.env.VITE_API_KEY, // Use the API key from .env
        usageCount: 50,
        limit: 50,
      },
    ],
  };
};

export const saveApiKeys = (data) => {
  localStorage.setItem('apiKeys', JSON.stringify(data));
};

export const incrementUsage = (apiKey) => {
  const data = loadApiKeys();
  const user = data.users.find((user) => user.apiKey === apiKey);

  if (user) {
    if (user.usageCount < user.limit) {
      user.usageCount += 1; // Increment usage count
      saveApiKeys(data);
      return { success: true, message: 'Usage incremented', usageCount: user.usageCount };
    } else {
      // If limit exceeded, delete API key from storage
      data.users = data.users.filter((user) => user.apiKey !== apiKey);
      saveApiKeys(data);
      return { success: false, message: 'API key deleted. Limit exceeded.' };
    }
  }
  return { success: false, message: 'API key not found.' };
};

export const restoreApiKey = () => {
  const data = loadApiKeys();
  const existingUser = data.users.find((user) => user.apiKey === import.meta.env.VITE_API_KEY);

  if (existingUser) {
    return { success: false, message: 'API key already exists.' };
  }

  // If the API key is deleted, restore it with 0 usage
  data.users.push({
    apiKey: import.meta.env.VITE_API_KEY,
    usageCount: 0,
    limit: 50,
  });

  saveApiKeys(data);
  return { success: true, message: 'API key restored with 50 credits.' };
};
