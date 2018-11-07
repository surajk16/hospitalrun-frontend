import Mixin from '@ember/object/mixin';

export const PREDEFINED_USER_ROLES = [
  { name: 'Data Entry', roles: ['Data Entry', 'user'], defaultRoute: 'patients.index' },
  { name: 'Doctor', roles: ['Doctor', 'user'], defaultRoute: 'patients.index'  },
  { name: 'Finance Manager', roles: ['Finance Manager', 'user'], defaultRoute: 'invoices.index' },
  { name: 'Hospital Administrator', roles: ['Hospital Administrator', 'user'], defaultRoute: 'invoices.index' },
  { name: 'Inventory Manager', roles: ['Inventory Manager', 'user'], defaultRoute: 'inventory.index' },
  { name: 'Medical Records Officer', roles: ['Medical Records Officer', 'user'], defaultRoute: 'patients.index' },
  { name: 'Nurse Manager', roles: ['Nurse Manager', 'user'], defaultRoute: 'patients.index' },
  { name: 'Patient Administration', roles: ['Patient Administration', 'user'], defaultRoute: 'patients.index' },
  { name: 'Pharmacist', roles: ['Pharmacist', 'user'], defaultRoute: 'medication.index' },
  { name: 'System Administrator', roles: ['System Administrator', 'admin', 'user'] },
  { name: 'User Administrator', roles: ['User Administrator', 'admin', 'user'], defaultRoute: 'users' },
  { name: 'Cashier', roles: ['Cashier', 'user'], defaultRoute: 'invoices.index' }
];

export default Mixin.create({
  userRoles: PREDEFINED_USER_ROLES,

  findUserRole(name) {
    return this.userRoles.findBy('name', name);
  }
});
