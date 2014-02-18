// ==UserScript==
// @name        Stack Overflow Unofficial Patch
// @namespace   https://github.com/vyznev/
// @description Miscellaneous client-side fixes for bugs on Stack Exchange sites
// @version     1.6.1
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.askubuntu.com/*
// @updateURL   https://github.com/vyznev/soup/raw/master/SOUP.user.js
// @downloadURL https://github.com/vyznev/soup/raw/master/SOUP.user.js
// @grant       none
// @run-at      document-start
// ==/UserScript==


// Copyright (C) 2014 Ilmari Karonen
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.


//
// CSS-only fixes:
//
var styles = "";

// All Stack Exchange sites in a small window causing display problems?
// http://meta.stackoverflow.com/q/114636 (credit: Ben Brocka)
// XXX: .new-topbar keeps this from applying to the mobile version
styles += "body.new-topbar { min-width: 1024px }\n";

// Add a non-breaking space to "reopen (1)" and its ilk
// http://meta.stackoverflow.com/q/215473
styles += ".post-menu a { white-space: nowrap }\n";
styles += ".post-menu .lsep:after { content: ' '; font-size: 0px }\n";

// Layout fix for Firefox in “Zoom text only” mode
// http://meta.stackoverflow.com/q/138685 (credit: jakub.g)
styles += "#question-mini-list, .user-header-left," +
	" .user-panel > .user-panel-content > table { clear: both }\n";

// Topbar text are pushed down on beta sites
// http://meta.stackoverflow.com/q/211547 (credit: hims056)
styles += ".topbar { line-height: 1 }\n";

// Background in OP's user name can obscure text in multiline comments
// http://meta.stackoverflow.com/q/114109
styles += ".comment-copy { position: relative }\n";

// Images can be pushed outside the boundaries of a post by using nested lists
// http://meta.stackoverflow.com/q/143973 (credit: animuson)
styles += ".post-text img, .wmd-preview img { max-width: 100% }\n";

// Ugly overflows when editing a deleted answer inline
// http://meta.stackoverflow.com/q/217120
styles += ".inline-editor { margin-left: -4px }\n";

// <hr/>'s do not get rendered in deleted answers
// http://meta.stackoverflow.com/q/145819
styles += ".wmd-preview hr { background-color: #ddd; color: #ddd }\n";
styles += ".deleted-answer .post-text hr, .deleted-answer .wmd-preview hr " +
	"{ background-color: #c3c3c3; color: #c3c3c3 }\n";

// Mouse cursor doesn't change to pointer when hovering “full site” on mobile
// http://meta.stackoverflow.com/q/108046
styles += "a[onclick] { cursor: pointer }\n";

// The monospace formatting in a spoiler quote on a beta site is evil
// http://meta.stackoverflow.com/q/136589
styles += ".spoiler:hover code { background-color: #eee }\n";

// Code samples inside of spoilers are still visible on some sites
// http://meta.stackoverflow.com/q/112305
styles += ".spoiler:not(:hover), .spoiler:not(:hover) * " +
	"{ color: #eee; background: #eee; border-color: #eee }\n";

// Does the spoiler markdown work on images?
// http://meta.stackoverflow.com/q/110566
styles += ".spoiler:not(:hover) img { visibility: hidden }\n";

// The CSS for spoilers is a mess. Let's fix it!
// http://meta.stackoverflow.com/q/217779
// XXX: This makes the three preceding fixes redundant, but requires supporting
// JS code below to replace replace the old styles with the new ones
styles += ".soup-spoiler > * { opacity: 0; transition: opacity 0.5s ease-in }\n";
styles += ".soup-spoiler:hover > * { opacity: 1 }\n";

// <kbd> (yes, still <kbd>) doesn't play nice with lists
// http://meta.stackoverflow.com/q/58760 (credit: Krazer)
styles += "kbd { display: inline-block }\n";


//
// Chat CSS fixes (currently just mixing with general CSS fixes):
//
// Ignoring somebody screws up the avatar list
// http://meta.stackoverflow.com/q/155308 (credit: DaveRandom)
styles += "#present-users > .present-user.ignored { height: 16px }\n";

// The reply buttons in chat shouldn't reposition themselves on pinged messages
// http://meta.stackoverflow.com/q/216760
styles += ".message.highlight { margin-right: 0px }\n";
styles += ".message.highlight .flash { right: -38px }\n";



//
// Fixes that need scripting (run in page context):
//
var scripts = function () {
	var ajaxHooks = [];
	
	// U+0008 inserted into chat @-pings (chat)
	// http://meta.stackoverflow.com/q/134268/174699
	// TODO: separate chat fixes from main SE fixes?
	$('body#chat-body').on( 'keypress', function (e) {
		if ( e.ctrlKey || e.altKey || e.metaKey ) return;
		if ( !e.which || e.which == 32 || e.which >= 32 ) return;
		e.stopPropagation();
	} );
	
	// Clicking on tags broken?
	// http://meta.stackoverflow.com/q/78989
	if ( !/[?&]sort[=]/.test( location.search ) &&
		$('body').hasClass('tagged-questions-page') &&
		$('#tabs a.youarehere').length == 0 ) {
		var href = $('#tabs a[href*="?sort="]:first').attr('href');
		if ( href ) location.replace( href );
	}
	
	// Cannot navigate into the multicollider with keyboard
	// http://meta.stackoverflow.com/q/207526
	hookAjax( /^\/topbar\//, function () {
		$('.js-site-switcher-button').after($('.siteSwitcher-dialog'));
		$('.js-inbox-button').after($('.inbox-dialog'));
		$('.js-achievements-button').after($('.achievements-dialog'));
	} );
	// fix bug causing clicks on the site search box to close the menu
	// XXX: this would be a lot easier if jQuery bubbled middle/right clicks :-(
	$._data(document, 'events').click.forEach( function (h) {
		if ( !/\$corral\b/.test( h.handler.toString() ) ) return;
		var oldHandler = h.handler;
		h.handler = function (e) {
			if ( $(e.target).closest('.topbar-dialog').length ) return;
			return oldHandler.apply(this, arguments);
		};
	} );
	
	// Un-fade low-score answers on rollover or click
	// http://meta.stackoverflow.com/q/129593 (based on fix by Manishearth)
	// XXX: this is ugly, but avoids assuming anything about site styles
	$('#answers').on('mouseover', '.downvoted-answer', function () {
		$(this).addClass('downvoted-answer-hover').removeClass('downvoted-answer');
	} ).on('mouseout',  '.downvoted-answer-hover:not(.clicked)', function () {
		$(this).addClass('downvoted-answer').removeClass('downvoted-answer-hover');
	} ).on('click', '.downvoted-answer-hover .post-text', function () {
		$(this).closest('.downvoted-answer-hover').toggleClass('clicked');
	} );
	
	// Allow flagging a comment after upvoting it
	// http://meta.stackoverflow.com/q/104184
	hookAjax( /^\/posts\/\d+\/comments\b/, function () {
		$('.comment-up-on').closest('table').not(':has(.comment-flag)').append(
			// better hardcode this, so it'll break cleanly if SE code changes
			'<tr><td>&nbsp;</td><td><a class="comment-flag soup-injected-fake"' +
			' title="flag this comment as unconstructive, offensive, or spam">' +
			'flag</a></td></tr>'
		);
	} ).code();
	hookAjax( /^\/posts\/comments\/\d+\/vote\b/, function () {
		$('.comment-up-on').closest('tr').siblings('tr:has(.comment-flag)').show();
	} );
	
	// The branch prediction answer is overflowing
	// http://meta.stackoverflow.com/q/214706
	$('.stats .vote-count-post strong').filter( function () {
		return this.textContent.length > 4
	} ).css( 'font-size', '80%' );
	
	// Confirming context menu entries via Enter triggers comment to be posted
	// http://meta.stackoverflow.com/q/66646
	StackExchange.options.desc = true;  // disable SE keyup/press handler
	$('body').on( 'keydown keypress', 'form[id*="-comment-"] textarea',
		function (e) {
			if ( e.which != 13 || e.shiftKey ) return;
			e.preventDefault();
			if ( e.type == 'keydown' && $(this).prev('#tabcomplete:visible').length == 0 )
				$(this).closest('form').submit();
		}
	);
	
	// New top bar should render avatar with a transparent background
	// http://meta.stackoverflow.com/q/210132
	$('.topbar img.avatar-me[src^="http://i.stack.imgur.com/"]').attr(
		'src', function (i,v) { return v.replace( /\?.*$/, "" ) }
	).css( { 'max-width': '24px', 'max-height': '24px' } );
	
	// Allow moderators to reply to a flag (mod)
	// http://meta.stackoverflow.com/q/160338 (credit: Manishearth)
	function injectCustomHelpfulField (postid) {
		var html1 = '<input id=soupCustomHelpfulButton type=button value="helpful"/>';
		var html2 = '<input id=soupCustomHelpfulText type=text maxlength=200' +
			' style="width:100%" placeholder="Optional message for helpful flags..."/><br/>';
		var hButton = $('.popup input[type="button"][value="helpful"]:first');
		hButton.hide().after(html1);
		$('#soupCustomHelpfulButton ~ br:first').after(html2);
		$('#soupCustomHelpfulButton').click( function () {
			if( !/\S/.test( $('#soupCustomHelpfulText').val() ) ) {
				hButton.click(); return;
			}
			var dismiss = $('#flagged-' + postid + ' .dismiss-options');
			$.post( "/messages/delete-moderator-messages/" + postid +
				"/" + renderTimeTicks + "?valid=true", {
				fkey: StackExchange.options.user.fkey,
				comment: $('#soupCustomHelpfulText').val()
			} ).done( function (json) {
				if (window.console) console.log('helpful flag done');
				if ( json == 'ok' || json.Success || json.success ) {
					$('#flagged-' + postid).hide();
				} else {
					var msg = json.Message || json.message;
					StackExchange.helpers.showErrorMessage( dismiss, msg );
				}
			} ).fail( function (res) {
				if (window.console) console.log('helpful flag fail');
				var msg = ( res.responseText && res.responseText.length < 100
					? res.responseText : "An unknown error occurred" );
				StackExchange.helpers.showErrorMessage( dismiss, msg );
			} );
			$(this).closest('.popup').find('.popup-close a').click();
		} );
	};
	$("table.flagged-posts.moderator .dismiss-all").click( function () {
		var postid = $(this).closest('tr[id^="flagged-"]').attr('id').replace("flagged-", "");
		if (postid) setTimeout( function () { injectCustomHelpfulField(postid) }, 200 );
	} );
	
	// Can we have the "50 more" link return items of the same type, please? (10k)
	// http://meta.stackoverflow.com/q/150069
	if ( /^\/tools\b/.test( location.pathname ) ) {
		$('body.tools-page .bottom-notice a[href="/tools/flagged"]').
			attr('href', location.href);
	}
	
	// Render MathJax in the 10k tools (10k, math)
	// http://meta.stackoverflow.com/q/209393
	if ( /^\/tools\b/.test( location.pathname ) ) {
		hookAjax( /^\/tools\b/, function () {
			typeof(MathJax) !== 'undefined' &&
				MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
		} );
	}
	
	// SSL breaks TeX rendering (math, SSL)
	// http://meta.stackoverflow.com/q/215450
	if ( 'https:' == location.protocol && 'undefined' === typeof(MathJax) ) {
		$('script[src^="http://cdn.mathjax.org/"]').remove().each( function () {
			$.ajax( {
				dataType: "script", cache: true,
				url: this.src.replace('http://cdn.mathjax.org',
					'https://c328740.ssl.cf1.rackcdn.com')
			} );
		} );
	}
	
	// Can we have the suggested questions' titles parsed by default? (math)
	// http://meta.math.stackexchange.com/q/11036
	hookAjax( /^\/search\/titles\b/, function () {
		typeof(MathJax) !== 'undefined' &&
			MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'question-suggestions']);
	} );
	// similar issue in user profiles:
	hookAjax( /^\/ajax\/users\/panel\/\b/, function () {
		if ( typeof(MathJax) === 'undefined' ) return;
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-panel-questions']);
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-panel-answers']);
	} );
	
	// Missing MathJaX in the duplicate subtab of the close review queue (math)
	// http://meta.cs.stackexchange.com/q/537 (and similar issues)
	var oldShow = $.fn.show;
	$.fn.show = function () {
		this.filter('.dno').hide().removeClass('dno').each( function () {
			typeof(MathJax) !== 'undefined' &&
				MathJax.Hub.Queue(['Typeset', MathJax.Hub, this]);
		} );
		return oldShow.apply(this, arguments);
	};

	// The CSS for spoilers is a mess. Let's fix it!
	// http://meta.stackoverflow.com/q/217779
	// This JS code replaces the "spoiler" class with "soup-spoiler", in effect
	// disabling all the existing broken spoiler styles.
	if ( !StackExchange.mobile ) {
		function fixSpoilers () {
			$('.spoiler').addClass('soup-spoiler').removeClass('spoiler').
				wrapInner('<div></div>');
		};
		hookAjax( /^\/posts\b/, fixSpoilers );
		$(document).on( 'mouseover', '.spoiler', fixSpoilers ); // fallback
		fixSpoilers();
		// XXX: this could be generally useful; split into utility function?
		StackExchange.ifUsing( 'editor', function () {
			StackExchange.MarkdownEditor.creationCallbacks.add( function (ed) {
				ed.hooks.chain( 'onPreviewRefresh', fixSpoilers );
			} );
		} );
	}
	
	
	
	//
	// utility: run code after any matching AJAX request
	//
	function hookAjax ( regex, code, delay ) {
		if ( typeof(delay) === 'undefined' ) delay = 100;
		var hook = { regex: regex, code: code, delay: delay };
		ajaxHooks.push( hook );
		return hook;  // for chaining
	}
	function runAjaxHook ( hook, event, xhr, settings ) {
		if ( !hook.delay ) hook.code( event, xhr, settings );
		else setTimeout( function () { hook.code( event, xhr, settings ) }, hook.delay );
	}
	$( document ).ajaxComplete( function( event, xhr, settings ) {
		for (var i = 0; i < ajaxHooks.length; i++) {
			if ( ajaxHooks[i].regex.test( settings.url ) ) {
				runAjaxHook( ajaxHooks[i], event, xhr, settings );
			}
		}
	} );
	
	if (window.console) console.log('soup scripts loaded');
};


//
// MathJax config tweaks (need to be injected early):
//
var mathJaxSetup = function () {
	// The scope of \newcommand is the entire page
	// http://meta.math.stackexchange.com/q/4130 (idea by Davide Cervone)
	var resetCmd = "resetstack";
	MathJax.Hub.Config( { TeX: {
		extensions: ["begingroup.js"],
		Macros: { resetstack: ["Extension", "begingroup"] }
	} } );
	MathJax.Hub.Register.StartupHook( "TeX begingroup Ready", function () {
		var TEX = MathJax.InputJax.TeX, TEXDEF = TEX.Definitions,
			NSSTACK = TEX.nsStack, NSFRAME = NSSTACK.nsFrame;
		// make sure user defs on stack can't clobber system defs in TEXDEF
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
		// reset definition stack and prevent further changes to system defs
		var resetStack = function () {
			TEX.rootStack.Init();
			TEX.eqnStack.Init(true);
		};
		resetStack();
		TEX.Parse.Augment( { SoupResetStack: resetStack } );
		MathJax.Hub.Startup.signal.Post("TeX SOUP reset Ready");
	} );
	// before processing, inject the reset command to any elements that should be isolated
	var select = '.post-text, .comment-text, .summary, .wmd-preview, .question-hyperlink';
	var reset = '<span class="soup-mathjax-reset"><script type="math/tex">\\' +
		resetCmd + '</script></span>';
	MathJax.Hub.Register.MessageHook( "Begin Process", function (message) {
		$(message[1]).find(select).andSelf().has('script').filter( function () {
			return 0 == $(this).children('.soup-mathjax-reset').length;
		} ).prepend(reset);
	} );
	
	// MathJax preview broken when equations contain `\label`s
	// http://meta.math.stackexchange.com/q/11392 (credit: Davide Cervone)
	MathJax.Hub.Register.MessageHook("Begin Process",function (message) {
		if (message[1].id && message[1].id.match(/^wmd-preview/)) {
			if ( MathJax.InputJax.TeX.resetEquationNumbers )
				MathJax.InputJax.TeX.resetEquationNumbers();
			MathJax.Hub.Config({TeX:{noErrors:{disabled:true}}});
		}
	});
	MathJax.Hub.Register.MessageHook("End Process",function (message) {
		if (message[1].id && message[1].id.match(/^wmd-preview/)) {
			MathJax.Hub.Config({TeX:{noErrors:{disabled:false}}});
		}
	});
	
	// debug
	//MathJax.Hub.Startup.signal.Interest(function (message) {console.log("Startup: "+message)});
	//MathJax.Hub.signal.Interest(function (message) {console.log("Hub: "+message)});
	if (window.console) console.log( 'soup mathjax fixes applied' );
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
	(document.head || document.documentElement).appendChild( styleElem );
	
	var scriptElem = document.createElement( 'script' );
	scriptElem.id = 'soup-scripts';
	scriptElem.type = 'text/javascript';
	scriptElem.textContent = "(window.StackExchange || $(document)).ready(" + scripts + ");";
	document.body.appendChild( scriptElem );
	
	if (window.console) console.log('soup styles and scripts injected');
};
if (document.body) injectScripts();
else if (window.opera) addEventListener( 'load', injectScripts, false );
else document.addEventListener( 'DOMContentLoaded', injectScripts );
