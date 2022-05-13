<script>
    import { onMount } from 'svelte';

    onMount(async () => {
        const Reveal = (await import('reveal.js')).default;
        const Markdown = (await import('reveal.js/plugin/markdown/markdown.js')).default;

        let deck = new Reveal({
            plugins: [ Markdown ]
        });
        deck.initialize();
    })
</script>

<div class="reveal">
    <div class="slides">
        <section data-background-video="/vidoes/0178-0642.mp4">
        </section>
    </div>
</div>