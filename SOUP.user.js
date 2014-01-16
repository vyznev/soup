// ==UserScript==
// @name        Stack Overflow Unofficial Patch
// @namespace   https://github.com/vyznev/
// @description Miscellaneous client-side fixes for bugs on Stack Exchange sites (development)
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.askubuntu.com/*
// @version     1.1.5
// @updateURL   https://github.com/vyznev/soup/raw/master/SOUP.user.js
// @downloadURL https://github.com/vyznev/soup/raw/master/SOUP.user.js
// @grant       none
// @run-at      document-start
// ==/UserScript==


//
// CSS-only fixes:
//
var styles = "";

// All Stack Exchange sites in a small window causing display problems?
// http://meta.stackoverflow.com/q/114636
// XXX: .new-topbar keeps this from applying to the mobile version
styles += "body.new-topbar { min-width: 1024px }\n";

// Add a non-breaking space to "reopen (1)" and its ilk
// http://meta.stackoverflow.com/q/215473
styles += ".post-menu a { white-space: nowrap }\n";
styles += ".post-menu .lsep:after { content: ' '; font-size: 0px }\n";

// Ignoring somebody screws up the avatar list
// http://meta.stackoverflow.com/q/155308
styles += "#present-users > .present-user.ignored { height: 16px }\n";

// Layout fix for Firefox in “Zoom text only” mode
// http://meta.stackoverflow.com/q/138685
styles += "#question-mini-list, .user-header-left, .user-panel > .user-panel-content > table { clear: both }\n";

// Topbar text are pushed down on beta sites
// http://meta.stackoverflow.com/q/211547
styles += ".topbar { line-height: 1 }\n";

// Background in OP's user name can obscure text in multiline comments
// http://meta.stackoverflow.com/q/114109
styles += ".comment-copy { position: relative }\n";


//
// Fixes that need scripting (run in page context):
//
var scripts = function () {
	var ajaxHooks = [];

	// Cannot navigate into the multicollider with keyboard - so cannot access main / meta anymore
	// http://meta.stackoverflow.com/q/207526
	hookAjax( /^\/topbar\//, function () {
		$('.js-site-switcher-button').after($('.siteSwitcher-dialog'));
		$('.js-inbox-button').after($('.inbox-dialog'));
		$('.js-achievements-button').after($('.achievements-dialog'));
	} );
	// fix bug causing clicks on the site search box to close the menu
	// XXX: this would be a lot easier if jQuery bubbled middle/right clicks properly :-(
	$._data(document, 'events').click.forEach( function (h) {
		if ( !/\$corral\b/.test( h.handler.toString() ) ) return;
		var oldHandler = h.handler;
		h.handler = function (e) {
			if ( $(e.target).closest('.topbar-dialog').length ) return;
			return oldHandler.apply(this, arguments);
		};
	} );

	// Un-fade low-score answers on rollover or click
	// http://meta.stackoverflow.com/q/129593
	// XXX: this is ugly, but avoids assuming anything about how downvoted answers are styled on each site
	$('#answers').on('mouseover', '.downvoted-answer',
		function () { $(this).addClass('downvoted-answer-hover').removeClass('downvoted-answer') }
	).on('mouseout',  '.downvoted-answer-hover:not(.clicked)',
		function () { $(this).addClass('downvoted-answer').removeClass('downvoted-answer-hover') }
	).on('click', '.downvoted-answer-hover .post-text',
		function () { $(this).closest('.downvoted-answer-hover').toggleClass('clicked') }
	);
	
	// Allow flagging a comment after upvoting it
	// http://meta.stackoverflow.com/q/104184
	hookAjax( /^\/posts\/\d+\/comments\b/, function () {
		$('.comment-up-on').closest('table').not(':has(.comment-flag)').append(
			// better hardcode this, so it'll break cleanly rather than mysteriously if SE code changes
			'<tr><td>&nbsp;</td><td><a class="comment-flag soup-injected-fake"' +
			' title="flag this comment as unconstructive, offensive, or spam">flag</a></td></tr>'
		);
	} ).code();
	hookAjax( /^\/posts\/comments\/\d+\/vote\b/, function () {
		$('.comment-up-on').closest('tr').siblings('tr:has(.comment-flag)').show();
	} );
	
	// SSL breaks TeX rendering
	// http://meta.stackoverflow.com/q/215450
	if ( 'https:' == location.protocol && 'undefined' === typeof(MathJax) ) {
		$('script[src^="http://cdn.mathjax.org/"]').remove().each( function () {
			$.ajax( {
				dataType: "script", cache: true,
				url: this.src.replace('http://cdn.mathjax.org', 'https://c328740.ssl.cf1.rackcdn.com')
			} );
		} );
	}

	// Can we have the suggested questions' titles parsed by default?
	// http://meta.math.stackexchange.com/q/11036
	hookAjax( /^\/search\/titles\b/, function () {
		typeof(MathJax) !== 'undefined' && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'question-suggestions']);
	} );


	//
	// 10k tools fixes:
	//
	if ( /^\/tools\b/.test( location.pathname ) ) {
		// Can we have the "50 more" link return items of the same type, please?
		// http://meta.stackoverflow.com/q/150069
		$('body.tools-page .bottom-notice a[href="/tools/flagged"]').attr('href', location.href);

		// Render MathJax in the 10k tools
		// http://meta.stackoverflow.com/q/209393
		hookAjax( /^\/tools\b/, function () {
			typeof(MathJax) !== 'undefined' && MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
		} );
		// similar but unrelated issue: MathJax not shown in already flagged posts
		$('.flagged-posts .already-flagged.dno').hide().removeClass('dno');
	}
	
	// utility: run code after any matching AJAX request
	function hookAjax ( regex, code ) {
		var hook = { regex: regex, code: code };
		ajaxHooks.push( hook );
		return hook;  // for chaining
	}
	$( document ).ajaxSuccess( function( event, xhr, settings ) {
		for (var i = 0; i < ajaxHooks.length; i++) {
			if ( ajaxHooks[i].regex.test( settings.url ) ) {
				setTimeout( ajaxHooks[i].code, 100 );
			}
		}
	} );
	
	console.log('soup scripts loaded');
};


//
// MathJax config tweaks (need to be injected early):
//
var mathJaxSetup = function () {
	// The scope of \newcommand is the entire page
	// http://meta.math.stackexchange.com/q/4130
	MathJax.Hub.Config( { TeX: { extensions: ["begingroup.js"] } } );
	MathJax.Hub.Register.StartupHook( "TeX begingroup Ready", function () {
		var TEX = MathJax.InputJax.TeX, TEXDEF = TEX.Definitions,
			NSSTACK = TEX.nsStack, NSFRAME = NSSTACK.nsFrame;
		var resetCmd = "resetstack";
		// tweak the ns stack code so that user defs on stack can't clobber system defs in TEXDEF
		NSSTACK.Augment( {
			// don't store system defs on root stack...
			Init: function (eqn) {
				this.isEqn = eqn; this.stack = []; this.Push(NSFRAME());
			},
			// ...but fall back to them if nothing is found on the root stack
			Find: function (name, type) {
				// kluge: don't let the reset command be redefined
				if (type == "macros" && name == resetCmd) return "SoupResetStack";
				for (var i = this.top-1; i >= 0; i--) {
					var def = this.stack[i].Find(name,type);
					if (def) {return def}
				}
				// somebody needs to be hit with a giant "S"...
				if (type == "environments") type = "environment";
				return (this.isEqn ? null : TEXDEF[type][name]);
			}
		} );
		// reset the TeX macro definition stack and prevent further changes to system defs
		var resetStack = function () {
			TEX.rootStack.Init();
			TEX.eqnStack.Init(true);
		};
		resetStack();
		TEX.Parse.Augment( { SoupResetStack: resetStack } );
		// before processing, inject the reset command to any elements that should be isolated
		var select = '.post-text, .comment-text, .summary, .wmd-preview, .question-hyperlink';
		var reset = '<span class="soup-mathjax-reset"><script type="math/tex">\\' + resetCmd + '</script></span>';
		MathJax.Hub.Register.MessageHook( "Begin Process", function (message) {
			resetStack();
			$(message[1]).find(select).has('script').filter( function () {
				return 0 == $(this).children('.soup-mathjax-reset').length;
			} ).prepend(reset);
		} );
		MathJax.Hub.Startup.signal.Post("TeX SOUP reset Ready");
	} );
	// debug
	//MathJax.Hub.Startup.signal.Interest(function (message) {console.log("Startup: "+message)});
	//MathJax.Hub.signal.Interest(function (message) {console.log("Hub: "+message)});
};
styles += ".soup-mathjax-reset { display: none }\n";

var configScript = document.createElement( 'script' );
configScript.id = 'soup-mathjax-config';
configScript.type = 'text/x-mathjax-config';
configScript.textContent = "(" + mathJaxSetup + ")();";
(document.head || document.documentElement).appendChild( configScript );


//
// add collected styles and scripts to page
//
var injectScripts = function () {
	var styleElem = document.createElement( 'style' );
	styleElem.id = 'soup-styles';
	styleElem.type = 'text/css';
	styleElem.textContent = styles;
	document.head.appendChild( styleElem );

	var scriptElem = document.createElement( 'script' );
	scriptElem.id = 'soup-scripts';
	scriptElem.type = 'text/javascript';
	scriptElem.textContent = "StackExchange.ready(" + scripts + ");";
	document.body.appendChild( scriptElem );

	console.log('soup styles and scripts injected');
};
if (document.body) injectScripts();
else document.addEventListener( 'DOMContentLoaded', injectScripts );

