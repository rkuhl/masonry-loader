module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt); // autoload tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// ### Coffee ###
		coffee: {
			common: {
				src: 'src/scripts/coffee/common/*.coffee',
				dest: 'src/scripts/common/',
				expand: true, // one-to-one mapping
				flatten: true, //remove all unnecessary nesting
				ext: '.js'
			},
			other: {
				src: 'src/scripts/coffee/*.coffee',
				dest: 'src/scripts/',
				expand: true, // one-to-one mapping
				flatten: true, //remove all unnecessary nesting
				ext: '.js'
			}
		},
		// ### Concat ###
		concat: {
			dist: {
				src: [
					'src/scripts/common/libs/*.js',
					'src/scripts/common/*.js'
				],
				dest: 'src/scripts/app.js',
			}
		},
		// ### Minify ###
		uglify: {
			build: {
				src: 'src/scripts/*.js',
				dest: 'public/scripts/',
				expand: true, // one-to-one mapping
				flatten: true, //remove all unnecessary nesting
				// ext: '.min.js'
			},
			// ### Vendor libs ###
			vendors: {
				options: {
					sourceMap: false
				},
				files: {
					'public/scripts/vendors.min.js': [
						'src/vendors/jquery/dist/jquery.js',
						'src/vendors/bootstrap-sass/assets/javascripts/bootstrap.js',
						'src/vendors/masonry/dist/masonry.pkgd.js'
					]
				}
			}
		},
		// ### SASS ###
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/style.css': 'src/css/style.scss'
				}
			}
		},
		// ### ImageMin ###
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/images/', // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/images/'
				}]
			}
		},
		// ### SVGMin ###
		svgmin: {
			options: {
				plugins: [
					{
						removeViewBox: false
					},
					{
						removeUselessStrokeAndFill: false
					}
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/images/', // Src matches are relative to this path
					src: ['**/*.svg'],
					dest: 'public/images/'
				}]
			}
		},
		// ### Sync (copy dev) ###
		sync: {
			dev: {
				files: [
					// scripts (pseudo minified)
					{
						cwd: 'src/scripts/',
						src: ['*.js'],
						dest: 'public/scripts/'
					},
					// images (pseudo optimized)
					{
						cwd: 'src/images/',
						src: ['**/*.{png,jpg,gif,svg}'],
						dest: 'public/images/'
					}
				]

			}
		},
		// ### Watch ###
		watch: {
			options: {
				livereload: true
			},
			coffee: {
				files: ['src/scripts/coffee/common/*.coffee', 'src/scripts/coffee/*.coffee'],
				tasks: ['coffee', 'concat', 'sync:dev'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['src/scripts/*.js', 'src/scripts/libs/*.js'],
				tasks: ['concat', 'sync:dev'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['src/css/*.scss', 'src/css/utilities/*.scss', 'src/css/libs/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['src/images/*.{png,jpg,gif,svg}'],
				tasks: ['sync:dev'],
				options: {
					spawn: false
				}
			}
		}

	});
	
	// ### build (PRODUCTION)
	grunt.registerTask('build', ['coffee', 'concat', 'uglify', 'sass', 'imagemin', 'svgmin']);

	// ### default (DEV)
	grunt.registerTask('default', ['coffee', 'concat', 'sass:dist', 'sync:dev', 'watch']);

	// ### vendors
	grunt.registerTask('vendors', ['uglify:vendors']);	


};