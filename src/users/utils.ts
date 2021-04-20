import { User } from './user';

const EARTH_RADIUS_IN_KM = 6371;

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  let deltaLat = degToRad(lat2 - lat1);
  let deltaLon = degToRad(lon2 - lon1);
  let a =
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.pow(Math.sin(deltaLon / 2), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let dinstanceInKm = EARTH_RADIUS_IN_KM * c;
  return dinstanceInKm;
};

export const degToRad = (deg: number): number => deg * (Math.PI / 180);

export const transformUser = (user: any, fields: string[] = []): User => {
  if (!fields.length) {
    return user;
  }
  let newUser: User = {};
  Object.keys(user).forEach((key) => {
    if (fields.includes(key)) {
      newUser[key] = user[key];
    }
  });
  return newUser;
};
