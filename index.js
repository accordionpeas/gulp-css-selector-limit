var through = require('through2'),
	gutil = require('gulp-util'),
	cssSelectorLimit = require('css-selector-limit'),
	PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-css-selector-limit';

var cssSelectorLimitPlugin = function(options){
	return through.obj(function (file, enc, cb) {
		cssSelectorLimit(file.contents.toString(), options, function(err, results){
			file.cssSelectorLimit = results[0];
			cb(err, file);
		});
	});
};

var failReporter = function(){
	var fails = [];

	return through.obj(function(file, enc, cb){
		if(file.cssSelectorLimit && !file.cssSelectorLimit.ok){
			fails.push(file.path);
		}
		cb(null, file);

	}, function(){
		if(fails.length){
			this.emit('error',  new PluginError(PLUGIN_NAME, {
				message: gutil.colors.yellow('CSS selectors are over the limit for the following files: ' + fails.join(', ')),
				showStack: false
			}));
		}
	});
};

var defaultReporter = function(){
	return through.obj(function(file, enc, cb){
		if(file.cssSelectorLimit && !file.cssSelectorLimit.ok){
			gutil.log(gutil.colors.yellow('\n'));
			gutil.log(gutil.colors.yellow(file.path + ' is over the css selector limit.'));
			gutil.log(gutil.colors.yellow('The line number of the first selector that is over the limit is ' + file.cssSelectorLimit.line + '.'));
			gutil.log(gutil.colors.yellow('The first selector that is over the limit is "' + file.cssSelectorLimit.selector + '".'));
		}
		cb(null, file);
	});
};

cssSelectorLimitPlugin.reporter = function(reporter){
	if(reporter === 'default'){
		return defaultReporter();
	}
	else if(reporter === 'fail'){
		return failReporter();
	}
	else if(typeof reporter === 'function'){
		return reporter();
	}
	else{
		throw new Error('Invalid reporter');
	}
};

module.exports = cssSelectorLimitPlugin;