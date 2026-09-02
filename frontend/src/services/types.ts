// Tipos que espelham as entidades/DTOs do backend Zero 14.

export const TipoMusica = { Musica: 0, Video: 1 } as const;

export interface Musica {
  id: number;
  titulo: string;
  tipo: number; // 0 = Musica, 1 = Video
  urlEmbed?: string;
  destaque: boolean;
  ordem: number;
}

export interface Evento {
  id: number;
  nomeEvento: string;
  data: string; // ISO
  cidade: string;
  uf: string;
  local: string;
  linkIngresso?: string;
}

export interface Foto {
  id: number;
  url: string;
  legenda?: string;
  ordem: number;
}

export interface Integrante {
  id: number;
  nome: string;
  papel: string;
  fotoUrl: string;
  descricao: string;
  depoimento?: string;
  ordem: number;
}

export interface Comentario {
  id: number;
  nome: string;
  mensagem: string;
  aprovado: boolean;
  criadoEm: string; // ISO
}

export interface Configuracao {
  id: number;
  telefone: string;
  whatsApp: string;
  emailShows: string;
  emailImprensa: string;
  instagram: string;
  youtube: string;
  spotify: string;
  portfolio: string;
  fotoContatoUrl: string;
  biografiaTexto: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
}
