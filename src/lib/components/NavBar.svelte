<script>

	import { tocCrawler } from "@skeletonlabs/skeleton";

</script>
<nav class="flex items-center justify-center p-6 bg-transparent">

    <div class='flex items-center justify-evenly' >
        <div class='hidden w-40 lg:flex '>
        </div>
        <div class='flex'>
            <a href="#how-it-works" use:tocCrawler={{ scrollTarget: '#how-it-works' }}
                class="hidden text-xl text-gray-400 transition-all cursor-pointer lg:flex regular-16 flexCenter hover:font-bold hover:text-white" >
                How?
            </a>
            <div class="flex items-center flex-shrink-0 px-20 text-white">
                <h1 class="text-2xl font-semibold tracking-tight">X<span class='text-[#577CFF]'>Practica</span></h1>
            </div>
            <a href="/"
                class="hidden text-xl text-gray-400 transition-all cursor-pointer lg:flex regular-16 flexCenter hover:font-bold hover:text-white" >
                Pricing
            </a>
        </div>

        <div class='hidden w-20 lg:flex '>
        </div>

        <div class='hidden lg:flex md:hidden'>
            <a href='/main/Register' class="text-white bg-indigo-500 rounded-full btn">Try Free</a>
        </div>

    </div>

</nav>