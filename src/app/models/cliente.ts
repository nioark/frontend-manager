export interface ClienteElement {
  nome: string;
  cnpj: string;
  accept_terms: boolean;
}

export interface Cliente {
  id: number;
  contrato_id: number;
  accepted_at: string;
  updated_at: string;
  accept_at: string
  nome: string;
  cnpj: string;
  accept_terms: boolean;
}
