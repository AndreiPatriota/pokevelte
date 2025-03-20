const load = async ({ params, cookies, locals }) => {
  const nome = locals.user ? locals.user.nome : "Fulaninho";
  return {
    success: true,
    nome
  };
};
export {
  load
};
