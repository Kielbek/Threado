import {PublicMetricsResponse} from './public-metrics-response';
import {HashtagResponse} from './hashtag-response';
import {UrlEntityResponse} from './url-entity-response';
import {UserResponse} from './user-response';

export interface ThreadResponse {
  id: string;
  text: string;
  createdAt: string;
  replySettings: string;
  lang: string;
  publicMetrics: PublicMetricsResponse | null;
  hashtags: HashtagResponse[];
  urls: UrlEntityResponse[];
  author: UserResponse;
}
