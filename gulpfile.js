const gulp = require('gulp'),
      fs = require('fs'),
      gp = require('gulp-load-plugins')(),

      rsp = require('remove-svg-properties').stream,

       importcss = require('postcss-import'),
       urlcss = require('postcss-url'),

      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,

      spritesmith = require('gulp.spritesmith'),

      sassGlob = require('gulp-sass-glob'),
      cssunit = require('gulp-css-unit');

// server
gulp.task('server', function() {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: "./public",
    }
  });
});

// sass
gulp.task('sass', () => {
  gulp.src('./source/styles/path/style.scss')
    .pipe(gp.plumber())
    .pipe(gp.sourcemaps.init())
    .pipe(sassGlob())
    .pipe(gp.sass())
    .pipe(gp.autoprefixer({
      browsers : ['> 5%'],
      cascade : false
    }))
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(gp.csso())
    .pipe(gp.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(reload({stream : true}));
});

// pug
gulp.task('pug', () => {

  gulp.src('./source/markup/index.pug')
    .pipe(gp.plumber())
    .pipe(gp.pug({
      locals : JSON.parse(fs.readFileSync('./source/markup/content.json', 'utf8')),
      pretty: true,
    }))
    .pipe(gulp.dest('./public'))
    .pipe(reload({stream : true}));
});

// images for content
gulp.task('images:content', () => {
  gulp.src('./source/img/content/**/*.{png,jpg,jpeg,svg}')
    .pipe(gp.plumber())
    .pipe(gp.imagemin([
      gp.imagemin.jpegtran({progressive: true}),
      gp.imagemin.optipng({optimizationLevel: 3}),
      gp.imagemin.svgo()
    ]))
    .pipe(gulp.dest('./public/img/content'))
    .pipe(reload({stream : true}));
});

// images for decoration
gulp.task('images:decoration', () => {
  gulp.src('./source/img/content/**/*.{png,jpg,jpeg,svg}')
    .pipe(gp.plumber())
    .pipe(gp.imagemin([
      gp.imagemin.jpegtran({progressive: true}),
      gp.imagemin.optipng({optimizationLevel: 3}),
      gp.imagemin.svgo()
    ]))
    .pipe(gulp.dest('./public/img/decoration/'))
    .pipe(reload({stream : true}));
});

// webp
gulp.task('webp', function () {
  return gulp.src('./source/img/content/**/*.{png,jpg}')
    .pipe(gp.plumber())
    .pipe(gp.webp({quality: 80}))
    .pipe(gulp.dest('./public/img/content'))
    .pipe(reload({stream : true}));
});

// SVG-спрайт
gulp.task('sprite', function () {
  gulp.src('./source/img/sprite/*.svg')
    .pipe(gp.plumber())
    .pipe(rsp.remove({
        properties: [rsp.PROPS_FILL]
    }))
    .pipe(gp.svgstore({
      inlineSvg: true
    }))
    .pipe(gp.rename('sprite.svg'))
    .pipe(gulp.dest('./public/img/'))
    .pipe(reload({stream : true}));
});

gulp.task('scripts', function () {
  gulp.src('./source/js/**/*.js')
    .pipe(gp.jslint())
    .pipe(gp.plumber())
    .pipe(gulp.dest('./public/js/'))
    .pipe(gp.uglify())
    .pipe(gp.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/js/'))
    .pipe(reload({stream : true}));
});

gulp.task('clean', function() {
  return del('./public');
});

gulp.task('copy', function() {
  return gulp.src([
    './source/fonts/**',
    // './source/img/**',
    // './source/js/**',
    // './source/*.html'
  ], {
    base: "./source"
  })
  .pipe(gulp.dest("./public"));
});

gulp.task('watch', () => {
  gulp.watch('source/**/*.{pug,json}', ['pug']);
  gulp.watch('source/**/*.scss', ['sass']);
  gulp.watch('source/**/*', ['images:content']);
  gulp.watch('source/**/*', ['images:decoration']);
  gulp.watch('source/**/*', ['scripts']);
  gulp.watch('source/**/*', ['sprite']);
  gulp.watch('source/**/*', ['webp']);
});

gulp.task('default', [
  'sass',
  'pug',
  'scripts',
  'images:content',
  'images:decoration',
  'webp',
  'server', 'watch'
  ]);
