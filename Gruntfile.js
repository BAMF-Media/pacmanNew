module.exports = function(grunt){
	var read = require('read-yaml');
	var config = read.sync('application.yaml');
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			dashboard: {
				files: {
					"bundle/build/js/dashboard.js": [
						"node_modules/angular/angular.min.js",
						"node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
						"node_modules/moment/min/moment.min.js",
						"node_modules/moment-range/dist/moment-range.js",
						"node_modules/ng-range-slider/dist/ng-range-slider.min.js",
						"bundle/js/datepicker.js",
						"bundle/js/dashboard.js",
						"bundle/js/dashboard/*.js",
						"bundle/js/dashboard/**/*.js",
						"bundle/js/reader.js",
					],
				}
			},
			application: {
				files: {
					"bundle/build/js/application.js": [
						"node_modules/angular/angular.min.js",
						"node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
						"bundle/js/application.js",
						"bundle/js/application/*.js",
						"bundle/js/application/**/*.js",
					],
				}
			},
			mapper: {
				files: {
					"bundle/build/js/mapper.js": [
						"node_modules/angular/angular.min.js",
						"bundle/js/mapper.js",
						"bundle/js/mapper/*.js",
						"bundle/js/mapper/**/*.js",
					],
				}
			},
			login: {
				files: {
					"bundle/build/js/login.js": [
						"node_modules/jquery/dist/jquery.min.js",
						"bundle/js/login.js",
					],
				}
			},
			oauth: {
				files: {
					"bundle/build/js/oauth.js": [
						"node_modules/jquery/dist/jquery.min.js",
						"bundle/js/oauth.js",
					],
				}
			},
			sdk: {
				options: {
					banner: "var crowdist = {};"+
					'\ncrowdist.appUrl = "'+config.urls.app+'";\n',
				},
				files: {
					"bundle/build/js/sdk.js": [
						"node_modules/jquery/dist/jquery.min.js",
						"globals.js",
						"bundle/js/sdk.js",
						"bundle/js/reader.js",
						"bundle/js/parser.js"
					],
				}
			}
		},
		cssmin: {
			target: {
				files: {
					"bundle/build/styles/main.min.css": "bundle/build/styles/main.css"
				}
			}
		},
		uglify: {
			dashboard: {
				options: {
					mangle: false,
					compress: true
				},
				src: "bundle/build/js/dashboard.js",
				dest: "bundle/build/js/dashboard.min.js",
			},
			application: {
				src: "bundle/build/js/application.js",
				dest: "bundle/build/js/application.min.js",
			},
			mapper: {
				src: "bundle/build/js/mapper.js",
				dest: "bundle/build/js/mapper.min.js",
			},
			login: {
				src: "bundle/build/js/login.js",
				dest: "bundle/build/js/login.min.js",
			},
			oauth: {
				src: "bundle/build/js/oauth.js",
				dest: "bundle/build/js/oauth.min.js",
			},
			sdk: {
				src: "bundle/build/js/sdk.js",
				dest: "bundle/build/js/sdk.min.js",
			}
		},
		less: {
			styles: {
				files: {
					"bundle/build/styles/main.css": "bundle/styles/main.less"
				},
				plugins: [
					new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
					new (require('less-plugin-clean-css'))({})
				]
			}
		},
		watch: {
			dashboard: {
				files: [
					'bundle/js/dashboard.js',
					'bundle/js/dashboard/*.js',
					"bundle/js/dashboard/**/*.js",
					"bundle/js/reader.js",
				],
				tasks: ['dashboard']
			},
			application: {
				files: [
					'bundle/js/application.js',
					'bundle/js/application/*.js',
					"bundle/js/application/**/*.js",
				],
				tasks: ['application']
			},
			mapper: {
				files: [
					'bundle/js/mapper.js',
					'bundle/js/mapper/*.js',
					"bundle/js/mapper/**/*.js",
					"bundle/js/parser.js",
				],
				tasks: ['mapper']
			},
			login: {
				files: [
					'bundle/js/login.js'
				],
				tasks: ['login']
			},
			oauth: {
				files: [
					'bundle/js/oauth.js'
				],
				tasks: ['oauth']
			},
			sdk: {
				files: [
					'bundle/js/sdk.js',
					"bundle/js/reader.js",
				],
				tasks: ['sdk']
			},
			styles: {
				files: [
					'bundle/styles/*.less',
				],
				tasks: ['styles']
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			watchers: {
				tasks: [
					'watch:application',
					'watch:dashboard',
					//'watch:login',
					'watch:styles',
					//'watch:oauth',
					'watch:sdk',
					'watch:mapper',
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('dashboard', [
		'concat:dashboard',
		'uglify:dashboard',
	]);
	grunt.registerTask('application', [
		'concat:application',
		'uglify:application',
	]);
	grunt.registerTask('mapper', [
		'concat:mapper',
		//'uglify:mapper',
	]);
	grunt.registerTask('login', [
		'concat:login',
		'uglify:login',
	]);
	grunt.registerTask('oauth', [
		'concat:oauth',
		'uglify:oauth',
	]);
	grunt.registerTask('sdk', [
		'concat:sdk',
		'uglify:sdk',
	]);
	grunt.registerTask('styles', [
		'less:styles',
		'cssmin'
	]);
	grunt.registerTask('all', [
		'dashboard',
		'application',
		'mapper',
		'login',
		'oauth',
		'sdk',
		'styles'
	]);
	grunt.registerTask('default', [
		'all',
		'concurrent:watchers'
	]);

};
