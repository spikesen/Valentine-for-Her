export interface DayMemory {
  dayId: number;
  photoUrl?: string;
  response?: string;
  completedAt: string;
}

export interface UserProgress {
  completedDays: number[];
  hearts: number;
  memories: Record<number, DayMemory>;
}
