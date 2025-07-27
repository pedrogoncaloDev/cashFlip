// src/types/history.ts
import type { ConvertResult } from '@/types/currency';

export interface HistoryItem extends ConvertResult {
    id: string;
    timestamp: number;
}
