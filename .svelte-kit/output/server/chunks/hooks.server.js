import { a as PRIVATE_JWT_SECRET } from "./private.js";
import jwt from "jsonwebtoken";
const handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token");
  if (token) {
    try {
      const decoded = jwt.verify(token, PRIVATE_JWT_SECRET);
      event.locals.user = {
        nome: decoded.nome,
        senha: "",
        credenciais: decoded.credenciais
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
export {
  handle
};
