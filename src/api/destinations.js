import data from '@/db.json';

const destinations = data.destinations || [];

export const destinationsApi = {
  list: async () => {
    return destinations;
  },
  getFeatured: async () => {
    return destinations.filter((destination) => destination.is_featured);
  },
  /** @param {string|undefined} id */
  getById: async (id) => {
    return destinations.find((destination) => destination.id === id);
  },
};
