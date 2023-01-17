export const checkClientSide = () => {
  try {
    if (typeof window === 'undefined') {
      throw new Error('Node Env');
    }
    return true;
  } catch (error) {
    return false;
  }
};
