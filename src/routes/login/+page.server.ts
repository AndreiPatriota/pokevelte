import type { Actions } from './$types';
import { PRIVATE_USERS_ENDPOINT } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const nome = data.get('nome')?.toString() || '';
    const senha = data.get('senha')?.toString() || '';

    console.log(`nome: ${nome}/ senha: ${senha}`);

    let user : App.Usuario | null;
    
    try {
      const reponse = await fetch(PRIVATE_USERS_ENDPOINT + `?nome=${nome}`);
      user = (await reponse.json())[0];
    } catch (error) {
      user = null;
    }

    if (!user) {
      return {
        success: false,
        mensagem: 'Não foi possível fazer o loginAAA',
      };
    }

    if (user.senha !== senha) {
      console.log('eoooroororoor');
      return {
        success: false,
        mensagem: 'Não foi possível fazer o loginBBBB ',
      };
    }

    const token = jwt.sign({ nome: user.nome }, 'bjkdbdjkfwebjk', {
      expiresIn: '1h',
    });
    cookies.set('token', token, { path: '/' });

    return {
      success: true,
      mensagem: 'O login foi um sucesso!!',
    };
  },
} satisfies Actions;
