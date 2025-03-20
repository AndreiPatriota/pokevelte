import "clsx";
import { Z as sanitize_props, a6 as rest_props, V as fallback, _ as store_get, a3 as slot, a7 as spread_attributes, a5 as unsubscribe_stores, W as bind_props, T as pop, Q as push, a2 as spread_props, a8 as getContext } from "../../../chunks/index.js";
import { m as makeElement, a as addMeltEventListener, c as createBitAttrs, b as cn, I as Input, B as Button } from "../../../chunks/index4.js";
import "dequal";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../chunks/client.js";
function createLabel() {
  const root = makeElement("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
function getLabelData() {
  const NAME = "label";
  const PARTS = ["root"];
  const getAttrs = createBitAttrs(NAME, PARTS);
  return {
    NAME,
    getAttrs
  };
}
function Label$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { root } } = createLabel();
  const { getAttrs } = getLabelData();
  const attrs = getAttrs("root");
  builder = store_get($$store_subs ??= {}, "$root", root);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<label${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!----></label>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Label($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Label$1($$payload, spread_props([
    {
      class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function _page($$payload, $$props) {
  push();
  let { form } = $$props;
  getContext("context");
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<form method="POST" action="?/login" class="w-96 mx-auto mt-48 space-y-6"><div class="flex w-full max-w-sm flex-col gap-1.5">`;
    Label($$payload, {
      for: "usuario",
      children: ($$payload2) => {
        $$payload2.out += `<!---->Usuário`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    Input($$payload, {
      type: "text",
      id: "usuario",
      placeholder: "Nome usuário...",
      name: "nome"
    });
    $$payload.out += `<!----></div> <div class="flex w-full max-w-sm flex-col gap-1.5">`;
    Label($$payload, {
      for: "senha",
      children: ($$payload2) => {
        $$payload2.out += `<!---->Senha`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    Input($$payload, {
      type: "password",
      id: "senha",
      placeholder: "Senha...",
      name: "senha"
    });
    $$payload.out += `<!----></div> `;
    Button($$payload, {
      type: "submit",
      class: "w-24 font-marcado block mx-auto",
      children: ($$payload2) => {
        $$payload2.out += `<!---->Login`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></form> <button class="mt-20 border-none text-blue-500 hover:text-red-500 block mx-auto">Ainda não tem cadastro?</button>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
