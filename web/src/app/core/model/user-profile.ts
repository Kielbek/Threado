export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  websiteUrl: string;
  avatarUrl: string;
  coverUrl: string;
  followersCount: number;
  followingCount: number;
  joinedAt: string;
  isFollowedByMe: boolean;
}
