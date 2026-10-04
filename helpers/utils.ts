export function generateRandomUser() {
  const timestamp = Date.now();
  return {
    firstName: 'Test',
    lastName: 'User',
    email: `user_${timestamp}@example.com`,
    password: 'Password123!'
  };
}