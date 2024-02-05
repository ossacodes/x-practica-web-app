<!-- App.svelte -->
<script>
    // @ts-ignore
    import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  
    let controlsLayout = [
      'previousFrame',
      'playpause',
      'stop',
      'nextFrame',
      'progress',
      'frame',
      'loop',
      'spacer',
      'background',
      'snapshot',
      'zoom',
      'info',
    ];
  </script>
  
  <LottiePlayer
    src="../../src/lib/assets/AILoader.json"
    autoplay="{true}"
    loop="{true}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{100}"
    width="{100}"
    controlsLayout="{controlsLayout}"
  />