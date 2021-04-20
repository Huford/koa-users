import { areCoordsInRadius, isParamOnEmail } from './dbUsers';

describe('areCoordsInRadius', () => {
  const pointA = { lat: '-68.6102', lng: '-47.0653' };
  const pointB = { lat: '-68.6202', lng: '-47.0753' };
  const midDistancePoint = { lat: '-68.6202', lng: '-45.0753' };
  const farAwayPoint = { lat: '-33.6202', lng: '-10.0753' };

  it('should return true if the coords are the same and no radius is provided', () => {
    expect(areCoordsInRadius(pointA, pointA)).toBeTruthy();
  });

  it('should return true if the coords are inside of the default 10km radius', () => {
    expect(areCoordsInRadius(pointA, pointB)).toBeTruthy();
  });

  it('should return true if the coords are inside of the provided radius', () => {
    expect(areCoordsInRadius(pointA, midDistancePoint, 1000)).toBeTruthy();
  });

  it('should return false if the coords are outside of the default 10km radius', () => {
    expect(areCoordsInRadius(pointA, midDistancePoint)).toBeFalsy();
  });

  it('should return false if the coords are outside of the provided radius', () => {
    expect(areCoordsInRadius(pointA, farAwayPoint, 1000)).toBeFalsy();
  });
});

describe('isParamOnEmail', () => {
  const email = 'julian.rofrano@gmail.com';
  it('returns true if the emailContainsParams is inside the provided userName', () => {
    expect(isParamOnEmail(email, 'gmail')).toBeTruthy();
  });

  it('returns false if the emailContainsParams is not inside the provided userName', () => {
    expect(isParamOnEmail(email, 'aasdasd')).toBeFalsy();
  });
});
