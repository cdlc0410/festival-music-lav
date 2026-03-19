import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpTerser from 'gulp-terser';

const sass = gulpSass(dartSass);

export function js( done ) {

    return src('src/js/app.js')
        .pipe( gulpTerser() )
        .pipe( dest('build/js') );
}

export function css( done ) {

    return src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass({
            style: 'compressed'
        }).on('error', sass.logError ) )
        .pipe( dest('build/css', {sourcemaps: '.'}) );
};

export function dev() {

    watch( 'src/scss/**/*.scss', css );
    watch( 'src/js/**/*.js', js );
}

export const build = series( js, css );

export default series( js, css, dev );