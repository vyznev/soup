// ==UserScript==
// @name        Stack Overflow Unofficial Patch
// @namespace   https://github.com/vyznev/
// @description Miscellaneous client-side fixes for bugs on Stack Exchange sites
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.askubuntu.com/*
// @version     1.0.8
// @updateURL   https://github.com/vyznev/soup/raw/master/SOUP.user.js
// @downloadURL https://github.com/vyznev/soup/raw/master/SOUP.user.js
// @grant       none
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

// add collected styles to page
var styleElem = document.createElement( 'style' );
styleElem.id = 'soup-styles';
styleElem.type = 'text/css';
styleElem.textContent = styles;
document.head.appendChild( styleElem );


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
		var mjs = $('script[src^="http://cdn.mathjax.org/"]').remove();
		if ( mjs.length > 0 ) $.ajax( {
			dataType: "script", cache: true,
			url: mjs[0].src.replace('http://cdn.mathjax.org', 'https://c328740.ssl.cf1.rackcdn.com')
		} );
	}
	
	// 10k tools fixes:
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
	
	console.log('soup loaded');
};

var scriptElem = document.createElement( 'script' );
scriptElem.id = 'soup-scripts';
scriptElem.type = 'text/javascript';
scriptElem.textContent = "StackExchange.ready(" + scripts + ");";
document.body.appendChild( scriptElem );
