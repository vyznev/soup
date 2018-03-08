// ==UserScript==
// @name        Stack Overflow Unofficial Patch
// @namespace   https://github.com/vyznev/
// @description Miscellaneous client-side fixes for bugs on Stack Exchange sites (development)
// @author      Ilmari Karonen
// @version     1.51.18
// @copyright   2014-2018, Ilmari Karonen (https://stackapps.com/users/10283/ilmari-karonen)
// @license     ISC; https://opensource.org/licenses/ISC
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.askubuntu.com/*
// @homepageURL https://stackapps.com/questions/4486/the-stack-overflow-unofficial-patch-soup
// @updateURL   https://github.com/vyznev/soup/raw/devel/SOUP.meta.js
// @downloadURL https://github.com/vyznev/soup/raw/devel/SOUP.user.js
// @icon        https://github.com/vyznev/soup/raw/devel/icon/SOUP_icon_128.png
// @grant       none
// @run-at      document-start
// @noframes
// ==/UserScript==


// Copyright (C) 2014-2018 by Ilmari Karonen and other contributors
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

// In addition to the license granted above, I, Ilmari Karonen, to the extent I
// am authorized to do so, and subject to the disclaimer stated above, hereby
// grant Stack Exchange, Inc. permission to make use of this software in any
// way they see fit, including but not limited to incorporating all or parts of
// it within the Stack Exchange codebase, with or without credit to myself.
// This permission grant does not extend to any code written by third parties,
// unless said parties also agree to it.


( function () {  // start of anonymous wrapper function (needed to restrict variable scope on Opera)
"use strict";

// Opera does not support @match, so re-check that we're on an SE site before doing anything
var include_re = /(^|\.)((stack(exchange|overflow|apps)|superuser|serverfault|askubuntu)\.com|mathoverflow\.net)$/;
if ( ! include_re.test( location.hostname ) ) return;

// just in case @noframes doesn't work
try { if ( window.self !== window.top ) return } catch (e) { return }

// guard against double inclusion (e.g. user script + extension)
if ( document.getElementById( 'soup-init' ) ) {
	if ( window.console && console.log ) console.log( "soup aborting double injection!" );
	return;
}

var fixes = {};

//
// CSS-only fixes (injected *before* site CSS!):
//
fixes.mse215473 = {
	title:	"Add a non-breaking space to “reopen (1)” and its ilk",
	url:	"https://meta.stackexchange.com/q/215473",
	css:	".post-menu > a { white-space: nowrap }" +
		".post-menu > .lsep:after { content: ' '; font-size: 0px }"
};
fixes.mse114109 = {
	title:	"Background in OP's user name can obscure text in multiline comments",
	url:	"https://meta.stackexchange.com/q/114109",
	// NOTE 2014-11-26: this has been mostly fixed by increasing line-height in comments; remove this fix?
	css:	".comment-copy { position: relative }"
};
fixes.mse145819 = {
	title:	"<hr/>'s do not get rendered in deleted answers",
	url:	"https://meta.stackexchange.com/q/145819",
	css:	".wmd-preview hr { background-color: #ddd; color: #ddd }" +
		".deleted-answer .post-text hr, .deleted-answer .wmd-preview hr " +
		"{ background-color: #c3c3c3; color: #c3c3c3 }"
};
fixes.mse108046 = {
	title:	"Mouse cursor doesn't change to pointer when hovering “full site” on mobile",
	url:	"https://meta.stackexchange.com/q/108046",
	// NOTE 2014-11-26: this is also partially fixed, but e.g. comment delete links still have the wrong cursor
	css:	"a[onclick], a:not([name]) { cursor: pointer }"
};
// The following fix is mostly made redundant by mse217779, but is included for
// users with site JS disabled, and to mitigate the loading delay of the JS
// component of mse217779:
fixes.mse110566 = {
	title:	"Does the spoiler markdown work on images?",
	url:	"https://meta.stackexchange.com/q/110566",
	// NOTE 2014-11-26: this is fixed on some sites, but still broken e.g. on SO
	css:	".spoiler:not(:hover) img { visibility: hidden }"
};
fixes.mse58760 = {
	title:	"<kbd> (yes, still <kbd>) doesn't play nice with lists",
	url:	"https://meta.stackexchange.com/q/58760",
	credit:	"Krazer",
	// NOTE 2014-11-26: the main issue seems to have been fixed, but the secondary width/white-space issues still exist; report as new bug?
	// "body" added to increase selector precedence above conflicting SE style
	css:	"body kbd { display: inline-block; max-width: 100%; white-space: normal }"
};
fixes.mse203405 = {
	title:	"Excerpt of privilege is below privilege instead of in front",
	url:	"https://meta.stackexchange.com/q/203405",
	css:	".privileges-page #privilege-table { display: table }" +
		".privileges-page .privilege-table-row { display: table-row }" +
		".privileges-page .privilege-table-row div:not(.checkmark)" +
		" { display: table-cell; padding: 1em 0.2em }"
}
fixes.mse154788 = {
	title:	"Why are comments overlapping the sidebar?",
	url:	"https://meta.stackexchange.com/q/154788",
	// XXX: this sometimes triggers spurious scroll bars in Chrome; see https://bugs.chromium.org/p/chromium/issues/detail?id=813345
	css:	".comment-body { max-width: 628px; overflow: auto; overflow-y: hidden; word-wrap: break-word }"
};
fixes.mse214830 = {
	title:	"Selecting text in profile activity comments causes unexpected clipping",
	url:	"https://meta.stackexchange.com/q/214830",
	css:	"span.comments { padding-bottom: 0 }"
};
fixes.mse230392 = {
	title:	"Layout bug while viewing vote count in Meta Stackexchange",
	url:	"https://meta.stackexchange.com/q/230392",
	css:	"div.vote-count-separator { margin: 5px auto }"
};
fixes.physics5773 = {
	title:	"Bounty icon is poorly placed",
	url:	"https://physics.meta.stackexchange.com/q/5773",
	css:	".vote .bounty-award-container { margin: 13px 0; text-align: center }" +
		".vote .bounty-award, span.bounty-award { margin: 0; display: inline-block; padding: 0.2em 0.5em }"
};
fixes.mse224185 = {
	title:	"Links sometimes float above text in vote-to-close dialog on Firefox",
	url:	"https://meta.stackexchange.com/q/224185",
	// "body" added to increase selector precedence over conflicting SE style
	css:	"body .close-as-off-topic-pane .action-name a, " +
		"body .close-as-off-topic-pane .action-name { vertical-align: baseline }" +
		"body .close-as-off-topic-pane input[type=radio] { vertical-align: top }" +
		".close-as-off-topic-pane { line-height: 1.15 }"  // related minor issue
};
fixes.mse233517 = {
	title:	"Badge symbol in notification is of the site you're on, not where badge was earned",
	url:	"https://meta.stackexchange.com/q/233517",
	// some sites (like meta.SE) use !important in badge styles, so we have to use it too :-(
	css:	".achievements-dialog .badge1, .achievements-dialog .badge2, .achievements-dialog .badge3 {" +
		" height: 8px !important; width: 8px !important; border-radius: 50% !important; margin: 0px 2px 4px }" +
		".achievements-dialog .badge1 { background: #ffcc00 !important }" +
		".achievements-dialog .badge2 { background: #c5c5c5 !important }" +
		".achievements-dialog .badge3 { background: #cc9966 !important }"
};
fixes.mse169225 = {
	title:	"Why does the bounty award button appear on deleted answers?",
	url:	"https://meta.stackexchange.com/q/169225",
	// .vote added to ensure higher specificity than the physics5773 fix
	css:	".deleted-answer .vote .bounty-vote-off { display: none }"
};
fixes.mse84296 = {
	title:	"RTL text can mess up comment timestamps",
	url:	"https://meta.stackexchange.com/q/84296",
	// FIXME: this apparently breaks stuff on Safari, but SOUP doesn't really have proper Safari support anyway yet
	// (this was briefly enabled on SE, but was reverted due to the Safari issue; re-adding it to SOUP for now)
	// TODO: check if the Safari issue still persists now that fallbacks have been removed
	// SEE ALSO: mso310158 (prevent runaway BiDi overrides in new comments)
	// NOTE: the #chat-body selectors and the .soup-bidi-isolate class are used by the mse342361 fix
	css:	'.comment-copy, .comment-user, .user-details a, a[href^="/users/"], #chat-body .user-name, #chat-body .text, .soup-bidi-isolate { unicode-bidi: isolate }'
};
fixes.mse249859 = {
	title:	"<kbd> tags in headings are too small",
	url:	"https://meta.stackexchange.com/q/249859",
	credit:	"Doorknob",
	// "body" added to increase selector precedence over conflicting SE style
	css:	"body kbd { font-size: 80% }"
};
fixes.mse248156 = {
	title:	"What's the purpose of the tagline in the Bounties section of the profile?",
	url:	"https://meta.stackexchange.com/q/248156",
	css:	"#user-tab-bounties #bounties-table .started { display: none }"
};
fixes.mso284049 = {
	title:	"Small bugs in the Stack Overflow editor",
	url:	"https://meta.stackoverflow.com/q/284049",
	css:	".wmd-help-button { left: auto !important }" +  // !important needed to override inline style
		"body .wmd-help-button.active-help { background: transparent }" +
		"body .answer-help-background { padding-top: 10px }"
};
fixes.mse250081 = {
	title:	"Retract close vote UI",
	url:	"https://meta.stackexchange.com/q/250081",
	credit:	"style suggested by AstroCB",
	// FIXME: This doesn't work on pt.SO or ja.SO; should find out how this tooltip is translated there
	css:	".close-question-link[title^=\"You voted to\"] { color: #444 }"
};
fixes.mso287222 = {
	title:	"Clicking between lines fails",
	url:	"https://meta.stackoverflow.com/q/287222",
	credit:	"Travis J",
	// ISSUE: this looks kind of ugly on gaming.SE, cooking.SE and maybe some other sites
	// that use a border-bottom hack for dotted underlines on links
	// list of problem sites: cooking cstheory english gamedev gaming math photo programmers stats tex unix webapps
	// see also: https://gaming.meta.stackexchange.com/questions/10227/sidebar-links-wobble-when-hovered
	css:	".question-summary .answer-hyperlink, " +
		".question-summary .question-hyperlink, " +
		".module.community-bulletin .question-hyperlink, " +
		".question-summary .result-link a { " +
		" display: block; margin-bottom: -1px; border-bottom: 1px solid transparent }"
};
fixes.mso297678 = {
	title:	"Comment anchor links get “visited” highlighting",
	url:	"https://meta.stackoverflow.com/q/297678",
	// XXX: this selector needs to be more specific than ".comment-text a:not(.comment-user):visited"
	css:	"body .comment-date a.comment-link, " +
		"body .comment-date a.comment-link:visited { color: inherit }"
};
fixes.mse242944 = {
	title:	"Long display name with no spaces breaks design of review history pages",
	url:	"https://meta.stackexchange.com/q/242944",
	css:	"body.review-page .history-table td:nth-child(1) " +
		"{ width: 120px; max-width: 160px; overflow: hidden; text-overflow: ellipsis; color: #999 }"
};
fixes.mse266258 = {
	title:	"Left side markdown diff outside of its area",
	url:	"https://meta.stackexchange.com/q/266258",
	css:	".full-diff .diff-delete:after, .full-diff .diff-add:after { content: ''; font-size: 0px }"
};
fixes.mso342634 = {
	title:	"“Hot Meta Posts” with a 4-digit score wrap onto a second line",
	url:	"https://meta.stackoverflow.com/q/342634",
	css:	".bulletin-item-type { white-space: nowrap }"
};
fixes.mse186748 = {
	title:	"Duplicate dialog close button causes preview to be too narrow",
	url:	"https://meta.stackexchange.com/q/186748",
	css:	".popup-close { margin-left: -100% }" +
		".popup .close-as-duplicate-pane #search-text, .popup .close-as-duplicate-pane .actual-edit-overlay" +
		" { width: 100% !important; box-sizing: border-box }"
};
fixes.mse290496 = {
	title:	"Minor alignment issue in few of the Badge page's “Awarded to” text",
	url:	"https://meta.stackexchange.com/q/290496",
	css:	"body.badges-page .single-badge-table .single-badge-row-double .single-badge-awarded { width: 100% }"
};
fixes.mse291623 = {
	title:	"Links that are italics and bold not showing as links in Mobile Web",
	url:	"https://meta.stackexchange.com/q/291623",
	// this fix is only for the mobile view, but should be harmless in the full site view
	css:	".post-text em, .post-text a>em { color: inherit }"
};
fixes.mse287196 = {
	title:	"Tick sign is not centered on single badge page",
	url:	"https://meta.stackexchange.com/q/287196",
	css:	"body.badges-page .single-badge-table .single-badge-wrapper .single-badge-badge { vertical-align: baseline }"
};
fixes.mse302580 = {
	title:	"Printing an SE page in Firefox shows only the first page",
	url:	"https://meta.stackexchange.com/q/302580",
	css:	"@media print {\nbody { display: block !important }}"
};
fixes.mse302569 = {
	title:	"Alignment improvement in the flag dialog",
	url:	"https://meta.stackexchange.com/q/302569",
	css:	"body .popup .already-flagged { margin-left: 23px }"
};
fixes.mse304096 = {
	title:	"Comments and answers have huge right margins when printed",
	url:	"https://meta.stackexchange.com/q/304096",
	css:	"@media print {\n" +
		"body .container, body .post-text, body .comments, body #answers-header, body .answer, body pre { width: auto }" +
		".question > table, .answer > table { width: 100% }" +
		"body .comment-body { max-width: none }" + // override mse154788
		"}"
};
fixes.mso306552 = {
	title:	"Votes cast has upvote-like symbol and is confusing",
	url:	"https://meta.stackoverflow.com/q/306552",
	path:	/^\/users\/\d+/,
	css:	'.p-highlights .-community-stats > .g-row[title$="votes cast"] svg.iconArrowUp { display: none }' +
		'.p-highlights .-community-stats > .g-row[title$="votes cast"] .-icon { background: url(data:image/svg+xml,' + encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="#9199a1">' +
			'<path d="M3 7.5h12L9 1.5z" fill="#9199a1"/>' +
			'<path d="M3 10.5h12L9 16.5z" fill="none"/>' +
			'</svg>'
		) + '); width: 18px; height: 18px }' +
		'.p-highlights .-community-stats > .g-row[title$="votes cast"]:hover .-icon { background: url(data:image/svg+xml,' + encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="#6a737c">' +
			'<path d="M3 7.5h12L9 1.5z" fill="#6a737c"/>' +
			'<path d="M3 10.5h12L9 16.5z" fill="none"/>' +
			'</svg>'
		) + ') }'
};
fixes.mse304247 = {
	title:	"Attempting to use too long tag breaks popup",
	url:	"https://meta.stackexchange.com/q/304247",
	css:	".message-text { word-wrap: break-word }"
};
fixes.mso360855 = {
	title:	"Margins are off/unbalanced in inbox",
	url:	"https://meta.stackoverflow.com/q/360855",
	css:	".topbar-dialog.inbox-dialog .modal-content ul, " +
		".topbar-dialog.modInbox-dialog .modal-content ul, " +
		".topbar-dialog.achievements-dialog .modal-content ul { min-width: 345px }"
};


// site-specific CSS fixes:
fixes.math12803a = {
	title:	"“Sign up for the newsletter” button overflows the frame on Firefox / Linux (part 1)",
	url:	"https://math.meta.stackexchange.com/q/12803",
	// this part of the fix is only enabled on math.SE, since other sites use different fonts
	sites:	/^math\./,
	css:	"#newsletter-signup { font-family: 'Liberation Sans', Helvetica, Arial, sans-serif }"
};
fixes.math12803b = {
	title:	"“Sign up for the newsletter” button overflows the frame on Firefox / Linux (part 2)",
	url:	"https://math.meta.stackexchange.com/q/12803",
	// this part of the fix is enabled globally, to fix minor overflows on various SE sites
	css:	"#newsletter-signup-container { margin-left: -15px; margin-right: -15px }"
};
fixes.codegolf959 = {
	title:	"Add line-height shortener to the ascii-art tag",
	url:	"https://codegolf.meta.stackexchange.com/q/959",
	sites:	/^(codegolf|puzzling)\./,
	css:	"pre { line-height: 1.15 }"
};
fixes.math12902 = {
	title:	"Visited questions are practically indistinguishable in search results",
	url:	"https://math.meta.stackexchange.com/q/12902",
	sites:	/^math\.stackexchange\.com$/,  // XXX: main site only!
	// "body" added to override conflicting SE styles
	css:	"body a, body .question-hyperlink { color: #145d8a }" + 
		"body a:visited, body .question-hyperlink:visited { color: #003b52 }" +
		// stupid reduntant styles...
		"body .user-show-new .question-hyperlink," +
		"body .user-show-new .answer-hyperlink," +
		"body .user-show-new .site-hyperlink { color: #145d8a !important }" +
		"body .user-show-new .question-hyperlink:visited," +
		"body .user-show-new .answer-hyperlink:visited," +
		"body .user-show-new .site-hyperlink:visited { color: #003b52 !important }"
};
fixes.math12902_meta = {
	title:	"Visited questions are practically indistinguishable in search results (meta)",
	url:	"https://math.meta.stackexchange.com/q/12902",
	sites:	/^math\.meta\.stackexchange\.com$/,
	// "body" added to override conflicting SE styles
	css:	"body a { color: #a29131 } body a:visited { color: #736722 }"
};
fixes.math16559 = {
	title:	"Typo in site CSS disables visited link color in community bulletin",
	url:	"https://math.meta.stackexchange.com/q/16559",
	sites:	/^math\.stackexchange\.com$/,
	// this rule is already in the site CSS, but without the colon in "a:visited"
	css:	".module.community-bulletin a:visited { color: #32455d !important }"
};
fixes.math16559_meta = {
	title:	"Typo in site CSS disables visited link color in community bulletin (meta)",
	url:	"https://math.meta.stackexchange.com/q/16559",
	sites:	/^math\.meta\.stackexchange\.com$/,
	css:	".module.community-bulletin a:visited { color: #444 !important }"
};
fixes.electronics3162 = {
	title:	"Error for profile less info",
	url:	"https://electronics.meta.stackexchange.com/q/3162",
	sites:	/^electronics\./,
	// .user-header added to increase specificity over conflicting SE style
	css:	".user-show-new .user-header.user-header-slim .data { width: auto !important }"
};
fixes.electronics4038 = {
	title:	"About Me box on user page not in the right place",
	url:	"https://electronics.meta.stackexchange.com/q/4038",
	// should be safe to apply on all sites, even if the issue has only been reported on electronics.SE
	css:	".user-show-new #large-user-info.user-header .user-header-left { margin-right: 0 }"
};
fixes.mso286009 = {
	title:	"Change [Ask Question] button style",
	url:	"https://meta.stackoverflow.com/q/286009",
	sites:	/^stackoverflow\.com$/,
	css:	".nav.askquestion { margin-left: 26px }"
};
fixes.mse250407 = {
	title:	"User signature cards on old revisions look funny",
	url:	"https://meta.stackexchange.com/q/250407",
	css:	"#revisions table.postcell { width: auto }" // for SO, applied globally
};
fixes.cooking2049 = {
	title:	"Ads are cut off on the right",
	url:	"https://cooking.meta.stackexchange.com/q/2049",
	credit:	"Jefromi",
	sites:	/^cooking\./,
	css:	"body .everyonelovesstackoverflow { padding: 0 }"
};
fixes.movies1652 = {
	title:	"/users and profile pages (/users/…) space the link to the current profile (in the top bar) differently",
	url:	"https://movies.meta.stackexchange.com/q/1652",
	// see also https://workplace.meta.stackexchange.com/q/4917
	sites:	/^(movies|workplace)\./,
	css:	".top-bar .my-profile .-badges .badge1, " +
		".top-bar .my-profile .-badges .badge2, " +
		".top-bar .my-profile .-badges .badge3 { margin: 0 }"
};
fixes.graphicdesign2415 = {
	title:	"Design Bug: Tag alert CSS",
	url:	"https://graphicdesign.meta.stackexchange.com/q/2415",
	sites:	/^graphicdesign\./,
	css:	"body .message.message-warning a:not(.badge-tag):not(.button):not(.btn):not(.post-tag), body .message.message-warning a:not(.badge-tag):not(.button):not(.btn):not(.post-tag):visited { color: #fcedb1 }"  // "body" added to override SE style
};
fixes.mse244587 = {
	title:	"“Top Network Users” should contain themselves!",
	url:	"https://meta.stackexchange.com/q/244587",
	sites:	/^stackexchange\.com$/,
	css:	"body .users-sidebar .userLinks { width: 185px; float: right; overflow: hidden; text-overflow: ellipsis }" +
		// XXX: these extra rules are not really needed, but they make the layout more robust
		"body .users-sidebar .userDetails img { margin-right: 0 }" +
		"body .users-sidebar .userDetails { overflow: hidden }"
};
fixes.rpg5812 = {
	title:	"Post as a guest: CSS bug",
	url:	"https://rpg.meta.stackexchange.com/q/5812",
	credit:	"polkovnikov.ph",
	css:	".new-login-form .new-login-right input, .new-login-form .new-login-right table  { width: 100%; box-sizing: border-box }"
};
fixes.mse294574 = {
	title:	"Unbroken line in preview text causes whole post block to side scroll",
	url:	"https://meta.stackexchange.com/q/294574",
	sites:	/^stackexchange\.com$/,
	css:	"#question-list .question { word-wrap: break-word }"
};
fixes.mse306254 = {
	title:	"Annoying animation on reputation leagues",
	url:	"https://meta.stackexchange.com/q/306254",
	sites:	/^stackexchange\.com$/,
	css:	"body .league-container { overflow: hidden }"
};
fixes.aviation3449 = {
	title:	"Accepted graphic missing in questions tab",
	url:	"https://aviation.meta.stackexchange.com/q/3449",
	sites:	/^aviation\./,
	// these are mostly copied from the SE style for .answered-accepted .mini-counts on the front page
	css:	".statscontainer .answered-accepted strong { border-radius: 50%; color: #FFF; background-color: #15B58A; width: 36px; height: 36px; line-height: 36px; margin: -10px auto 0 auto }"
};
fixes.mse307120 = {
	title:	"I cannot get bold or italics to work",
	url:	"https://meta.stackexchange.com/q/307120",
	sites:	/^(android|codereview|crypto|cs|graphicdesign|japanese|magento|music|salesforce)\./,
	// Google Fonts generates correct CSS; just let it override the SE style
	// XXX: this causes Chrome to always use webfonts, even if a local font is present; this is a bug in Chrome, see https://bugs.chromium.org/p/chromium/issues/detail?id=627143 for more details
	// TODO: a bunch of other sites are using font faces that aren't on Google Fonts or have nonstandard family names
	early:	function () {
		var fontFamily = 'Open+Sans:regular,italic,bold,bolditalic,semibold,semibolditalic,light,lightitalic|Inconsolata:regular,bold';
		if ( /^(android|magento)\./.test( location.hostname ) ) fontFamily = 'Roboto:regular,italic,bold,bolditalic';
		if ( /^(salesforce)\./.test( location.hostname ) ) fontFamily = 'PT+Sans:regular,italic,bold,bolditalic';

		function injectCSS () {
			SOUP.log('soup mse307120 loading ' + fontFamily + ' from Google Fonts');
			var link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', 'https://fonts.googleapis.com/css?family=' + fontFamily);
			document.head.appendChild(link);
		}

		// use a mutation observer to inject our style immediately after SE styles; with luck, the SE webfonts may never get loaded at all
		// TODO: make this a generic helper function?
		// FIXME: this may race with other user scripts using similar hacks, like https://gist.github.com/vyznev/9a3c5ddac714ac199166, producing unpredictable results
		function observeElement ( element, callback ) {
			if ( callback() ) return;
			var observer = new MutationObserver( function () {
				if ( callback() ) observer.disconnect();
			} );
			observer.observe( element, { childList: true, subtree: false } );
		}
		observeElement( document.documentElement, function () {
			var head = document.head;
			if (head) observeElement( head, function () {
				var link = head.querySelector('link[rel=stylesheet][href*="/primary.css?"]');
				if ( link ) injectCSS();
				return link;
			} );
			return head;
		} );
	}
};



//
// Chat-specific fixes:
//
fixes.mse155308 = {
	title:	"Ignoring somebody screws up the avatar list",
	url:	"https://meta.stackexchange.com/q/155308",
	credit:	"DaveRandom",
	sites:	/^chat\./,
	css:	"#present-users > .present-user.ignored { height: 16px }"
};
fixes.mse216760 = {
	title:	"The reply buttons in chat shouldn't reposition themselves on pinged messages",
	url:	"https://meta.stackexchange.com/q/216760",
	sites:	/^chat\./,
	// "body" added to increase selector precedence above conflicting SE style
	css:	"body .message.highlight { margin-right: 0px }" +
		"body .message.highlight .flash { right: -38px }"  // regression: https://meta.stackexchange.com/q/221733
};
fixes.mse222509 = {
	title:	"Getting Red Line under tags",
	url:	"https://meta.stackexchange.com/q/222509",
	sites:	/^chat\./,
	css:	".ob-post-tags a:hover, .ob-user-tags a:hover, " +
		"a.soup-mse222509-fix:hover { text-decoration: none }",
	script:	function () {
		$('#main').on('mouseover', '.ob-post-tag, .ob-user-tag', function () {
			$(this).closest('a').not('.soup-mse222509-fix').addClass('soup-mse222509-fix');
		} );
	}
};
fixes.mse134268 = {
	title:	"U+0008 inserted into chat @-pings",
	url:	"https://meta.stackexchange.com/q/134268",
	sites:	/^chat\./,
	script:	function () {
		$('body#chat-body').on( 'keypress', function (e) {
			if ( e.ctrlKey || e.altKey || e.metaKey ) return;
			if ( !e.which || e.which == 32 || e.which >= 32 ) return;
			e.stopPropagation();
		} );
	}
};
fixes.mse224233 = {
	title:	"Problem in css style loading in Search Bar after refresh page when using FF",
	url:	"https://meta.stackexchange.com/q/224233",
	sites:	/^chat\./,
	script:	function () {
		$('#search:not([placeholder])').off('focus blur').attr( 'placeholder', function () {
			var $this = $(this);
			if ( $this.closest('#roomsearch').length ) return 'filter rooms';
			else if ( $this.closest('#usersearch').length ) return 'filter users';
			else return 'search';
		} ).filter('.watermark').val('').removeClass('watermark');
	}
};
fixes.mso342361 = {
	title:	"Minor (funny) chat star bug for Hebrew text",
	url:	"https://meta.stackoverflow.com/q/342361",
	sites:	/^chat\./,
	script:	function () {
		SOUP.hookAjax( /^\/chats\/stars\/\d+\b/, function () {
			$('#starred-posts li').each( function () {
				// jQuery doesn't work well with raw text nodes :(
				var nodes = null;
				for ( var node = this.firstChild; node; node = node.nextSibling ) {
					if ( /\bpermalink\b/.test( node.className ) ) break;
					else if ( /\bstars\b/.test( node.className ) ) nodes = [];
					else if ( nodes ) nodes.push( node );
				}
				if ( ! nodes || nodes.length < 1 ) return;
				// unwrap the trailing dash
				var firstNode = nodes[0], lastNode = nodes[nodes.length - 1], text = lastNode.nodeValue;
				var match = /(\s+-\s*)$/.exec( text );
				if ( match ) {
					nodes[nodes.length - 1] = document.createTextNode( text.substr(0, match.index) );  // wrap this...
					lastNode.nodeValue = match[0];  // ...instead of this
				}
				var wrapper = document.createElement( 'span' );
				wrapper.className = "soup-bidi-isolate";  // XXX: defined by mse84296 fix
				this.insertBefore( wrapper, firstNode );
				for ( var i = 0; i < nodes.length; i++ ) {
					wrapper.appendChild( nodes[i] );
				}
			} );
		} ).code();
	},
	css:	"#starred-posts .relativetime { unicode-bidi: embed }" // fallback
};
fixes.mso362554 = {
	title:	"Why are the chat FAQ in almost identical links different?",
	url:	"https://meta.stackoverflow.com/q/362554",
	credit:	"suggested by mjpieters (https://github.com/vyznev/soup/issues/33), shim code by Frédéric Hamidi (https://stackoverflow.com/a/29298828)",
	sites:	/^chat\./,
	jqinit:	function () {
		var slice = Array.prototype.slice;
		if ( ! jQuery.curCSS ) jQuery.curCSS = function(element) {
			var args = slice.call(arguments, 1);
			SOUP.log( 'soup mso362554 jQuery.curCSS shim called on', element, 'with', args );
			return jQuery.fn.css.apply(jQuery(element), args);
		};
		SOUP.log( 'soup mso362554 jQuery.curCSS shim applied' );
	}
};


//
// General fixes that need scripting (run in page context after jQuery / SE framework is ready):
//
fixes.mse217779 = {
	title:	"The CSS for spoilers is a mess. Let's fix it!",
	url:	"https://meta.stackexchange.com/q/217779",
	css:	"@media screen {\n" +
		".soup-spoiler > div { opacity: 0; transition: opacity 0.5s ease-in }" +
		".soup-spoiler:hover > div, .soup-spoiler.visible > div { opacity: 1; transition: opacity 1s ease-in 0.5s }" +
		// backup to avoid accidentally revealing spoilers while waiting for JS fix to run
		"blockquote.spoiler, blockquote.spoiler * { transition: all 0s }" +
		"blockquote.spoiler:hover, blockquote.spoiler:hover * { transition: all 1s ease-in 0.5s }" +
		// bonus: differentiate spoilers from empty blockquotes, per https://meta.stackexchange.com/q/104085
		".soup-spoiler, .spoiler { position: relative; min-height: 1em }" +  // limit notice width to spoiler width; ensure that the notice is visible even if the spoiler is empty
		".soup-spoiler::before, .spoiler::before { position: absolute; width: 100%; content: 'spoiler: hover / click to reveal'; opacity: 0.25; transition: opacity 0.5s ease-in 0.5s } " +
		".soup-spoiler:hover::before, .soup-spoiler.visible::before, .spoiler:hover::before { opacity: 0; width: 0; overflow: hidden; transition: opacity 0.5s ease-in 0s, width 0s 0.5s }" +
		// only partially fade out spoilers in diffs, see https://meta.stackexchange.com/a/300859
		".diffs .soup-spoiler:not(:hover) > div, .body-diffs .soup-spoiler:not(:hover) > div { opacity: 0.25 }" +
		".diffs .soup-spoiler:hover > div, .body-diffs .soup-spoiler:hover > div { transition: all 1s }" +
		".diffs .soup-spoiler::before, .diffs .spoiler::before, .body-diffs .soup-spoiler::before, .body-diffs .spoiler::before { content: ''; width: 0 } " +
		"}",
	script:	function () {
		if ( SOUP.isMobile ) return;  // mobile theme handles spoilers differently
		var fixSpoilers = function (where) {
			var spoiler = $(where);
			if ( ! spoiler.hasClass('spoiler') ) spoiler = spoiler.find('.spoiler');
			spoiler.addClass('soup-spoiler').removeClass('spoiler').wrapInner('<div></div>').off('click');
		};
		SOUP.addContentFilter( fixSpoilers, 'spoiler fix', null, ['load', 'post', 'preview'] );
		$(document).on( 'mouseover', '.spoiler', function () {
			SOUP.try( 'spoiler fix fallback', fixSpoilers, [this] );
		} ).on( 'click', '.soup-spoiler', function () {
			// XXX: re-remove .spoiler, in case the SE spoiler click handler didn't get properly disabled
			$(this).toggleClass('visible').removeClass('spoiler');
		} );
	}
};
fixes.mse78989 = {
	title:	"Clicking on tags broken?",
	url:	"https://meta.stackexchange.com/q/78989",
	script:	function () {
		if ( !/[?&]sort[=]/.test( location.search ) &&
			$('body').hasClass('tagged-questions-page') &&
			$('#tabs a.youarehere').length == 0 ) {
			var href = $('#tabs a[href*="?sort="]:first').attr('href');
			if ( href ) location.replace( href );
		}
	}
};
fixes.mse261721 = {
	title:	"Un-fade low-score answers on click/tap too",
	url:	"https://meta.stackexchange.com/q/261721",
	credit:	"based on fix by Manishearth",
	script:	function () {
		$('#answers').on( 'click', '.answer.downvoted-answer .post-text', function () {
			$(this).closest('.answer').addClass('downvoted-answer-clicked').removeClass('downvoted-answer');
		} ).on( 'click', '.answer.downvoted-answer-clicked .post-text', function () {
			$(this).closest('.answer').addClass('downvoted-answer').removeClass('downvoted-answer-clicked');
		} );
	}
};
fixes.mse66646 = {
	title:	"Confirming context menu entries via Enter triggers comment to be posted",
	url:	"https://meta.stackexchange.com/q/66646",
	script:	function () {
		if ( !window.StackExchange || !StackExchange.helpers ) return;
		// this function is copied from https://cdn-dev.sstatic.net/Js/stub.en.js, but with s/keyup/keydown/
		// XXX: with this change, all the messing around with composition events should be unnecessary
		StackExchange.helpers.submitFormOnEnterPress = function ($form) {
			var $txt = $form.find('textarea');
			var enterHeldDown = false;
			$txt.keydown(function (event) {
				if (event.which === 13 && !enterHeldDown) {
					enterHeldDown = true;
					if (!event.shiftKey && !$txt.prev("#tabcomplete > li:visible").length) $form.submit();
				}
			}).keyup(function (event) {
				if (event.which === 13) enterHeldDown = false;
			}).keypress(function (event) {
				// disable hitting enter to produce a newline, but allow <shift> + <enter>
				return event.which !== 13 || event.shiftKey;
			});
		};
	}
};
fixes.mse210132 = {
	title:	"New top bar should render avatar with a transparent background",
	url:	"https://meta.stackexchange.com/q/210132",
	script:	function () {
		$('.top-bar .my-profile .gravatar-wrapper-24 img.js-avatar-me[src*="//i.stack.imgur.com/"]').attr(
			'src', function (i,v) { return v.replace( /\?.*$/, "" ) }
		).css( { 'max-width': '24px', 'max-height': '24px' } );
	}
};
fixes.mse220337 = {
	title:	"Election comments have no permalink link",
	url:	"https://meta.stackexchange.com/q/220337",
	credit:	"FEichinger",
	path:	/^\/election\b/,
	script:	function () {
		var base = ( $('#tabs .youarehere').attr('href') || "" ).replace( /#.*/, "" );

		SOUP.addContentFilter( function () {
			var n = $('.comment-date').not(':has(a)').wrapInner( function () {
				var id = $(this).closest('.comment').attr('id');
				return $('<a class="comment-link"></a>').attr('href', base + '#' + id);
			} ).length;
			SOUP.log( 'mse220337: fixed ' + n + ' comments' );
		}, 'mse220337 comment filter' );

		// fix post links too, while we're at it
		$('.post-menu a:contains("link")').attr( 'href', function (i, href) {
			return href.replace( /^[^#]*/, base );
		} );
	}
};
fixes.mse172931 = {
	title:	"Please put answers underneath questions in Close review queue",
	url:	"https://meta.stackexchange.com/q/172931",
	path:	/^\/review\b/,
	script:	function () {
		SOUP.hookAjax( /^\/review\/(next-task|task-reviewed)\b/, function () {
			$('.reviewable-post').not(':has(.answer, .diffs)').each( function () {
				var post = $(this), question = post.find('.question');
				
				// initial check to see if there are any answers to load
				var label = post.find('.reviewable-post-stats td.label-key:contains("answers")');
				var count = label.first().next('td.label-value').text().trim();
				var shown = $('.reviewable-answer').length;  // XXX: don't needlessly reload sole answers in answer review
				if ( count - shown < 1 ) return;
				
				// find question URL
				var url = post.find('h1 a.question-hyperlink').attr('href');
				SOUP.log( 'soup loading ' + (count - shown) + ' missing answers from ' + url );
				
				var injectAnswers = function ( html ) {
					// new cleaner parsing!
					var parser = new DOMParser();
					var doc = parser.parseFromString( html, 'text/html' );
					var rawAnswers = doc.querySelectorAll('.answer');  // XXX: don't use .getElementsByClassName(), loop below needs a static NodeList!
					var answers = $('<div>'), n = 0;
					for (var i = 0; i < rawAnswers.length; i++) {
						if ( document.getElementById( rawAnswers[i].id ) ) continue;
						answers[0].appendChild( rawAnswers[i] );
						n++;
					}
					answers = answers.children();
					SOUP.log( 'soup loaded ' + n + ' missing answers from ' + url );
					
					// mangle the answer wrappers to look like the review page before injecting them
					answers.find('.votecell a[class^="vote-"], .post-menu > *, .comments, .comments-link').remove();
					answers.find('.vote-count-post').after( function () {
						return '<div>vote' + ( this.textContent.trim() == 1 ? '' : 's' ) + '</div>';
					} );
					
					// inject answers into the review page
					var header = $('<div id="answers-header"><div class="subheader answers-subheader"><h2></h2></div></div>');
					header.find('h2').text( n + ( shown ? ' Other' : '') + ' Answer' + ( n == 1 ? '' : 's' ) );
					header.insertAfter( question );
					answers.insertAfter( header );
					SOUP.runContentFilters( 'post', answers );
					window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
				};
				$.ajax( { method: 'GET', url: url, dataType: 'html', success: injectAnswers } );
			} );
		} ).code();
	}
};
fixes.mse224533 = {
	title:	"Soft-hyphen hides subsequent text when using Opera 12.16",
	url:	"https://meta.stackexchange.com/q/224533",
	script:	function () {
		if ( SOUP.isMobile || ! window.opera ) return;
		SOUP.addContentFilter( function (where) {
			var preBlocks = $(where).find('pre:not(.soup-shy-fixed)').addClass('soup-shy-fixed');
			SOUP.forEachTextNode( preBlocks, function ( text ) {
				return text.replace( /\xAD/g, '' );
			} );
		}, 'Opera soft-hyphen fix' );
	}
};
fixes.mse115702 = {
	title:	"Option to delete an answer only visible after a reload",
	url:	"https://meta.stackexchange.com/q/115702",
	script:	function () {
		if ( ! window.StackExchange || ! StackExchange.options || ! StackExchange.options.user ) return;
		if ( StackExchange.options.user.rep < ( SOUP.isBeta ? 4000 : 20000 ) ) return;
		var html = '<a href="#" class="soup-delete-link" title="vote to delete this post">delete</a>';
		var lsep = '<span class="lsep">|</span>';
		function updateDeleteLinks( postid, score ) {
			var isAnswer = $('#answer-' + postid).length > 0;
			if ( ! isAnswer ) return;  // XXX: proper question handling requires detecting closed questions

			var deleteLinks = $('[id="delete-post-' + postid + '"]');  // XXX: there might be several
			if ( score >= (isAnswer ? 0 : -2) ) {
				// XXX: just to be safe, don't remove any delete links that we didn't add
				deleteLinks = deleteLinks.filter('.soup-delete-link');
				deleteLinks.next('span.lsep').andSelf().hide();
			} else if ( deleteLinks.length ) {
				deleteLinks.next('span.lsep').andSelf().show();  // show existing links
			} else {
				// need to create a new delete link from scratch and slip it into the menu
				var target = $('.flag-post-link[data-postid=' + postid + ']');
				var lsep = target.prev('span.lsep').clone(true);
				if (lsep.length == 0) lsep = $('<span class="lsep">|</span>');
				$(html).attr('id', 'delete-post-' + postid).insertBefore(target).after(lsep);
			}
		}
		SOUP.subscribeToQuestion( function (data) {
			if ( data.a === 'score' ) updateDeleteLinks( data.id, data.score );
		} );
		// fallback to make this fix work in review too (TODO: hook the button clicks directly?)
		SOUP.hookAjax( /^\/posts\/(\d+)\/vote\/[023]\b/, function ( event, xhr, settings, match ) {
			var score = $.parseJSON( xhr.responseText ).NewScore;
			var postid = match[1];
			updateDeleteLinks( postid, score );
		} );
	}
};
fixes.mse231150 = {
	title:	"Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher",
	url:	"https://meta.stackexchange.com/q/231150",
	early:	function () {
		var buttonRegex = /(^|\s)js-(site-switcher|inbox|achievements|help)-button(\s|$)/;
		document.addEventListener( 'click', function (event) {
			if ( event.button != 0 ) return;  // ignore right/middle clicks
			var elem = event.target;
			while ( elem && !buttonRegex.test(elem.className) ) elem = elem.parentNode;
			if ( elem ) event.preventDefault();
		}, false );
	}
};
fixes.mse234680 = {
	title:	"Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode",
	url:	"https://meta.stackexchange.com/q/234680",
	script:	function () {
		if ( !SOUP.punycode ) {
			/*! https://mths.be/punycode v1.2.4 by @mathias */
			// Copyright Mathias Bynens <https://mathiasbynens.be/>, distributed under the MIT license; see https://github.com/bestiejs/punycode.js/tree/1f0b9c4fc833e10728b13768396c702d66d641df/LICENSE-MIT.txt for full license text
			!function(a){function b(a){throw RangeError(E[a])}function c(a,b){for(var c=a.length;c--;)a[c]=b(a[c]);return a}function d(a,b){return c(a.split(D),b).join(".")}function e(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function f(a){return c(a,function(a){var b="";return a>65535&&(a-=65536,b+=H(a>>>10&1023|55296),a=56320|1023
			&a),b+=H(a)}).join("")}function g(a){return 10>a-48?a-22:26>a-65?a-65:26>a-97?a-97:t}function h(a,b){return a+22+75*(26>a)-((0!=b)<<5)}function i(a,b,c){var d=0;for(a=c?G(a/x):a>>1,a+=G(a/b);a>F*v>>1;d+=t)a=G(a/F);return G(d+(F+1)*a/(a+w))}function j(a){var c,d,e,h,j,k,l,m,n,o,p=[],q=a.length,r=0,w=z,x=y;for(d=a.lastIndexOf(A),0>d&&(d=0),e=0;d>e;++e)a.charCodeAt(e)>=128&&b("not-basic"),p.push(a.charCodeAt(e));for(h=d>0?d+1:0;q>h;){for(j=r,k=1,l=t;h>=q&&b("invalid-input"),
			m=g(a.charCodeAt(h++)),(m>=t||m>G((s-r)/k))&&b("overflow"),r+=m*k,n=x>=l?u:l>=x+v?v:l-x,!(n>m);l+=t)o=t-n,k>G(s/o)&&b("overflow"),k*=o;c=p.length+1,x=i(r-j,c,0==j),G(r/c)>s-w&&b("overflow"),w+=G(r/c),r%=c,p.splice(r++,0,w)}return f(p)}function k(a){var c,d,f,g,j,k,l,m,n,o,p,q,r,w,x,B=[];for(a=e(a),q=a.length,c=z,d=0,j=y,k=0;q>k;++k)p=a[k],128>p&&B.push(H(p));for(f=g=B.length,g&&B.push(A);q>f;){for(l=s,k=0;q>k;++k)p=a[k],p>=c&&l>p&&(l=p);for(r=f+1,l-c>G((s-d)/r)&&b(
			"overflow"),d+=(l-c)*r,c=l,k=0;q>k;++k)if(p=a[k],c>p&&++d>s&&b("overflow"),p==c){for(m=d,n=t;o=j>=n?u:n>=j+v?v:n-j,!(o>m);n+=t)x=m-o,w=t-o,B.push(H(h(o+x%w,0))),m=G(x/w);B.push(H(h(m,0))),j=i(d,r,f==g),d=0,++f}++d,++c}return B.join("")}function l(a){return d(a,function(a){return B.test(a)?j(a.slice(4).toLowerCase()):a})}function m(a){return d(a,function(a){return C.test(a)?"xn--"+k(a):a})}var n="object"==typeof exports&&exports,o="object"==typeof module&&module&&module.
			exports==n&&module,p="object"==typeof global&&global;(p.global===p||p.window===p)&&(a=p);var q,r,s=2147483647,t=36,u=1,v=26,w=38,x=700,y=72,z=128,A="-",B=/^xn--/,C=/[^ -~]/,D=/\x2E|\u3002|\uFF0E|\uFF61/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},F=t-u,G=Math.floor,H=String.fromCharCode;if(q={version:"1.2.4",ucs2:{decode:e,encode:f},decode:j,encode:k,toASCII:m,
			toUnicode:l},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return q});else if(n&&!n.nodeType)if(o)o.exports=q;else for(r in q)q.hasOwnProperty(r)&&(n[r]=q[r]);else a.punycode=q}(SOUP);
		}
		
		var link = document.createElement('a');  // work-around for cross-browser access to URLUtils
		var fixURLInput = function (where) {
			$(where).find('input[type=text]').val( function (i, text) {
				// The following two lines are copied from ui.prompt() in wmd.en.js:
				text = text.replace(/^http:\/\/(https?|ftp):\/\//, '$1://');
				if (!/^(?:https?|ftp):\/\//.test(text)) text = 'http://' + text;
				
				// Separate URL and optional title, fix possibly broken % encoding in URL
				// (based on properlyEncoded() from wmd.en.js, but simplified and debugged):
				// XXX: this also fixes https://meta.stackexchange.com/q/285366
				var m = /^\s*(.*?)(?:\s+"(.*)")?\s*$/.exec(text);
				var url = m[1], title = m[2];
				var normalized = url.replace(/%(?:[\da-fA-F]{2})|[^\w\d\-./[\]%?+]+/g, function (match) {
					if (match.length === 3 && match.charAt(0) == "%") return match;
					else return encodeURI(match);
				} );

				// On Chrome, link.hostname / link.href return Punycode host names, so
				// just returning link.href would be enough; on Firefox, they return
				// Unicode, so we need to use the punycode.js library to convert them.
				// Either way, the following code should produce what we want:
				link.href = normalized;
				var host = SOUP.punycode.toASCII( link.hostname );
				var fixed = link.href.replace( link.hostname, host );
				if (url !== fixed) SOUP.log('soup mse234680 fixed ' + url + ' -> ' + normalized + ' -> ' + link.href + ' -> ' + fixed);
				return typeof(title) === 'undefined' ? fixed : fixed + ' "' + title + '"';
			} );
		};
		
		// rebind the submit / click handlers for the "Insert Hyperlink" dialog
		// FIXME: this doesn't work with the new-style hyperlink dialog on SO
		$(document).on( 'focus', '.wmd-prompt-dialog form:not(.soup-punycode-fixed) input', function (e) {
			$(this).closest('form').addClass('soup-punycode-fixed').each( function () {
				var oldSubmit = this.onsubmit;
				this.onsubmit = function () {
					fixURLInput(this);
					if (oldSubmit) return oldSubmit.apply(this, arguments);
				};
			} ).find('input[type=button]').each( function () {
				var oldClick = this.onclick;
				this.onclick = function () {
					fixURLInput( $(this).closest('form') );
					if (oldClick) return oldClick.apply(this, arguments);
				};
			} );
		} );
		
		// backup content filter for existing broken links with percent-encoded hostnames
		SOUP.addContentFilter( function ( where ) {
			var percentRegexp = /%[0-9A-Fa-f]{2}/;
			$(where).find('a[href*="//"]').not('.soup-punycode-fixed').filter( function () {
				if ( !percentRegexp.test( this.hostname ) ) return false;
				this.hostname = decodeURIComponent( this.hostname );
				return true;
			} ).addClass('soup-punycode-fixed');
		}, 'IDN escape fix' );
	}
};
fixes.mse266852 = {
	title:	"Bar between “add a comment” and “show more comments” is inconsistent",
	url:	"https://meta.stackoverflow.com/q/266852",
	credit:	"based on script by Cameron Bernhardt (AstroCB)",
	script:	function () {
		SOUP.addContentFilter( function () {
			$('div[id^="comments-link-"] .js-link-separator:not(.lsep)').addClass('lsep').text('|');
		}, 'mse266852', null, ['load', 'post'] );
	}
};
fixes.mse239549 = {
	title:	"Mobile user profile page sort selectors stop working after first change",
	url:	"https://meta.stackexchange.com/q/239549",
	// FIXME: The linked bug report is mostly about another bug, since fixed; this should be reported separately
	script:	function () {
		// make the event handler live
		var selector = '.user-panel-subtabs select'; var matches = $(selector);
		if ( ! matches.length ) return;
		SOUP.getEventHandlers( matches[0], 'change' ).forEach( function ( h ) {
			if ( h.selector || ! /"div\[class='subheader'\]"/.test( h.handler.toString() ) ) return;
			$('body').on( 'change', selector, h.handler );
			matches.off( 'change', h.handler );
		} );
		
		// sync the selector with the visible content
		// XXX: this will only work on English sites, and may break if the title text is changed
		matches.each( function () {
			var title = $(this).closest('.user-panel').find('div.subheader').text().toLowerCase();
			for (var i = 0; i < this.options.length; i++ ) {
				if ( title.indexOf( this.options[i].value ) < 0 ) continue;
				this.options[i].selected = true;
			}
		} )

	}
};
fixes.mse240417 = {
	title:	"Should moderator diamonds be inside or outside the highlight box?",
	url:	"https://meta.stackoverflow.com/q/240417",
	script:	function () {
		SOUP.addContentFilter( function () {
			$('.comment-user > .mod-flair').each( function () { $(this).insertAfter(this.parentNode) } );
		}, 'mse240417', null, ['load', 'post', 'comments'] );
	}
};
fixes.mse243519 = {
	title:	"Dangling signature dash in comments",
	url:	"https://meta.stackoverflow.com/q/243519",
	// FIXME: this is kind of broken on Chrome, and can trigger spurious scroll bars; see https://bugs.chromium.org/p/chromium/issues/detail?id=813345
	// using a non-breaking space instead of normal space after the dash seems to mitigate the issue somewhat, but not entirely :(
	// getting rid of white-space:nowrap would make this do nothing at all on Chrome, which might actually be preferable...
	script:	function () {
		var wrapper = $('<div> <span style="white-space:nowrap">\u2013\xA0</span></div>').contents();
		SOUP.addContentFilter( function () {
			$('.comment-body > .comment-user').each( function () { 
				var prev = this.previousSibling;
				if ( ! prev || prev.nodeType != 3 || ! /^[\xA0\s]*\u2013[\xA0\s]*$/.test(prev.nodeValue) ) return;
				wrapper.clone().replaceAll(prev).append(this);
			} );
		}, 'mse243519', null, ['load', 'post', 'comments'] );
	}
};
fixes.mse220611 = {
	title:	"Blue background on nominee comments only when expanded",
	url:	"https://meta.stackexchange.com/q/220611",
	path:	/^\/election\b/,
	script:	function () {
		// XXX: This seems to only happen on the initialpage view, so no need to make it a content filter.
		$('body.election-page div[id^="post-"]').each( function () {
			var $this = $(this), href = $this.find('.post-signature.owner .user-details > a:first').attr('href');
			var match = /^\/users\/[0-9]+\//.exec( href );
			if ( ! match ) return;
			$this.find( '.comments .comment-user:not(.owner)[href^="' + match[0] + '"]').addClass('owner');
		} );
	}
};
fixes.mse121682 = {
	title:	"Links to election nominations don't work after nominations close",
	url:	"https://meta.stackexchange.com/q/121682",
	script:	function () {
		var regex = /^(https?:)?(\/\/[^\/]+\/election\/\d+)#post-(\d+)$/, repl = '$2?tab=nomination#comment-$3';
		// part A: if we've followed a broken link, fix it
		if ( regex.test( location ) && $( location.hash ).length == 0 ) {
			location.replace( location.toString().replace( regex, '$1' + repl ) );
		}
		// part B: fix inbox links directly
		SOUP.hookAjax( /^\/topbar\/inbox\b/, function () {
			$('.topbar-dialog.inbox-dialog .inbox-item a[href*="/election/"]').attr( 'href', function (i, href) {
				return href.replace( regex, repl );
			} );
		} );
	}
};
fixes.mse230536 = {
	title:	"Large down-vote count doesn't display negative sign",
	url:	"https://meta.stackexchange.com/q/230536",
	script:	function () {
		SOUP.hookAjax( /^\/posts\/\d+\/vote-counts\b/, function () {
			// XXX: the downvote element has no class, hence the silly selector
			$('.vote-count-post > .vote-count-separator + div[style*="maroon"]').each( function () {
				if ( $(this).children().length > 0 ) return;
				this.textContent = this.textContent.replace( /^(\s*)([1-9])/, '$1-$2' );
			} );
		} );
	}
};
fixes.mse248646 = {
	title:	"Comments left by the author of a spam/offensive post should be deleted from the post too",
	url:	"https://meta.stackexchange.com/q/248646",
	css:	"body:not(.soup-mse248646-fixed) .deleted-answer .comment { display: none }",
	script:	function () {
		$('.deleted-answer').has('.hidden-deleted-answer').each( function () {
			var $this = $(this), comments = $(this).find('.comment').hide();
			if ( comments.length == 0 ) return;

			var ui = StackExchange.comments.uiForPost($this);
			var count = ui.remainingCommentsCount() + comments.length;
			ui.setCommentsMenu(count);
			ui.remainingCommentsCount(count);
		} );
		$(document.body).addClass('soup-mse248646-fixed');
	}
};
fixes.mso284223 = {
	title:	"Newly upvoted cool comments get an uncolored score",
	url:	"https://meta.stackoverflow.com/q/284223",
	credit:	"thanks to tbodt for locating the bug",
	script:	function () {
		var regex = /^\/posts\/comments\/(\d+)\/vote\/[02]\b/;
		SOUP.hookAjax( regex, function ( event, xhr, settings, match ) {
			$('#comment-' + match[1] + ' .comment-score span').each( function () {
				if ( ! this.className ) this.className = 'cool';
			} );
		} );
	}
};
fixes.mso297489 = {
	title:	"Add close option to the “Help and Improvement” queue to avoid cluttering flags?",
	url:	"https://meta.stackoverflow.com/q/297489",
	path:	/^\/review\/helper\b/,
	script:	function () {
		SOUP.hookAjax( /^\/review\/(next-task|task-reviewed)\b/, function () {
			StackExchange.vote_closingAndFlagging.init();
			$('.post-menu .close-question-link').show();
		} );
	}
};
fixes.mso295666 = {
	title:	"Disable annoying autofocus when clicking preview",
	url:	"https://meta.stackoverflow.com/q/295666",
	credit:	"based on code by Oriol (https://meta.stackoverflow.com/users/1529630/oriol)",
	script:	function () {
		$( '.wmd-preview' ).off( 'click' );
		// KLUGE: block installation of further click handlers
		var oldClick = $.fn.click;
		$.fn.click = function () {
			// XXX: $(document).not('.wmd-preview').length == 0!
			var that = ( arguments.length > 0 ? this.not( $('.wmd-preview') ) : this );
			oldClick.apply( that, arguments );
			return this;
		};
		// add replacement double-click handler
		$( document ).on( 'dblclick', '.wmd-preview', function () {
			$( 'textarea', this.parentNode ).focus();
		} );
	}
};
fixes.mse240787 = {
	title:	"Inconsistent reputation mouse-over text",
	url:	"https://meta.stackexchange.com/q/240787",
	script:	function () {
		SOUP.addContentFilter( function ( where ) {
			$( '.reputation-score[title]', where ).attr( 'title', function ( i, title ) {
				if ( ! /\d/.test( title ) ) {
					title = title.replace( /\s*$/, " " ) + this.textContent;
				}
				return title.replace( /[0-9]{4,}/g, function ( digits ) {
					return Number( digits ).toLocaleString( 'en-US' );
				} );
			} );
		}, 'mse240787', '.user-info', ["load", "post", "usercard"] );
	}
};
fixes.mso300679 = {
	title:	"Please block posts containing unsupported HTML",
	url:	"https://meta.stackoverflow.com/q/300679",
	script:	function () {
		var message = 'Your post appears to contain HTML tags that are malformed, mismatched or <a href="/editing-help#html">not permitted in posts</a>, and which will be silently removed. Where possible, please use Markdown syntax instead of HTML. To enter code that contains the <tt>&lt;</tt> symbol, please use <a href="/editing-help#code">proper code formatting</a> (or write it as <tt>&amp;lt;</tt>).';
		var soupPreSanitize = function ( tag ) {
			// kluge: replace <a> / <img> URLs so that sanitizeHtml() won't try to %-escape them
			tag = tag.replace( /^(<a\shref="|<img\ssrc=")([^"]*)/i, '$1http://example.com/' );
			// also replace comments, since we don't care if those get stripped
			tag = tag.replace( /^<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>$/, '' );
			return tag;
		}
		SOUP.addEditorCallback( function (editor, postfix) {
			var $body = $('#wmd-input' + postfix), $popup;
			var options = StackExchange.postValidation.getSidebarPopupOptions();
			options.type = 'warning';
			var isOK = true, timer = false, showPopup = function () {
				if ( !isOK && !$popup ) $popup = StackExchange.helpers.showMessage( $body, message, options );
				if ( timer !== false ) clearTimeout( timer );
				timer = false;
			};
			$body.on( 'blur', showPopup );
			editor.getConverter().hooks.chain( 'preSafe', function ( html ) { try {
				if ( timer !== false ) clearTimeout( timer );
				timer = false;

				var stripped = html.replace( /<[^>]*>?/g, soupPreSanitize );
				var sanitized = StackExchange.MarkdownEditor.sanitizeHtml( stripped );
				var balanced = StackExchange.MarkdownEditor.balanceTags( sanitized );
				isOK = ( balanced === stripped );

				if ( isOK && $popup ) {
					$popup.fadeOutAndRemove();
					$popup = null;
				} else if ( !isOK && !$popup ) {
					timer = setTimeout( function () { timer = false; showPopup() }, 3000 );
				}
				return html;
			} catch (e) { SOUP.log('mso300679 hook:', e) } } );
		} );
	}
};
fixes.mse266034 = {
	title:	"Link the title of the linked questions sidebar to the list of linked questions",
	url:	"https://meta.stackexchange.com/q/266034",
	path:	/^\/questions\/(\d+)\b/,
	script:	function () {
		var m = /^\/questions\/(\d+)\b/.exec( location.pathname );
		$('#h-linked').not(':has(a)').wrapInner('<a href="/questions/linked/' + m[1] + '"></a>');
	},
	css:	"#h-linked a, #h-linked a:visited { color: inherit; font-size: 100%; font-family: inherit; font-weight: inherit; line-height: inherit; display: inline }"
};
fixes.mse265889 = {
	title:	"Improve answer navigation for screen readers",
	url:	"https://meta.stackexchange.com/q/265889",
	credit:	"based on script by rene: https://meta.stackexchange.com/a/266236",
	script:	function () {
		var updateAnswerHeadings = function (where) {
			$(where).filter('.answer').add( $('.answer', where) ).each( function () {
				var answer = $(this);
				var isDeleted = answer.hasClass('deleted-answer');
				var signature = answer.find('.post-signature').eq(-1);
				var isWiki = signature.find('.community-wiki').length > 0;
				var author = signature.find('.user-details');
				if ( author.find('a').length > 0 ) author = author.find('a[href^="/users/"]');

				var voteCount = answer.find('.vote-count-post');
				var score = Number( voteCount.text() );
				if ( voteCount.find('.vote-count-separator').length > 0 ) {
					var divs = voteCount.find('div'), up = divs.eq(0), down = divs.eq(-1);
					score = Math.abs( up.text() ) - Math.abs( down.text() );
				}
				var isAccepted = answer.find('.vote-accepted-on').length > 0;

				var attrs = [ 'score ' + score ];
				if ( isAccepted ) attrs.push('accepted');
				if ( isWiki ) attrs.push('community wiki');

				var text = ( isDeleted ? 'Deleted answer' : 'Answer' );
				text += ' (' + attrs.join(', ') + ')';
				if ( author.length > 0 ) text += ' by ' + author.text().trim();

				var heading = answer.find('.soup-answer-heading');
				if ( heading.length < 1 ) heading = $('<h6 class="soup-answer-heading">');
				heading.text(text).prependTo(answer.find('.answercell'));
			} );
		};
		SOUP.addContentFilter( updateAnswerHeadings, 'mse265889', null, ['load', 'post'] );
		SOUP.subscribeToQuestion( function (data) {
			if ( /^(score|(un)?accept)$/.test( data.a ) ) setTimeout( function () {
				updateAnswerHeadings( '#answer-' + (data.answerid || data.id) );
			}, 10 );
		} );
	},
	// http://webaim.org/techniques/css/invisiblecontent/
	css:	".soup-answer-heading { overflow: hidden; height: 1px; width: 1px; position: absolute; left: -9999px }"
};
fixes.mse266523 = {
	title:	"Uploading an image from the web can leave paste broken in editor",
	url:	"https://meta.stackexchange.com/q/266523",
	script:	function () {
		$('#content').on('paste', function () {
			if ( $('.modal-dropzone').length > 0 ) return;
			SOUP.getEventHandlers( document.body, 'paste' ).forEach( function ( h ) {
				if ( ! /\.modal-dropzone/.test( h.handler.toString() ) ) return;
				$('body').off( 'paste', h.handler );
			} );
		} );
	}
};
fixes.mse264307 = {
	title:	"Down arrow key won't work after using the Hyperlink button",
	url:	"https://meta.stackexchange.com/q/264307",
	script:	function () {
		var proto = document.body;
		while ( proto && proto.removeChild && !proto.hasOwnProperty('removeChild') ) {
			proto = Object.getPrototypeOf( proto );
		}
		if ( !proto || !proto.removeChild ) return;

		var oldRemoveChild = proto.removeChild;
		proto.removeChild = function ( removed ) {
			var active = document.activeElement, node = active;
			while ( node && node !== removed ) node = node.parentNode;
			if ( node ) active.blur();
			return oldRemoveChild.apply( this, arguments );
		};
	}
};
fixes.mse170970 = {
	title:	"Occasionally, the Unicode character sequence U+200C U+200B (ZWNJ ZWSP) is inserted into comments",
	url:	"https://meta.stackexchange.com/q/170970",
	script:	function () {
		SOUP.addContentFilter( function ( where ) {
			SOUP.forEachTextNode( $('.comment-copy', where), function ( text ) {
				return text.replace( /\u200c\u200b/g, '' );
			} );
		}, 'mse170970', null, ['load', 'post', 'comments'] );
	}
};
fixes.mse153528 = {
	title:	"Don't ask for a comment when downvoting, if the user just voted on a comment",
	url:	"https://meta.stackexchange.com/q/153528",
	script:	function () {
		if ( ! window.StackExchange ) return;
		// TODO: add localized message variants?
		var re = /^Please consider adding a comment if you think this post can be improved\.$/;
		var oldShowInfoMsg = StackExchange.helpers.showInfoMessage;
		StackExchange.helpers.showInfoMessage = function ( elem, message, options ) {
			if ( re.test(message) ) {
				var post = $(elem).closest('.question, .answer');
				if ( post.has('.comment-up-on').length ) return null;
			}
			return oldShowInfoMsg.apply( this, arguments );
		};
	}
};
fixes.mse259325 = {
	title:	"Answer flashes orange when I click the “edit (1)” link to review a suggested edit",
	url:	"https://meta.stackexchange.com/q/259325",
	script:	function () {
		// the initial hashchange event has already fired, so we can safely ignore any later
		// events that don't correspond to an actual change in the hash
		var oldHash = location.hash;
		SOUP.getEventHandlers( window, 'hashchange' ).forEach( function (h) {
			if ( ! h.namespace || h.namespace !== 'highlightDestination' ) return;
			var oldHandler = h.handler;
			h.handler = function (e) {
				if ( oldHash === location.hash ) return;
				oldHash = location.hash;
				return oldHandler.apply( this, arguments );
			};
		} );
	}
};
fixes.mse268584 = {
	title:	"When a user is deleted, OP highlighting is lost",
	url:	"https://meta.stackexchange.com/q/268584",
	script:	function () {
		SOUP.addContentFilter( function () {
			// XXX: in dupe review, there can be multiple questions on the page
			$('.mainbar, #mainbar').each( function () {
				var name = $(this).find('.question .post-signature.owner .user-details').not(':has(a)').text().trim();
				if ( name === "" ) return;
				$(this).find('span.comment-user:not(.owner)').filter( function () {
					return this.textContent === name;
				} ).addClass('owner');
			} );
		}, 'mse268584', null, ['load', 'post', 'comments'] );
	},
	css:	"span.comment-user.owner { padding: 1px 5px }"
};
fixes.mso310158 = {
	title:	"Right to left marker in comment shouldn't cause the rest of the line to change",
	url:	"https://meta.stackoverflow.com/q/310158",
	// This fix and mse84296 above address the same issue from different sides:
	// while mse84296 fixes comment BiDi leakage for users with SOUP installed,
	// this fix sanitizes BiDi markup in new comments posted by SOUP users, so
	// that other users *without* SOUP installed will see them as intended.
	script: function () {
		// make sure BiDi embed / override / isolate effects won't leak out into surrounding text
		// see https://meta.stackoverflow.com/a/310228
		function sanitizeBiDi (str) {
			var PDF = "\u202C", PDI = "\u2069";  // Pop Directional Formatting/Isolate
			var stack = [];  // stack of pending PDF / PDI marks

			str = str.replace( /[\u202A-\u202E\u2066-\u2069]/g, function (chr) {
				if (chr === PDF || chr === PDI) {
					var rv = "";
					// PDI always terminates all unclosed embeds / overrides
					if (chr === PDI) {
						while (stack.length > 0 && stack[stack.length-1] === PDF) rv += stack.pop();
					}
					// skip this PDF/I unless we've seen the corresponding opening mark
					if (stack.length > 0 && stack[stack.length-1] === chr) rv += stack.pop();
					return rv;
				} else {
					// push corresponding closing mark onto the stack
					stack.push( /[\u202A-\u202E]/.test(chr) ? PDF : PDI );
					return chr;
				}
			} );
			// close any remaining open embeds / overrides / isolates at the end
			if (stack.length > 0) {
				stack.reverse();
				str += stack.join("");
			}
			return str;
		}

		// Unicode ranges that may contain strong RTL or BiDi control characters:
		// U+0590..08FF: Hebrew, Arabic, Syriac, Thaana, NKo, Samaritan, Mandaic
		// U+200F: Right-to-Left Mark
		// U+202A..202E: BiDi embedding / override
		// U+2066..2069: BiDi isolation
		// U+D800..F8FF: Surrogates and Private Use Area
		// U+FB1D..FEFE: Hebrew and Arabic presentation forms (excluding U+FEFF = Byte Order Mark)
		var mayEndInRTL = /([\u0590-\u08FF\u200F\u202A-\u202E\u2066-\u2069\uD800-\uF8FF\uFB1D-\uFEFE][^A-Za-z\u200E]*)$/;

		// DEBUG:
		var escapeUnicode = function (str) {
			return '"' + str.replace( /[\"\\]/g, '\\$1' ).replace( /[^ -~]/g, function (chr) {
				var code = chr.charCodeAt(0);
				if ( code <= 0xFF ) return "\\x" + ("00" + code.toString(16)).slice(-2);
				else return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).slice(-4);
			} ) + '"';
		};

		// KLUGE: we hook disableSubmitButton because it's called from the SE submit event handler just before the Ajax request
		if ( window.StackExchange ) {
			var oldDisableSubmitButton = StackExchange.helpers.disableSubmitButton;
			StackExchange.helpers.disableSubmitButton = function (form) {
				var $form = $(form), id = $form.attr('id');
				if ( /^(add|edit)-comment-/.test(id) ) {
					var inputBox = $form.find('textarea');
					var oldText = inputBox.val();
					var newText = sanitizeBiDi(oldText).replace( mayEndInRTL, "$1\u200E" );
					if ( newText !== oldText ) {
						inputBox.val( newText )
						SOUP.log( 'soup sanitized', escapeUnicode(oldText), 'to', escapeUnicode(newText) );
					}
				}
				return oldDisableSubmitButton.apply(this, arguments);
			};
		}
		// TODO: figure out how to make this work in chat too
	}
};
fixes.mse223737 = {
	title:	"Inbox heading should be a link",
	url:	"https://meta.stackexchange.com/q/223737",
	script:	function () {
		SOUP.hookAjax( /^\/topbar\/inbox\b/, function () {
			if ( $('#soup-mse223737-link').length > 0 ) return;
			$('.topbar-dialog.inbox-dialog .inbox-se-link a').clone().attr('id', 'soup-mse223737-link').insertAfter('.topbar-dialog.inbox-dialog h3:first-of-type');
		} ).code();
	},
	css:	"#soup-mse223737-link { float: right }"
};
fixes.mso313853 = {
	title:	"“Per page” pagination returns no results when increasing limit on last page",
	url:	"https://meta.stackoverflow.com/q/313853",
	script:	function () {
		var re = {
			page: /^([^?#]*\?(?:[^&#]*&)*)page=(\d+)([&#]|$)/,
			size: /^([^?#]*\?(?:[^&#]*&)*)pagesize=(\d+)([&#]|$)/,
			text: /^(\s*)(\d+)\s*$/
		};
		SOUP.hookAjax( /^\/(questions\/?)?([?#]|$)|^\/questions\/[a-z]/, function () {
			$('.page-sizer').each( function () {
				var sizer = $(this), curURL = sizer.find('a.current').attr('href').replace(/#.*/, '');
				var sizeMatch = re.size.exec(curURL), pageMatch = re.page.exec(curURL);
				if ( ! sizeMatch ) return;
				if ( ! pageMatch ) {
					// try a few other ways to obtain the current page number
					var altURL = sizer.parent().find('.pager a.current').attr('href');
					var altText = sizer.parent().find('.pager span.current').text().replace(/,/g, '');
					pageMatch = re.page.exec(altURL) || re.text.exec(altText) || re.page.exec(location.href);
				}
				if ( ! pageMatch ) return;
				var curSize = Number( sizeMatch[2] ), curPage = Number( pageMatch[2] ), offset = curSize * (curPage-1);

				sizer.find('a.page-numbers').attr( 'href', function (i, href) {
					var sizeMatch = re.size.exec(href), pageMatch = re.page.exec(href);
					if ( ! sizeMatch ) return;
					var newSize = Number(sizeMatch[2]);
					// round down if we're growing the page, round up if we're shrinking it
					var newPage = (
						newSize > curSize ? Math.floor(offset / newSize) + 1 :
						newSize < curSize ? Math.ceil(offset / newSize) + 1 :
						curPage // same size -> same page
					);
					if ( pageMatch ) {
						return href.replace(re.page, '$1page=' + newPage + '$3');
					} else {
						return href.replace(/([^?#]*\?)/, '$1page=' + newPage + '&');
					}
				} );
			} );
		} ).code();
	}
};
fixes.mse74274 = {
	title:	"Privacy leak in permalink?",
	url:	"https://meta.stackexchange.com/q/74274",
	script:	function () {
		if ( ! window.StackExchange || ! StackExchange.question || ! StackExchange.question.showShareTip ) return;
		
		// TODO: we should strip the user ID from the share link URL itself!
		// The problem is that showShareTip() pulls the URL from the link,
		// so this would anonymize the popup *too* completely. :-(

		var anonShareTip = function () {
			// there should be only one share tip, but let's play it safe
			try { $('.share-tip:not(:has(.share-anon))').each( function () {
				var input = $(this).find('input').first(), anon = input.clone();
				anon.val( input.val().replace(/(\/[qa]\/\d+)\/\d+$/, '$1') );
				if (anon.val() === input.val()) return;
				anon.addClass('share-anon');
				input.after(anon).after('anonymous');  // TODO: localize?
			} ) }
			catch (e) { SOUP.log( 'SOUP anonShareTip():', e ) }
		};
		// inject call to anonShareTip() after StackExchange.question.showShareTip()
		var oldShareTip = StackExchange.question.showShareTip;
		StackExchange.question.showShareTip = function () {
			var rv = oldShareTip.apply(this, arguments);
			anonShareTip();
			return rv;
		};
		// the share link click handler calls the original showShareTip() directly
		$(document).on( 'click', '.post-menu a.short-link', anonShareTip );
	},
	// minor CSS tweak to make the close link take up less vertical space
	css:	".share-tip #share-icons { float: left }" +
		".share-tip .close-share-tip { position: relative; top: 4px }"
};
fixes.mso338932 = {
	title:	"Touch laptop – “The snippet editor does not support touch devices.”",
	url:	"https://meta.stackoverflow.com/q/338932",
	script:	function () {
		var bypassTouchBlocker = function () {
			var $this = $(this);
			// to minimize risk of unwanted side effects, only disable the preview pane touchend handler if the snippet editor is enabled
			if ( $this.has('.wmd-snippet-button') ) $this.find('.wmd-preview').off('touchend');
			// also fix the citation helper button on MO; see https://meta.mathoverflow.net/a/3295
			$this.find('.wmd-snippet-button > span, .wmd-cite-button > span').off('touchend');
		};
		// the SE prepareWmd() callback adds these handlers, we strip them :)
		SOUP.addEditorCallback( function ( editor, postfix ) {
			// the button touch handlers are added in a setTimeout(..., 0) callback
			setTimeout( function () {
				$('#post-editor' + postfix).each( bypassTouchBlocker );
			}, 1 );
		} );
		// just in case, also fix any editors that have already been initialized
		$('.post-editor').each( bypassTouchBlocker );
	}
};
fixes.mse287473 = {
	title:	"Tooltip banner blinking for question closed by the user with the golden badge in small screens",
	url:	"https://meta.stackexchange.com/q/287473",
	// NOTE: This actually fixes a more generic bug in StackExchange.helpers.showMessage, where the positioning
	// calculation fails to account for the possibility that moving the message box to its target position might
	// cause its content to wrap, thus making it taller than expected.  We fix this by setting a max-width style
	// on the message box that matches the space actually available for it.
	script:	function () {
		if ( ! window.StackExchange || ! StackExchange.helpers ) return;
		var oldShowMessage = StackExchange.helpers.showMessage;
		var tipSize = 9; // must match css and SE code
		StackExchange.helpers.showMessage = function ( $elem, message, options ) {
			if ( options && options.position && options.position.my && ! ( options.css && options.css['max-width'] ) ) {
				$elem = $( $elem );
				if ( $elem.length < 1 ) return;
				
				// calculate horizontal position of the message tip
				var tipLeft = $elem.offset().left;
				if ( /right/.test( options.position.at ) ) tipLeft += $elem.outerWidth(true);
				else if ( /^(top|bottom) center$/.test( options.position.at ) ) tipLeft += $elem.outerWidth(true) / 2;
				var tipRight = $(document).width() - tipLeft;

				// calculate space available for the message
				var maxWidth = -1;
				if ( /left/.test( options.position.my ) ) maxWidth = tipRight;
				else if ( /center/.test( options.position.my ) ) maxWidth = Math.min(tipLeft, tipRight) * 2;
				else if ( /right/.test( options.position.my ) ) maxWidth = tipLeft;
				if ( /^(left|right)/.test( options.position.my ) ) maxWidth -= tipSize;
				
				// XXX: refuse to set an absurdly small max-width
				if ( maxWidth >= 50 ) {
					if ( ! options.css ) options.css = {};
					options.css['max-width'] = Math.floor(maxWidth) + 'px';
				}
			}
			return oldShowMessage.call( this, $elem, message, options );
		};
	}
};
fixes.mse135710 = {
	title:	"Please show changed titles separately in edit diffs",
	url:	"https://meta.stackexchange.com/q/135710",
	script:	function () {
		function splitTitleDiff() {
			// the selector below should skip unchanged titles and titles that have already been split
			$('.suggested-edit div.summary > h2 > a.question-hyperlink:has(.diff-delete, .diff-add)').each( function () {
				var oldTitle = $(this.parentNode);  // we want to also duplicate the h2
				var newTitle = oldTitle.clone(true).insertAfter(oldTitle);
				oldTitle.find('.diff-add').remove();
				newTitle.find('.diff-delete').remove();
				// KLUGE: the class "sox-better-title" stops SOX (https://stackapps.com/q/6091) from re-duplicating the title
				oldTitle.add(newTitle).wrapAll('<table class="soup-mse135710 sox-better-title"><tr valign=top>').wrap('<td width="50%">');
			} );
		}
		SOUP.hookAjax( /^\/review\/(next-task|task-reviewed)\b/, splitTitleDiff );
		splitTitleDiff();
	},
	css:	'table.soup-mse135710 { width: 100% }\n' +
		'table.soup-mse135710 h2 { margin-bottom: 0 }'
};
fixes.mse223725 = {
	title:	"All internal links on Stack Exchange sites should be protocol-relative",
	url:	"https://meta.stackexchange.com/q/223725",
	script:	function () {
		var selector = 'a[href^="http://"]';
		var regexp   = /^([^.]+\.)?(meta\.)?((stack(exchange|overflow|apps)|superuser|serverfault|askubuntu)\.com|mathoverflow\.net)$/;
		var fixLink  = function () {
			if ( regexp.test(this.hostname) ) this.protocol = 'https:';
		};
		var fixAllLinks = function (where) { $(where).find(selector).each(fixLink) };
		SOUP.addContentFilter( fixAllLinks, 'soup HTTPS link fix' );
		$(document).on( 'mouseover click', selector, fixLink );
	}
};
fixes.mse299086 = {
	title:	"HTTPS certificate error for meta redirect pages (meta.<site>.stackexchange.com)",
	url:	"https://meta.stackexchange.com/q/299086",
	// see also https://meta.stackexchange.com/questions/295686/parent-chat-user-still-links-to-discuss-area51
	// and https://meta.stackexchange.com/questions/297042/chat-links-to-meta-sites-have-been-rewritten-with-invalid-https
	script:	function () {
		var selector = 'a[href*="//meta."], a[href*="//discuss.area51"]';
		var regexp   = /^(meta|discuss)\.([^.]+)\.stackexchange\.com$/;
		// old site aliases don't have redirects from https://<alias>.meta.stackexchange.com
		// data source: https://api.stackexchange.com/2.2/sites?pagesize=99999&filter=!6P.EhvnWknhjL
		var aliases = {
			"askpatents": "patents",
			"avp": "video",
			"beer": "alcohol",
			"bicycle": "bicycles",
			"cryptography": "crypto",
			"garage": "mechanics",
			"homebrewing": "homebrew",
			"itsecurity": "security",
			"linux": "unix",
			"moderators": "communitybuilding",
			"photography": "photo",
			"photos": "photo",
			"programmers": "softwareengineering",
			"statistics": "stats",
			"tv": "movies",
			"ui": "ux",
			"vegetarian": "vegetarianism",
			"webmaster": "webmasters"
		};
		var fixLink = function () {
			var m = regexp.exec( this.hostname );
			if (!m) return;
			this.hostname = (aliases[m[2]] || m[2]) + '.meta.stackexchange.com';
			this.protocol = 'https:';
		};
		var fixAllLinks = function (where) { $(where).find(selector).each(fixLink) };
		SOUP.addContentFilter( fixAllLinks, 'soup HTTPS meta link fix' );
		$(document).on( 'mouseover click', selector, fixLink );
	}
};
fixes.mse295065 = {
	title:	"Clicking “flags remaining” should link to a user's flag history page",
	url:	"https://meta.stackexchange.com/q/295065",
	script:	function () {
		if ( ! window.StackExchange || ! StackExchange.options || ! StackExchange.options.user ) return;
		var link = '<a href="/users/flag-summary/' + StackExchange.options.user.userId + '" style="color:inherit">';
		SOUP.hookAjax( /^\/flags\/(posts|comments)\/\d+\/popup/,  function () {
			$('#popup-flag-post .flag-remaining-inform, .popup-flag-comment .flag-remaining-spam').not(':has(a)').wrapInner(link);
		} );
	}
};
fixes.mso345590 = {
	title:	"The Stack Exchange menu is partly covered by the scrollbar when the window is too narrow",
	url:	"https://meta.stackoverflow.com/q/345590",
	script:	function () {
		var $window = $(window), $header = $('.js-top-bar');
		if ( $header.length != 1 ) return;

		// override unwanted .so-header._fixed{ max-width: auto } style
		$header.css( 'min-width', $('#content').outerWidth() );

		// based on https://stackoverflow.com/a/12958987
		var lastOffset = 0;
		function scrollHeader () {
			var newOffset = -$window.scrollLeft();
			if ( newOffset === lastOffset ) return;
			$header.css( 'left', newOffset );
			lastOffset = newOffset;
		}

		var isActive = false;
		function maybeToggleHeaderFix () {
			var isFixed = $header.hasClass('_fixed');
			if ( isFixed === isActive ) return;
			if ( isFixed ) {
				lastOffset = $header.position().left;
				$window.on( 'scroll resize', scrollHeader );
				scrollHeader();
			} else {
				$window.off( 'scroll resize', scrollHeader );
				$header.css( 'left', 0 );
			}
			isActive = isFixed;
		}
		// set up an observer in case the _fixed class is dynamically added or removed
		var observer = new MutationObserver( maybeToggleHeaderFix );
		observer.observe( $header[0], { attributes: true } );

		maybeToggleHeaderFix();
	}
};
fixes.mse213709 = {
	title:	"Allow flagging comments on mobile site",
	url:	"https://meta.stackexchange.com/q/213709",
	script:	function () {
		if ( ! SOUP.isMobile ) return;
		SOUP.addContentFilter( function (where) {
			SOUP.log('soup mse213709 fix active');
			$(where).find('div.comment-voting:has(a.comment-up, a.comment-up-on):not(:has(.comment-flag))').append(
				'<a class="comment-flag soup-comment-flag" title="flag this comment"></a>'
			);
		}, 'mobile comment flag link fix', null, ['load', 'post', 'comments'] );
		SOUP.hookAjax( /^\/flags\/comments\/\d+\/popup\b/, function () {
			var popup = $('div.comment-voting > .popup-flag-comment');
			popup.closest('.comment').after(popup);
		} );
	},
	css:	".soup-comment-flag { display: block; margin: 0 auto; height: 20px; width: 20px; text-indent: -999em;" +
		" background-repeat: no-repeat; background-position: 2px 6px; background-size: 16px;" +
		" background-image: url('data:image/svg+xml," +  encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="22" viewBox="0 0 32 22">' +
			'<path stroke="#77808E" stroke-width="2" d="M11 1h16v12h-16zM7 0V22" fill="none"/></svg>'
		) + "') }" +
		".comment + .popup-flag-comment { color: #0C0D0E }"  // default body text color
};
fixes.mso356880 = {
	title:	"“This post has been edited x time since you began” persists after saving the question",
	url:	"https://meta.stackoverflow.com/q/356880",
	path:	/^\/review\b/,
	script:	function () {
		if ( ! window.StackExchange || ! StackExchange.notify || ! StackExchange.notify.close ) return;
		SOUP.hookAjax( /^\/review\/(next-task|task-reviewed)\b/, function () {
			StackExchange.notify.close(-2);
		} );
	}
};
fixes.mse303599 = {
	title:	"The “Flag” modal keeps going down",
	url:	"https://meta.stackexchange.com/q/303599",
	// override jQuery .offset() to act like .position() for the flag/close popups
	// XXX: this is tricky because .position() calls .offset() internally
	script:	function () {
		var oldOffset = $.fn.offset, inOffset = false;
		$.fn.offset = function () {
			if ( inOffset || arguments.length > 0 || this.length > 1 || ! this.is('#popup-flag-post, #popup-close-question') ) {
				return oldOffset.apply(this, arguments);
			} else try {
				inOffset = true;
				return this.position();
			} finally {
				inOffset = false;
			}
		};
	}
};
fixes.mse90713 = {
	title:	"Show “this question has an active bounty and cannot be closed” earlier, when it applies",
	url:	"https://meta.stackexchange.com/q/90713",
	// XXX: the bounty detection won't work in review; hopefully bountied questions should rarely appear there
	path:	/^\/questions\/\d+\b/,
	script:	function () {
		if ( $('#question .bounty-notification .question-status.bounty').length == 0 ) return;  // no bounty => nothing to do

		var notice = '<div class="soup-mse90713-notice">This question has an open bounty and cannot be closed.</div>';

		// disable any radio buttons that don't open a submenu
		// TODO: super-disable the submit button instead? (see mso358862 fix below)
		SOUP.hookAjax( /^\/flags\/questions\/\d+\/close\/popup\b/, function () {
			$('#popup-close-question h2.popup-title-container').after( notice );
			$('#popup-close-question input[type=radio]:not([data-subpane-name][data-subpane-name!=""])').disable();
		} );
		// also prevent the dupe finder from enabling the submit button
		SOUP.hookAjax( /^\/posts\/popup\/close\/search-originals\/\d+\b/, function () {
			$('#popup-close-question .popup-submit').disable();
		} );
	},
	// the colors are based on the .message.message-error style in all.css on SO
	css:	".soup-mse90713-notice { color: #F9ECED; background-color: #C04848; text-align: center; padding: 11px; margin-bottom: 4px }"
};
fixes.mso358862 = {
	title:	"5 seconds is too long, but if it must be, then give me a visual cue",
	url:	"https://meta.stackoverflow.com/q/358862",
	script:	function () {
		// override the SE jQuery .enable() extension to allow temporarily locking the disable/enable state
		// TODO: make this a global utility?
		var oldEnable = $.fn.enable;
		$.fn.enable = function (enable) {
			if (arguments.length == 0) enable = true;  // default to true
			this.filter('.soup-enable-locked').toggleClass('soup-delayed-enable', !!enable);
			oldEnable.apply(this.not('.soup-enable-locked'), arguments);
			return this;
		};

		var flagEnableTimer = 0;
		SOUP.hookAjax( /^\/flags\/.*\/add\b/, function () {
			if ( flagEnableTimer > 0 ) clearTimeout( flagEnableTimer );
			flagEnableTimer = setTimeout( function () {
				flagEnableTimer = 0;
				// re-enable any locked submit buttons
				var buttons = $('.popup-submit.soup-enable-locked');
				if ( buttons.length < 1 ) return;
				buttons.removeClass('soup-enable-locked').disable();
				buttons.filter('.soup-delayed-enable').enable().removeClass('soup-delayed-enable');
			}, 5000 );
		} );
		SOUP.hookAjax( /^\/flags\/.*\/popup\b/, function () {
			if ( flagEnableTimer <= 0 ) return;
			// save the current state of the submit button, then disable and lock it
			var buttons = $('.popup-submit:not(.soup-enable-locked)');
			buttons.not('[disabled]').addClass('soup-delayed-enable');
			buttons.disable().addClass('soup-enable-locked');
		} );
	}
};
fixes.mse286345 = {
	title:	"Mobile search made impossible with keyboard shortcuts enabled",
	url:	"https://meta.stackexchange.com/q/286345",
	// XXX: despite the title, this bug is not actually mobile specific
	script:	function () {
		if ( ! window.StackExchange || ! StackExchange.ifUsing ) return;
		var selector = "textarea, input:not([type=checkbox],[type=radio],[type=submit],[type=button],[type=image],[type=reset])";
		StackExchange.ifUsing( 'keyboardShortcuts', function () {
			// the SE keyboard shortcuts script installs its own handler on $(document), so we should catch the events first
			$(document.body).on('keypress', selector, function (event) {
				event.stopPropagation();
				return true;
			} );
		} );
	}
};
fixes.mse178439 = {
	title:	"Can we exempt downvoted accepted answers from getting the top spot?",
	url:	"https://meta.stackexchange.com/q/178439",
	path:	/^\/questions\/\d+/,
	script:	function () {
		var answers = $('#answers > .answer'), firstAnswer = answers.first();
		if ( ! firstAnswer.is('.downvoted-answer.accepted-answer') ) return;

		function getScore (post) {
			// XXX: we assume that no answers have expanded vote counts yet when this runs
			return Number( $('.vote-count-post', post).text() );
		}
		function getTimestamp (post, index) {
			return $('.post-signature .user-action-time .relativetime', post).eq(index).attr('title') || "";
		}

		var order = /[?&]answertab=([^&#]*)/.exec( $('#tabs a.youarehere').attr('href') );
		if ( ! order ) return SOUP.log( 'soup mse178439: unable to determine answer sort mode!' );

		var acceptedScore = getScore( firstAnswer );  // XXX: we need this anyway for logging
		var filterFunc;
		switch ( order[1] ) {
			case 'votes':
				answers = answers.not('.deleted-answer');  // deleted answers always sort last by score!
				filterFunc = function () { return getScore(this) > acceptedScore };
				break;
			case 'active':
				var acceptedActive = getTimestamp( firstAnswer, 0 );  // assume edit timestamp comes first
				filterFunc = function () { return getTimestamp(this, 0) > acceptedActive };
				break;
			case 'oldest':
				var acceptedCreated = getTimestamp( firstAnswer, -1 );  // assume creation timestamp comes last
				// XXX: community wiki answers only show the last edit time, so that's all we get here :(
				filterFunc = function () { return getTimestamp(this, -1) < acceptedCreated };
				break;
			default:
				SOUP.log( 'soup mse178439: unrecognized answer sort mode', order[1] );
				return;
		}
		var betterAnswers = answers.slice(1).filter( filterFunc );
		// TODO: check that the answers actually are consecutive?
		if ( betterAnswers.length < 1 ) return;
		SOUP.log( 'soup mse178439 moving accepted answer with score ' + acceptedScore + ' below ' + betterAnswers.length + ' other answer(s) by ' + order[1] );

		var anchor = firstAnswer.prev( 'a[name=' + Number( firstAnswer.data('answerid') ) + ']' );
		betterAnswers.last().after( anchor, firstAnswer );
	}
};


//
// Site-specific JS fixes:
//
fixes.boardgames1652 = {
	title:	"Switch Magic autocard over to a different search engine, Scryfall",
	url:	"https://boardgames.meta.stackexchange.com/q/1652",
	// formerly https://boardgames.meta.stackexchange.com/q/1152
	credit:	"based on idea by Alex P & doppelgreener",
	sites:	/^boardgames\./,
	script:	function () {
		// rewrite of https://cdn.sstatic.net/js/third-party/mtg.js to make it work in preview too
		$('body').on( 'click', 'a.soup-mtg-autocard', function (event) {
			if ( event.button !== 0 ) return true;
			var link = $(this).attr('href');
			window.open(link, "autocard" + (+new Date()), "scrollbars=1, resizable=1, width=400, height=600");
			event.preventDefault();
			return false;
		} );

		// helper function to generate URL from card name
		var makeCardLink = function (cardName) {
			cardName = cardName.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
			cardName = cardName.replace(/\+/g, ' ').replace(/["\[\]]+/g, '').replace(/^\s+/, '');
			return 'https://scryfall.com/search?q=%21%22' + encodeURIComponent(cardName) + '%22&utm_source=stackexchange';
		};
		
		// change the URLs in server-side generated card links
		var cardLinkRegexp = /^https?:\/\/(?:www\.wizards\.com\/magic\/autocard\.asp|gatherer\.wizards\.com\/pages\/search\/default\.aspx)\?name=([^&#]*)$/i;
		var fixCardLinks = function () {
			var cardLinks = $('a.mtg-autocard');
			// remove / prevent attachment of standard mtg.js click handler
			cardLinks.addClass('soup-mtg-autocard').removeClass('mtg-autocard').off('click').each( function () {
				var m = cardLinkRegexp.exec(this.href);
				if ( m ) this.href = makeCardLink( decodeURIComponent( m[1] ) );
			} );
		};
		SOUP.addContentFilter( fixCardLinks, 'mtg card link fix', null, ['load', 'post', 'preview'] );
		
		// related issue: card links are not parsed in edit preview
		// this code is loosely based on makeTagLinks() in https://dev.stackoverflow.com/content/Js/wmd.en.js
		SOUP.addEditorCallback( function (editor, postfix) {
			editor.getConverter().hooks.chain( 'postConversion', function (text) { try {
				var excludeRanges = null;
				return text.replace( /\[mtg:([^\[\]]+)\]/g, function (fullMatch, cardName, offset) { 
					// don't replace [mtg:] links inside <a> or <code> tags;
					// but don't bother looking for them unless we actually see such a link 
					if ( excludeRanges === null ) {
						var re = /<(a|code)\b[^>]*>.*?<\/\1>/ig, match;
						excludeRanges = [];
						while ((match = re.exec(text)) !== null) {
							excludeRanges.push( match.index, re.lastIndex );
						}
					}
					var skip = false;
					for (var i = 0; i < excludeRanges.length; i++) {
						if ( offset < excludeRanges[i] ) break;
						skip = !skip;
					}
					if (skip) return fullMatch;
					return '<a class="soup-mtg-autocard" href="' + makeCardLink(cardName) + '">' + cardName + '</a>';
				} );
			} catch (e) { SOUP.log('SOUP MtG card link converter failed:', e) } } );
		} );
	}
};
fixes.boardgames867 = {
	title:	"We should implement Magic the Gathering pop-ups on hover",
	url:	"https://boardgames.meta.stackexchange.com/q/867",
	credit:	"inspired by Marc Dingena's HoverCard user script (https://boardgames.meta.stackexchange.com/q/1459)",
	sites:	/^boardgames\./,
	script:	function () {
		// set up the tooltip element; this will be appended to the card link and styled with the CSS below
		var tooltip = $('<div id="soup-mtg-tooltip">').appendTo(document.body);

		// constants for tooltip positioning
		var xOffset = 20, yOffset = 20;

		// show the tooltip after the mouse hasn't been moved for 0.5 seconds, and position it near the cursor
		var timeoutID = 0, mouseX = 0, mouseY = 0, linkElement = null, tooltipActive = false;
		var linkRects = [], rectOffsetX = 0, rectOffsetY = 0;
		var showTooltip = function () {
			timeoutID = 0;
			tooltipActive = true;
			tooltip.html('<img alt="">').find('img').attr( 'src', $(linkElement).data('soup-mtg-tooltip-url') );
			tooltip.find('img').on( 'error', function () { tooltip.html('<div>Card image loading failed.</div>') } );

			// save the link bounding rectangles and offset for mousemove handler below
			linkRects = linkElement.getClientRects();
			var winLeft = rectOffsetX = window.scrollX;
			var winTop  = rectOffsetY = window.scrollY;

			// scale the tooltip down for very small screens
			var winWidth = document.documentElement.clientWidth;
			var winHeight = document.documentElement.clientHeight;
			var tipWidth = 244, tipHeight = 340, scale = 1;
			scale = Math.min( scale, winWidth / tipWidth );
			scale = Math.min( scale, winHeight / tipHeight );
			tipWidth = Math.floor(tipWidth * scale);
			tipHeight = Math.floor(tipHeight * scale);

			// try to position the tooltip on one side of the cursor, if possible
			var x = mouseX - tipWidth/2, y = mouseY - tipHeight/2;  // default choice: centered on cursor

			if ( mouseY + yOffset + tipHeight <= winTop + winHeight ) y = mouseY + yOffset;       // 1st choice: bottom
			else if ( mouseY - yOffset - tipHeight >= winTop ) y = mouseY - yOffset - tipHeight;  // 2nd choice: top
			else if ( mouseX + xOffset + tipWidth <= winLeft + winWidth ) x = mouseX + xOffset;   // 3rd choice: left
			else if ( mouseX - xOffset - tipWidth >= winLeft ) x = mouseX - xOffset - tipWidth;   // 4th choice: right

			// adjust coordinates to make sure the tooltip is inside the viewport
			x = Math.min( Math.max( winLeft, x ), winLeft + winWidth - tipWidth );
			y = Math.min( Math.max( winTop, y ), winTop + winHeight - tipHeight );

			// scale, position and show the tooltip
			var parentPos = tooltip.offsetParent().offset();
			tooltip.css( {
				width: tipWidth + 'px',
				height: tipHeight + 'px',
				'border-radius': (12 * scale) + 'px',
				left: (x - parentPos.left) + 'px',
				top: (y - parentPos.top) + 'px',
				display: 'block'
			} );
		};
		var hideTooltip = function () {
			if ( timeoutID ) clearTimeout( timeoutID );
			timeoutID = 0;
			tooltipActive = false;
			tooltip.css( 'display', 'none' );
			// SOUP.log( 'soup mtg tooltip hidden' );
		};
		$(document).on( 'mouseenter mousemove', 'a.soup-mtg-tooltip', function (event) {
			mouseX = event.pageX;
			mouseY = event.pageY;
			if ( tooltipActive && linkElement !== this ) hideTooltip();
			linkElement = this;
			if ( timeoutID ) clearTimeout( timeoutID );
			timeoutID = ( tooltipActive ? 0 : setTimeout( showTooltip, 500 ) );
		} );
		$(document).on( 'mouseleave', 'a.soup-mtg-tooltip', function () {
			// XXX: defer hiding so that the mouseenter handler below can cancel it
			if ( timeoutID ) clearTimeout( timeoutID );
			timeoutID = ( tooltipActive ? setTimeout( hideTooltip, 0 ) : 0 );
		} );
		tooltip.on( 'mouseenter mousemove', function (event) {
			// check if the cursor is still over the original link
			var x = event.pageX - rectOffsetX;
			var y = event.pageY - rectOffsetY;
			for (var i = 0; i < linkRects.length; i++) {
				var rect = linkRects[i];
				if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
					// still over the link, abort hiding
					if ( timeoutID ) clearTimeout( timeoutID );
					timeoutID = 0;
					return;
				}
			}
			// if not, hide the tooltip
			hideTooltip();
		} );
		tooltip.on( 'click', function (event) {
			hideTooltip();
		} );

		// locate MtG card links and mark them for tooltip display
		var cardLinkRegexp = /^(?:https?:)?\/\/((?:www\.|gatherer\.)?wizards\.com\/(?:magic\/autocard\.asp|Pages\/Card\/Details\.aspx|Pages\/Search\/Default\.aspx|Handlers\/Image\.ashx)|scryfall\.com\/search)(\?[^#]+)/i;
		var setTooltipURL = function (node, apiPath) {
			var tooltipURL = 'https://api.scryfall.com' + apiPath + 'format=image&version=normal&utm_source=stackexchange';
			$(node).addClass('soup-mtg-tooltip').data('soup-mtg-tooltip-url', tooltipURL );
		}
		var addMtGTooltips = function (where) {
			$(where).find('a[href*="wizards.com"], a[href*="scryfall.com"]').each( function () {
				var m = cardLinkRegexp.exec(this.href);
				if ( !m ) return;
				var params = new URLSearchParams( m[2] );
				if ( params.has('multiverseid') ) {
					setTooltipURL( this, '/cards/multiverse/' + Number( params.get('multiverseid') ) + '?' );
				} else if ( params.has('name') || params.has('q') ) {
					var cardName = decodeURIComponent( params.get('name') || params.get('q') );
					// XXX: ignore scryfall links that aren't exact card name matches
					if ( /^scryfall/.test( m[1] ) && ! /^!"[^"]+"$/.test( cardName ) ) return;
					cardName = cardName.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
					cardName = cardName.replace(/\+/g, ' ').replace(/["\[\]]+/g, '').replace(/^\s*!?/, '');
					setTooltipURL( this, '/cards/named?exact=' + encodeURIComponent(cardName) + '&' );
				}
			} );
		};
		SOUP.addContentFilter( addMtGTooltips, 'mtg hover tooltips', null, ['load', 'post', 'comments', 'preview'] );
	},
	css:	'#soup-mtg-tooltip { display: none; position: absolute; z-index: 1; overflow: hidden; box-shadow: 2px 2px 10px #000; background: #777; color: #fff }' +
		'#soup-mtg-tooltip img { width: 100%; height: 100% }' +
		'#soup-mtg-tooltip div { display: table-cell; width: inherit; height: inherit; text-align: center; vertical-align: middle }'
};
fixes.french347 = {
	title:	"Make spaces unbreakable when it's obvious that a line-break should not occur",
	url:	"https://french.meta.stackexchange.com/q/347",
	credit:	"based on idea by Stéphane Gimenez",
	sites:	/^french\./,
	script:	function () {
		SOUP.addContentFilter( function ( where ) {
			SOUP.forEachTextNode( where, function ( text ) {
				text = text.replace(/(\S) ([:;!?»])/g, '$1\u202F$2');
				text = text.replace(/(«) (\S)/g, '$1\u202F$2');
				return text;
			} );
		}, 'French space fix' );
	}
};
fixes.mse264171 = {
	title:	"SE new blog: Broken link on 'serverfault.com' and 'superuser.com' under 'TAGS'",
	url:	"https://meta.stackexchange.com/q/264171",
	sites:	/^blog\./,
	path:	/^\/tags\/[0-9A-Za-z]+-com\/?$/,
	early:	function () {
		// bah, no jQuery in the blogs :(
		document.addEventListener( 'DOMContentLoaded', function (event) { 
			var is404 = document.head.querySelector( 'meta[property="og:url"][content="/404/"]' );
			if ( is404 ) location.replace( location.href.replace( /\/tags\/([0-9A-Za-z]+)-com\b/, '/tags/$1.com' ) );
		} );
	}
};
fixes.mse299082 = {
	title:	"Display embedded YouTube videos in markdown preview",
	url:	"https://meta.stackexchange.com/q/299082",
	// site list from https://meta.stackexchange.com/a/298854 (TODO: get this info from the API?)
	sites:	/^(aviation|bicycles|gaming|movies|music|scifi|space|video)\./,
	script:	function () {
		SOUP.addEditorCallback( function (editor, postfix) {
			// replace the first remaining placeholder in this preview with a video player
			// and add an onload/onerror handler to start the next one after this one has loaded
			var counter = 1, nowLoading = 0;
			var wrapperSelector = '#wmd-preview' + postfix + ' div.soup-mse299082:not(.youtube-embed)';
			function loadNextVideo () {
				var wrapper = $(wrapperSelector).first();
				if ( ! wrapper.length ) return;  // nothing more to do for now!

				var url = wrapper.data('soup-mse299082-url');
				wrapper.html('<div><iframe width="640px" height="395px" src="' + url + '"></iframe></div>');
				wrapper.addClass('youtube-embed');
				
				// make sure we can't have two chains of video loaders running at the same time
				var savedCounter = nowLoading = counter++;
				wrapper.find('iframe').on( 'load error', function () {
					if ( nowLoading === savedCounter) loadNextVideo();
				} );
			}

			// replace any plain YouTube video links in the preview HTML with embed placeholders, and
			// set a timer to replace them with real videos if the preview isn't updated in 5 seconds
			var timeoutID = 0;
			var youTubeLinkRegexp = /<a href="(https?:\/\/(?:(?:www\.|m\.)youtube\.com\/watch|youtu\.be\/([-_0-9A-Za-z]{11}))(\?[^#"]*)?(#[^"]*)?)">\1<\/a>/g;
			function replaceYouTubeLinks (fullMatch, fullUrl, videoId, queryString) {
				var params = new URLSearchParams( (queryString || "?").substr(1).replace(/&amp;/g, '&') );

				// youtu.be short URLs have the video ID in the path, otherwise get it from query params
				// COMPAT: the SE server side code doesn't actually validate the v= parameter value properly!
				if ( ! videoId ) videoId = params.get('v');
				if ( ! /^[-_0-9A-Za-z]{11}$/.test(videoId) ) return fullMatch;  // missing / invalid ID

				// get the playback start time, and convert it from XmYYs to plain seconds if needed
				// COMPAT: if both t= and start= appear in the params, the SE server side code uses whichever comes first
				var startTime = params.get('t') || params.get('start') || "0";
				startTime = startTime.replace( /^(\d+)m(\d+)s$/, function (full, mins, secs) { return 60 * mins + 1 * secs } );
				if ( ! /^[0-9]+$/.test(startTime) ) startTime = "0";  // map any non-numeric start times to zero

				// reloading the iframe takes time, so defer it until the user isn't actively editing
				if ( ! timeoutID ) timeoutID = setTimeout( loadNextVideo, 5000 );

				// yes, this can inject a <div> inside text-level elements; the SE server side code does that too :P
				var embedUrl = "https://www.youtube.com/embed/" + videoId + "?start=" + Number(startTime);
				return '<div class="soup-mse299082" data-soup-mse299082-url="' + embedUrl + '"></div>';
			}

			// set a Markdown converter hook to apply the YouTube link replacement to the preview HTML
			editor.getConverter().hooks.chain( 'postConversion', function (text) {
				try {
					// stop any pending video loading; replaceYouTubeLinks() will restart it if needed
					if ( timeoutID ) clearTimeout( timeoutID );
					timeoutID = nowLoading = 0;
					// actually do the YouTube link replacement
					text = text.replace( youTubeLinkRegexp, replaceYouTubeLinks );
				} catch (e) {
					SOUP.log( 'SOUP YouTube embed postConversion hook failed:', e );
				}
				return text;
			} );
		}, 'YouTube embed preview', null, ["preview"] );
	},
	// style the placeholder divs to look kind of like videos waiting to load
	// YouTube icon from https://www.youtube.com/yt/about/media/downloads/youtube_full_color_icon.zip
	css:	"div.soup-mse299082 { width: 640px; height: 395px; background: url(data:image/svg+xml," +
		encodeURIComponent( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 124"><path d="m172.3 104.6c-2.024 7.622-7.987 13.62-15.56 15.66-13.7 3.7-68.7 3.7-68.7 3.7s-55.04 0-68.76-3.7c-7.57-2-13.54-8-15.56-15.7-3.68-13.78-3.68-42.6-3.68-42.6s0-28.82 3.678-42.64c2.024-7.62 7.992-13.62 15.56-15.66 13.72-3.7 68.76-3.7 68.76-3.7s55.04 0 68.76 3.701c7.573 2.038 13.54 8.04 15.56 15.66 3.7 13.82 3.7 42.64 3.7 42.64s0 28.82-3.678 42.64" fill="#f00"/><path d="m70 35.83 46 26.17-46 26.17v-52.34" fill="#fff"/></svg>' ) +
		") #282828 center/10% no-repeat }"
};
fixes.mse293413 = {
	title:	"Let's see the Top Network Askers better",
	url:	"https://meta.stackexchange.com/q/293413",
	sites:	/^stackexchange\.com$/,
	script:	function () {
		$('.users-sidebar .userDetails img[src^="https://i.stack.imgur.com/"][src*="?s=16&"]').each( function () {
			this.src = this.src.replace(/\?s=16&/, '?s=30&');
		} );
	}
};
fixes.mse307605 = {
	title:	"Sorting SEDE output is unstable",
	url:	"https://meta.stackexchange.com/q/307605",
	sites:	/^data\.stackexchange\.com$/,
	early:	function () {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort:
		// "If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element."
		// XXX: The merge sort implementation below always provides the arguments to compare() in their original order, so we can treat a == b and a < b the same way!
		function defaultCompare (a, b) {
			return String(a) > String(b);
		}

		// merge the arrays left and right into output, based on the given comparison function
		function merge (left, right, output, compare) {
			if ( ! compare ) compare = defaultCompare;
			var i = 0, j = 0, k = 0;
			while ( i < left.length && j < right.length ) {
				var cmp = compare( left[i], right[j] );
				output[k++] = ( cmp <= 0 ? left[i++] : right[j++] );
			}
			while ( i < left.length ) output[k++] = left[i++];
			while ( j < right.length ) output[k++] = right[j++];
		}

		// sort an array in-place using insertion sort, based on the given comparison function
		function insort (array, compare) {
			if ( ! compare ) compare = defaultCompare;
			for ( var i = 1; i < array.length; i++ ) {
				var j = i, x = array[i];
				while ( j > 0 && compare( array[j-1], x ) > 0 ) {
					array[j] = array[j-1]; j--;
				}
				array[j] = x;
			}
		}

		// custom stable .sort() method
		Array.prototype.sort = function (compare) {
			if ( this.length < 16) {
				// use an insertion sort for short arrays (TODO: optimize threshold)
				insort(this, compare);
			} else {
				// recursively sort and merge subarrays
				var midpoint = this.length >> 1;
				var left = this.slice(0, midpoint).sort(compare);
				var right = this.slice(midpoint).sort(compare);
				merge(left, right, this, compare);
			}
			return this;
		};
	}
};



//
// MathJax fixes:
//
fixes.mse209393 = {
	title:	"Render MathJax in the 10k tools",
	url:	"https://meta.stackexchange.com/q/209393",
	path:	/^\/tools\b/,
	script:	function () {
		SOUP.hookAjax( /^\/tools\b/, function () {
			window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
		} );
	}
};
fixes.math11036 = {
	title:	"Can we have the suggested questions' titles parsed by default?",
	url:	"https://math.meta.stackexchange.com/q/11036",
	script:	function () {
		SOUP.hookAjax( /^\/search\/titles\b/, function () {
			window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'question-suggestions']);
		} );
		// similar issue in user profiles (TODO: split into separate fix?)
		if ( /^\/users\/\d+\//.test( location.pathname ) ) {
			SOUP.hookAjax( /^\/ajax\/users\/panel\b/, function () {
				window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-panel-questions']);
				window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-panel-answers']);
			} );
			SOUP.hookAjax( /^\/ajax\/users\/\d+\/rep\b/, function () {
				window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'rep-page-container']);
			} );
			// v1.31.0: expanded posts in activity tab
			SOUP.hookAjax( /^\/posts\/\d+\/body\b/, function () {
				window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'user-tab-activity']);
			} );
		}
	}
};
fixes.physics10312 = {
	title:	"Why doesn't the LaTeX code under the tag “operators” shows what it's supposed to show?",
	url:	"https://physics.meta.stackexchange.com/q/10312",
	script:	function () {
		SOUP.hookAjax( /^\/filter\/tags-for-index\b/, function () {
			window.MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, "tags_list"]);
		} );
	}
};
fixes.math27470 = {
	title:	"MathJax preview does not work when editing from review (or when editing a deleted question)",
	url:	"https://math.meta.stackexchange.com/q/27470",
	script:	function () {
		if ( ! window.MathJax ) return;
		// XXX: the code below is copied verbatim from a script tag included on math.SE question pages
		StackExchange.ifUsing("editor", function () {
			return StackExchange.using("mathjaxEditing", function () {
				StackExchange.MarkdownEditor.creationCallbacks.add(function (editor, postfix) {
					StackExchange.mathjaxEditing.prepareWmdForMathJax(editor, postfix, [["$", "$"], ["\\\\(","\\\\)"]]);
				});
			});
		}, "mathjax-editing");
	}
};


//
// MathJax config tweaks (need to be injected early):
//
fixes.math4130 = {
	title:	"The scope of \\newcommand is the entire page",
	url:	"https://math.meta.stackexchange.com/q/4130",
	credit:	"idea by Davide Cervone",
	mathjax:	function () {
		var resetCmd = "resetstack";
		MathJax.Hub.Register.StartupHook( "TeX Jax Ready", function () {
			MathJax.Hub.Insert( MathJax.InputJax.TeX.Definitions.macros, {
				resetstack: ["Extension", "begingroup"]
			} );
		} );
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
			var elements = message[1];
			if ( !(elements instanceof Array) ) elements = [elements];
			for (var i = 0; i < elements.length; i++) {
				if (!elements[i]) continue;  // should not happen, but...
				$(elements[i]).find(select).andSelf().not('.soup-math4130-fixed').has('script').prepend(reset).addClass('soup-math4130-fixed');
			}
		} );
	},
	css:	".soup-mathjax-reset { display: none }"
};
fixes.mse229363 = {
	title:	"Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions",
	url:	"https://meta.stackexchange.com/q/229363",
	mathjax:	function () {
		// list of MathJax enabled sites from https://meta.stackexchange.com/a/216607
		// (codereview.SE and electronics.SE excluded due to non-standard math delimiters)
		var mathJaxSites = /(^|\.)((astronomy|aviation|biology|chemistry|cogsci|computergraphics|crypto|cs|cstheory|datascience|dsp|earthscience|economics|engineering|ham|hsm|math|matheducators|mathematica|physics|puzzling|quant|robotics|rpg|scicomp|space|stats|worldbuilding)\.stackexchange\.com|mathoverflow\.net)$/;
		MathJax.Hub.Register.MessageHook( "Begin PreProcess", function (message) {
			SOUP.try( 'mse229363', function () {
				$('#hot-network-questions a:not(.tex2jax_ignore)').not( function () {
					return mathJaxSites.test( this.hostname );
				} ).addClass('tex2jax_ignore');
			} );
		} );
	}
};
fixes.math19650 = {
	title:	"Post with many lines of display math takes up most of the Questions page",
	url:	"https://math.meta.stackexchange.com/q/19650",
	mathjax:	function () {
		var displayMathScripts = 'script[type^="math/"][type$="mode=display"]';
		var excludedParents = '.excerpt, .result-link, .question-hyperlink, #sidebar, #question-header';
		MathJax.Hub.Register.MessageHook( "Begin Process", function (message) {
			try {
				var elements = message[1];
				$(elements).find(displayMathScripts).each( function () {
					if ( $(this).closest(excludedParents).length == 0 ) return;
					this.type = this.type.replace(/;\s*mode=display$/, "");
				} );
			} catch (e) { SOUP.log('math19650 hook failed:', e) }
		} );
	}
};



//
// Initialization code and utility functions:
//
var soupInit = function () {
	window.SOUP = {};
	
	// basic environment detection, part 1
	// (for MathJax detection, just check window.MathJax, and note that it may be loaded late due to mse215450)
	SOUP.isChat = /^chat\./.test( location.hostname );
	SOUP.isMeta = /(^|\.)meta\./.test( location.hostname );
	
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
	SOUP.try = function ( key, code, args ) {
		try { code.apply(null, args) }
		catch (e) { SOUP.log( 'SOUP ' + key + ': ', e ) }
	};
	// wrapper for console.log(), does nothing on old Opera w/o console
	SOUP.log = function () {
		if ( window.console ) console.log.apply( console, arguments );
	};

	// run code immediately after jQuery has loaded
	// FIXME: this often runs too late on Tampermonkey, see https://github.com/Tampermonkey/tampermonkey/issues/211 :(
	SOUP.jQueryInitQueue = {};
	SOUP.jQueryInit = function ( key, code ) {
		if ( window.jQuery ) SOUP.try( key, code );
		else SOUP.jQueryInitQueue[key] = code;
	};
	if ( ! window.jQuery ) {
		SOUP.oldjQueryDesc = Object.getOwnPropertyDescriptor( window, 'jQuery' );
		Object.defineProperty( window, 'jQuery', {
			configurable: true,
			set: function ($) {
				if ( SOUP.oldjQueryDesc ) Object.defineProperty( this, 'jQuery', SOUP.oldjQueryDesc );
				else delete this.jQuery;
				this.jQuery = $;
				for ( var key in SOUP.jQueryInitQueue ) {
					SOUP.try( key, SOUP.jQueryInitQueue[key] );
				}
				SOUP.log( 'soup jQuery init fixes applied' );
			}
		} );
		SOUP.log( 'soup window.jQuery setter initialized' );
	} else {
		SOUP.log( 'soup window.jQuery setter not applied, jQuery has already loaded!' );
	}
	
	// wrapper for defining Markdown editor hooks, used by SOUP.hookEditPreview()
	// note: use editor.getConverter() to access the Markdown converter
	// see https://dev.stackoverflow.com/content/Js/wmd.en.js for details
	SOUP.addEditorCallback = function ( code ) {
		if ( !window.StackExchange || !StackExchange.ifUsing ) return;
		StackExchange.ifUsing( 'editor', function () {
			StackExchange.MarkdownEditor.creationCallbacks.add( code );
		} );
	};
	// utility: run code whenever the editor preview is updated
	// FIXME: this doesn't always work; find out why and fix it!
	SOUP.hookEditPreview = function ( code ) {
		SOUP.addEditorCallback( function (editor, postfix) {
			editor.hooks.chain( 'onPreviewRefresh', function () {
				code(editor, postfix || "");
			} );
		} );
	}
	
	// utility: run code after any matching AJAX request
	SOUP.hookAjax = function ( regex, code, delay ) {
		if ( typeof(delay) === 'undefined' ) delay = 0;
		var hook = { regex: regex, code: code, delay: delay };
		SOUP.ajaxHooks.push( hook );
		return hook;  // for chaining
	};
	// infrastructure for SOUP.hookAjax()
	SOUP.ajaxHooks = [];
	SOUP.runAjaxHook = function ( hook, event, xhr, settings, match ) {
		var tryIt = function () {
			try { hook.code( event, xhr, settings, match ) }
			catch (e) { SOUP.log( 'SOUP ajax hook for ' + hook.regex + ' failed: ', e ) }
		};
		if ( !hook.delay ) tryIt();
		else setTimeout( tryIt, hook.delay );
	};
	
	// utility: set a function to be called 1) immediately, 2) whenever a
	// new post is loaded via AJAX, and 3) when the edit preview is updated.
	// the function will be passed a jQuery selector to process.
	// NOTE: the function should be idempotent, i.e. it should be safe to
	// call it several times.
	SOUP.contentFilters = { load: [], post: [], comments: [], preview: [], chat: [], usercard: [], topbar: [] };
	SOUP.addContentFilter = function ( filter, key, where, events ) {
		key = key || 'content filter';
		events = events || Object.getOwnPropertyNames( SOUP.contentFilters );
		for ( var i = 0; i < events.length; i++ ) {
			if (events[i] == 'load') SOUP.try( key, filter, [where || document] );  // KLUGE
			else SOUP.contentFilters[events[i]].push( { key: key, filter: filter } );
		}
	};
	SOUP.runContentFilters = function ( eventType, where ) {
		var filters = SOUP.contentFilters[eventType] || [];
		for ( var i = 0; i < filters.length; i++ ) {
			SOUP.try( filters[i].key, filters[i].filter, [where] );
		}
	};

	SOUP.hookAjax( /^\/posts\/(\d+)\/(body|edit-submit)\b|^\/review\/(next-task|task-reviewed)\b/, function ( event, xhr, settings, match ) {
		var where = '#content';
		if ( match && match[1] ) where = '#answer-' + match[1] + ', .question[data-questionid=' + match[1] + ']';
		SOUP.runContentFilters( 'post', where );
	} );
	SOUP.hookAjax( /^\/revisions\/(\d+)\/([0-9a-f\-]+)\/diff\b/, function ( event, xhr, settings, match ) {
		SOUP.runContentFilters( 'post', '#rev' + match[2] );
	} );
	SOUP.hookAjax( /^\/posts\/ajax-load-realtime\/([\d;]+)(\?title=true)?/, function ( event, xhr, settings, match ) {
		var posts = match[1].split( ";" );
		for ( var i = 0; i < posts.length; i++ ) {
			posts[i] = '#answer-' + posts[i] + ', .question[data-questionid=' + posts[i] + ']';
		}
		// FIXME: should find a better way to run the filters only when the content has loaded
		var delay = ( match[2] ? 300 : 0 );  // KLUGE: the old content takes 150ms to fade out
		setTimeout( function () { SOUP.runContentFilters( 'post', posts.join( ", " ) ) }, delay );
	} );
	SOUP.hookAjax( /^\/posts\/((\d+)\/comments|comments\/(\d+))\b/, function ( event, xhr, settings, match ) { // yes, both variants are in use :-(
		var where = ( match[2] ? '#comments-' + match[2] : '#comment-' + match[3] );
		SOUP.runContentFilters( 'comments', where );
	} );
	SOUP.hookAjax( /^\/topbar\/(site-switcher|inbox|achievements)\b/, function ( event, xhr, settings, match ) {
		var where = '.topbar-dialog.' + match[1].replace( /site-switcher/, 'siteSwitcher' ) + '-dialog';
		SOUP.runContentFilters( 'topbar', where );
	} );

	// allow fix code to subscribe to SE realtime question events
	SOUP.questionSubscriptions = [];
	SOUP.subscribeToQuestion = function ( code, key ) {
		SOUP.questionSubscriptions.push( { code: code, key: key || "soup realtime handler" } );
	};
	
	// utility: iterate over text nodes inside an element / selector (TODO: extend jQuery?)
	SOUP.forEachTextNode = function ( where, code ) {
		$(where).each( function () {
			var node = this;
			while ( true ) {
				while ( node.firstChild ) node = node.firstChild;
				if ( node.nodeType == 3 ) {
					var oldText = node.nodeValue, newText = code.call( node, oldText );
					if ( typeof(newText) !== 'undefined' && newText !== oldText ) node.nodeValue = newText;
				}
				while ( node && node !== this && ! node.nextSibling ) node = node.parentNode;
				if ( !node || node === this ) break;
				node = node.nextSibling;
			}
		} );
	};

	// XXX: area51 is still using jQuery 1.4, which doesn't have .on()!
	SOUP.jQueryInit( 'jQuery.on()/.off() polyfill', function () {
		if ( $.fn.on || $.fn.off ) return;
		SOUP.log( 'soup injecting .on()/.off() polyfill for jQuery ' + $.fn.jquery );
		$.fn.on = function ( arg1, arg2, arg3, arg4 ) {
			if ( typeof arg2 === 'string' ) {
				// .on(types, selector, [data], [fn]) -> .delegate(selector, types, data, fn)
				return this.delegate.call( this, arg2, arg1, arg3, arg4 );
			} else if ( arg4 === null ) {
				// .on(types, [data], [fn]) -> .bind(types, data, fn)
				return this.bind.call( this, arg1, arg2, arg3 );
			} else {
				// .on(types, null, data, fn) -> .bind(types, data, fn)
				return this.bind.call( this, arg1, arg3, arg4 );
			}
		};
		$.fn.off = function ( arg1, arg2, arg3 ) {
			if ( typeof arg2 === 'string' ) {
				return this.undelegate.call( this, arg2, arg1, arg3 );
			} else if ( arg3 === null ) {
				return this.unbind.call( this, arg1, arg2 );
			} else {
				return this.unbind.call( this, arg1, arg3 );
			}
		};
	} );

	SOUP.log( 'soup init complete' );
};

// setup code to execute after jQuery has loaded:
var soupLateSetup = function () {
	// no jQuery? just give up!
	if ( !( window.$ && $.fn && $.fn.jquery ) ) {
		SOUP.log( 'soup found no jQuery, aborting setup' );
		return;
	}

	// utility and compatibility wrapper around the undocumented jQuery._data() function
	SOUP.getEventHandlers = function ( element, type ) {
		if ( ! $._data ) return [];
		var events = $._data( element, 'events' ) || {};
		return events[type] || [];
	}


	// basic environment detection, part 2
	SOUP.isMobile = !!( window.StackExchange && StackExchange.mobile );

	// detect site beta status; together with StackExchange.options.user.rep this can be user to guesstimate user privileges
	// XXX: this may need to be updated if the beta site design is changed in the future
	SOUP.isBeta = /(^|\/)beta(meta)?\//.test( $('<span class="feed-icon" />').css('background-image') );
	
	// run ready queue after jQuery and/or SE framework have loaded
	if ( window.StackExchange && StackExchange.ready ) StackExchange.ready( SOUP.runReadyQueue );
	else $(document).ready( SOUP.runReadyQueue );
	
	// attach global AJAX hooks
	$( document ).ajaxComplete( function( event, xhr, settings ) {
		for ( var i = 0; i < SOUP.ajaxHooks.length; i++ ) {
			var match = SOUP.ajaxHooks[i].regex.exec( settings.url );
			if ( match ) SOUP.runAjaxHook( SOUP.ajaxHooks[i], event, xhr, settings, match );
		}
	} );

	// trigger content filters on new chat messages
	if ( window.CHAT && CHAT.addEventHandlerHook ) CHAT.addEventHandlerHook( function (event) {
		if ( event.message_id ) setTimeout( function () {
			SOUP.runContentFilters( 'chat', 'message-' + event.message_id );
		}, 0 );
	} );
	// trigger content filters on expanded user card display
	$(document).on( 'userhovershowing', function ( event ) {
		SOUP.runContentFilters( 'usercard', event.target );
	} );
	// trigger content filters on editor preview
	SOUP.hookEditPreview( function (editor, postfix) {
		SOUP.runContentFilters( 'preview', '#wmd-preview' + postfix );
	} );


	// subscribe to SE realtime question events
	// TODO: eavesdrop on SE event traffic by hacking WebSocket or EventEmitter instead (would make this work in review too!)
	if ( window.StackExchange && StackExchange.ready ) StackExchange.ready( function () {
		try {
			var sid = StackExchange.options.site.id;
			var qid = $('.question').data('questionid');
			if ( !sid || !qid ) return;
		
			StackExchange.realtime.genericSubscribe( sid + '-question-' + qid, function ( json ) {
				var data = $.parseJSON( json );
				var hooks = SOUP.questionSubscriptions;
				for ( var i = 0; i < hooks.length; i++ ) {
					SOUP.try( hooks[i].key, hooks[i].code, [data] );
				}
			} );
			SOUP.log( 'soup subscribed to realtime feed for question ' + qid + ' on site ' + sid );
		} catch (e) {
			SOUP.log( 'soup failed to subscribe to realtime feed:', e );
		}
	} );
	
	SOUP.log( 'soup setup complete' );
};

//
// Check if a fix should run on this site
//
var fixIsEnabled = function ( fix ) {
	if ( fix.disabled ) return false;
	if ( fix.sites && !fix.sites.test( location.hostname ) ) return false;
	if ( fix.exclude && fix.exclude.test( location.hostname ) ) return false;
	if ( fix.path && !fix.path.test( location.pathname ) ) return false;
	return true;
};


//
// Inject scripts and styles into the page:
//
if ( window.console ) console.log( 'soup injecting fixes' );
var head = document.head || document.documentElement;

// SOUP object init and early scripts:
var initScript = document.createElement( 'script' );
initScript.id = 'soup-init';
initScript.type = 'text/javascript';
var code = "'use strict';\n(" + soupInit + ")();\n";
for (var id in fixes) {
	if ( ! fixIsEnabled( fixes[id] ) ) continue;
	if ( fixes[id].early ) code += "SOUP.try(" + JSON.stringify(id) + ", " + fixes[id].early + ");\n";
	if ( fixes[id].jqinit ) code += "SOUP.jQueryInit(" + JSON.stringify(id) + ", " + fixes[id].jqinit + ");\n";
}
initScript.textContent = code;
head.appendChild( initScript );

// MathJax config:
var mathjaxScript = document.createElement( 'script' );
mathjaxScript.id = 'soup-mathjax-config';
mathjaxScript.type = 'text/x-mathjax-config';
var code = "SOUP.log( 'soup mathjax config loading' );\n";
for (var id in fixes) {
	if ( ! fixIsEnabled( fixes[id] ) || ! fixes[id].mathjax ) continue;
	code += "SOUP.try(" + JSON.stringify(id) + ", " + fixes[id].mathjax + ");\n";
}
mathjaxScript.textContent = code;
head.appendChild( mathjaxScript );

// CSS styles:
var styleElem = document.createElement( 'style' );
styleElem.id = 'soup-styles';
styleElem.type = 'text/css';
var code = "";
for (var id in fixes) {
	if ( ! fixIsEnabled( fixes[id] ) ) continue;
	if ( fixes[id].css ) code += "/* " + id + " */\n" + fixes[id].css;
}
styleElem.textContent = code.replace( /[}] */g, "}\n" )
head.appendChild( styleElem );

// JS fixes (injected on document load, run after SE framework is ready):
var injectScripts = function () {
	var scriptElem = document.createElement( 'script' );
	scriptElem.id = 'soup-scripts';
	scriptElem.type = 'text/javascript';
	var code = "'use strict';\n(" + soupLateSetup + ")();\n";
	for (var id in fixes) {
		if ( ! fixIsEnabled( fixes[id] ) || ! fixes[id].script ) continue;
		code += "SOUP.ready(" + JSON.stringify(id) + ", " + fixes[id].script + ");\n";
	}
	scriptElem.textContent = code;
	document.body.appendChild( scriptElem );
};
if (document.body) injectScripts();
else if (window.opera) addEventListener( 'load', injectScripts, false );
else document.addEventListener( 'DOMContentLoaded', injectScripts );

} )();  // end of anonymous wrapper function

/* extra C-style comment to work around GM4 bug: https://github.com/greasemonkey/greasemonkey/issues/2670 */
