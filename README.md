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

### CSS-only fixes

These are pure CSS fixes.  They will be applied even if JavaScript is disabled on the site.

* [mse215473: Add a non-breaking space to “reopen (1)” and its ilk](http://meta.stackexchange.com/q/215473)
* [mse138685: Layout fix for Firefox in “Zoom text only” mode](http://meta.stackexchange.com/q/138685)
* [mse114109: Background in OP's user name can obscure text in multiline comments](http://meta.stackexchange.com/q/114109)
* [mse143973: Images can be pushed outside the boundaries of a post by using nested lists](http://meta.stackexchange.com/q/143973)
* [mse217120: Ugly overflows when editing a deleted answer inline](http://meta.stackexchange.com/q/217120)
* [mse145819: &lt;hr/&gt;'s do not get rendered in deleted answers](http://meta.stackexchange.com/q/145819)
* [mse108046: Mouse cursor doesn't change to pointer when hovering “full site” on mobile](http://meta.stackexchange.com/q/108046)
* [mse110566: Does the spoiler markdown work on images?](http://meta.stackexchange.com/q/110566)
* [mse58760: &lt;kbd&gt; (yes, still &lt;kbd&gt;) doesn't play nice with lists](http://meta.stackexchange.com/q/58760)
* [mse219740: Add spacing / padding to “Protected By…” and “Not the answer you're looking for”](http://meta.stackexchange.com/q/219740)
* [mse203405: Excerpt of privilege is below privilege instead of in front](http://meta.stackexchange.com/q/203405)
* [mse210165: Extra blue line appearing in the top bar (Firefox only)](http://meta.stackexchange.com/q/210165)
* [mse154788: Why are comments overlapping the sidebar?](http://meta.stackexchange.com/q/154788)
* [mse214830: Selecting text in profile activity comments causes unexpected clipping](http://meta.stackexchange.com/q/214830)
* [mse230392: Layout bug while viewing vote count in Meta Stackexchange](http://meta.stackexchange.com/q/230392)
* [physics5773: Bounty icon is poorly placed](http://meta.physics.stackexchange.com/q/5773)
* [mse224185: Links sometimes float above text in vote-to-close dialog on Firefox](http://meta.stackexchange.com/q/224185)
* [mse231981: Overly long user location entry breaks mobile users view](http://meta.stackexchange.com/q/231981) (mobile view only)
* [mse167975: Bug in textarea in bounty creation popup](http://meta.stackexchange.com/q/167975)
* [mse233517: Badge symbol in notification is of the site you're on, not where badge was earned](http://meta.stackexchange.com/q/233517)
* [mse169225: Why does the bounty award button appear on deleted answers?](http://meta.stackexchange.com/q/169225)
* [mse240710: Was the fringe always there on the up-rep icon?](http://meta.stackexchange.com/q/240710)

### Site-specific CSS fixes

These pure CSS fixes are for issues specific to certain sites on the Stack Exchange network.  Most of them are applied on on the affected site(s), although a few are applied globally, even though the issue they fix is only apparent on some sites.

* [skeptics2636: Links in promotion ads are black on black, thus invisible](http://meta.skeptics.stackexchange.com/q/2636)
* [math12803: “Sign up for the newsletter” button overflows the frame on Firefox / Linux](http://meta.math.stackexchange.com/q/12803) (partially applied globally)
* [japanese1023: Preformatted text in Japanese doesn't line up properly](http://meta.japanese.stackexchange.com/q/1023)
* [gaming8530: Hovering over the community links changes the header height](http://meta.gaming.stackexchange.com/q/8530) (applied globally)
* [codegolf959: Add line-height shortener to the ascii-art tag](http://meta.codegolf.stackexchange.com/q/959)
* [english4719: Background of long OP username looks ugly in comments](http://meta.english.stackexchange.com/q/4719)
* [skeptics2747: Links are not visible in On Hold message](http://meta.skeptics.stackexchange.com/q/2747)
* [mse229751: Related questions with over 99 score display incorrectly](http://meta.stackexchange.com/q/229751)
* [mse229797: You are here, but where's here?](http://meta.stackexchange.com/q/229797)
* [math16552: Using \[tag:\] markup in posts creates an ugly gap between lines](http://meta.math.stackexchange.com/q/16552)
* [mse239223: Spacing between reputation change and question title on user page sometimes missing](http://meta.stackexchange.com/q/239223)
* [salesforce836: Div containing 2 minute tour button not big enough](http://meta.salesforce.stackexchange.com/q/836)

### Chat CSS fixes

These fixes apply only to the [Stack Exchange Network chat](http://chat.stackexchange.com "Stack Exchange Network chat").

* [mse155308: Ignoring somebody screws up the avatar list](http://meta.stackexchange.com/q/155308)
* [mse216760: The reply buttons in chat shouldn't reposition themselves on pinged messages](http://meta.stackexchange.com/q/216760)
* [mse222509: Getting Red Line under tags](http://meta.stackexchange.com/q/222509)
* [mse134268: U+0008 inserted into chat @-pings](http://meta.stackexchange.com/q/134268)
* [mse224233: Problem in css style loading in Search Bar after refresh page when using FF](http://meta.stackexchange.com/q/224233)

### General fixes

* [mse217779: The CSS for spoilers is a mess. Let's fix it!](http://meta.stackexchange.com/q/217779)
* [mse78989: Clicking on tags broken?](http://meta.stackexchange.com/q/78989)
* [mse207526: Cannot navigate into the multicollider with keyboard](http://meta.stackexchange.com/q/207526)
* [mse129593: Un-fade low-score answers on rollover or click](http://meta.stackexchange.com/q/129593)
* [mse214706: The branch prediction answer is overflowing](http://meta.stackexchange.com/q/214706)
* [mse66646: Confirming context menu entries via Enter triggers comment to be posted](http://meta.stackexchange.com/q/66646)
* [mse210132: New top bar should render avatar with a transparent background](http://meta.stackexchange.com/q/210132)
* [mse220337: Election comments have no permalink link](http://meta.stackexchange.com/q/220337)
* [mse172931: Please put answers underneath questions in Close review queue](http://meta.stackexchange.com/q/172931)
* [mse224533: Soft-hyphen hides subsequent text when using Opera 12.16](http://meta.stackexchange.com/q/224533)
* [mse223866: Add thousand separator for helpful flags count in user profiles](http://meta.stackexchange.com/q/223866)
* [mse115702: Option to delete an answer only visible after a reload](http://meta.stackexchange.com/q/115702)
* [mse227975: Why does the logo not show up when signing up for a site and confirming the account?](http://meta.stackexchange.com/q/227975)
* [mse231150: Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher](http://meta.stackexchange.com/q/231150)
* [mse234680: Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode](http://meta.stackexchange.com/q/234680)
* [mse266852: Bar between “add a comment” and “show more comments” is inconsistent](http://meta.stackoverflow.com/q/266852)
* [mse239549: Mobile user profile page sort selectors stop working after first change](http://meta.stackexchange.com/q/239549)
* [mse240417: Inside or outside?](http://meta.stackoverflow.com/q/240417)
* [mse240102: Lightbox sometimes doesn't go away when popup is closed in user profile editor](http://meta.stackoverflow.com/q/240102)
* [mse240790: Welcome back, user. Click here to get error 404](http://meta.stackoverflow.com/q/240790)
* [mse240790: Dangling signature dash in comments](http://meta.stackoverflow.com/q/240790)

### Site-specific fixes

* [boardgames1152: Can the Magic card auto link feature be improved?](http://meta.boardgames.stackexchange.com/q/1152)
* [french347: Make spaces unbreakable when it's obvious that a line-break should not occur](http://meta.french.stackexchange.com/q/347)

### HTTPS-only fixes

These fixes are only applied when using Stack Exchange over HTTPS.  Note that [HTTPS support for Stack Exchange is still experimental.](http://meta.stackexchange.com/questions/116782/better-https-support-for-stack-exchange-sites)

* [mse223725: All internal links on Stack Exchange sites should be protocol-relative](http://meta.stackexchange.com/q/223725)
* [mse221304: Make all i.stack.imgur.com links protocol-relative](http://meta.stackexchange.com/q/221304)
* [mse226343: Chat link in top bar isn't site-specific when using HTTPS](http://meta.stackexchange.com/q/226343)
* [mse220470: CSS for daily site access calendar on profile page fails to load over HTTPS](http://meta.stackexchange.com/q/220470)

### MathJax-related fixes:

These fixes apply only to sites using [MathJax](http://www.mathjax.org) for LaTeX math rendering.

* [mse209393: Render MathJax in the 10k tools](http://meta.stackexchange.com/q/209393)
* [math11036: Can we have the suggested questions' titles parsed by default?](http://meta.math.stackexchange.com/q/11036)
* [cs537: Missing MathJaX in the duplicate subtab of the close review queue](http://meta.cs.stackexchange.com/q/537)
* [math4130: The scope of \newcommand is the entire page](http://meta.math.stackexchange.com/q/4130)
* [math11392: MathJax preview broken when equations contain `\label`s](http://meta.math.stackexchange.com/q/11392)
* [mse229363: Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions](http://meta.stackexchange.com/q/229363)


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
