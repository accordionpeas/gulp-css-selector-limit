# gulp-css-selector-limit

> Gulp plugin for detecting if any CSS file in a set has more selectors than IE's limit of 4095. Wraps the [css-selector-limit module](https://github.com/accordionpeas/css-selector-limit).

## Getting Started
This plugin requires Gulp `3.9.x`

If you haven't used [Gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide, as it explains how to create a gulpfile as well as how to install and use Gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-css-selector-limit --save-dev
```

## The "css-selector-limit" task

### Overview
In your project's gulpfile you can add the css-selector-limit task like so.

```js
var gulp = require('gulp'),
	cssSelectorLimit = require('gulp-css-selector-limit');

gulp.task('css-selector-limit', function(){
	return gulp.src('style/**/*.css')
		.pipe(cssSelectorLimit())
		.pipe(cssSelectorLimit.reporter('default'))
		.pipe(cssSelectorLimit.reporter('fail'));
});
```

If you want the task to fail if a file is found that contains selectors that are over the limit then include the fail reporter as shown above.

### Options

All options are the same as those defined in the [css-selector-limit module](https://github.com/accordionpeas/css-selector-limit).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.