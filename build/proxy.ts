const SERVER_PATH = import.meta.env.PROXY_PATH;

export const proxy = {
	'/micro-apps': {
		target: SERVER_PATH,
		changeOrigin: true,
	},
	'/api/iot': {
		// target: "http://10.0.16.130:9088",
		// target: "http://10.0.16.112:6800",
		// target: 'http://10.0.26.4:6800',
		target: SERVER_PATH,
		changeOrigin: true,
	},
	'.*/[n|s]?api2?/': {
		target: SERVER_PATH,
		changeOrigin: true,
	},
	'.*/[n|s]?api?/': {
		target: SERVER_PATH,
		changeOrigin: true,
		logLevel: 'debug',
	},
	'/service_org': {
		target: SERVER_PATH,
		changeOrigin: true,
	},
};