import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchCvData, saveCvData } from '../services/ApiService';  // Adjust path

const mock = new MockAdapter(axios);
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

describe('CV API Tests', () => {
  beforeEach(() => {
    mock.reset();
  });

  // Test for fetching CV data
  test('should successfully fetch CV data', async () => {
    const token = 'test-token';
    const cvData = { aboutMe: 'Software Developer' };

    mock.onGet(`${API_BASE_URL}/cv/load`).reply(200, cvData);

    const result = await fetchCvData(token);
    expect(result.aboutMe).toBe(cvData.aboutMe);
  });

  test('should handle fetch CV data error', async () => {
    const token = 'invalid-token';

    mock.onGet(`${API_BASE_URL}/cv/load`).reply(401, { message: 'Unauthorized' });

    await expect(fetchCvData(token)).rejects.toThrow();
  });

  // Test for saving CV data
  test('should save CV data successfully', async () => {
    const token = 'test-token';
    const updatedData = { aboutMe: 'Updated About Me' };

    mock.onPut(`${API_BASE_URL}/cv/save`).reply(200, updatedData);

    const result = await saveCvData(token, updatedData);
    expect(result.aboutMe).toBe('Updated About Me');
  });
});
