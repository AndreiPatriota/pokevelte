import type { Actions } from './$types';
import {
  PRIVATE_USERS_ENDPOINT,
  PRIVATE_JWT_SECRET,
} from '$env/static/private';
import jwt from 'jsonwebtoken';

export const actions = {
  default: async ({ cookies, request }) => {
    // dados formulário
    const data = await request.formData();
    const nome = data.get('nome')?.toString() || '';
    const senha = data.get('senha')?.toString() || '';

    // busca usuário
    let user: App.Usuario | null;
    try {
      const reponse = await fetch(PRIVATE_USERS_ENDPOINT + `?nome=${nome}`);
      user = (await reponse.json())[0];
    } catch (error) {
      user = null;
    }

    // usuário existe
    if (!user) {
      return {
        success: false,
        mensagem: 'Não foi possível fazer o login',
      };
    }

    // senha confere
    if (user.senha !== senha) {
      console.log('eoooroororoor');
      return {
        success: false,
        mensagem: 'Não foi possível fazer o login',
      };
    }

    // configura token
    const token = jwt.sign(
      { nome: user.nome, credenciais: user.credenciais },
      PRIVATE_JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    cookies.set('token', token, { path: '/' });

    return {
      success: true,
      mensagem: 'O login foi um sucesso!!',
    };
  },
} satisfies Actions;
