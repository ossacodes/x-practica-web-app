<script>
	// @ts-nocheck

	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';

	// Import each language module you require
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import json from 'highlight.js/lib/languages/json';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import shell from 'highlight.js/lib/languages/shell';
	import python from 'highlight.js/lib/languages/python';
	import php from 'highlight.js/lib/languages/php';
	import java from 'highlight.js/lib/languages/java';
	import cpp from 'highlight.js/lib/languages/cpp';
	import csharp from 'highlight.js/lib/languages/csharp';
	import go from 'highlight.js/lib/languages/go';
	import kotlin from 'highlight.js/lib/languages/kotlin';
	import ruby from 'highlight.js/lib/languages/ruby';
	import rust from 'highlight.js/lib/languages/rust';
	import swift from 'highlight.js/lib/languages/swift';
	import dart from 'highlight.js/lib/languages/dart';
	import sql from 'highlight.js/lib/languages/sql';
	import perl from 'highlight.js/lib/languages/perl';
	import r from 'highlight.js/lib/languages/r';
	import scala from 'highlight.js/lib/languages/scala';
	import bash from 'highlight.js/lib/languages/bash';
	import groovy from 'highlight.js/lib/languages/groovy';
	import lua from 'highlight.js/lib/languages/lua';
	import matlab from 'highlight.js/lib/languages/matlab';
	import powershell from 'highlight.js/lib/languages/powershell';
	import yaml from 'highlight.js/lib/languages/yaml';

	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	// Register each imported language module
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('shell', shell);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('php', php);
	hljs.registerLanguage('java', java);
	hljs.registerLanguage('cpp', cpp);
	hljs.registerLanguage('csharp', csharp);
	hljs.registerLanguage('go', go);
	hljs.registerLanguage('kotlin', kotlin);
	hljs.registerLanguage('ruby', ruby);
	hljs.registerLanguage('rust', rust);
	hljs.registerLanguage('swift', swift);
	hljs.registerLanguage('dart', dart);
	hljs.registerLanguage('sql', sql);
	hljs.registerLanguage('perl', perl);
	hljs.registerLanguage('r', r);
	hljs.registerLanguage('scala', scala);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('groovy', groovy);
	hljs.registerLanguage('lua', lua);
	hljs.registerLanguage('matlab', matlab);
	hljs.registerLanguage('powershell', powershell);
	hljs.registerLanguage('yaml', yaml);

	storeHighlightJs.set(hljs);

	// Define the regex for headings, paragraphs, and list items.
	const headingRegex = /^(.*?):\s/gm;
	const paragraphRegex = /(\n|^)(.*?)(?=\n|$)/g;
	const listItemRegex = /(\d+\.\s)(.*?)(?=\d+\.\s|$)/g;
	const newLineRegex = /\n/g;

	// Function to apply the regex and return formatted HTML.
	const formatText = (inputText) => {
		// Format headings with extra break for spacing
		let formattedText = inputText.replace(headingRegex, '<h2 style="text-align: left;">$1:</h2>');

		// Format paragraphs
		formattedText = formattedText.replace(paragraphRegex, '<p style="text-align: justify;">$2</p>');

		// Format list items
		formattedText = formattedText.replace(listItemRegex, '<li>$2</li>');

		// Wrap list items in <ul> tags, if any list items are present
		if (formattedText.match(/<li>/)) {
			formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
		}

		// Replace new lines with paragraph breaks for normal text
		formattedText = formattedText
			.split(newLineRegex)
			.map((paragraph) => (paragraph.trim() ? `<p style="text-align: justify;">${paragraph.trim()}</p>` : ''))
			.join('');

		return formattedText;
	};

	/**
	 * @type {{ content: string; }}
	 */
	export let message; // your message object

	let parts = [];

	// Split message content by code block and inline code
	$: {
		const codeRegex = /(```[\w\s\S]*?```)|(`[^`]*`)/gs;
		parts = message.content.split(codeRegex).map((part) => {
			if (!part) return { text: '' };
			const blockMatch = /```(\w*)\s*([\s\S]*)```/.exec(part);
			const inlineMatch = /`([^`]*)`/.exec(part);
			if (blockMatch) {
				return { language: blockMatch[1] || 'ts', code: blockMatch[2] };
			} else if (inlineMatch) {
				return { inlineCode: inlineMatch[1] };
			} else {
				return { text: part };
			}
		});
	}
</script>

{#each parts as part (part)}
	{#if part.code}
		<CodeBlock language={part.language} code={part.code}></CodeBlock>
	{:else if part.inlineCode}
		<span class="px-0.5 bg-green-500 bg-opacity-20 text-green-400">{part.inlineCode}</span>
	{:else}
		<!-- {@html formatText(part.text)} -->
		{@html part.text}
	{/if}
{/each}

<!-- // 	/**
// 	 * @type {{ content: string; }}
// 	 */
// 	export let message; // your message object

// 	/**
// 	 * @type {any[]}
// 	 */
// 	let parts = [];

// 	// Split message content by code block
// 	$: {
// 		const codeRegex = /(```\w*[\s\S]*?```)/gs;
// 		parts = message.content.split(codeRegex).map((part) => {
// 			const match = /```(\w*)\s*([\s\S]*)```/.exec(part);
// 			return match ? { language: match[1] || 'ts', code: match[2] } : { text: part };
// 		});
// 	}
// </script>

// {#each parts as part (part)}
// 	{#if part.code}
// 		<CodeBlock language={part.language} code={part.code}></CodeBlock>
// 	{:else}
// 		{part.text}
// 	{/if}
// {/each} -->

