import type { Actions } from './$types';
import {
  PRIVATE_USERS_ENDPOINT,
  PRIVATE_JWT_SECRET,
} from '$env/static/private';
import jwt from 'jsonwebtoken';

export const actions = {
  login: async ({ cookies, request }) => {
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
  signin: async ({ cookies, request }) => {
     // dados formulário
     const data = await request.formData();
     const nome = data.get('nome')?.toString() || '';
     const senha = data.get('senha')?.toString() || '';
     const senhaConfirma = data.get('senha-confirma')?.toString() || '';

     // busca usuário
    let user: App.Usuario | null;
    try {
      const reponse = await fetch(PRIVATE_USERS_ENDPOINT + `?nome=${nome}`);
      user = (await reponse.json())[0];
    } catch (error) {
      user = null;
    }

    // usuário existe
    if (user) {
      return {
        success: false,
        mensagem: 'Nome de usuário já uilizado',
      };
    }

    // senha confere
    if (senha !== senhaConfirma) {
      return {
        success: false,
        mensagem: 'Senha não bate',
        tipo: 'login'
      };
    }

    // cria usuário no bd
    const reponse = await fetch(PRIVATE_USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, senha, credenciais: ['user'] })
    })

    return {
      success: true,
      mensagem: 'Usuário criado com sucesso!',
      tipo: 'signin'
    };
  },
} satisfies Actions;
