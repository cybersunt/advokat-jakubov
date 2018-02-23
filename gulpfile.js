const gulp = require('gulp')
	, pug = require('gulp-pug')
	, fs = require('fs')
	, browserSync = require('browser-sync').create()
	, reload = browserSync.reload
	, sass = require('gulp-sass')
	, plumber = require('gulp-plumber')
	, spritesmith = require('gulp.spritesmith')
	, sassGlob = require('gulp-sass-glob')
	, sourcemaps = require('gulp-sourcemaps')
	, csso = require('gulp-csso')
	, autoprefixer = require('gulp-autoprefixer')
	, cssunit = require('gulp-css-unit');

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

gulp.task('sass', () => {
	return gulp.src('./source/styles/path/style.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers : ['> 5%'],
			cascade : false
		}))
		// .pipe(cssunit({
		// 	type     :    'px-to-rem',
		// 	rootSize  :    16
		// }))
    .pipe(sourcemaps.write())
		// .pipe(csso())
		.pipe(gulp.dest('./public/css/'))
		.pipe(reload({stream : true}));
});

gulp.task('pug', () => {

	gulp.src('./source/markup/index.pug')
		.pipe(plumber())
		.pipe(pug({
			locals : JSON.parse(fs.readFileSync('./source/markup/content.json', 'utf8')),
			pretty: true,
		}))
		.pipe(gulp.dest('./public'))
		.pipe(reload({stream : true}));
});

gulp.task('images:content', () => {
  gulp.src('./source/img/content/**/*')
    .pipe(gulp.dest('./public/img/content/'))
    .pipe(reload({stream : true}));
});

gulp.task('images:decoration', () => {
  gulp.src('./source/img/decoration/**/*')
    .pipe(gulp.dest('./public/img/decoration/'))
    .pipe(reload({stream : true}));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src(
		'./src/img/icons/*.png'
	).pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss',
		cssFormat: 'css',
		imgPath: '../img/sprite.png',
		padding: 70
	}));

	spriteData.img.pipe(gulp.dest('./dist/img'));
	spriteData.css.pipe(gulp.dest('./src/styles/sprite'));
});

gulp.task('watch', () => {
	gulp.watch('source/**/*.{pug,json}', ['pug']);
	gulp.watch('source/**/*.scss', ['sass']);
  gulp.watch('source/**/*', ['images:content']);
  gulp.watch('source/**/*', ['images:decoration']);
});

gulp.task('default', [
	'sass',
	'pug',
  'images:content',
  'images:decoration',
	// 'sprite',
	'server', 'watch'
	]);
