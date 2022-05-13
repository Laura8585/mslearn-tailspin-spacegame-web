/// <binding Clean='clean' />
"use strict";

import { task, series, src, dest } from "gulp";
import rimraf from "rimraf";
import concat from "gulp-concat";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";

const paths = {
  webroot: "./Tailspin.SpaceGame.Web/wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

task("clean:js", done => rimraf(paths.concatJsDest, done));
task("clean:css", done => rimraf(paths.concatCssDest, done));
task("clean", series(["clean:js", "clean:css"]));

task("min:js", () => {
  return src([paths.js, "!" + paths.minJs], { base: "." })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(dest("."));
});

task("min:css", () => {
  return src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cleanCSS())
    .pipe(dest("."));
});

task("min", series(["min:js", "min:css"]));

// A 'default' task is required by Gulp v4
task("default", series(["min"]));