import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import './theme_video.scss'
import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js'

function replaceBase(element, attr) {
  const url = element.getAttribute(attr)
  if (/^[^\/#]/.test(url)) {
    element.setAttribute(attr, `${import.meta.env.BASE_URL}${url}`)
  }
}
const slides = document.querySelector('.reveal > .slides')
const attrs = ['src', 'href', 'data-src', 'data-markdown', 'data-background-video', 'data-background-image', 'data-background-iframe']
for (const attr of attrs) {
  slides.querySelectorAll(`[${attr}]`).forEach(element => replaceBase(element, attr))
}

const deck = new Reveal({
  plugins: [Markdown]
})
deck.initialize({
  width: 1280,
  height: 720,
  controls: false,
  progress: false,
  markdown: {
    baseUrl: import.meta.env.BASE_URL
  }
})