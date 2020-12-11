import { Repo } from '../domain';
import { Id, JsonValue, List } from '../types';
import { Record } from '../domain';

export class Select<T extends Record> {
  constructor(private repo: Repo<T>) {}

  all = (): Promise<List<T>> => this.repo.all();
  byId = (id: Id): Promise<T> => this.repo.byId(id);
  search = (q: JsonValue): Promise<List<T>> => this.repo.search(q);
  exists = (id: Id): Promise<boolean> => this.repo.exists(id);
}
