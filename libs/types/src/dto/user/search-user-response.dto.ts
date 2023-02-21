import { SearchResponseDto } from '../shared';
import { FindUserResponseDto } from './find-user-response.dto';

export type SearchUserResponseDto = SearchResponseDto<FindUserResponseDto>;
