const fs = require('fs');

const updateSecretsFile = (keys, values) => {

	if(keys.length !== values.length) return;
	const filepath = './.biteswipe.env.js';

	return fs.readFile(filepath, 'utf8', (err, data) => {
	  if (err) throw err;

	  // delete all spaces and empty lines, then split by new line
	  let lines = data.replace(/^\s*[\r\n]/gm, '').split(/\n/);
	  const header = lines.shift();
	  const footer = lines.pop();

	  lines = lines.map((line, index) => {
	  	const k = line.split(':')[0].trim();
	  	const v = line.split(':')[1].trim();
	  	const eol = index !== lines.length - 1 ? ',' : '';
	  	let updatedLine = line;
	  	if(keys.includes(k)) {
	  		const index = keys.indexOf(k);
	  		updatedLine = `\t${keys[index]}: \'${values[index]}\'${eol}`;
	  		keys.splice(index, 1);
	  		values.splice(index, 1);
	  	}
	  	return updatedLine;
	  });

	  if(keys.length && values.length) {
	  	// add comma to last line
	  	lines[lines.length - 1] = lines[lines.length - 1] + ',';
	  	for(let i = 0; i < keys.length; i++) {
	  		const eol = i !== keys.length - 1 ? ',' : '';
	  		lines.push(`\t${keys[i]}: \'${values[i]}\'${eol}`);
	  	};
	  };

	  const result = header + '\n' + lines.join('\n') + '\n' + footer;

	  fs.writeFile(filepath, result, 'utf8', err => {
	  	if(err) throw err;
	  });

	});

};

module.exports = {
	updateSecretsFile
};