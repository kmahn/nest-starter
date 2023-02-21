export type SearchResponseDto<T> = {
  total: number;
  documents: T[];
};
