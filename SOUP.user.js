// ==UserScript==
// @name        Stack Overflow Unofficial Patch
// @namespace   https://github.com/vyznev/
// @description Miscellaneous client-side fixes for bugs on Stack Exchange sites (development)
// @version     1.7.7
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

var fixes = {};

//
// CSS-only fixes (injected *before* site CSS!):
//
fixes.mso114636 = {
	title:	"All Stack Exchange sites in a small window causing display problems?",
	url:	"http://meta.stackoverflow.com/q/114636",
	credit:	"Ben Brocka",
	css:	"body.new-topbar { min-width: 1024px }" // .new-topbar keeps this from applying to the mobile version
};
fixes.mso215473 = {
	title:	"Add a non-breaking space to “reopen (1)” and its ilk",
	url:	"http://meta.stackoverflow.com/q/215473",
	css:	".post-menu a { white-space: nowrap }" +
		".post-menu .lsep:after { content: ' '; font-size: 0px }"
};
fixes.mso138685 = {
	title:	"Layout fix for Firefox in “Zoom text only” mode",
	url:	"http://meta.stackoverflow.com/q/138685",
	credit:	"jakub.g",
	css:	"#question-mini-list, .user-header-left," +
		" .user-panel > .user-panel-content > table { clear: both }"
};
fixes.mso211547 = {
	title:	"Topbar text are pushed down on beta sites",
	url:	"http://meta.stackoverflow.com/q/211547",
	credit:	"hims056",
	css:	".topbar { line-height: 1 }"
};
fixes.mso114109 = {
	title:	"Background in OP's user name can obscure text in multiline comments",
	url:	"http://meta.stackoverflow.com/q/114109",
	css:	".comment-copy { position: relative }"
};
fixes.mso143973 = {
	title:	"Images can be pushed outside the boundaries of a post by using nested lists",
	url:	"http://meta.stackoverflow.com/q/143973",
	credit:	"animuson",
	// "body" added to increase selector precedence above conflicting SE style
	css:	"body .post-text img, body .wmd-preview img { max-width: 100% }"
};
fixes.mso217120 = {
	title:	"Ugly overflows when editing a deleted answer inline",
	url:	"http://meta.stackoverflow.com/q/217120",
	css:	".inline-editor { margin-left: -4px }"
};
fixes.mso145819 = {
	title:	"<hr/>'s do not get rendered in deleted answers",
	url:	"http://meta.stackoverflow.com/q/145819",
	css:	".wmd-preview hr { background-color: #ddd; color: #ddd }" +
		".deleted-answer .post-text hr, .deleted-answer .wmd-preview hr " +
		"{ background-color: #c3c3c3; color: #c3c3c3 }"
};
fixes.mso108046 = {
	title:	"Mouse cursor doesn't change to pointer when hovering “full site” on mobile",
	url:	"http://meta.stackoverflow.com/q/108046",
	css:	"a[onclick] { cursor: pointer }"
};

// The following three fixes are mostly made redundant by mso217779, but are
// included for users with site JS disabled, and to mitigate the loading delay
// of the JS component of mso217779:
fixes.mso136589 = {
	title:	"The monospace formatting in a spoiler quote on a beta site is evil",
	url:	"http://meta.stackoverflow.com/q/136589",
	// "body" added to increase selector precedence above conflicting SE style
	css:	"body .spoiler:hover code { background-color: #eee }"
};
fixes.mso112305 = {
	title:	"Code samples inside of spoilers are still visible on some sites",
	url:	"http://meta.stackoverflow.com/q/112305",
	css:	".spoiler:not(:hover), .spoiler:not(:hover) * " +
		"{ color: #eee; background: #eee; border-color: #eee }" +
		".spoiler:hover { color: #000 }" // related issue: text after code block remains invisible on hover
};
fixes.mso110566 = {
	title:	"Does the spoiler markdown work on images?",
	url:	"http://meta.stackoverflow.com/q/110566",
	css:	".spoiler:not(:hover) img { visibility: hidden }"
};

