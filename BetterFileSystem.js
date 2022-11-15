import fs from 'node:fs';

class File {
	constructor({ name }) {
		this.name = name;
		this.data;
		// this.additional = false;
	}
	changeValues = ({ name, data }) => {
		name != undefined ? this.name = name : 0;
		data != undefined ? this.data = data : 0;
	}
	//TXT
	readFileAsText = () => {
		if (fs.existsSync(this.name)) return fs.readFileSync(this.name, { encoding: 'utf-8', flag: 'r' });
		return '';
	}
	writeFileAsText = (data = this.data) => {
		fs.writeFileSync(this.name, data);
		return this;
	}
	appendDataToFileAsText = (data = this.data, after = true) => {
		let [textBefore, textAfter] = ['', ''];
		after ? textAfter = data : textBefore = data;
		return this.writeFileAsText(textBefore + this.readFileAsText(this.name) + textAfter);
	}
	//JSON
	readJson = () => {
		let data = this.readFileAsText(this.name);
		if (!data) return {};
		return JSON.parse(data);
	}
	writeJson = (data = this.data) => {
		return this.writeFileAsText(JSON.stringify(data))
	}
	mergeJson = (data = this.data) => {
		let oldData = this.readFileAsText(this.name);
		if (!oldData) {
			this.writeJson(data);
			return this;
		};
		let merged = Object.assign(JSON.parse(oldData), data);
		this.writeJson(merged);
		return this;
	}
}

export default class BetterFileSystem {
	constructor({ name, settings, config }) {
		this.File = new File({ name });
		this.fileName = name;
		this.defaultFileType = "txt";
		this.settings = {
			"json": {
				"mode": 'merge',
			},
			"txt": {
				"mode": '',
			}
		}
		this.config = {
			"json": {
				"read": {
					"default": this.File.readJson,
				},
				"write": {
					"merge": this.File.mergeJson,
					"default": this.File.writeJson,
				},
			},
			"txt": {
				"read": {
					"default": this.File.readFileAsText,
				},
				"write": {
					"append": this.File.appendDataToFileAsText,
					"default": this.File.writeFileAsText
				},
			}
		};
		this.#setup({ config });
		return this;
	}
	#setup({ settings, config }) {
		settings ? this.settings = Object.assign(this.settings, settings) : 0;
		config ? this.config = Object.assign(this.config, config) : 0;
	}
	#chooseAction({ fileType = this.defaultFileType, action = 'read', mode }) {
		let a = this.fileName.split('.');
		if (!(a.length == 1 || (a.at(-1) == a[0] || !Object.keys(this.config).includes(a.at(-1)))))
			fileType = a.at(-1);
		if (!mode) {
			mode = this.settings[fileType]["mode"];
			!mode ? mode = 'default' : 0;
		}
		return this.config[fileType][action][mode]();
	}
	read({ name = this.fileName, fileType }) {
		this.fileName = name;
		this.File.changeValues({ name });
		this.#chooseAction({ fileType, action: 'read' });
	}
	write({ name = this.fileName, data = '', fileType, mode } = { data: '' }) {
		this.fileName = name;
		this.File.changeValues({ name, data });
		this.#chooseAction({ fileType, action: 'write', mode });
	}
}