import type { Cell } from '../entities';

export interface CellRepository {
  getAll(): Cell[];
  getById(id: string): Cell | undefined;
}
