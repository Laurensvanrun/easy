import { uri, Uri } from '../../src';

export class DevUri extends Uri {

  static readonly devs = uri.segment('developers');
  static readonly language = uri.query('language');

  static readonly Developers = new DevUri([DevUri.devs]);
  static readonly Developer = new DevUri([DevUri.devs, DevUri.id]);

  language = (f: string): this => this.set(DevUri.language, f);
}
