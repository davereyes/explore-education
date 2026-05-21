import type { CellRepository } from '@/domain/repositories/CellRepository';

export const getCells = (repo: CellRepository) => () => repo.getAll();
export const getCellById = (repo: CellRepository) => (id: string) => repo.getById(id);
