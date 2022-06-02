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

deck.on('slidechanged', event => {
  const elements = event.currentSlide.querySelectorAll('.onpage')
  if (!elements) return
  elements.forEach(element => {
    const clz = Array.from(element.classList.values())
    element.classList.remove(...clz)
    window.requestAnimationFrame(t => window.requestAnimationFrame(t => element.classList.add(...clz)))
  })
})

deck.on('fragmentshown', event => {
  if (event.fragment.classList.contains('iframe-ev-next')) {
    const bgif = document.querySelector('.slide-background.present iframe')
    if (bgif) {
      bgif.contentWindow.postMessage('next', '*')
    }
  }
})
deck.on('fragmenthidden', event => {
  if (event.fragment.classList.contains('iframe-ev-next')) {
    const bgif = document.querySelector('.slide-background.present iframe')
    if (bgif) {
      bgif.contentWindow.postMessage('prev', '*')
    }
  }
})

deck.initialize({
  width: 1280,
  height: 720,
  //controls: false,
  //progress: false,
  slideNumber: true,
  showSlideNumber: 'all',
  markdown: {
    baseUrl: import.meta.env.BASE_URL
  }
})
