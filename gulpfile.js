var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

// gulp.task('default', ['identCheck']);
// gulp.task('identCheck',function(done){
//     gulp.src('./www/lib/ng-identCheck/identCheck.js')
//         .pipe(concat("identCheck.js"))
//         .pipe(uglify())
//         .pipe(rename("identCheck.min.js"))
//         .pipe(gulp.dest('./www/lib/ng-identCheck/'))
//         .on('end', done);
// });
// gulp.task('deploy', ['clean'], function(){
//   gulp.start('identCheck');
// });

// gulp.task('default', ['localStorageUsage','accountCtrl','agentCtrl','homeCtrl','interviewCtrl','turnBillCtrl','directives','filters','app','main','accountService'
//   ,'agentService','commonService','homeService','interviewService','turnBillService','authInterceptorService','index-css','interview-css'
//   ,'style-css','account-css','login-css']);

// //手动添加 start
// gulp.task('accountCtrl',function(done){
//     gulp.src('./www/app/controllers/account/*.js')
//         .pipe(concat("accountCtrl.js"))
//         .pipe(uglify({mangle:false}))
//         .pipe(rename("accountCtrl.js"))
//         .pipe(gulp.dest('./www/dest/controllers/account/'))
//         .on('end', done);
// });

// gulp.task('agentCtrl',function(done){
//     gulp.src('./www/app/controllers/agent/*.js')
//         .pipe(concat("agentCtrl.js"))
//         .pipe(uglify())
//         .pipe(rename("agentCtrl.js"))
//         .pipe(gulp.dest('./www/dest/controllers/agent/'))
//         .on('end', done);
// });

// gulp.task('homeCtrl',function(done){
//     gulp.src('./www/app/controllers/home/*.js')
//         .pipe(concat("homeCtrl.js"))
//         .pipe(uglify())
//         .pipe(rename("homeCtrl.js"))
//         .pipe(gulp.dest('./www/dest/controllers/home/'))
//         .on('end', done);
// });

// gulp.task('interviewCtrl',function(done){
//     gulp.src('./www/app/controllers/interview/*.js')
//         .pipe(concat("interviewCtrl.js"))
//         .pipe(uglify())
//         .pipe(rename("interviewCtrl.js"))
//         .pipe(gulp.dest('./www/dest/controllers/interview/'))
//         .on('end', done);
// });

// gulp.task('turnBillCtrl',function(done){
//     gulp.src('./www/app/controllers/turnBill/*.js')
//         .pipe(concat("turnBillCtrl.js"))
//         .pipe(uglify())
//         .pipe(rename("turnBillCtrl.js"))
//         .pipe(gulp.dest('./www/dest/controllers/turnBill/'))
//         .on('end', done);
// });

// gulp.task('directives',function(done){
//     gulp.src('./www/app/directive/*.js')
//         .pipe(concat("directives.js"))
//         .pipe(uglify())
//         .pipe(rename("directives.js"))
//         .pipe(gulp.dest('./www/dest/directive/'))
//         .on('end', done);
// });

// gulp.task('filters',function(done){
//     gulp.src('./www/app/filters/*.js')
//         .pipe(concat("filters.js"))
//         .pipe(uglify())
//         .pipe(rename("filters.js"))
//         .pipe(gulp.dest('./www/dest/filters/'))
//         .on('end', done);
// });

// gulp.task('app',function(done){
//     gulp.src('./www/app/app.js')
//         .pipe(concat("app.js"))
//         .pipe(uglify({mangle:false}))
//         .pipe(rename("app.js"))
//         .pipe(gulp.dest('./www/dest/'))
//         .on('end', done);
// });

// gulp.task('main',function(done){
//     gulp.src('./www/app/main.js')
//         .pipe(concat("main.js"))
//         .pipe(uglify({mangle:false}))
//         .pipe(rename("main.js"))
//         .pipe(gulp.dest('./www/dest/'))
//         .on('end', done);
// });

// gulp.task('accountService',function(done){
//     gulp.src('./www/app/services/account/accountService.js')
//         .pipe(concat("accountService.js"))
//         .pipe(uglify())
//         .pipe(rename("accountService.js"))
//         .pipe(gulp.dest('./www/dest/services/account/'))
//         .on('end', done);
// });

// gulp.task('agentService',function(done){
//     gulp.src('./www/app/services/agent/agentService.js')
//         .pipe(concat("agentService.js"))
//         .pipe(uglify())
//         .pipe(rename("agentService.js"))
//         .pipe(gulp.dest('./www/dest/services/agent/'))
//         .on('end', done);
// });

// gulp.task('commonService',function(done){
//     gulp.src('./www/app/services/common/commonService.js')
//         .pipe(concat("commonService.js"))
//         .pipe(uglify({mangle:false}))
//         .pipe(rename("commonService.js"))
//         .pipe(gulp.dest('./www/dest/services/common/'))
//         .on('end', done);
// });

