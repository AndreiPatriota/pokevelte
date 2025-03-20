import { S as setContext, a8 as getContext, Z as sanitize_props, a6 as rest_props, Q as push, V as fallback, a3 as slot, a7 as spread_attributes, W as bind_props, T as pop, _ as store_get, a5 as unsubscribe_stores, a1 as clsx, aa as element, a2 as spread_props, X as ensure_array_like, a4 as escape_html, Y as attr } from "../../../chunks/index.js";
import { P as PUBLIC_POKEMONS_ENDPOINT } from "../../../chunks/public.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { w as withGet, n as noop, o as omit, m as makeElement, s as styleToString, i as isBrowser, c as createBitAttrs, b as cn, I as Input, B as Button } from "../../../chunks/index4.js";
import "dequal";
import "clsx";
import { d as derived, w as writable } from "../../../chunks/index3.js";
import { o as onDestroy } from "../../../chunks/index-server.js";
import { tv } from "tailwind-variants";
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function effect(stores, fn) {
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    cb = fn(stores2);
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
const defaults = {
  src: "",
  delayMs: 0,
  onLoadingStatusChange: void 0
};
const createAvatar = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "loadingStatus", "onLoadingStatusChange"));
  const { src, delayMs } = options;
  const loadingStatusWritable = withDefaults.loadingStatus ?? writable("loading");
  const loadingStatus = overridable(loadingStatusWritable, withDefaults?.onLoadingStatusChange);
  effect([src, delayMs], ([$src, $delayMs]) => {
    if (isBrowser) {
      const image2 = new Image();
      image2.src = $src;
      image2.onload = () => {
        if (delayMs !== void 0) {
          const timerId = window.setTimeout(() => {
            loadingStatus.set("loaded");
          }, $delayMs);
          return () => window.clearTimeout(timerId);
        } else {
          loadingStatus.set("loaded");
        }
      };
      image2.onerror = () => {
        loadingStatus.set("error");
      };
    }
  });
  const image = makeElement("avatar-image", {
    stores: [src, loadingStatus],
    returned: ([$src, $loadingStatus]) => {
      const imageStyles = styleToString({
        display: $loadingStatus === "loaded" ? "block" : "none"
      });
      return {
        src: $src,
        style: imageStyles
      };
    }
  });
  const fallback2 = makeElement("avatar-fallback", {
    stores: [loadingStatus],
    returned: ([$loadingStatus]) => {
      return {
        style: $loadingStatus === "loaded" ? styleToString({
          display: "none"
        }) : void 0,
        hidden: $loadingStatus === "loaded" ? true : void 0
      };
    }
  });
  return {
    elements: {
      image,
      fallback: fallback2
    },
    states: {
      loadingStatus
    },
    options
  };
};
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function getAvatarData() {
  const NAME = "avatar";
  const PARTS = ["root", "image", "fallback"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getAvatarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const avatar = { ...createAvatar(removeUndefined(props)), getAttrs };
  setContext(NAME, avatar);
  return {
    ...avatar,
    updateOption: getOptionUpdater(avatar.options)
  };
}
function getImage(src = "") {
  const { NAME } = getAvatarData();
  const avatar = getContext(NAME);
  if (!src) {
    avatar.options.src.set("");
  } else {
    avatar.options.src.set(src);
  }
  return avatar;
}
function getCtx() {
  const { NAME } = getAvatarData();
  return getContext(NAME);
}
function Avatar$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "delayMs",
    "loadingStatus",
    "onLoadingStatusChange",
    "asChild",
    "el"
  ]);
  push();
  let delayMs = fallback($$props["delayMs"], () => void 0, true);
  let loadingStatus = fallback($$props["loadingStatus"], () => void 0, true);
  let onLoadingStatusChange = fallback($$props["onLoadingStatusChange"], () => void 0, true);
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    states: { loadingStatus: localLoadingStatus },
    updateOption,
    getAttrs
  } = setCtx({
    src: "",
    delayMs,
    onLoadingStatusChange: ({ next }) => {
      loadingStatus = next;
      onLoadingStatusChange?.(next);
      return next;
    }
  });
  const attrs = getAttrs("root");
  loadingStatus !== void 0 && localLoadingStatus.set(loadingStatus);
  updateOption("delayMs", delayMs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    delayMs,
    loadingStatus,
    onLoadingStatusChange,
    asChild,
    el
  });
  pop();
}
function Avatar_image$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["src", "alt", "asChild", "el"]);
  push();
  var $$store_subs;
  let image, builder;
  let src = fallback($$props["src"], () => void 0, true);
  let alt = fallback($$props["alt"], () => void 0, true);
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const attrs = { "data-bits-avatar-image": "" };
  image = getImage(src).elements.image;
  builder = store_get($$store_subs ??= {}, "$image", image);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<img${spread_attributes({ ...builder, alt, ...$$restProps })} onload="this.__e=event" onerror="this.__e=event">`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { src, alt, asChild, el });
  pop();
}
function Avatar_fallback$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { fallback: fallback$1 }, getAttrs } = getCtx();
  const attrs = getAttrs("fallback");
  builder = store_get($$store_subs ??= {}, "$fallback", fallback$1);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Card($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<div${spread_attributes({
    class: clsx(cn("bg-card text-card-foreground rounded-lg border shadow-sm", className)),
    ...$$restProps
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<div${spread_attributes({
    class: clsx(cn("p-6", className)),
    ...$$restProps
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_description($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<p${spread_attributes({
    class: clsx(cn("text-muted-foreground text-sm", className)),
    ...$$restProps
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></p>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_footer($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<div${spread_attributes({
    class: clsx(cn("flex items-center p-6 pt-0", className)),
    ...$$restProps
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<div${spread_attributes({
    class: clsx(cn("flex flex-col space-y-1.5 p-6 pb-0", className)),
    ...$$restProps
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_title($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "tag"]);
  push();
  let className = fallback($$props["class"], void 0);
  let tag = fallback($$props["tag"], "h3");
  element(
    $$payload,
    tag,
    () => {
      $$payload.out += `${spread_attributes({
        class: clsx(cn("text-lg font-semibold leading-none tracking-tight", className)),
        ...$$restProps
      })}`;
    },
    () => {
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, { class: className, tag });
  pop();
}
function Avatar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "delayMs"]);
  push();
  let className = fallback($$props["class"], void 0);
  let delayMs = fallback($$props["delayMs"], void 0);
  Avatar$1($$payload, spread_props([
    {
      delayMs,
      class: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
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
  bind_props($$props, { class: className, delayMs });
  pop();
}
function Avatar_image($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "src", "alt"]);
  push();
  let className = fallback($$props["class"], void 0);
  let src = fallback($$props["src"], void 0);
  let alt = fallback($$props["alt"], void 0);
  Avatar_image$1($$payload, spread_props([
    {
      src,
      alt,
      class: cn("aspect-square h-full w-full", className)
    },
    $$restProps
  ]));
  bind_props($$props, { class: className, src, alt });
  pop();
}
function Avatar_fallback($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Avatar_fallback$1($$payload, spread_props([
    {
      class: cn("bg-muted flex h-full w-full items-center justify-center rounded-full", className)
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
/**
 * @license lucide-svelte v0.475.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Trash($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }
    ],
    [
      "path",
      { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "trash" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Badge($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "href", "variant"]);
  push();
  let className = fallback($$props["class"], void 0);
  let href = fallback($$props["href"], void 0);
  let variant = fallback($$props["variant"], "default");
  element(
    $$payload,
    href ? "a" : "span",
    () => {
      $$payload.out += `${spread_attributes({
        href,
        class: clsx(cn(badgeVariants({ variant, className }))),
        ...$$restProps
      })}`;
    },
    () => {
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, { class: className, href, variant });
  pop();
}
const badgeVariants = tv({
  base: "focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
      outline: "text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let listadePokemons = [...data.payload];
  async function deletaPokemon(id) {
    await fetch(PUBLIC_POKEMONS_ENDPOINT + `/${id}`, { method: "delete" });
    listadePokemons = listadePokemons.filter((p) => p.id !== id);
  }
  $$payload.out += `<div class="flex items-center justify-center mt-5"><form class="flex w-full max-w-sm items-center space-x-2" method="POST" action="/pokemons">`;
  Input($$payload, {
    type: "text",
    name: "nome-pokemon",
    placeholder: "Digite o nome do Pokemon..."
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    type: "submit",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Busca`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></form></div> `;
  if (listadePokemons.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="leading-7 [&amp;:not(:first-child)]:mt-6 text-center">Nenhum Pokemon foi cadastrado</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(listadePokemons);
    $$payload.out += `<div class="mt-4 max-h-[700px] space-y-10 overflow-y-auto"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let poke = each_array[$$index];
      $$payload.out += `<!---->`;
      Card($$payload, {
        class: "w-3/5 mx-auto min-w-[430px]",
        children: ($$payload2) => {
          $$payload2.out += `<!---->`;
          Card_header($$payload2, {
            class: "flex flex-row justify-between",
            children: ($$payload3) => {
              $$payload3.out += `<!---->`;
              Avatar($$payload3, {
                children: ($$payload4) => {
                  $$payload4.out += `<!---->`;
                  Avatar_image($$payload4, { src: poke.fotoUrl, alt: "imagem " + poke.nome });
                  $$payload4.out += `<!----> <!---->`;
                  Avatar_fallback($$payload4, {
                    children: ($$payload5) => {
                      $$payload5.out += `<!---->${escape_html(poke.nome.slice(0, 2))}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload4.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!----> <div><!---->`;
              Card_title($$payload3, {
                children: ($$payload4) => {
                  $$payload4.out += `<!---->${escape_html(poke.nome)}`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!----> <!---->`;
              Card_description($$payload3, {
                children: ($$payload4) => {
                  $$payload4.out += `<!---->${escape_html(poke.tipo.reduce((p, s) => p + "/" + s))}`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!----></div> <div><audio controls><source${attr("src", poke.choroUrl)} type="audio/ogg"> `;
              Badge($$payload3, {
                children: ($$payload4) => {
                  $$payload4.out += `<!---->Badge`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!----></audio></div>`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----> <!---->`;
          Card_content($$payload2, {
            children: ($$payload3) => {
              $$payload3.out += `<p>${escape_html(poke.descricao)}</p>`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----> <!---->`;
          Card_footer($$payload2, {
            class: "flex justify-center",
            children: ($$payload3) => {
              Button($$payload3, {
                onclick: () => deletaPokemon(poke.id),
                children: ($$payload4) => {
                  Trash($$payload4, { class: "h-4 w-4" });
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!---->`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
