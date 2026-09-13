/**
 * Mock Users Database (Simulated Backend Authentication)
 * Stored in data module for clean Fast Refresh and architectural separation.
 */
export const MOCK_USERS = [
  {
    email: 'admin@smartstock.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    email: 'staff@smartstock.com',
    password: 'staff123',
    name: 'Staff Member',
    role: 'staff',
  },
]
