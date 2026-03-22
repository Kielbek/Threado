export interface MediaUploadResult {
  url: string;
  type: 'IMAGE' | 'VIDEO';
  width?: number;
  height?: number;
}
