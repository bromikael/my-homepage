import { setToken, getToken, removeToken } from '../services/ApiService';  // Adjust path

describe('Token Handling Tests', () => {
  beforeEach(() => {
    localStorage.clear();  // Clear localStorage before each test
  });

  test('should store a token in localStorage', () => {
    setToken('test-token');
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  test('should retrieve a token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    expect(getToken()).toBe('test-token');
  });

  test('should remove a token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    removeToken();
    expect(localStorage.getItem('token')).toBe(null);
  });
});
