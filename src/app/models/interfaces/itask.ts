export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface ITask {
    id: number;
    title: string;
    status: TaskStatus;
}
