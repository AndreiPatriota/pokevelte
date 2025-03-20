import { a4 as escape_html, T as pop, Q as push } from "../../chunks/index.js";
import "clsx";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<h1 class="text-center text-lg mt-24">Olaaaarrrrrrrrr, ${escape_html(data.nome)}</h1>`;
  pop();
}
export {
  _page as default
};
