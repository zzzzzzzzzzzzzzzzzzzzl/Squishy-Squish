import request from 'supertest';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

import router from './routes';
import { getReadData } from '../dataService';

jest.mock('./dataService', () => ({
  getReadData: jest.fn(),
}));

describe('GET /', () => {
  it('should return a 200 response with the leaderboard data', async () => {
    const data = {
      leaderboard: [
        {
          id: 1,
          name: 'Fido',
          score: 50,
        },
        {
          id: 2,
          name: 'John',
          score: 60,
        },
        {
          id: 3,
          name: 'Holly',
          score: 80,
        },
        {
          id: 4,
          name: 'Dan',
          score: 100,
        },
        {
          id: 5,
          name: 'Alisha',
          score: 150,
        },
      ],
    };
    getReadData.mockResolvedValue(data);

    const response = await request(router).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(data.leaderboard);
  });

  it('should return a 500 response with an error message if the data service fails', async () => {
    const errorMessage = 'Failed to fetch leaderboard data';
    getReadData.mockRejectedValue(new Error(errorMessage));

    const response = await request(router).get('/');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });
});
