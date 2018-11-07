import Mixin from '@ember/object/mixin';
import { isEqual } from '@ember/utils';
import { set, get, computed } from '@ember/object';
import { camelize } from '@ember/string';

export default Mixin.create({
  navItems: [
    {
      title: 'Inventory',
      iconClass: 'octicon-package',
      route: 'inventory',
      capability: 'inventory',
      subnav: [
        {
          title: 'Requests',
          iconClass: 'octicon-chevron-right',
          route: 'inventory.index',
          capability: 'add_inventory_request'
        },
        {
          title: 'Items',
          iconClass: 'octicon-chevron-right',
          route: 'inventory.listing',
          capability: 'inventory'
        },
        {
          title: 'Inventory Received',
          iconClass: 'octicon-plus',
          route: 'inventory.batch',
          subroute: 'new',
          capability: 'add_inventory_item'
        },
        {
          title: 'Reports',
          iconClass: 'octicon-chevron-right',
          route: 'inventory.reports',
          capability: 'inventory'
        }
      ]
    },
    {
      title: 'Patients',
      iconClass: 'octicon-organization',
      route: 'patients',
      capability: 'patients',
      subnav: [
        {
          title: 'Patient Listing',
          iconClass: 'octicon-chevron-right',
          route: 'patients.index',
          capability: 'patients'
        },
        {
          title: 'Admitted Patients',
          iconClass: 'octicon-chevron-right',
          route: 'patients.admitted',
          capability: 'patients'
        },
        {
          title: 'Outpatient',
          iconClass: 'octicon-chevron-right',
          route: 'patients.outpatient',
          capability: 'patients'
        },
        {
          title: 'New Patient',
          iconClass: 'octicon-plus',
          route: 'patients.edit',
          subroute: 'new',
          capability: 'add_patient'
        },
        {
          title: 'Reports',
          iconClass: 'octicon-chevron-right',
          route: 'patients.reports',
          capability: 'patients'
        }
      ]
    },
    {
      title: 'Scheduling',
      iconClass: 'octicon-calendar',
      route: 'appointments',
      capability: 'appointments',
      subnav: [
        {
          title: 'Appointments This Week',
          iconClass: 'octicon-chevron-right',
          route: 'appointments.index',
          capability: 'appointments'
        },
        {
          title: 'Today\'s Appointments',
          iconClass: 'octicon-chevron-right',
          route: 'appointments.today',
          capability: 'appointments'
        },
        {
          title: 'Appointment Search',
          iconClass: 'octicon-search',
          route: 'appointments.search',
          capability: 'appointments'
        },
        {
          title: 'Appointments Calendar',
          iconClass: 'octicon-calendar',
          route: 'appointments.calendar',
          capability: 'appointments'
        },
        {
          title: 'Add Appointment',
          iconClass: 'octicon-plus',
          route: 'appointments.edit',
          subroute: 'new',
          capability: 'add_appointment'
        },
        {
          title: 'Theater Schedule',
          iconClass: 'octicon-calendar',
          route: 'appointments.theater',
          capability: 'appointments'
        },
        {
          title: 'Schedule Surgery',
          iconClass: 'octicon-plus',
          route: 'appointments.edit',
          subroute: 'newsurgery',
          capability: 'add_appointment'
        }
      ]
    },
    {
      title: 'Medication',
      iconClass: 'octicon-file-text',
      route: 'medication',
      capability: 'medication',
      subnav: [
        {
          title: 'Requests',
          iconClass: 'octicon-chevron-right',
          route: 'medication.index',
          capability: 'medication'
        },
        {
          title: 'Completed',
          iconClass: 'octicon-chevron-right',
          route: 'medication.completed',
          capability: 'medication'
        },
        {
          title: 'New Request',
          iconClass: 'octicon-plus',
          route: 'medication.edit',
          subroute: 'new',
          capability: 'add_medication'
        },
        {
          title: 'Dispense',
          iconClass: 'octicon-checklist',
          route: 'medication.edit',
          subroute: 'dispense',
          capability: 'fulfill_medication'
        },
        {
          title: 'Return Medication',
          iconClass: 'octicon-mail-reply',
          route: 'medication.return',
          subroute: 'new',
          capability: 'add_medication'
        }
      ]
    },
    {
      title: 'Billing',
      iconClass: 'octicon-credit-card',
      route: 'invoices',
      capability: 'invoices',
      subnav: [
        {
          title: 'Invoices',
          iconClass: 'octicon-chevron-right',
          route: 'invoices.index',
          capability: 'invoices'
        },
        {
          title: 'New Invoice',
          iconClass: 'octicon-plus',
          route: 'invoices.edit',
          subroute: 'new',
          capability: 'invoices'
        },
        {
          title: 'Prices',
          iconClass: 'octicon-chevron-right',
          route: 'pricing.index',
          capability: 'pricing'
        },
        {
          title: 'Price Profiles',
          iconClass: 'octicon-chevron-right',
          route: 'pricing.profiles',
          capability: 'pricing'
        }
      ]
    },
    {
      title: 'Administration',
      iconClass: 'octicon-person',
      route: 'admin',
      capability: 'admin',
      subnav: [
        {
          title: 'Lookup Lists',
          iconClass: 'octicon-chevron-right',
          route: 'admin.lookup',
          capability: 'update_config'
        },
        {
          title: 'Users',
          iconClass: 'octicon-chevron-right',
          route: 'users',
          capability: 'users'
        },
        {
          title: 'New User',
          iconClass: 'octicon-plus',
          route: 'users.edit',
          subroute: 'new',
          capability: 'add_user'
        },
        {
          title: 'User Roles',
          iconClass: 'octicon-chevron-right',
          route: 'admin.roles',
          capability: 'define_user_roles'
        }
      ]
    }
  ],

  // Navigation items get mapped localizations
  localizedNavItems: computed('navItems.[]', 'i18n.locale', function() {
    let localizationPrefix = 'navigation.';
    // Supports unlocalized keys for now, otherwise we would get:
    // "Missing translation: key.etc.path"
    let translationOrOriginal = (translation, original) => {
      // Check for typeof string, because if it's found in localization,
      // i18n will return a SafeString object, not a string
      return typeof translation === 'string' ? original : translation;
    };
    let i18n = get(this, 'i18n');
    let navItems = get(this, 'navItems');
    return navItems.map((nav) => {
      let sectionKey = localizationPrefix + camelize(nav.title).toLowerCase();
      let navTranslated = i18n.t(sectionKey);

      set(nav, 'localizedTitle', translationOrOriginal(navTranslated, nav.title));
      // Map all of the sub navs, too
      set(nav, 'subnav', nav.subnav.map((sub) => {
        let subItemKey = `${localizationPrefix}subnav.${camelize(sub.title)}`;
        let subTranslated = i18n.t(subItemKey);
        set(sub, 'localizedTitle', translationOrOriginal(subTranslated, sub.title));
        return sub;
      }));

      return nav;
    });
  }),

  findNavItemByRoute(route) {
    for (let i = 0; i < this.navItems.length; i++) {
      if (isEqual(this.navItems[i].route, route)) {
        return this.navItems[i];
      } else {
        for (let j = 0; j < this.navItems[i].subnav.length; j++) {
          if (isEqual(this.navItems[i].subnav[j].route, route)) {
            return this.navItems[i].subnav[j];
          }
        }
      }
    }
    return null;
  }
});
