// ==UserScript==
// @name        Stack Overflow Unofficial Patch
// @namespace   https://github.com/vyznev/
// @description Miscellaneous client-side fixes for bugs on Stack Exchange sites
// @version     1.9.8
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


( function () {  // start of anonymous wrapper function (needed to restrict variable scope on Opera)

// Opera does not support @match, so re-check that we're on an SE site before doing anything
var include_re = /(^|\.)((stack(exchange|overflow|apps)|superuser|serverfault|askubuntu)\.com|mathoverflow\.net)$/;
if ( ! include_re.test( location.hostname ) ) return;

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
fixes.mso224411 = {
	title:	"Old top bar site icons are too big in chat lobby",
	url:	"http://meta.stackoverflow.com/q/224411",
	css:	"#portalLink .siteFavicon img { width: 16px; height: 16px }"
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
fixes.mso224233 = {
	title:	"Problem in css style loading in Search Bar after refresh page when using FF",
	url:	"http://meta.stackoverflow.com/q/224233",
	script:	function () {
		if ( ! SOUP.isChat ) return;
		$('#searchbox, #search').off('focus blur').attr( 'placeholder', function () {
			var $this = $(this);
			if ( $this.closest('#roomsearch').length ) return 'filter rooms';
			else if ( $this.closest('#usersearch').length ) return 'filter users';
			else return 'search';
		} ).filter('.watermark').val('').removeClass('watermark');
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
		if ( SOUP.isMobile ) return;  // mobile view has no flag links; see http://meta.stackoverflow.com/q/213709
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
		if ( !window.StackExchange || !StackExchange.options ) return;
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
		SOUP.hookAjax( /^\/posts\/\d+\/comments\b/, function () {
			$('.comment-date').not(':has(a)').wrapInner( function () {
				var id = $(this).closest('.comment').attr('id');
				return $('<a class="comment-link"></a>').attr('href', base + '#' + id);
			} );
		} ).code();
		// fix post links too, while we're at it
		$('.post-menu a:contains("link")').attr( 'href', function (i, href) {
			return href.replace( /^[^#]*/, base );
		} );
	}
};
fixes.mso223725 = {
	title:	"All internal links on Stack Exchange sites should be protocol-relative",
	url:	"http://meta.stackoverflow.com/q/223725",
	//css:	"a.soup-https-fixed:not(#specificity-hack) { color: green !important }", // uncomment to highlight affected links
	script:	function () {
		if ( 'https:' != location.protocol ) return;
		var selector = 'a[href^="http://"]';
		var filter   = /(^|\.)((stack(exchange|overflow|apps)|superuser|serverfault|askubuntu)\.com|mathoverflow\.net)$/;
		var exclude  = /^(chat|blog|area51)\./;  // these sites still load their JS/CSS over HTTP :-(
		var fixLink  = function () {
			if ( ! filter.test( this.hostname ) || exclude.test( this.hostname ) ) return;
			this.protocol = 'https:';
			// workaround for permalink redirect bug (http://meta.stackoverflow.com/q/223728)
			this.pathname = this.pathname.replace( /^\/[qa]\//, '/questions/' ).replace( /^\/u\//, '/users/' );
			$(this).addClass( 'soup-https-fixed' );
		};
		var fixAllLinks = function () { $(selector).each( fixLink ) };
		$(document).on( 'mouseover click', selector, fixLink );
		SOUP.hookAjax( /^/, fixAllLinks ).code();
	}
};
fixes.mso172931 = {
	title:	"Please put answers underneath questions in Close review queue",
	url:	"http://meta.stackoverflow.com/q/172931",
	script:	function () {
		if ( ! /^\/review\/close\b/.test( location.pathname ) ) return;
		SOUP.hookAjax( /^\/review\/(next-task|task-reviewed)\b/, function () {
			$('.reviewable-post').not(':has(.answer)').each( function () {
				SOUP.log( 'soup found reviewable post without answers' );
				var $post = $(this);
				
				// initial check to see if there are any answers to load
				var answers = $post.find('.reviewable-post-stats td.label-key:contains("answers")').next('td.label-value');
				if ( answers.length == 1 && answers.text().trim() < 1 ) return;
				
				var url = $post.find('h1 a.question-hyperlink').attr('href');
				SOUP.log( 'soup loading missing answers from ' + url );
				
				var injectAnswers = function ( html ) {
					SOUP.log( 'soup loaded missing answers from ' + url );
					// kluge: disable script tags; $.parseHTML() would be better, but needs jQuery 1.8+
					var $html = $( html.replace( /(<\/?)(script)/ig, '$1disabled$2' ) );
					// mangle the answer wrappers to look like the review page before injecting them
					$html.find('#tabs, .votecell a[class^="vote-"], .post-menu, .comments, .comments-link').remove();
					$html.find('.vote-count-post').after( function () {
						return '<div>vote' + (this.textContent.trim() == 1 ? '' : 's') + '</div>';
					} );
					$html.find('#answers-header, .answer').insertAfter( $post.find('.question') ).mathjax();
				};
				$.ajax( { method: 'GET', url: url, dataType: 'html', success: injectAnswers } );
			} );
		} ).code();
	}
};
fixes.mso224533 = {
	title:	"Soft-hyphen hides subsequent text when using Opera 12.16",
	url:	"http://meta.stackoverflow.com/q/224533",
	script:	function () {
		if ( SOUP.isMobile || ! window.opera ) return;
		var fixSoftHyphens = function () {
			var preBlocks = $('pre:not(.soup-shy-fixed)').addClass('soup-shy-fixed');
			SOUP.forEachTextNode( preBlocks, function () {
				this.nodeValue = this.nodeValue.replace( /\xAD/g, '' );
			} );
		};
		SOUP.hookAjax( /^/, fixSoftHyphens ).code();
		SOUP.hookEditPreview( fixSoftHyphens );
	}
};
fixes.mso224328 = {
	title:	"Enter from password field doesn't submit SE login form",
	url:	"http://meta.stackoverflow.com/q/224328",
	script:	function () {
		var inputs = 'input[name=email], input[name=password]';
		$('.login-page #se-login-form').on( 'keypress', inputs, function (e) {
			if ( e.which != 13 || e.shiftKey || e.defaultPrevented ) return;
			e.preventDefault(); e.stopImmediatePropagation();
			var empty = $(e.delegateTarget).find(inputs).filter('[value=""]');
			if ( empty.length > 0 ) empty.first().focus();
			else $(e.delegateTarget).find('#submit-button').click();
		} );
	}
};
fixes.mso223866 = {
	title:	"Add thousand separator for helpful flags count in user profiles",
	url:	"http://meta.stackoverflow.com/q/223866",
	script:	function () {
		$('body.user-page #user-info-container a[href^="/users/flag-summary/"]').text( function (i, txt) {
			return parseInt( txt.replace( /[^0-9]+/g, '' ) ).toLocaleString( 'en-US' );
		} );
	}
};

//
// MathJax fixes:
//
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
	SOUP.readyQueue = {};
	SOUP.ready = function ( key, code ) {
		if ( SOUP.isReady ) SOUP.try( key, code );
		else SOUP.readyQueue[key] = code;
	};
	SOUP.runReadyQueue = function () {
		if ( SOUP.isReady ) return;
		SOUP.isReady = true;
		for ( var key in SOUP.readyQueue ) {
			SOUP.try( key, SOUP.readyQueue[key] );
		}
		SOUP.log( 'soup JS fixes applied' );
	};
	// try to run some code, log errors
	SOUP.try = function ( key, code ) {
		try { code() }
		catch (e) { SOUP.log( 'SOUP ' + key + ': ' + e ) }
	};
	// wrapper for console.log(), does nothing on old Opera w/o console
	SOUP.log = function ( msg ) {
		if ( window.console ) console.log( msg );
	};
	// utility: run code whenever the editor preview is updated
	// FIXME: this doesn't always work; find out why and fix it!
	SOUP.hookEditPreview = function ( code ) {
		if ( !window.StackExchange || !StackExchange.ifUsing ) return;
		StackExchange.ifUsing( 'editor', function () {
			// SOUP.log( 'soup registering editor callback ' + code );
			StackExchange.MarkdownEditor.creationCallbacks.add( function (ed) {
				ed.hooks.chain( 'onPreviewRefresh', code );
				// SOUP.log( 'soup registered editor callback ' + code + ' on ' + ed );
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
		var tryIt = function () {
			try { hook.code( event, xhr, settings ) }
			catch (e) { SOUP.log( 'SOUP ajax hook for ' + hook.regex + ' failed: ' + e ) }
		};
		if ( !hook.delay ) tryIt();
		else setTimeout( tryIt, hook.delay );
	};
	// utility: iterate over text nodes inside an element / selector (TODO: extend jQuery?)
	SOUP.forEachTextNode = function ( where, code ) {
		$(where).contents().each( function () {
			if ( this.nodeType === 1 ) SOUP.forEachTextNode( this, code );
			else if ( this.nodeType === 3 ) code.apply( this );
		} );
	};
	
	SOUP.log( 'soup init complete' );
};

// setup code to execute after jQuery has loaded:
var soupLateSetup = function () {
	// basic environment detection
	// (for MathJax detection, just check window.MathJax, and note that it may be loaded late due to mso215450)
	SOUP.isChat   = /^chat\./.test( location.hostname );
	SOUP.isMobile = !!( window.StackExchange && StackExchange.mobile );
	
	// run ready queue after jQuery and/or SE framework have loaded
	if ( window.StackExchange && StackExchange.ready ) StackExchange.ready( SOUP.runReadyQueue );
	else if ( window.$ ) $(document).ready( SOUP.runReadyQueue );
	// else we do nothing; this may happen e.g. in iframes
	
	// attach global AJAX hooks
	if ( window.$ ) $( document ).ajaxComplete( function( event, xhr, settings ) {
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
var injectScripts = function () {
	var scriptElem = document.createElement( 'script' );
	scriptElem.id = 'soup-scripts';
	scriptElem.type = 'text/javascript';
	var code = "(" + soupLateSetup + ")();\n";
	for (var id in fixes) {
		if ( ! fixes[id].script ) continue;
		code += "SOUP.ready(" + JSON.stringify(id) + ", " + fixes[id].script + ");\n";
	}
	scriptElem.textContent = code;
	document.body.appendChild( scriptElem );
};
if (document.body) injectScripts();
else if (window.opera) addEventListener( 'load', injectScripts, false );
else document.addEventListener( 'DOMContentLoaded', injectScripts );

} )();  // end of anonymous wrapper function