import { TableModel } from 'carbon-components-angular';

export default class TableUtils {
  static getSelectedItem(model: TableModel) {
    return model.data[model.rowsSelected.findIndex(selected => selected === true)];
  }
}
