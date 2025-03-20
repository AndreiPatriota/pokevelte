const load = async ({ locals }) => {
  let logado = true;
  if (!locals.user) {
    logado = false;
  }
  return {
    logado
  };
};
export {
  load
};
