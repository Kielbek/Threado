export interface UserProfileUpdateRequest {
  firstName: string;
  lastName: string;
  username: string;

  bio: string | null;
  websiteUrl: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
}