fixes.mso58760 = {
	title:	"<kbd> (yes, still <kbd>) doesn't play nice with lists",
	url:	"http://meta.stackoverflow.com/q/58760",
	credit:	"Krazer",
	css:	"kbd { display: inline-block }"
};
fixes.mso60390 = {
	title:	"Inconsistent padding of inline code",
	url:	"http://meta.stackoverflow.com/q/60390",
	// "body" added to increase selector precedence above conflicting SE style
	css:	"body code { padding: 1px 5px } pre code { padding: 0 }"
};
fixes.mso219740 = {
	title:	"Add spacing / padding to “Protected By…” and “Not the answer you're looking for”",
	url:	"http://meta.stackoverflow.com/q/219740",
	css:	".question-status + .bottom-notice { margin-top: 15px }"
};
fixes.mso212372 = {
	title:	"Top bar should be consistent on all sites… but it's not",
	url:	"http://meta.stackoverflow.com/q/212372",
	// the SE style sheet uses !important, so we must too :-(
	css:	".topbar .hotbg { color: white !important; background-color: #cf7721 !important }" +
		".topbar .supernovabg { color: white !important; background-color: #fe7a15 !important }"
};

// chat CSS fixes:
fixes.mso155308 = {
	title:	"Ignoring somebody screws up the avatar list",
	url:	"http://meta.stackoverflow.com/q/155308",
	credit:	"DaveRandom",
	css:	"#present-users > .present-user.ignored { height: 16px }"
};
fixes.mso216760 = {
	title:	"The reply buttons in chat shouldn't reposition themselves on pinged messages",
	url:	"http://meta.stackoverflow.com/q/216760",
	// "body" added to increase selector precedence above conflicting SE style
	css:	"body .message.highlight { margin-right: 0px }" +
		"body .message.highlight .flash { right: -38px }"  // regression: http://meta.stackoverflow.com/q/221733
};
fixes.mso222509 = {
	title:	"Getting Red Line under tags",
	url:	"http://meta.stackoverflow.com/q/222509",
	css:	".ob-post-tags a:hover, .ob-user-tags a:hover { text-decoration: none }"
};

