// const Setting = {
//   offersNumber: 5
// };

export const Cities = [
  {
    name: 'Paris',
    id: 1,
  },
  {
    name: 'Cologne',
    id: 2,
  },
  {
    name: 'Brussels',
    id: 3,
  },
  {
    name: 'Amsterdam',
    id: 4,
  },
  {
    name: 'Hamburg',
    id: 5,
  },
  {
    name: 'Dusseldorf',
    id: 6,
  },
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const SORT_TYPES = {
  0: 'Popular',
  1: 'Price: low to high',
  2: 'Price: high to low',
  3: 'Top rated first',
};

export enum NameSpace {
  Other = 'OTHER',
  Offers = 'OFFERS',
  User = 'USER',
}

