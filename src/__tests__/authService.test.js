import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { login, register } from '../services/ApiService';  // Adjust path

const mock = new MockAdapter(axios);
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

describe('Auth API Tests', () => {
  beforeEach(() => {
    mock.reset();
  });

  // Test for login function
  test('should successfully log in and return token', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const token = 'test-token';

    mock.onPost(`${API_BASE_URL}/auth/login`).reply(200, { token });

    const result = await login(email, password);
    expect(result.token).toBe(token);
  });

  test('should handle login error', async () => {
    const email = 'test@example.com';
    const password = 'wrong-password';

    console.log(API_BASE_URL);
    mock.onPost(`${API_BASE_URL}/auth/login`).reply(401, { message: 'Invalid credentials' });

    await expect(login(email, password)).rejects.toThrow();
  });

  // Test for register function
  test('should successfully register and return token', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const token = 'test-token';

    mock.onPost(`${API_BASE_URL}/auth/register`).reply(200, { token });

    const result = await register(email, password);
    expect(result.token).toBe(token);
  });

  test('should handle registration error', async () => {
    const email = 'test@example.com';
    const password = 'short';

    mock.onPost(`${API_BASE_URL}/auth/register`).reply(400, { message: 'Password too short' });

    await expect(register(email, password)).rejects.toThrow();
  });
});
