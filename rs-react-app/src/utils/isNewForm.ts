export const isNewForm = (createdAt: string) => {
  const created = new Date(createdAt).getTime();

  return Date.now() - created < 5000;
};