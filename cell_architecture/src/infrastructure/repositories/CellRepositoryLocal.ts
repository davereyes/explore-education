import type { Cell } from '@/domain/entities';
import type { CellRepository } from '@/domain/repositories/CellRepository';
import { cells, getCellById } from '../data/cells';

export class CellRepositoryLocal implements CellRepository {
  getAll(): Cell[] {
    return cells;
  }
  getById(id: string): Cell | undefined {
    return getCellById(id);
  }
}

export const cellRepository = new CellRepositoryLocal();
