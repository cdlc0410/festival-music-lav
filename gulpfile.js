import { src, dest, watch } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function css( done ) {

    console.clear();

    src('src/scss/app.scss')
        .pipe( sass().on('error', sass.logError ) )
        .pipe( dest('build/css') );
    
    
    done();
};

export function dev() {
    console.clear()
    watch( 'src/scss/**/*.scss', css )
}

export const build = css();