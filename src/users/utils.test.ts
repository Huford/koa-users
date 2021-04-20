import { singleUser } from './fixtures';
import { degToRad, getDistanceFromLatLonInKm, transformUser } from './utils';

describe('degToRad', () => {
  it('should eturns correct value', () => {
    expect(degToRad(0)).toBe(0);
    expect(degToRad(90)).toBeCloseTo(1.5708);
    expect(degToRad(180)).toBe(Math.PI);
    expect(degToRad(270)).toBeCloseTo(4.71239);
  });
});

describe('getDistanceFromLatLonInKm', () => {
  it('should return correct value', () => {
    expect(
      getDistanceFromLatLonInKm(-68.6102, -47.0653, -68.6102, -47.0653)
    ).toBe(0);
    expect(
      getDistanceFromLatLonInKm(-68.6202, -47.0753, -68.6102, -47.0653)
    ).toBeCloseTo(1.1835);
  });
});

describe('transformUser', () => {
  it('should return correct transformed user', () => {
    expect(transformUser(singleUser, [])).toStrictEqual(singleUser);
    expect(transformUser(singleUser, ['email'])).toStrictEqual({
      email: 'Nathan@yesenia.net',
    });
  });

  it('should return empty object if one invalid field is passed', () => {
    expect(transformUser(singleUser, ['invalidField'])).toStrictEqual({});
  });

  it('should return only valid fields if some invalid fields are passed', () => {
    expect(
      transformUser(singleUser, ['invalidField', 'email', 'name'])
    ).toStrictEqual({
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
    });
  });
});
