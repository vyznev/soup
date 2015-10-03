<!-- thumbnail: http://i.stack.imgur.com/8EphO.png -->
<!-- version: 1.39.x -->

![](http://i.stack.imgur.com/IzzhJ.png "SOUP logo")

The Stack Overflow Unofficial Patch (SOUP) is a project to collect various minor client-side bug fixes, work-arounds and usability improvements for [Stack Overflow][SO] and other Q&A sites on the [Stack Exchange Network][SE] into a single user script.

The intent of SOUP is not to make any substantial or controversial changes to the Stack Exchange user interface, but to fix minor problems and omissions that the SE developers have overlooked or haven't got around to fixing yet.  By combining these minor patches into a single user script, they become easier to install and maintain.


Installing
----------

The easiest way to install SOUP is to use the [Greasemonkey][GM] (for Firefox) or [Tampermonkey][TM] (for Chrome) extension for managing user scripts.  (Other similar extensions, like Scriptish or NinjaKit, should also work.)  After installing the extension, clicking the ["download / install"][DL] button below should bring up a dialog asking you if you want to install SOUP.  Answer "yes".

> ### [<kbd>Download / Install</kbd>][DL]  
> <sup>[View source][source] / [GitHub repo][github] / [Stack Apps post][SA]</sup>

The "install" link above is for the stable branch of SOUP.  If you like living on the edge, you can also [install][devDL] the [development version][devel], which gets all the latest fixes and updates as soon as they're written.  Of course, it also gets all the latest bugs, too.  If you do install the development version, please report any bugs or regressions you may find in it below!

SOUP can also be used on other browsers with compatible user script support, such as Opera or Safari.  For detailed instructions on how to enable and install user scripts on different browsers, see the **["script" tag wiki on Stack Apps](http://stackapps.com/tags/script/info "'script' tag wiki - Stack Apps")**.

**Notes:**

* When installing SOUP on Opera, please *remove the "<code>.user</code>" part from the file name* to disable Greasemonkey compatibility mode.  While SOUP can run in either native or compatibility mode, a few MathJax-related fixes require native mode.

* SOUP has not yet been tested on Safari, but in principle it _should_ work.  If you do try to use it, please let me know how / if it works.

Included fixes
--------------

SOUP v1.39 (devel) includes fixes or workarounds for the following issues.

The fixes highlighted in **boldface** include particularly major interface improvements or fix particularly severe or widespread issues.  The choice of which fixes to highlight is unavoidably somewhat subjective, but in my personal opinion, these are the fixes you should actually install SOUP for &mdash; the rest are just icing on the cake.

### CSS-only fixes

These are pure CSS fixes.  They will be applied even if JavaScript is disabled on the site.  Most of these are fairly minor, but sometimes pervasive, issues.

* [mse215473: Add a non-breaking space to “reopen (1)” and its ilk](http://meta.stackexchange.com/q/215473)
* [mse114109: Background in OP's user name can obscure text in multiline comments](http://meta.stackexchange.com/q/114109)
* **[mse143973: Images can be pushed outside the boundaries of a post by using nested lists](http://meta.stackexchange.com/q/143973)**
* [mse145819: &lt;hr/&gt;'s do not get rendered in deleted answers](http://meta.stackexchange.com/q/145819)
* [mse108046: Mouse cursor doesn't change to pointer when hovering “full site” on mobile](http://meta.stackexchange.com/q/108046)
* [mse110566: Does the spoiler markdown work on images?](http://meta.stackexchange.com/q/110566)
* [mse58760: &lt;kbd&gt; (yes, still &lt;kbd&gt;) doesn't play nice with lists](http://meta.stackexchange.com/q/58760)
* [mse203405: Excerpt of privilege is below privilege instead of in front](http://meta.stackexchange.com/q/203405)
* [mse210165: Extra blue line appearing in the top bar (Firefox only)](http://meta.stackexchange.com/q/210165)
* **[mse154788: Why are comments overlapping the sidebar?](http://meta.stackexchange.com/q/154788)**
* [mse214830: Selecting text in profile activity comments causes unexpected clipping](http://meta.stackexchange.com/q/214830)
* [mse230392: Layout bug while viewing vote count in Meta Stackexchange](http://meta.stackexchange.com/q/230392)
* [physics5773: Bounty icon is poorly placed](http://meta.physics.stackexchange.com/q/5773)
* [mse224185: Links sometimes float above text in vote-to-close dialog on Firefox](http://meta.stackexchange.com/q/224185)
* [mse233517: Badge symbol in notification is of the site you're on, not where badge was earned](http://meta.stackexchange.com/q/233517)
* [mse169225: Why does the bounty award button appear on deleted answers?](http://meta.stackexchange.com/q/169225)
* **[mse84296: RTL text can mess up comment timestamps](http://meta.stackexchange.com/q/84296)**
* [mse240710: Was the fringe always there on the up-rep icon?](http://meta.stackexchange.com/q/240710)
* [mse249859: &lt;kbd&gt; tags in headings are too small](http://meta.stackexchange.com/q/249859)
* [mse248156: What's the purpose of the tagline in the Bounties section of the profile?](http://meta.stackexchange.com/q/248156)
* [mso284049: Small bugs in the Stack Overflow editor](http://meta.stackoverflow.com/q/284049)
* [mse250081: Retract close vote UI](http://meta.stackexchange.com/q/250081)
* **[mso287222: Clicking between lines fails](http://meta.stackoverflow.com/q/287222)**
* [mso297678: Comment anchor links get “visited” highlighting](http://meta.stackoverflow.com/q/297678)
* [mse242944: Long display name with no spaces breaks design of review history pages](http://meta.stackexchange.com/q/242944)
* [mse266258: Left side markdown diff outside of its area](http://meta.stackexchange.com/q/266258)
* [mse266747: Amazing! All sites have blogs!](http://meta.stackexchange.com/q/266747)

### Site-specific CSS fixes

These pure CSS fixes are for issues specific to certain sites on the Stack Exchange network.  Most of them are restricted to the affected site(s), but a few are applied globally, even though the issue they fix is only apparent on some sites.

* [math12803: “Sign up for the newsletter” button overflows the frame on Firefox / Linux](http://meta.math.stackexchange.com/q/12803) (partially applied globally)
* **[codegolf959: Add line-height shortener to the ascii-art tag](http://meta.codegolf.stackexchange.com/q/959)**
* [mse229797: You are here, but where's here?](http://meta.stackexchange.com/q/229797)
* [math12902: Visited questions are practically indistinguishable in search results](http://meta.math.stackexchange.com/q/12902)
* [math16559: Typo in site CSS disables visited link color in community bulletin](http://meta.math.stackexchange.com/q/16559)
* [electronics3162: Error for profile less info](http://meta.electronics.stackexchange.com/q/3162)
* [electronics4038: About Me box on user page not in the right place](http://meta.electronics.stackexchange.com/q/4038) (applied globally)
* [mso286009: Change \[Ask Question\] button style](http://meta.stackoverflow.com/q/286009)
* [mse250407: User signature cards on old revisions look funny](http://meta.stackexchange.com/q/250407) (applied globally)
* [cooking2049: Ads are cut off on the right](http://meta.cooking.stackexchange.com/q/2049)
* [movies1652: /users and profile pages (/users/…) space the link to the current profile (in the top bar) differently](http://meta.movies.stackexchange.com/q/1652)
* [graphicdesign2415: Design Bug: Tag alert CSS](http://meta.graphicdesign.stackexchange.com/q/2415) (applied globally)
* [mse244587: “Top Network Users” should contain themselves!](http://meta.stackexchange.com/q/244587)
* [rpg3554: Skin does not handle read-only mode well](http://meta.rpg.stackexchange.com/q/3554)
* [mso306325: The yellow star in the sprites.svg image looks “unfinished”](http://meta.stackoverflow.com/q/306325)
* [rpg5812: Post as a guest: CSS bug](http://meta.rpg.stackexchange.com/q/5812) (enabled globally)

### Chat-only fixes

These fixes apply only to the [Stack Exchange Network chat](http://chat.stackexchange.com "Stack Exchange Network chat").

* [mse155308: Ignoring somebody screws up the avatar list](http://meta.stackexchange.com/q/155308)
* [mse216760: The reply buttons in chat shouldn't reposition themselves on pinged messages](http://meta.stackexchange.com/q/216760)
* [mse222509: Getting Red Line under tags](http://meta.stackexchange.com/q/222509)
* [mse134268: U+0008 inserted into chat @-pings](http://meta.stackexchange.com/q/134268)
* [mse224233: Problem in css style loading in Search Bar after refresh page when using FF](http://meta.stackexchange.com/q/224233)

### General fixes

* **[mse217779: The CSS for spoilers is a mess. Let's fix it!](http://meta.stackexchange.com/q/217779)**
* [mse78989: Clicking on tags broken?](http://meta.stackexchange.com/q/78989)
* [mse207526: Cannot navigate into the multicollider with keyboard](http://meta.stackexchange.com/q/207526)
* **[mse261721: Un-fade low-score answers on click/tap too](http://meta.stackexchange.com/q/261721)**
* **[mse66646: Confirming context menu entries via Enter triggers comment to be posted](http://meta.stackexchange.com/q/66646)**
* [mse210132: New top bar should render avatar with a transparent background](http://meta.stackexchange.com/q/210132)
* [mse220337: Election comments have no permalink link](http://meta.stackexchange.com/q/220337)
* [mse224533: Soft-hyphen hides subsequent text when using Opera 12.16](http://meta.stackexchange.com/q/224533)
* **[mse115702: Option to delete an answer only visible after a reload](http://meta.stackexchange.com/q/115702)**
* [mse231150: Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher](http://meta.stackexchange.com/q/231150)
* **[mse234680: Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode](http://meta.stackexchange.com/q/234680)**
* [mse266852: Bar between “add a comment” and “show more comments” is inconsistent](http://meta.stackoverflow.com/q/266852)
* [mse239549: Mobile user profile page sort selectors stop working after first change](http://meta.stackexchange.com/q/239549)
* [mse240417: Inside or outside?](http://meta.stackoverflow.com/q/240417)
* [mse243519: Dangling signature dash in comments](http://meta.stackoverflow.com/q/243519)
* [mse220611: Blue background on nominee comments only when expanded](http://meta.stackexchange.com/q/220611)
* [mse121682: Links to election nominations don't work after nominations close](http://meta.stackexchange.com/q/121682)
* [mse230536: Large down-vote count doesn't display negative sign](http://meta.stackexchange.com/q/230536)
* [mse248646: Comments left by the author of a spam/offensive post should be deleted from the post too](http://meta.stackexchange.com/q/248646)
* [mso284223: Newly upvoted cool comments get an uncolored score](http://meta.stackoverflow.com/q/284223)
* [mso295276: Username filter does not abort old pending Ajax requests](http://meta.stackoverflow.com/q/295276)
* [mso297171: Comment warning appears on next comment](http://meta.stackoverflow.com/q/297171)
* **[mso295666: Disable annoying autofocus when clicking preview](http://meta.stackoverflow.com/questions/295666)**
* [mse240787: Inconsistent reputation mouse-over text](http://meta.stackexchange.com/q/240787)
* **[mso300679: Please block posts containing unsupported HTML](http://meta.stackoverflow.com/q/300679)**
* [mse266034: Link the title of the linked questions sidebar to the list of linked questions](http://meta.stackexchange.com/q/266034)
* [mse265889: Improve answer navigation for screen readers](http://meta.stackexchange.com/q/265889)
* [mse266523: Uploading an image from the web can leave paste broken in editor](http://meta.stackexchange.com/q/266523)
* [mse264307: Down arrow key won't work after using the Hyperlink button](http://meta.stackexchange.com/q/264307)
* [mse170970: Occasionally, the Unicode character sequence U+200C U+200B (ZWNJ ZWSP) is inserted into comments](http://meta.stackexchange.com/q/170970)
* [mse266779: Upload image not working after providing wrong URL](http://meta.stackexchange.com/q/266779)

### Site-specific fixes

These non-CSS fixes are applied only on specific SE sites.  There's a lot fewer of these, since the SE JavaScript framework is shared between all sites, whereas CSS is different for each site.  Thus, these fixes generally involve either rare site-specific customizations, or simply design fixes that cannot be implemented in pure CSS.

* **[boardgames1152: Can the Magic card auto link feature be improved?](http://meta.boardgames.stackexchange.com/q/1152)**
* [french347: Make spaces unbreakable when it's obvious that a line-break should not occur](http://meta.french.stackexchange.com/q/347)

### Review fixes

These fixes apply to the post review interface.  I've listed them separately here, since they include some of the more notable interface tweaks in SOUP.

* **[mse172931: Please put answers underneath questions in Close review queue](http://meta.stackexchange.com/q/172931)**
* [mso297489: Add close option to the “Help and Improvement” queue to avoid cluttering flags?](http://meta.stackoverflow.com/q/297489)
* [mso302336: Don't fail LQP review audits just for looking at the deletion popup](http://meta.stackoverflow.com/q/302336)

### HTTPS-only fixes

These fixes are only applied when using Stack Exchange over HTTPS.  Note that [HTTPS support for Stack Exchange is still experimental.](http://meta.stackexchange.com/questions/116782/better-https-support-for-stack-exchange-sites)

* **[mse223725: All internal links on Stack Exchange sites should be protocol-relative](http://meta.stackexchange.com/q/223725)**
* **[mse221304: Make all i.stack.imgur.com links protocol-relative](http://meta.stackexchange.com/q/221304)**

### MathJax-related fixes:

These fixes apply only to sites using [MathJax](http://www.mathjax.org) for LaTeX math rendering.

* [mse209393: Render MathJax in the 10k tools](http://meta.stackexchange.com/q/209393)
* [math11036: Can we have the suggested questions' titles parsed by default?](http://meta.math.stackexchange.com/q/11036)
* [cs537: Missing MathJaX in the duplicate subtab of the close review queue](http://meta.cs.stackexchange.com/q/537)
* **[math4130: The scope of \newcommand is the entire page](http://meta.math.stackexchange.com/q/4130)**
* **[math11392: MathJax preview broken when equations contain `\label`s](http://meta.math.stackexchange.com/q/11392)**
* [mse229363: Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions](http://meta.stackexchange.com/q/229363)
* **[math19650: Post with many lines of display math takes up most of the Questions page](http://meta.math.stackexchange.com/q/19650)**


License
-------

SOUP is distributed under the [ISC license][ISC], a permissive BSD-style open source license.

In addition, permission is given to Stack Exchange, Inc. to make use of SOUP code in any way they see fit, including but not limited to incorporating all or parts of it within the Stack Exchange codebase, with or without credit.

This SOUP version includes a copy of the [punycode.js](http://mths.be/punycode) library v1.2.4 by [Mathias Bynens](http://mathiasbynens.be/), distributed under the [MIT license][MIT].  The additional permissions granted above do not apply to this library.


Credits
-------

SOUP is currently maintained by [Ilmari Karonen][vyznev].  Some of the fixes are based on suggestions or earlier user scripts made by others; see the [source code][source] and/or the meta.SO links above for details.


Contributing
------------

If you know a user script or stylesheet patch for SO or other SE sites that would be suitable for inclusion in SOUP, or an unfixed issue that you believe might be worth patching, please let me know (e.g. by posting a comment or an answer the [SOUP page on Stack Apps][SA]).

If you'd like to help me out by contributing new fixes directly to SOUP, the [SOUP wiki on GitHub][wiki] has some useful tips.  Any and all contributions will be appreciated!

See also
--------

* [SE Modifications — Username autocomplete in comments, inline revision source, and utility links](http://stackapps.com/questions/2138/se-modifications-username-autocomplete-in-comments-inline-revision-source-a)
* [SE Chat Modifications — Keyboard navigation and commands for chat](http://stackapps.com/questions/2105/se-chat-modifications-keyboard-navigation-and-commands-for-chat)
* [Official keyboard shortcuts](http://stackapps.com/questions/2567/official-keyboard-shortcuts)
* [SE Additional Optional Features](http://stackapps.com/questions/6091/se-additional-optional-features)
* ...and other [popular user scripts on Stack Apps](http://stackapps.com/?tab=scripts)

   [SO]: http://stackoverflow.com/ "Stack Overflow"
   [SE]: http://stackexchange.com/ "Stack Exchange Network"
   [github]: https://github.com/vyznev/soup "SOUP repository on GitHub"
   [DL]: https://github.com/vyznev/soup/raw/master/SOUP.user.js "Download / install SOUP from GitHub"
   [source]: https://github.com/vyznev/soup/blob/master/SOUP.user.js "View SOUP source code"
   [devel]: https://github.com/vyznev/soup/tree/devel "SOUP development branch on GitHub"
   [devDL]: https://github.com/vyznev/soup/raw/devel/SOUP.user.js "Download / install SOUP (development branch) from GitHub"
   [wiki]: https://github.com/vyznev/soup/wiki "SOUP wiki on GitHub"
   [GM]: https://addons.mozilla.org/firefox/addon/greasemonkey/ "Mozilla add-ons: Greasemonkey"
   [TM]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Chrome Web Store: Tampermonkey"
   [chrome-ext]: https://support.google.com/chrome/answer/187443 "Chrome > Help > Manage your extensions"
   [vyznev]: http://meta.stackexchange.com/users/174699/ilmari-karonen "User Ilmari Karonen - Meta Stack Exchange"
   [SA]: http://stackapps.com/questions/4486/stack-overflow-unofficial-patch "Stack Overflow Unofficial Patch on Stack Apps"
   [US]: http://userscripts.org/scripts/show/293219 "Stack Overflow Unofficial Patch on UserScripts.org"
   [ISC]: http://opensource.org/licenses/ISC "ISC license text at the Open Source Initiative"
   [MIT]: http://opensource.org/licenses/ISC "MIT license text at the Open Source Initiative"
