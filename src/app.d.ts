// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Poke {
      id: stirng;
      nome: string;
      numero: number;
      tipo: string[];
      fotoUrl: string;
      choroUrl: string;
      descricao?: string;
    }
  }
}

export {};
