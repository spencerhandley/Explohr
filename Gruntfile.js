require('./config');

var jsFilesToignore = ["node_modules/**/*", "**/bower_components/**/*", "dist/app/**/*", "app/assets/**/vendor/**/*"];

module.exports = function (grunt) {

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: require('nconf').get(),
		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['dist']
				}]
			},
			tmp: {
				files: [{
					dot: true,
					src: ['.tmp']
				}]
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dest: 'dist',
						src: [
							'package.json',
							'server.js',
							'app/controllers/**/*',
							'app/views/**/*',
							'app/index.js',
							'config/**/*',
							'lib/**/*'
						]
					}
				]
			},
		},
		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			dist: {
				src: [
					'dist/app/assets/javascripts/{,*/}*.js',
					'dist/app/assets/stylesheets/{,*/}*.css'
				]
			}
		},
		useminPrepare: {
			options: {
				dest: 'dist/app/assets',
				root: 'app/assets'
			},
			html: 'app/views/**/*.html'
		},
		usemin: {
			options: {
				assetsDirs: ['dist/app/assets']
			},
			css: ['dist/app/assets/stylesheets/{,*/}*.css'],
			html: ['dist/app/views/{,*/}*.html']
		},
		express: {
			dev: {
				options: {
					args: process.argv,
					debug: true,
					port: "<%= config.server.port %>",
					script: 'server.js'
				}
			},
			prod: {
				options: {
					args: process.argv,
					script: 'dist/server.js',
					node_env: 'production'
				}
			}
		},
		jshint: {
			options: {
				ignores: jsFilesToignore,
				jshintrc: true
			},
			all: {
				src: '**/*.js'
			}
		},
		jscs: {
			options: {
				excludeFiles: jsFilesToignore,
			},
			all: {
				src: "**/*.js"
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: 'app/assets/stylesheets/**/*.css'
			}
		},
		watch: {
			options: {
				interrupt: true,
				spawn: false
			},
			serverJS: {
				files: ['**/*.js', '!app/assets/**/*.js', '!**/node_modules/**'],
				tasks: ['jshint', 'jscs', 'express:server']
			},
			clientJS: {
				options: {
					livereload: true
				},
				files: ['app/assets/javascripts/**/*'],
				tasks: ['jshint', 'jscs']
			},
			stylesheets: {
				options: {
					livereload: true
				},
				files: ['app/assets/stylesheets/**/*.css'],
				tasks: ['csslint']
			},
			templates: {
				files: ['app/views/**/*.html'],
				tasks: ['precompile-templates']
			}
		},
		"precompile-templates": {
			src: 'app/views'
		}
	});

	// https://github.com/gruntjs/grunt-contrib-watch#compiling-files-as-needed
	grunt.event.on('watch', function (action, filePath) {
		grunt.config('jshint.all.src', filePath);
		grunt.config('jscs.all.src', filePath);
		grunt.config('csslint.all.src', filePath);
		grunt.config('precompile-templates.src', filePath);
	});

	grunt.registerTask('node-inspector', function () {
		grunt.util.spawn({
			cmd: 'node-inspector',
			opts: {
				stdio: 'inherit'
			}
		});
	});

	grunt.registerTask('precompile-templates', function () {
		var fs = require('fs'),
			path = require('path'),
			swig = require('swig'),
			mkdirp = require('mkdirp'),
			config = grunt.config.get('precompile-templates'),
			rootPath = path.join(__dirname, config.src),
			extname = '.html',
			validFileFormat = new RegExp('_.*' + extname + '$');

		function processDir(dir) {
			fs.readdirSync(dir).forEach(function (file) {
				var filePath = path.join(dir, file);
				process(filePath);
			});
		}

		function processFile(filePath) {
			if (!validFileFormat.exec(filePath)) return;

			var basename = path.basename(filePath, extname),
				dirname = path.dirname(filePath),
				source = fs.readFileSync(filePath, { encoding: 'utf8' }),
				// TODO: fix this
				dest = dirname.replace('/app', '/.tmp'),
				template = '';

			template += 'window.App.templates = window.App.templates || {};\n';
			template += 'window.App.templates.' + basename + ' = ';
			template += swig.precompile(source).tpl;
			template += ';\n';

			mkdirp.sync(dest);
			fs.writeFileSync(path.join(dest, basename + '.js'), template);
		}

		function process(path) {
			if (fs.statSync(path).isDirectory()) {
				processDir(path);
			} else {
				processFile(path);
			}
		}

		process(rootPath);
	});

	grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
		this.async();
	});

	// Tasks
	grunt.registerTask('lint', [
		'jshint',
		'jscs',
		'csslint'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'precompile-templates',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'filerev:dist',
		'usemin',
		'clean:tmp'
	]);

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'express:prod', 'express-keepalive']);
		}

		grunt.task.run([
			'clean:tmp',
			'precompile-templates',
			'express:dev',
			'node-inspector',
			'watch'
		]);
	});
};
