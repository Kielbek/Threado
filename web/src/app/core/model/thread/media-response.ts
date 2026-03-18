export type MediaType = 'IMAGE' | 'VIDEO';

export interface MediaResponse {
  url: string;
  type: MediaType;
  width: number;
  height: number;
  altText?: string;
}
