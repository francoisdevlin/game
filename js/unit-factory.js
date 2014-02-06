var baseStats = {
	dragon:{
		name:"Dragon",
		crit:0.15,
		hit:100,
		atk:20,
		def:18,
		counters:1
	},
	peasant:{
		name:"Peasant",
		crit:0.05,
		hit:5,
		atk:3,
		def:2,
		counters:1
	},
	gargoyle:{
		name:"Gargoyle",
		crit:0.05,
		hit:10,
		atk:6,
		def:6,
		counters:1
	},
}

function factory(name){
	return baseStats[name];
}

function getStack(name,qty){
	var stack = factory(name);
	stack.qty = qty;
	return stack;
}


