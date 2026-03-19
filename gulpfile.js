import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpTerser from 'gulp-terser';
import sharp from 'sharp';

const sass = gulpSass(dartSass);

// Crea el JS en Build y Minify
export function js( done ) {

    return src('src/js/app.js')
        .pipe( gulpTerser() )
        .pipe( dest('build/js') );
};

// Compila el SASS y Minify
export function css( done ) {

    return src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass({
            style: 'compressed'
        }).on('error', sass.logError ) )
        .pipe( dest('build/css', {sourcemaps: '.'}) );
};

// Reajusta Imagenes a diferentes tamaños
export async function crop( done ) {
    const inputFolder = 'src/img/gallery/full';
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    };
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        return images.forEach(file => {
            const inputFile = path.join(inputFolder, file);
            const outputFile = path.join(outputFolder, file);
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile);
        });

    } catch (error) {
        console.log(error);
    };
};

// Busca y convierte las imagenes a Webp
export async function imagenes( done ) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    return images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
}

// Procesa las imagenes al formato Webp
function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
    };
    const baseName = path.basename(file, path.extname(file));
    const extName = path.extname(file);
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

    const options = { quality: 80 };
    sharp(file).jpeg(options).toFile(outputFile);
    sharp(file).webp(options).toFile(outputFileWebp);
    sharp(file).avif().toFile(outputFileAvif);
}

export function dev() {

    watch( 'src/scss/**/*.scss', css );
    watch( 'src/js/**/*.js', js );
    watch( 'src/img/**/*.{png,jpg}', imagenes );
};

export const build = series( js, css );

export default series( imagenes, crop, js, css, dev );