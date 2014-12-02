
/*------------------------
    Meteor Integration
------------------------*/


gulp.task('create meteor repo', false, function(callback) {
  var
    stream,
    index,
    tasks = []
  ;

  // streams... designed to save time and make coding fun...
  (function() {
    // Main less src repo
    var
      outputDirectory      = "../" + meteor.repo + '/' + meteor.lessOutputRoot + meteor.mainPackage,
      packageName          = meteor.org + meteor.mainPackage,
      task = {
        all      : 'main package creating',
        folder   : 'main package create folder',
        notes    : 'main package create release notes',
        package  : 'main package create package.json',
        readme   : 'main package create README',
      }
    ;

    console.log('Processing main package...');
    console.log('\toutputDirectory: ' + outputDirectory);
    console.log('\tsourceDirectory: ' + meteor.source + '**');
    console.log('\tpackageName: ' + packageName);

    // copy less source files into output folder adjusting asset paths
    gulp.task(task.folder, false, function() {
      return gulp.src(meteor.source + '**/*.less', { "base" : meteor.source })
        .pipe(plumber())
        //.pipe(flatten())
        .pipe(rename({ extname : '.less.import' }))
        //.pipe(replace(meteor.paths.source, meteor.paths.output))
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    /*
    // create readme
    gulp.task(task.readme, false, function() {
      return gulp.src(meteor.templates.readme)
        .pipe(plumber())
        .pipe(flatten())
        .pipe(replace(regExp.match.name, regExp.replace.name))
        .pipe(replace(regExp.match.titleName, regExp.replace.titleName))
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // extend package.json
    gulp.task(task.package, false, function() {
      return gulp.src(release.templates.package)
        .pipe(plumber())
        .pipe(flatten())
        .pipe(jeditor(function(package) {
          if(isJavascript) {
            package.dependencies = {
              jquery: 'x.x.x'
            };
            package.main = 'index.js';
          }
          package.name = packageName;
          if(version) {
            package.version = version;
          }
          package.title       = 'Semantic UI - ' + capitalizedComponent;
          package.description = 'Single component release of ' + component;
          package.repository  = {
            type : 'git',
            url  : gitURL
          };
          return package;
        }))
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // create release notes
    gulp.task(task.notes, false, function() {
      return gulp.src(release.templates.notes)
        .pipe(plumber())
        .pipe(flatten())
        // Remove release notes for lines not mentioning component
        .pipe(replace(regExp.match.unrelatedNotes, regExp.replace.unrelatedNotes))
        .pipe(replace(regExp.match.whitespace, regExp.replace.whitespace))
        .pipe(replace(regExp.match.spacedVersions, regExp.replace.spacedVersions))
        .pipe(replace(regExp.match.spacedLists, regExp.replace.spacedLists))
        .pipe(replace(regExp.match.trim, regExp.replace.trim))
        .pipe(gulp.dest(outputDirectory))
      ;
    });
*/

    // synchronous tasks in orchestrator? I think not
    gulp.task(task.all, false, function(callback) {
      runSequence([
        task.folder,
        //task.notes
        //task.package,
        //task.readme,
      ], callback);
    });

    tasks.push(task.all);
  })();



  (function() {
    // Main css src repo
    var
      outputDirectory      = "../" + meteor.repo + '/' + meteor.cssOutputRoot + meteor.mainPackage,
      packageName          = meteor.org + meteor.mainPackage,
      task = {
        all      : 'main package css creating',
        folder   : 'main package css create folder',
        assets   : 'main package css copy assets',
        notes    : 'main package css create release notes',
        package  : 'main package css create package.json',
        readme   : 'main package css create README',
      }
    ;

    // copy css and js source files into output folder adjusting asset paths
    gulp.task(task.folder, false, function() {
      return gulp.src([ './dist/semantic.css', './dist/semantic.js'])
        .pipe(plumber())
        .pipe(replace(meteor.paths.source, meteor.paths.output))
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // copy assets into output folder
    gulp.task(task.assets, false, function() {
      var assetsSourceFolder = release.source + release.paths.source;
      return gulp.src(assetsSourceFolder + '**/*.*', { 'base': assetsSourceFolder })
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // create readme
    gulp.task(task.readme, false, function() {
      return gulp.src(meteor.templates.readme)
        .pipe(plumber())
        .pipe(flatten())
        //.pipe(replace(regExp.match.name, regExp.replace.name))
        //.pipe(replace(regExp.match.titleName, regExp.replace.titleName))
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // extend package.json
    gulp.task(task.package, false, function() {
      return gulp.src(meteor.templates.package)
        .pipe(plumber())
        .pipe(flatten())
        .pipe(jeditor(function(package) {
          //if(isJavascript) {
          //  package.dependencies = {
          //    jquery: 'x.x.x'
          //  };
          //  package.main = 'index.js';
          //}
          package.name = packageName;
          if(version) {
            package.version = version;
          }
          package.title       = 'Semantic UI - ';
          package.description = 'Single component release of ';
          //package.repository  = {
          //  type : 'git',
          //  url  : gitURL
          //};
          return package;
        }))
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // create release notes
    gulp.task(task.notes, false, function() {
      return gulp.src(release.templates.notes)
        .pipe(plumber())
        .pipe(flatten())
        .pipe(gulp.dest(outputDirectory))
      ;
    });

    // synchronous tasks in orchestrator? I think not
    gulp.task(task.all, false, function(callback) {
      runSequence([
        task.folder,
        task.assets,
        task.notes,
        task.package,
        task.readme,
      ], callback);
    });

    tasks.push(task.all);
  })();

  runSequence(tasks, callback);
});



  concatFnames = require('gulp-concat-filenames'),
  meteor       = require('./tasks/admin/meteor'),
  tap          = require('gulp-tap'),



      /*
      var concatFilenamesOptions = {
          root: release.source,
          prepend: '    ',
          append: ','
      };

      fnames = '';
      var fnames = gulp.src(release.source + component + '!(*.min|*.map).js')
        .pipe(concatFnames("pippo.txt", concatFilenamesOptions))
        .pipe(tap(function(file) { fnames += file.contents }))
      ;
      console.log('***********************')
      console.log('files:');
      console.log(fnames);
      */