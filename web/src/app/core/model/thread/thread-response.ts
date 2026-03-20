import {PublicMetricsResponse} from './public-metrics-response';
import {HashtagResponse} from './hashtag-response';
import {UrlEntityResponse} from './url-entity-response';
import {UserResponse} from './user-response';
import {MediaResponse} from './media-response';

export interface ThreadResponse {
  id: string;
  text: string;
  createdAt: string;
  replySettings: string;
  lang: string;
  publicMetrics: PublicMetricsResponse;
  hashtags: HashtagResponse[];
  urls: UrlEntityResponse[];
  media: MediaResponse[];
  author: UserResponse;

  userInteractions?: {
    isLiked: boolean;
    isBookmarked: boolean;
  };
}
