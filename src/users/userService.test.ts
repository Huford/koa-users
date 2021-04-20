import { areCoordsInRadius, isParamOnEmail } from './usersService';

describe('areCoordsInRadius', () => {
  it('should return true if the coords are the same and no radius is provided', () => {
    expect(
      areCoordsInRadius(
        { lat: '-68.6102', lng: '-47.0653' },
        { lat: '-68.6102', lng: '-47.0653' }
      )
    ).toBeTruthy();
  });

  it('should return true if the coords are inside of the default 10km radius', () => {
    expect(
      areCoordsInRadius(
        { lat: '-68.6102', lng: '-47.0653' },
        { lat: '-68.6202', lng: '-47.0753' }
      )
    ).toBeTruthy();
  });

  it('should return true if the coords are inside of the provided radius', () => {
    expect(
      areCoordsInRadius(
        { lat: '-68.6102', lng: '-47.0653' },
        { lat: '-68.6202', lng: '-45.0753' },
        1000
      )
    ).toBeTruthy();
  });

  it('should return false if the coords are outside of the default 10km radius', () => {
    expect(
      areCoordsInRadius(
        { lat: '-68.6102', lng: '-47.0653' },
        { lat: '-68.6202', lng: '-10.0753' }
      )
    ).toBeFalsy();
  });

  it('should return false if the coords are outside of the provided radius', () => {
    expect(
      areCoordsInRadius(
        { lat: '-68.6102', lng: '-47.0653' },
        { lat: '-33.6202', lng: '-10.0753' },
        1000
      )
    ).toBeFalsy();
  });
});

describe('isParamOnEmail', () => {
  it('returns true if the emailContainsParams is inside the provided userName', () => {
    expect(isParamOnEmail('julian.rofrano@gmail.com', 'gmail')).toBeTruthy();
  });

  it('returns false if the emailContainsParams is not inside the provided userName', () => {
    expect(isParamOnEmail('julian.rofrano@gmail.com', 'aasdasd')).toBeFalsy();
  });
});
