// const SERVER_PATH = import.meta.env.PROXY_PATH;
import { loadEnv } from 'vite'

export function getProxy(mode) {
	const IOT_PROXY_PATH = loadEnv(mode, process.cwd(), 'IOT').IOT_PROXY_PATH

	return {
		'/micro-apps': {
			target: IOT_PROXY_PATH,
			changeOrigin: true,
		},
		'/api/iot': {
			// target: "http://10.0.16.130:9088",
			// target: "http://10.0.16.112:6800",
			// target: 'http://10.0.26.4:6800',
			secure: false,
			target: IOT_PROXY_PATH,
			changeOrigin: true,
		},
		'.*/[n|s]?api2?/': {
			target: IOT_PROXY_PATH,
			changeOrigin: true,
		},
		'.*/[n|s]?api?/': {
			target: IOT_PROXY_PATH,
			changeOrigin: true,
		},
		'/service_org': {
			target: IOT_PROXY_PATH,
			changeOrigin: true,
		},
	};
}