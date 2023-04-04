// const SERVER_PATH = import.meta.env.PROXY_PATH;
import { loadEnv } from 'vite'

export function getProxy(mode) {
	const SERVER_PATH = loadEnv(mode, process.cwd()).PROXY_PATH

	return {
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
}