//
// Fixes that need scripting (run in page context after jQuery / SE framework is ready):
//
fixes.mso217779 = {
	title:	"The CSS for spoilers is a mess. Let's fix it!",
	url:	"http://meta.stackoverflow.com/q/217779",
	css:	".soup-spoiler > * { opacity: 0; transition: opacity 0.5s ease-in }" +
		".soup-spoiler:hover > * { opacity: 1 }",
	script:	function () {
		if ( SOUP.isMobile ) return;  // mobile theme handles spoilers diffrently
		var fixSpoilers = function () {
			$('.spoiler').addClass('soup-spoiler').removeClass('spoiler').wrapInner('<div></div>');
		};
		SOUP.hookAjax( /^\/posts\b/, fixSpoilers );
		SOUP.hookEditPreview( fixSpoilers );
		$(document).on( 'mouseover', '.spoiler', fixSpoilers ); // fallback
		fixSpoilers();
	}
};
fixes.mso134268 = {
	title:	"U+0008 inserted into chat @-pings",
	url:	"http://meta.stackoverflow.com/q/134268",
	script:	function () {
		if ( !SOUP.isChat ) return;
		$('body#chat-body').on( 'keypress', function (e) {
			if ( e.ctrlKey || e.altKey || e.metaKey ) return;
			if ( !e.which || e.which == 32 || e.which >= 32 ) return;
			e.stopPropagation();
		} );
	}
};
fixes.mso78989 = {
	title:	"Clicking on tags broken?",
	url:	"http://meta.stackoverflow.com/q/78989",
	script:	function () {
		if ( !/[?&]sort[=]/.test( location.search ) &&
			$('body').hasClass('tagged-questions-page') &&
			$('#tabs a.youarehere').length == 0 ) {
			var href = $('#tabs a[href*="?sort="]:first').attr('href');
			if ( href ) location.replace( href );
		}
	}
};
fixes.mso207526 = {
	title:	"Cannot navigate into the multicollider with keyboard",
	url:	"http://meta.stackoverflow.com/q/207526",
	script:	function () {
		SOUP.hookAjax( /^\/topbar\//, function () {
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
	}
};
fixes.mso129593 = {
	title:	"Un-fade low-score answers on rollover or click",
	url:	"http://meta.stackoverflow.com/q/129593",
	credit:	"based on fix by Manishearth",
	script:	function () {
		// XXX: this is ugly, but avoids assuming anything about site styles
		$('#answers').on('mouseover', '.downvoted-answer', function () {
			$(this).addClass('downvoted-answer-hover').removeClass('downvoted-answer');
		} ).on('mouseout',  '.downvoted-answer-hover:not(.clicked)', function () {
			$(this).addClass('downvoted-answer').removeClass('downvoted-answer-hover');
		} ).on('click', '.downvoted-answer-hover .post-text', function () {
			$(this).closest('.downvoted-answer-hover').toggleClass('clicked');
		} );
	}
};
fixes.mso104184 = {
	title:	"Allow flagging a comment after upvoting it",
	url:	"http://meta.stackoverflow.com/q/104184",
	script:	function () {
		SOUP.hookAjax( /^\/posts\/\d+\/comments\b/, function () {
			$('.comment-up-on').closest('table').not(':has(.comment-flag)').append(
				// better hardcode this, so it'll break cleanly if SE code changes
				'<tr><td>&nbsp;</td><td><a class="comment-flag soup-injected-fake"' +
				' title="flag this comment as unconstructive, offensive, or spam">' +
				'flag</a></td></tr>'
			);
		} ).code();
		SOUP.hookAjax( /^\/posts\/comments\/\d+\/vote\b/, function () {
			$('.comment-up-on').closest('tr').siblings('tr:has(.comment-flag)').show();
		} );
	}
};
fixes.mso214706 = {
	title:	"The branch prediction answer is overflowing",
	url:	"http://meta.stackoverflow.com/q/214706",
	script:	function () {
		$('.stats .vote-count-post strong').filter( function () {
			return this.textContent.length > 4
		} ).css( 'font-size', '80%' );
	}
};
fixes.mso66646 = {
	title:	"Confirming context menu entries via Enter triggers comment to be posted",
	url:	"http://meta.stackoverflow.com/q/66646",
	script:	function () {
		if ( !window.StackExchange ) return;
		StackExchange.options.desc = true;  // disable SE keyup/press handler
		$('body').on( 'keydown keypress', 'form[id*="-comment-"] textarea',
			function (e) {
				if ( e.which != 13 || e.shiftKey ) return;
				e.preventDefault();
				if ( e.type == 'keydown' && $(this).prev('#tabcomplete:visible').length == 0 )
					$(this).closest('form').submit();
			}
		);
	}
};
fixes.mso210132 = {
	title:	"New top bar should render avatar with a transparent background",
	url:	"http://meta.stackoverflow.com/q/210132",
	script:	function () {
		$('.topbar img.avatar-me[src^="http://i.stack.imgur.com/"]').attr(
			'src', function (i,v) { return v.replace( /\?.*$/, "" ) }
		).css( { 'max-width': '24px', 'max-height': '24px' } );
	}
};
fixes.mso220470 = {
	title:	"CSS for daily site access calendar on profile page fails to load over HTTPS",
	url:	"http://meta.stackoverflow.com/q/220470",
	script:	function () {
		if ( 'https:' != location.protocol ) return;
		SOUP.hookAjax( /^\/users\/daily-site-access\b/, function (event, xhr, settings) {
			$('link[rel=stylesheet][href^="http://ajax.googleapis.com"]').attr(
				'href', function (i, href) {
					return href.replace('http:', 'https:');
				}
			);
		} );
	}
};
fixes.mso220337 = {
	title:	"Election comments have no permalink link",
	url:	"http://meta.stackoverflow.com/q/220337",
	credit:	"FEichinger",
	script:	function () {
		if ( !/^\/election\b/.test( location.pathname ) ) return;
		var base = ( $('#tabs .youarehere').attr('href') || "" ).replace( /#.*/, "" );
		$('.comment-date').not(':has(a)').wrapInner( function () {
			var id = $(this).closest('.comment').attr('id');
			return $('<a class="comment-link"></a>').attr('href', base + '#' + id);
		})
	}
};

// moderator / 10k fixes:
fixes.mso160338 = {
	title:	"Allow moderators to reply to a flag",
	url:	"http://meta.stackoverflow.com/q/160338",
	credit:	"Manishearth",
	script:	function () {
		var html1 = '<input id=soupCustomHelpfulButton type=button value="helpful"/>';
		var html2 = '<input id=soupCustomHelpfulText type=text maxlength=200' +
			' style="width:100%" placeholder="Optional message for helpful flags..."/><br/>';
		function injectCustomHelpfulField (postid) {
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
					SOUP.log('helpful flag done');
					if ( json == 'ok' || json.Success || json.success ) {
						$('#flagged-' + postid).hide();
					} else {
						var msg = json.Message || json.message;
						StackExchange.helpers.showErrorMessage( dismiss, msg );
					}
				} ).fail( function (res) {
					SOUP.log('helpful flag fail');
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
	}
};
fixes.mso150069 = {
	title:	"Can we have the \"50 more\" link return items of the same type, please?",
	url:	"http://meta.stackoverflow.com/q/150069",
	script:	function () {
		if ( !/^\/tools\b/.test( location.pathname ) ) return;
		$('body.tools-page .bottom-notice a[href="/tools/flagged"]').attr('href', location.href);
	}
};

// MathJax fixes:
fixes.mso209393 = {
	title:	"Render MathJax in the 10k tools",
	url:	"http://meta.stackoverflow.com/q/209393",
	script:	function () {
		if ( !/^\/tools\b/.test( location.pathname ) ) return;
		SOUP.hookAjax( /^\/tools\b/, function () {
			window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
		} );
	}
};
fixes.mso215450 = {
	title:	"SSL breaks TeX rendering",
	url:	"http://meta.stackoverflow.com/q/215450",
	script:	function () {
		if ( 'https:' != location.protocol || window.MathJax ) return;
		$('script[src^="http://cdn.mathjax.org/"]').remove().each( function () {
			$.ajax( {
				dataType: "script", cache: true,
				url: this.src.replace('http://cdn.mathjax.org',
					'https://c328740.ssl.cf1.rackcdn.com')
			} );
		} );
	}
};
fixes.math11036 = {
	title:	"Can we have the suggested questions' titles parsed by default?",
	url:	"http://meta.math.stackexchange.com/q/11036",
	script:	function () {
		SOUP.hookAjax( /^\/search\/titles\b/, function () {
			window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'question-suggestions']);
		} );
		// similar issue in user profiles:
		SOUP.hookAjax( /^\/ajax\/users\/panel\/\b/, function () {
			if ( !window.MathJax ) return;
			MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-panel-questions']);
			MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-panel-answers']);
		} );
	}
};
fixes.cs537 = {
	title:	"Missing MathJaX in the duplicate subtab of the close review queue",
	url:	"http://meta.cs.stackexchange.com/q/537",
	script:	function () {
		var oldShow = $.fn.show;
		$.fn.show = function () {
			this.filter('.dno').hide().removeClass('dno').each( function () {
				window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, this]);
			} );
			return oldShow.apply(this, arguments);
		};
	}
};


