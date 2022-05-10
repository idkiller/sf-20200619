const dev = process.env.NODE_ENV === 'development';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: dev ? '' : '/sf-20200619',
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false
		}),
		prerender: {
			default: true
		},
		trailingSlash: 'always'
	}
};

export default config;
