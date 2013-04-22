#!/usr/bin/env node

var fs = require('fs'),
	path = require('path');

if (require.main === module) {
	var argv = require('optimist')
		.usage('Usage: testbuild package_name [build]\nUpdate the package.json file to the test build package name.')
		.options({
			d: {
				alias: 'dir',
				default: process.cwd(),
				describe: 'Directory where package.json is located'
			},
			v: {
				alias: 'version',
				describe: 'Read the version',
				boolean: true
			}
		})
		.check(function(argv) {
			if (argv._.length < 1) throw 'package_name required';
		})
		.argv;
		
	var package_name = argv._[0],
		build = argv._[1],
		package_json = fs.readFileSync(argv.dir + path.sep + 'package.json', 'ascii');

	package_json = JSON.parse(package_json);
	package_json.name = package_name;
	if (build) package_json.version += '-' + build;

	if (argv.version) {
		process.stdout.write(package_json.version);
		process.exit(0);
	} else {
		fs.writeFileSync(argv.dir + path.sep + 'package.json', JSON.stringify(package_json, null, '    '));
		console.log('Complete. Package name is "' + package_json.name + '", version is "' + package_json.version + '"');
	}
}