//
// MathJax config tweaks (need to be injected early):
//
fixes.math4130 = {
	title:	"The scope of \\newcommand is the entire page",
	url:	"http://meta.math.stackexchange.com/q/4130",
	credit:	"idea by Davide Cervone",
	mathjax:	function () {
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
	},
	css:	".soup-mathjax-reset { display: none }"
};

fixes.math11392 = {
	title:	"MathJax preview broken when equations contain `\\label`s",
	url:	"http://meta.math.stackexchange.com/q/11392",
	credit:	"Davide Cervone",
	mathjax:	function () {
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
	}
};


//
// Initialization code and utility functions:
//
var soupInit = function () {
	window.SOUP = {};
	
	// run code after jQuery and/or SE framework have loaded
	// (basically same as StackExchange.ready(), but works in chat too)
	SOUP.ready = function ( code ) {
		if ( window.StackExchange ) StackExchange.ready( code );
		else if ( window.$ ) $(document).ready( code );
		// else we do nothing; this may happen e.g. in iframes
	};
	
	// wrapper for console.log(), does nothing on old Opera w/o console
	SOUP.log = function ( msg ) {
		if ( window.console ) console.log( msg );
	};
	
	// utility: run code whenever the editor preview is updated
	SOUP.hookEditPreview = function ( code ) {
		if ( !window.StackExchange ) return;
		StackExchange.ifUsing( 'editor', function () {
			StackExchange.MarkdownEditor.creationCallbacks.add( function (ed) {
				ed.hooks.chain( 'onPreviewRefresh', code );
			} );
		} );
	};
	
	// utility: run code after any matching AJAX request
	SOUP.hookAjax = function ( regex, code, delay ) {
		if ( typeof(delay) === 'undefined' ) delay = 10;
		var hook = { regex: regex, code: code, delay: delay };
		SOUP.ajaxHooks.push( hook );
		return hook;  // for chaining
	};
	
	// infrastructure for SOUP.hookAjax()
	SOUP.ajaxHooks = [];
	SOUP.runAjaxHook = function ( hook, event, xhr, settings ) {
		if ( !hook.delay ) hook.code( event, xhr, settings );
		else setTimeout( function () { hook.code( event, xhr, settings ) }, hook.delay );
	};
	
	SOUP.log( 'soup init complete' );
};

