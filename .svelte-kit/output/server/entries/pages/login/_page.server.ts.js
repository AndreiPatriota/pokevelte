import { P as PRIVATE_USERS_ENDPOINT, a as PRIVATE_JWT_SECRET } from "../../../chunks/private.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const nome = data.get("nome")?.toString() || "";
    const senha = data.get("senha")?.toString() || "";
    let user;
    try {
      const reponse = await fetch(PRIVATE_USERS_ENDPOINT + `?nome=${nome}`);
      user = (await reponse.json())[0];
    } catch (error) {
      user = null;
    }
    if (!user) {
      return {
        success: false,
        mensagem: "Não foi possível fazer o login"
      };
    }
    const senhaConfere = await bcrypt.compare(senha, user.senha);
    if (!senhaConfere) {
      return {
        success: false,
        mensagem: "Não foi possível fazer o login"
      };
    }
    const token = jwt.sign(
      { nome: user.nome, credenciais: user.credenciais },
      PRIVATE_JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );
    cookies.set("token", token, { path: "/" });
    return {
      success: true,
      mensagem: "O login foi um sucesso!!"
    };
  },
  signin: async ({ cookies, request }) => {
    const data = await request.formData();
    const nome = data.get("nome")?.toString() || "";
    const senha = data.get("senha")?.toString() || "";
    const senhaConfirma = data.get("senha-confirma")?.toString() || "";
    let user;
    try {
      const reponse2 = await fetch(PRIVATE_USERS_ENDPOINT + `?nome=${nome}`);
      user = (await reponse2.json())[0];
    } catch (error) {
      user = null;
    }
    if (user) {
      return {
        success: false,
        mensagem: "Nome de usuário já uilizado"
      };
    }
    if (senha !== senhaConfirma) {
      return {
        success: false,
        mensagem: "Senha não bate",
        tipo: "login"
      };
    }
    const hashSenha = await bcrypt.hash(senha, 10);
    await fetch(PRIVATE_USERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, senha: hashSenha, credenciais: ["user"] })
    });
    return {
      success: true,
      mensagem: "Usuário criado com sucesso!",
      tipo: "signin"
    };
  }
};
export {
  actions
};