// gulp.task('homeService',function(done){
//     gulp.src('./www/app/services/home/homeService.js')
//         .pipe(concat("homeService.js"))
//         .pipe(uglify())
//         .pipe(rename("homeService.js"))
//         .pipe(gulp.dest('./www/dest/services/home/'))
//         .on('end', done);
// });

// gulp.task('interviewService',function(done){
//     gulp.src('./www/app/services/interview/interviewService.js')
//         .pipe(concat("interviewService.js"))
//         .pipe(uglify())
//         .pipe(rename("interviewService.js"))
//         .pipe(gulp.dest('./www/dest/services/interview/'))
//         .on('end', done);
// });

// gulp.task('turnBillService',function(done){
//     gulp.src('./www/app/services/turnBill/turnBillService.js')
//         .pipe(concat("turnBillService.js"))
//         .pipe(uglify())
//         .pipe(rename("turnBillService.js"))
//         .pipe(gulp.dest('./www/dest/services/turnBill/'))
//         .on('end', done);
// });

// gulp.task('authInterceptorService',function(done){
//     gulp.src('./www/app/services/auth/authInterceptorService.js')
//         .pipe(concat("authInterceptorService.js"))
//         .pipe(uglify())
//         .pipe(rename("authInterceptorService.js"))
//         .pipe(gulp.dest('./www/dest/services/auth/'))
//         .on('end', done);
// });

// gulp.task('localStorageUsage',function(done){
//     gulp.src('./www/lib/ng-localStorage/localStorageUsage.js')
//         .pipe(concat("localStorageUsage.js"))
//         .pipe(uglify())
//         .pipe(rename("localStorageUsage.min.js"))
//         .pipe(gulp.dest('./www/lib/ng-localStorage/'))
//         .on('end', done);
// });

// gulp.task('index-css',function(done){
//     gulp.src('./www/css/home/index.css')
//         .pipe(sass())
//         .pipe(minifyCss({
//             keepSpecialComments: 0
//         }))
//         .pipe(rename('index.css'))
//         .pipe(gulp.dest('./www/dist-css/home/'))
//         .on('end', done);
// });

// gulp.task('interview-css',function(done){
//     gulp.src('./www/css/interview/interview.css')
//         .pipe(sass())
//         .pipe(minifyCss({
//             keepSpecialComments:'*'
//         }))
//         .pipe(rename('interview.css'))
//         .pipe(gulp.dest('./www/dist-css/interview/'))
//         .on('end', done);
// });

// gulp.task('account-css',function(done){
//     gulp.src('./www/css/account/account.css')
//         .pipe(sass())
//         .pipe(minifyCss({
//             keepSpecialComments:'*'
//         }))
//         .pipe(rename('account.css'))
//         .pipe(gulp.dest('./www/dist-css/account/'))
//         .on('end', done);
// });

// gulp.task('login-css',function(done){
//     gulp.src('./www/css/account/login.css')
//         .pipe(sass())
//         .pipe(minifyCss({
//             keepSpecialComments:'*'
//         }))
//         .pipe(rename('login.css'))
//         .pipe(gulp.dest('./www/dist-css/account/'))
//         .on('end', done);
// });

// gulp.task('style-css',function(done){
//     gulp.src('./www/css/style.css')
//         .pipe(sass())
//         .pipe(minifyCss({
//             keepSpecialComments: 0
//         }))
//         .pipe(rename('style.css'))
//         .pipe(gulp.dest('./www/dist-css/'))
//         .on('end', done);
// });

// gulp.task('deploy', ['clean'], function(){
//   gulp.start('localStorageUsage','accountCtrl','agentCtrl','homeCtrl','interviewCtrl','turnBillCtrl','directives','filters','app','main','accountService'
//   ,'agentService','commonService','homeService','interviewService','turnBillService','authInterceptorService','index-css','interview-css'
//   ,'style-css','account-css','login-css');
// });

//手动添加 end

// var paths = {
//   sass: ['./scss/**/*.scss']
// };

// gulp.task('default', ['sass']);

// gulp.task('sass', function(done) {
//   gulp.src('./scss/ionic.app.scss')
//     .pipe(sass())
//     .on('error', sass.logError)
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });

// gulp.task('watch', function() {
//   gulp.watch(paths.sass, ['sass']);
// });

// gulp.task('install', ['git-check'], function() {
//   return bower.commands.install()
//     .on('log', function(data) {
//       gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//     });
// });

// gulp.task('git-check', function(done) {
//   if (!sh.which('git')) {
//     console.log(
//       '  ' + gutil.colors.red('Git is not installed.'),
//       '\n  Git, the version control system, is required to download Ionic.',
//       '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//       '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//     );
//     process.exit(1);
//   }
//   done();
// });