// setup code to execute after jQuery has loaded:
var soupLateSetup = function () {
	// basic environment detection
	// (for MathJax detection, just check window.MathJax, and note that it may be loaded late due to mso215450)
	SOUP.isChat   = /^chat\./.test( location.hostname );
	SOUP.isMobile = !!( window.StackExchange && StackExchange.mobile );
	
	// attach global AJAX hooks
	$( document ).ajaxComplete( function( event, xhr, settings ) {
		for (var i = 0; i < SOUP.ajaxHooks.length; i++) {
			if ( SOUP.ajaxHooks[i].regex.test( settings.url ) ) {
				SOUP.runAjaxHook( SOUP.ajaxHooks[i], event, xhr, settings );
			}
		}
	} );
	
	SOUP.log( 'soup setup complete' );
};


//
// Inject scripts and styles into the page:
//
if ( window.console ) console.log( 'soup injecting fixes' );
var head = document.head || document.documentElement;

// SOUP object init:
var initScript = document.createElement( 'script' );
initScript.id = 'soup-init';
initScript.type = 'text/javascript';
initScript.textContent = "(" + soupInit + ")();\n";
head.appendChild( initScript );

// MathJax config:
var mathjaxScript = document.createElement( 'script' );
mathjaxScript.id = 'soup-mathjax-config';
mathjaxScript.type = 'text/x-mathjax-config';
var code = "SOUP.log( 'soup mathjax config loading' );\n";
for (var id in fixes) {
	if ( fixes[id].mathjax ) code += "(" + fixes[id].mathjax + ")();\n";
}
mathjaxScript.textContent = code;
head.appendChild( mathjaxScript );

// CSS styles:
var styleElem = document.createElement( 'style' );
styleElem.id = 'soup-styles';
styleElem.type = 'text/css';
var code = "";
for (var id in fixes) {
	if ( fixes[id].css ) code += fixes[id].css;
}
styleElem.textContent = code.replace( /[}] */g, "}\n" )
head.appendChild( styleElem );

// JS fixes (injected on document load, run after SE framework is ready):
function injectScripts () {
	var scriptElem = document.createElement( 'script' );
	scriptElem.id = 'soup-scripts';
	scriptElem.type = 'text/javascript';
	var code = "SOUP.ready(" + soupLateSetup + ");\n";
	for (var id in fixes) {
		if ( fixes[id].script ) code += "SOUP.ready(" + fixes[id].script + ");\n";
	}
	code += "SOUP.ready( function () { SOUP.log( 'soup scripts loaded' ) } );\n";
	scriptElem.textContent = code;
	document.body.appendChild( scriptElem );
}
if (document.body) injectScripts();
else if (window.opera) addEventListener( 'load', injectScripts, false );
else document.addEventListener( 'DOMContentLoaded', injectScripts );
