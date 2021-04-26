import { DevMap } from '../ref';
import { convert, toProperty } from '../../src';

describe('toProperty', () => {
  const map = new DevMap();

  test('Simple prop', () => {
    const p = toProperty(map, 'Id');
    expect(p).toMatchObject({ name: 'Id', options: { convert: convert.default } });
  });

  test('Prop with empty options', () => {
    const p = toProperty(map, 'Id', {});
    expect(p).toMatchObject({ name: 'Id', options: { convert: convert.default } });
  });

  test('Prop with default', () => {
    const p = toProperty(map, 'Id', { dflt: 3 });
    expect(p).toMatchObject({ name: 'Id', options: { dflt: 3, convert: convert.default } });
  });

  test('Prop with default and converter', () => {
    const p = toProperty(map, 'Id', { dflt: 3, convert: convert.toNumber.fromString });
    expect(p).toMatchObject({ name: 'Id', options: { dflt: 3, convert: convert.toNumber.fromString } });
  });
});
