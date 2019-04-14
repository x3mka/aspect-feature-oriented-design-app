// we could implement this via apollo state
const MenuItemsAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.menuItems = [];
  }

  addMenuItem(obj) {
    const menuItem = Object.assign({type: 'public', ...obj});
    this.menuItems.push(menuItem);
  }

  getMenuItems() {
    return this.menuItems;
  }

};

export default MenuItemsAspect;
