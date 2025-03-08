import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'bjkdbdjkfwebjk');
      event.locals.user = decoded;
    } catch (error) {
      console.log(`Algo de errado não está certo: ${error}`);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
