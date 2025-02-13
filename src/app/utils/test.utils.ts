import { Shows } from '../models/shows';

export function createMockShow(overrides: Partial<Shows>): Shows {
  return {
    _id: 'default-id',
    title: 'Default Title',
    thumbnail: {
      trending: { small: '', large: '' },
      regular: { small: '', medium: '', large: '' },
    },
    video: '',
    year: 2023,
    category: 'TV Series',
    rating: 'PG',
    isBookmarked: false,
    isTrending: false,
    ...overrides, // Override with the properties you need
  };
}
