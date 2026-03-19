type NotificationType = 'LIKE' | 'REPLY' | 'FOLLOW' | 'REPOST';

export interface Notification {
  id: string;
  type: NotificationType;
  user: { name: string; username: string; avatarUrl: string };
  content?: string;
  timeAgo: string;
  isRead: boolean;
}
