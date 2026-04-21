import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Add auth token to requests
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('nursingUser') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Handle global response errors (e.g. 401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Authentication failed - clearing session');
      localStorage.removeItem('nursingUser');
      // We don't force a reload here to avoid infinite loops if it happens on login
      // But we can let individual components handle the redirect
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');

// Tests
export const getTests = (params) => API.get('/tests', { params });
export const getTest = (id) => API.get(`/tests/${id}`);
export const submitTest = (id, data) => API.post(`/tests/${id}/submit`, data);
export const getMyResults = () => API.get('/tests/results/my');

// Analytics
export const getDashboard = () => API.get('/analytics/dashboard');
export const generateAI = () => API.post('/analytics/generate-ai');
export const getStudyPlan = () => API.get('/analytics/study-plan');
export const getWeeklyProgress = () => API.get('/analytics/weekly-progress');
export const getRecommendations = () => API.get('/analytics/recommendations');
export const getStatsStrip = () => API.get('/analytics/stats-strip');
export const patchStudyPlanTask = (data) => API.patch('/analytics/study-plan/complete', data);

// AI
export const askAI = (data) => API.post('/ai/ask', data);
export const chatAI = (data) => API.post('/ai/chat', data);

export default API;
