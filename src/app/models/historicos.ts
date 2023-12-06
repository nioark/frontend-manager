export interface Historico {
  id: number;
  server_id: number;
  usuario_id: number;
  name: string;
  action: string;
  comment: string;
  created_at: string;
  // time_ago: string | undefined;
  // deleted: boolean;
}
