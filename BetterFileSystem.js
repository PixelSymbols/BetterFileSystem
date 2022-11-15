import fs from 'node:fs';

class File {
	constructor({ name }) {
		this.name = name;
		this.data = '';
	}
	changeValues = ({ name, data }) => {
		name !== undefined && name!=this.name ? this.name = name : 0;
		data !== undefined && data!=this.data ? this.data = data : 0;
	}
	fileStats =()=>fs.existsSync(this.name) ? fs.statSync(this.name) : -1;
	//TXT
	readFileAsText = () => {
		if (fs.existsSync(this.name)) return fs.readFileSync(this.name, { encoding: 'utf-8', flag: 'r' });
		return '';
	}
	writeFileAsText = ({data = this.data}={}) => {
		fs.writeFileSync(this.name, data);
		return this;
	}
	appendDataToFileAsText = ({data = this.data, after = true}={}) => {
		let [textBefore, textAfter] = ['', ''];
		after ? textAfter = data : textBefore = data;
		this.writeFileAsText({data:textBefore + this.readFileAsText(this.name) + textAfter});
		return this;
	}
	//JSON
	readJson = () => {
		let data = this.readFileAsText();
		if (!data) return {};
		return JSON.parse(data);
	}
	writeJson = ({data = this.data}={}) => {
		return this.writeFileAsText({data:JSON.stringify(data)})
	}
	mergeJson = ({data = this.data}={}) => {
		let oldData = this.readFileAsText();
		if (!oldData) {
			this.writeJson({data:data});
			return this;
		};
		let merged = Object.assign(JSON.parse(oldData), data);
		this.writeJson({data:merged});
		return this;
	}
	//REMOVING
	remove = () => {
		fs.existsSync(this.name) ? fs.unlinkSync(this.name) : 0;
	}
}

export default class BetterFileSystem {
	constructor({ name, mode='default', fileType, args=[], config }) {
		this.File = new File({ name });
		this.fileConfig = {
			name: name,
			type: fileType,
		}
		this.defaultFileType = "txt";
		this.settings = {
			"mode":mode,
		};
		this.args = args;
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
					"append": (after=true)=>this.File.appendDataToFileAsText({after}),
					"default": this.File.writeFileAsText
				},
			},
		};
		this.#setup({ config });
		return this;
	}
	#setup({ config }) {
		config ? this.config = Object.assign(this.config, config) : 0;
	}
	#chooseAction({ name=this.fileConfig.name,data, fileType=this.fileConfig.type , action = 'read', mode ,args=this.args}) {
		//values
		this.File.changeValues({ name, data });

		//filetype
		let a = name.split('.');
		if (a.length > 1 && (a.at(-1) != a[0] && Object.keys(this.config).includes(a.at(-1))) && !fileType)
			fileType = a.at(-1);
		!fileType ? fileType = this.defaultFileType : 0;

		//mode
		!mode && action=="write" ? mode = this.settings["mode"] : 0;
		!mode ? mode = 'default' : 0;
		return this.config[fileType][action][mode](...args);
	}
	read({ name, fileType=this.fileConfig.type }={}) {
		return this.#chooseAction({ name, fileType, action: 'read' });
	}
	write({ name, data = '', fileType=this.fileConfig.type, mode ,args}={}) {
		this.#chooseAction({ name, data, fileType, action: 'write', mode ,args});
		return this;
	}
	remove({name=this.fileConfig.name}={}){
		this.File.changeValues({ name });
		this.File.remove();
		return this;
	}
	info({name=this.fileConfig.name}={}){
		this.File.changeValues({ name });
		let stats = this.File.fileStats();
		if(stats==-1)
			return {exist: false}
		return {
			exist: true,
			sizeInBytes: stats.size,
			sizeInMegabytes: stats.size/(1024*1024),
			stats,
		};
	}
}