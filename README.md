<!-- thumbnail: http://i.stack.imgur.com/8EphO.png -->
<!-- version: 1.25.x -->

![](http://i.stack.imgur.com/IzzhJ.png "SOUP logo")

The Stack Overflow Unofficial Patch (SOUP) is a project to collect various minor client-side bugfixes, work-arounds and usability improvements for [Stack Overflow][SO] and other Q&A sites on the [Stack Exchange Network][SE] into a single user script.

The intent of SOUP is not to make any substantial or controversial changes to the Stack Exchange user interface, but to fix minor problems and omissions that the SE developers have overlooked or haven't got around to fixing yet.  By combining these minor patches into a single user script, they become easier to install and maintain.


Installing
----------

The easiest way to install SOUP is to use the [GreaseMonkey][GM] (for Firefox) or [TamperMonkey][TM] (for Chrome) extension for managing user scripts.  (Other similar extensions, like Scriptish or NinjaKit, should also work.)  After installing the extension, clicking the ["download / install"][DL] button below should bring up a dialog asking you if you want to install SOUP.  Answer "yes".

> ### [<kbd>Download / Install</kbd>][DL]  
> <sup>[View source][source] / [GitHub repo][github] / [StackApps post][SA]</sup>

SOUP can also be used on other browsers with compatible user script support, such as Opera or Safari.  For detailed instructions on how to enable and install user scripts on different browsers, see the **["script" tag wiki on StackApps](http://stackapps.com/tags/script/info "'script' tag wiki - StackApps")**.

**Notes:**

* When installing SOUP on Opera, please *remove the "<code>.user</code>" part from the file name* to disable GreaseMonkey compatibility mode.  While SOUP can run in either native or compatibility mode, a few MathJax-related fixes require native mode.

* SOUP has not yet been tested on Safari, but in principle it _should_ work.  If you do try to use it, please let me know how / if it works.

Included fixes
--------------

SOUP v1.25 includes fixes or workarounds for the following issues:

* [Add a non-breaking space to “reopen (1)” and its ilk](http://meta.stackexchange.com/q/215473) (CSS)
* [Layout fix for Firefox in “Zoom text only” mode](http://meta.stackexchange.com/q/138685) (CSS)
* [Background in OP's user name can obscure text in multiline comments](http://meta.stackexchange.com/q/114109) (CSS)
* [Images can be pushed outside the boundaries of a post by using nested lists](http://meta.stackexchange.com/q/143973) (CSS)
* [Ugly overflows when editing a deleted answer inline](http://meta.stackexchange.com/q/217120) (CSS)
* [&lt;hr/&gt;'s do not get rendered in deleted answers](http://meta.stackexchange.com/q/145819) (CSS)
* [Mouse cursor doesn't change to pointer when hovering “full site” on mobile](http://meta.stackexchange.com/q/108046) (CSS)
* [Does the spoiler markdown work on images?](http://meta.stackexchange.com/q/110566) (CSS)
* [The CSS for spoilers is a mess. Let's fix it!](http://meta.stackexchange.com/q/217779) (*not* CSS only, supersedes above fix)
* [&lt;kbd&gt; (yes, still &lt;kbd&gt;) doesn't play nice with lists](http://meta.stackexchange.com/q/58760) (CSS)
* [Add spacing / padding to “Protected By…” and “Not the answer you're looking for”](http://meta.stackexchange.com/q/219740) (CSS)
* [Excerpt of privilege is below privilege instead of in front](http://meta.stackexchange.com/q/203405) (CSS)
* [Extra blue line appearing in the top bar (Firefox only)](http://meta.stackexchange.com/q/210165) (CSS)
* [Why are comments overlapping the sidebar?](http://meta.stackexchange.com/q/154788) (CSS)
* [Selecting text in profile activity comments causes unexpected clipping](http://meta.stackexchange.com/q/214830) (CSS)
* [Layout bug while viewing vote count in Meta Stackexchange](http://meta.stackexchange.com/q/230392) (CSS)
* [Bounty icon is poorly placed](http://meta.physics.stackexchange.com/q/5773) (CSS)
* [Links sometimes float above text in vote-to-close dialog on Firefox](http://meta.stackexchange.com/q/224185) (CSS)
* [Overly long user location entry breaks mobile users view](http://meta.stackexchange.com/q/231981) (CSS, mobile view only)
* [Bug in textarea in bounty creation popup](http://meta.stackexchange.com/q/167975) (CSS)
* [Badge symbol in notification is of the site you're on, not where badge was earned](http://meta.stackexchange.com/q/233517) (CSS)
* [Why does the bounty award button appear on deleted answers?](http://meta.stackexchange.com/q/169225) (CSS)
* [RTL text can mess up comment timestamps](http://meta.stackexchange.com/q/84296) (CSS)
* [Was the fringe always there on the up-rep icon?](http://meta.stackexchange.com/q/240710) (CSS)
* [Links in promotion ads are black on black, thus invisible](http://meta.skeptics.stackexchange.com/q/2636) (CSS, skeptics.SE only)
* [“Sign up for the newsletter” button overflows the frame on Firefox / Linux](http://meta.math.stackexchange.com/q/12803) (CSS, partially math.SE specific)
* [Preformatted text in Japanese doesn't line up properly](http://meta.japanese.stackexchange.com/q/1023) (CSS, japanese.SE only)
* [Hovering over the community links changes the header height](http://meta.gaming.stackexchange.com/q/8530) (CSS)
* [Add line-height shortener to the ascii-art tag](http://meta.codegolf.stackexchange.com/q/959) (CSS, codegolf.SE only)
* [Background of long OP username looks ugly in comments](http://meta.english.stackexchange.com/q/4719) (CSS, english.SE only)
* [Links are not visible in On Hold message](http://meta.skeptics.stackexchange.com/q/2747) (CSS, skeptics.SE only)
* [Related questions with over 99 score display incorrectly](http://meta.stackexchange.com/q/229751) (CSS, meta.SE only)
* [You are here, but where's here?](http://meta.stackexchange.com/q/229797) (CSS, meta.SE only)
* [Using \[tag:\] markup in posts creates an ugly gap between lines](http://meta.math.stackexchange.com/q/16552) (CSS, math.SE only)
* [Spacing between reputation change and question title on user page sometimes missing](http://meta.stackexchange.com/q/239223) (CSS, meta.SE only)
* [Username is hard to read in comments posted by the OP on meta](http://meta.scifi.stackexchange.com/q/5097) (CSS, meta.scifi.SE only)
* [Div containing 2 minute tour button not big enough](http://meta.salesforce.stackexchange.com/q/836) (CSS, salesforce.SE only)
* [Ignoring somebody screws up the avatar list](http://meta.stackexchange.com/q/155308) (CSS, chat)
* [The reply buttons in chat shouldn't reposition themselves on pinged messages](http://meta.stackexchange.com/q/216760) (CSS, chat)
* [Getting Red Line under tags](http://meta.stackexchange.com/q/222509) (CSS, chat)
* [U+0008 inserted into chat @-pings](http://meta.stackexchange.com/q/134268) (chat)
* [Problem in css style loading in Search Bar after refresh page when using FF](http://meta.stackexchange.com/q/224233) (chat)
* [Clicking on tags broken?](http://meta.stackexchange.com/q/78989)
* [Cannot navigate into the multicollider with keyboard](http://meta.stackexchange.com/q/207526)
* [Un-fade low-score answers on rollover or click](http://meta.stackexchange.com/q/129593)
* [The branch prediction answer is overflowing](http://meta.stackexchange.com/q/214706)
* [Confirming context menu entries via Enter triggers comment to be posted](http://meta.stackexchange.com/q/66646)
* [New top bar should render avatar with a transparent background](http://meta.stackexchange.com/q/210132)
* [Election comments have no permalink link](http://meta.stackexchange.com/q/220337)
* [Please put answers underneath questions in Close review queue](http://meta.stackexchange.com/q/172931)
* [Soft-hyphen hides subsequent text when using Opera 12.16](http://meta.stackexchange.com/q/224533)
* [Add thousand separator for helpful flags count in user profiles](http://meta.stackexchange.com/q/223866)
* [Option to delete an answer only visible after a reload](http://meta.stackexchange.com/q/115702)
* [Why does the logo not show up when signing up for a site and confirming the account?](http://meta.stackexchange.com/q/227975)
* [Can the Magic card auto link feature be improved?](http://meta.boardgames.stackexchange.com/q/1152) (boardgames.SE only)
* [Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher](http://meta.stackexchange.com/q/231150)
* [Make spaces unbreakable when it's obvious that a line-break should not occur](http://meta.french.stackexchange.com/q/347) (french.SE only)
* [Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode](http://meta.stackexchange.com/q/234680)
* [Bar between “add a comment” and “show more comments” is inconsistent](http://meta.stackoverflow.com/q/266852)
* [Mobile user profile page sort selectors stop working after first change](http://meta.stackexchange.com/q/239549)
* [Snippets editor won't insert and close on SO](http://meta.stackexchange.com/q/240486)
* [“Show more comments” link breaks for unregistered users if a comment is posted after page load](http://meta.stackexchange.com/q/240485)
* [Inside or outside?](http://meta.stackoverflow.com/q/240417)
* [Lightbox sometimes doesn't go away when popup is closed in user profile editor](http://meta.stackoverflow.com/q/240102)
* [Welcome back, user. Click here to get error 404](http://meta.stackoverflow.com/q/240790)
* [All internal links on Stack Exchange sites should be protocol-relative](http://meta.stackexchange.com/q/223725) (https)
* [Make all i.stack.imgur.com links protocol-relative](http://meta.stackexchange.com/q/221304) (https)
* [Chat link in top bar isn't site-specific when using HTTPS](http://meta.stackexchange.com/q/226343) (https)
* [CSS for daily site access calendar on profile page fails to load over HTTPS](http://meta.stackexchange.com/q/220470) (https)
* [Render MathJax in the 10k tools](http://meta.stackexchange.com/q/209393) (math)
* [Can we have the suggested questions' titles parsed by default?](http://meta.math.stackexchange.com/q/11036) (math)
* [Missing MathJaX in the duplicate subtab of the close review queue](http://meta.cs.stackexchange.com/q/537) (math)
* [The scope of \newcommand is the entire page](http://meta.math.stackexchange.com/q/4130) (math)
* [MathJax preview broken when equations contain `\label`s](http://meta.math.stackexchange.com/q/11392) (math)
* [Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions](http://meta.stackexchange.com/q/229363) (math)

Notes:

* **CSS**: This is a pure CSS fix.  It will be applied even if site JavaScript is disabled.
* **chat**: This fix applies to the [Stack Exchange Network chat](http://chat.stackexchange.com "Stack Exchange Network chat").
* **https**: This fix is applied when using Stack Exchange over HTTPS.  Note that [HTTPS support for Stack Exchange is still experimental.](http://meta.stackexchange.com/questions/116782/better-https-support-for-stack-exchange-sites)
* **math**: This fix applies only to sites using MathJax for LaTeX math rendering.


Credits
-------

SOUP is currently maintained by [Ilmari Karonen][vyznev].  Several of the fixes are based on suggestions or earlier user scripts made by others; see the [source code][source] and/or the meta.SO links above for details.


Contributing
------------

If you know a user script or stylesheet patch for SO or other SE sites that would be suitable for inclusion in SOUP, or an unfixed issue that you believe might be worth patching, please let me know (e.g. by posting a comment or an answer the [SOUP page on StackApps][SA]).

To be included in SOUP, a patch should:

* **address a known unfixed issue:** If you find a new interface bug on SO, please [report it on MSE](http://meta.stackexchange.com/questions/ask) first, and give the devs some time to fix it.  There's no hard limit on this, but there's not much point in patching something via SOUP if it's going to be fixed by the devs in a few minutes / hours / days anyway.

* **be simple and fast:** The mean length of individual patches in SOUP (excluding shared infrastructure) is currently around three lines of code.  If adding a new patch would significantly increase the length of SOUP, cause a noticeable performance impact or introduce a significant external dependency (e.g. new syntax highlighting rules), it's probably not suitable.

* **be uncontroversial:** SOUP is intended to be a "least common denominator" patch set for everyone.  While a simple [`[status-declined]`](http://meta.stackexchange.com/tags/status-declined/info "'status-declined' tag wiki - Meta Stack Overflow") doesn't necessarily disqualify an issue from being included in SOUP (sometimes it just means the devs are feeling lazy ;-), if a substantial number of people say they don't want it, it doesn't go in.  In particular, patches that add significant new functionality, significantly change the appearance of the site or [repaint the bikeshed](http://en.wikipedia.org/wiki/Parkinson%27s_Law_of_Triviality) are not suitable for SOUP.

* **be safe and unobtrusive:** This goes with the above points: if any patch in SOUP turns out to cause undesirable side effects (including usability or performance issues) on some platforms, it should be either fixed or removed.

If you notice that any fix included in SOUP is not working for you, causes undesirable side effects or has become obsolete (e.g. because the bug it's working around was fixed), please let me know!


See also
--------

* [SE Modifications — Username autocomplete in comments, inline revision source, and utility links](http://stackapps.com/questions/2138/se-modifications-username-autocomplete-in-comments-inline-revision-source-a)
* [SE Chat Modifications — Keyboard navigation and commands for chat](http://stackapps.com/questions/2105/se-chat-modifications-keyboard-navigation-and-commands-for-chat)
* [Official keyboard shortcuts](http://stackapps.com/questions/2567/official-keyboard-shortcuts)
* ...and other [popular user scripts on StackApps](http://stackapps.com/?tab=scripts)

   [SO]: http://stackoverflow.com/ "Stack Overflow"
   [SE]: http://stackexchange.com/ "Stack Exchange Network"
   [DL]: https://github.com/vyznev/soup/raw/master/SOUP.user.js "Download / install SOUP from GitHub"
   [source]: https://github.com/vyznev/soup/blob/master/SOUP.user.js "View SOUP source code"
   [GM]: https://addons.mozilla.org/firefox/addon/greasemonkey/ "Mozilla add-ons: GreaseMonkey"
   [TM]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Chrome Web Store: Tampermonkey"
   [chrome-ext]: https://support.google.com/chrome/answer/187443 "Chrome > Help > Manage your extensions"
   [vyznev]: http://meta.stackexchange.com/users/174699/ilmari-karonen "User Ilmari Karonen - Meta Stack Exchange"
   [github]: https://github.com/vyznev/soup "SOUP repository on GitHub"
   [SA]: http://stackapps.com/questions/4486/stack-overflow-unofficial-patch "Stack Overflow Unofficial Patch on StackApps"
   [US]: http://userscripts.org/scripts/show/293219 "Stack Overflow Unofficial Patch on UserScripts.org"
