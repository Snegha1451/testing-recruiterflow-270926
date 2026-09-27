import { test, expect } from '@playwright/test';
const apiKey = process.env.REQRES_API_KEY;
const authHeaders: Record<string, string> = apiKey ? { 'x-api-key': apiKey } : {};

test.describe('reqres.in users API', () => {
  test('GET /api/users?page=2 returns paginated user data', async ({ request }) => {
    const response = await request.get('/api/users?page=2', { headers: authHeaders });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    }
  });

  test('POST /api/users creates a user and echoes submitted fields', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'leader' };

    const response = await request.post('/api/users', {
      data: payload,
      headers: authHeaders,
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});
