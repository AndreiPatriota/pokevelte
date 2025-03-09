import type { Handle } from '@sveltejs/kit';
import { PRIVATE_JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  if (token) {
    try {
      const decoded: any = jwt.verify(token, PRIVATE_JWT_SECRET);
      event.locals.user = {
        nome: decoded.nome,
        senha: '',
        credenciais: decoded.credenciais,
      };
    } catch (error) {
      console.log(`Algo de errado não está certo: ${error}`);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
