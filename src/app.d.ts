// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Poke {
      id: string;
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
