export interface IDaoObject {
  findAll: Function;
  findByID: Function;
  createOne: Function;
  update: Function;
  delete: Function;
  findByFilter: Function;
  aggregate: Function;
}
