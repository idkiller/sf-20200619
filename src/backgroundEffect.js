const StyleRules = ['\
@keyframes zoom-move {\
    0% {\
        transform: scale(1);\
        transform-origin: 50% 50%;\
        opacity: 0.25;\
    }\
    13.33% {\
        opacity: 1;\
    }\
    100% {\
        transform: scale(1.2);\
        transform-origin: 50% 50%;\
        opacity: 1;\
    }\
}',
'\
@keyframes zoom-move-left {\
    0% {\
        transform: scale(1);\
        transform-origin: calc(100% - 100px) 50%;\
        opacity: 0.25;\
    }\
    13.33% {\
        opacity: 1;\
    }\
    100% {\
        transform: scale(1.2);\
        transform-origin: calc(100% - 100px) 50%;\
        opacity: 1;\
    }\
}',
'\
@keyframes zoom-move-right {\
    0% {\
        transform: scale(1);\
        transform-origin: -100px 50%;\
        opacity: 0.25;\
    }\
    13.33% {\
        opacity: 1;\
    }\
    100% {\
        transform: scale(1.2);\
        transform-origin: -100px 50%;\
        opacity: 1;\
    }\
}'
]

const savedStyles = new Map()

const ZoomMove = {
    start: bg => {
        savedStyles.set(bg, {
            'position': bg.style.position,
            'height': bg.style.height,
            'width': bg.style.width,
            'left': bg.style.left,
            'animation': bg.style.animation
        })
        bg.style.position = 'absolute'
        bg.style.height = '100%'
        bg.style.width = 'calc(100% + 100px)'
        bg.style.left = '-50px'
        bg.style.animation = 'zoom-move 15s linear infinite'
    },
    end: bg => {
        if (!savedStyles.has(bg)) return
        bg.style.position = savedStyles.get(bg).position
        bg.style.height = savedStyles.get(bg).height
        bg.style.width = savedStyles.get(bg).width
        bg.style.left = savedStyles.get(bg).left
        bg.style.animation = savedStyles.get(bg).animation
        savedStyles.delete(bg)
    }
}

const ZoomMoveLeft = {
    start: bg => {
        ZoomMove.start(bg)
        bg.style.left = '0'
        bg.style.animation = 'zoom-move-left 15s linear infinite'
    },
    end: ZoomMove.end
}
const ZoomMoveRight = {
    start: bg => {
        ZoomMove.start(bg)
        bg.style.left = '-100px'
        bg.style.animation = 'zoom-move-right 15s linear infinite'
    },
    end: ZoomMove.end
}

const Effects = {ZoomMove, ZoomMoveLeft, ZoomMoveRight}

const Camelize = str => str ? str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase()) : ''

export default () => ({
    id: 'backgroundEffect',
    init: deck => {
        deck.on('slidechanged', event => {
            const slide = event.currentSlide
            const effect = Camelize(slide.dataset['backgroundEffect'])
            if (effect in Effects) {
                Effects[effect].start(slide.slideBackgroundContentElement)
            }
        })

        function injectStyle() {
            for (const rule of StyleRules) {
                document.styleSheets[0].insertRule(rule)
            }
        }

        if (document.readyState === 'complete') {
            injectStyle()
        }
        else {
            document.addEventListener('DOMContentLoaded', injectStyle)
        }
    },
    destroy: deck => {
    }
})