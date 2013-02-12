#!/usr/bin/env node

var fs = require('fs'),
	path = require('path');

if (require.main === module) {
	if (process.argv.length < 3) {
		console.log('Update the package.json file to the test build package name.');
		console.log('Usage: testbuild package_name [directory]');
	} else {
		var package_name = process.argv[2],
			directory = process.cwd();

		if (typeof process.argv[3] !== 'undefined') directory = process.argv[3];

		var package_json = fs.readFileSync(directory + path.sep + 'package.json', 'ascii');

		package_json = JSON.parse(package_json);
		package_json.name = package_name;

		fs.writeFileSync(directory + path.sep + 'package.json', JSON.stringify(package_json, null, '    '));
		console.log('Complete. Package name is "' + package_json.name + '".');
	}
}