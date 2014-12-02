/*******************************
        Release Settings
*******************************/

// release settings
module.exports = {

  // path to components for repos
  source     : './src/',

  // modified asset paths for component repos
  paths: {
    source : 'themes/default/assets/',
    output : 'assets/'
  },

  templates: {
    package  : './tasks/admin/meteor_templates/package.json',
    readme   : './tasks/admin/meteor_templates/README.md',
    notes    : './RELEASE-NOTES.md'
  },

  repo        : 'Semantic-UI-Meteor',

  // root name for packages
  org: 'semantic:',
  mainPackage : 'ui',
  packageRoot : 'ui-',

  // root path to less packages
  cssOutputRoot  : 'css-packages/',
  lessOutputRoot  : 'less-packages/',
};

