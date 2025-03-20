import { r as redirect } from "../../../../../chunks/index2.js";
const GET = ({ cookies }) => {
  cookies.delete("token", { path: "/" });
  redirect(303, "/login");
};
export {
  GET
};
