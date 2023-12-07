export interface Historico {
  id: number;
  object_id: number;
  type_id: number;
  usuario_id: number;
  name: string;
  action: string;
  action_data: string;
  comment: string;
  created_at: string;
  // time_ago: string | undefined;
  // deleted: boolean;
}
