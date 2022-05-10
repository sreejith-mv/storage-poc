export interface ModelBase {
  dataKey: string;
  fromJson: (json: any) => ModelBase;
  toJson: (resource: ModelBase) => any;
}
