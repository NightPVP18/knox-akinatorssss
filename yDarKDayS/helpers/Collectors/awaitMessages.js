const EventEmitter = require("events").EventEmitter;
const collectors = [];

class MessageCollector extends EventEmitter {//Altyapı yDarKDayS a Aittir !!! https://www.youtube.com/c/yDarKDayS
	constructor(channel, filter, options = {}) {
		super();
		this.filter = filter;
		this.channel = channel;
		this.options = options;
		this.ended = false;
		this.collected = [];

		collectors.push(this);//Altyapı yDarKDayS a Aittir !!! https://www.youtube.com/c/yDarKDayS
		if(options.time) setTimeout(() => this.stop("time"), options.time);
	}

	verify(message) {
		if(this.channel.id !== message.channel.id) return false;
		if(this.filter(message)) {
			this.collected.push(message);

			this.emit("message", message);
			if(this.collected.length >= this.options.maxMatches) this.stop("maxMatches");//Altyapı yDarKDayS a Aittir !!! https://www.youtube.com/c/yDarKDayS
			return true;
		}

		return false;
	}

	stop(reason) {
		if(this.ended) return;
		this.ended = true;

		collectors.splice(collectors.indexOf(this), 1);
		this.emit("end", this.collected, reason);
	}
}

let listening = false;//Altyapı yDarKDayS a Aittir !!! https://www.youtube.com/c/yDarKDayS
module.exports = Eris => {
	Eris.Channel.prototype.awaitMessages = function (filter, options) {
		if(!listening) {
			this.client.on("messageCreate", message => {
				for(const collector of collectors) collector.verify(message);
			});

			listening = true;
		}

		const collector = new MessageCollector(this, filter, options);
		return new Promise(resolve => collector.on("end", resolve));
	};//Altyapı yDarKDayS a Aittir !!! https://www.youtube.com/c/yDarKDayS
};
//Altyapı yDarKDayS a Aittir !!! https://www.youtube.com/c/yDarKDayS