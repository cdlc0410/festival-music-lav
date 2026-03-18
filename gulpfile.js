import { src, dest, watch } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function css( done ) {

    return src('src/scss/app.scss')
        .pipe( sass().on('error', sass.logError ) )
        .pipe( dest('build/css') );
};

export function dev() {
    console.clear()
    watch( 'src/scss/**/*.scss', css )
}

export const build = css;