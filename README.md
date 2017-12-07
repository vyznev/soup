<!-- thumbnail: https://i.stack.imgur.com/8EphO.png -->
<!-- version: 1.49 -->

![](https://i.stack.imgur.com/IzzhJ.png "SOUP logo")

The Stack Overflow Unofficial Patch (SOUP) is a project to collect various minor client-side bug fixes, work-arounds and usability improvements for [Stack Overflow][SO] and other Q&A sites on the [Stack Exchange Network][SE] into a single user script.

The intent of SOUP is not to make any substantial or controversial changes to the Stack Exchange user interface, but to fix minor problems and omissions that the SE developers have overlooked or haven't got around to fixing yet.  By combining these minor patches into a single user script, they become easier to install and maintain.


Installing
----------

SOUP can be installed either as a stand-alone browser extension or via a user script manager such as [Greasemonkey][GM] or [Tampermonkey][TM].

SOUP has been mainly developed and tested on Firefox and Chrome.  It may also run on other browsers with user script support (via Tampermonkey or other compatible extensions), but has not been fully tested on them.  Any reports of cross-browser issues are welcome.

### Installing as a browser extension

Users of Chrome or Firefox (including Firefox Mobile) can install SOUP as a browser extension:

* [**SOUP on Firefox Add-ons**](https://addons.mozilla.org/en-US/firefox/addon/so-unofficial-patch-soup/ "SOUP on Firefox Add-ons")
* [**SOUP on Chrome Web Store**](https://chrome.google.com/webstore/detail/stack-overflow-unofficial/bagdnnmjfkaolcegcgeohpboeocfalpj "SOUP on Chrome Web Store")

(An Opera extension may be available at a later date.  In the mean time, Opera users may use the Chrome extension via [Download Chrome Extension](https://addons.opera.com/en/extensions/details/download-chrome-extension-9/), or just use the user script version with e.g. [Tampermonkey for Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/).)

Note that updates to the extension packages available at Firefox Add-ons and Chrome Web Store may take a few days to appear, even after a new stable user script version is released, due to review and other delays.

### Installing as a user script

To install SOUP as a user script, you first need to install a  user script manager such as [Greasemonkey][GM] (for Firefox) or [Tampermonkey][TM].  (Other Greasemonkey compatible user script managers should also work.)  After installing the extension, clicking the ["download / install"][DL] button below should bring up a dialog asking you if you want to install SOUP.  Answer "yes".

> ### [<kbd>Download / Install SOUP</kbd>][DL]  
> <sup>[View source][source] / [GitHub repo][github] / [Stack Apps post][SA]</sup>

### Installing the development version

If you like living on the edge, you can also install the development version of SOUP, which gets all the latest fixes and updates as soon as they're written.  Of course, it also gets all the latest bugs, too.  If you do install the development version, please report any bugs or regressions you may find in it below!

> ### [<kbd>Download / Install SOUP (development branch)</kbd>][devDL]  
> <sup>[View source][devsrc] / [GitHub repo][devel]</sup>

Note that the development version of SOUP is currently only available as a user script.


Included fixes
--------------

SOUP v1.49
&#x20;
(development) includes fixes or workarounds for the following issues.

The fixes highlighted in **boldface** include particularly major interface improvements or fix particularly severe or widespread issues.  The choice of which fixes to highlight is unavoidably somewhat subjective, but in my personal opinion, these are the fixes you should actually install SOUP for &mdash; the rest are just icing on the cake.

### CSS-only fixes

These are pure CSS fixes.  They will be applied even if JavaScript is disabled on the site.  Most of these are fairly minor, but sometimes pervasive, issues.

* [mse215473: Add a non-breaking space to “reopen (1)” and its ilk](https://meta.stackexchange.com/q/215473)
* [mse114109: Background in OP's user name can obscure text in multiline comments](https://meta.stackexchange.com/q/114109)
* [mse145819: &lt;hr/&gt;'s do not get rendered in deleted answers](https://meta.stackexchange.com/q/145819)
* [mse108046: Mouse cursor doesn't change to pointer when hovering “full site” on mobile](https://meta.stackexchange.com/q/108046)
* [mse110566: Does the spoiler markdown work on images?](https://meta.stackexchange.com/q/110566)
* [mse58760: &lt;kbd&gt; (yes, still &lt;kbd&gt;) doesn't play nice with lists](https://meta.stackexchange.com/q/58760)
* [mse203405: Excerpt of privilege is below privilege instead of in front](https://meta.stackexchange.com/q/203405)
* **[mse154788: Why are comments overlapping the sidebar?](https://meta.stackexchange.com/q/154788)**
* [mse214830: Selecting text in profile activity comments causes unexpected clipping](https://meta.stackexchange.com/q/214830)
* [mse230392: Layout bug while viewing vote count in Meta Stackexchange](https://meta.stackexchange.com/q/230392)
* [physics5773: Bounty icon is poorly placed](https://physics.meta.stackexchange.com/q/5773)
* [mse224185: Links sometimes float above text in vote-to-close dialog on Firefox](https://meta.stackexchange.com/q/224185)
* [mse233517: Badge symbol in notification is of the site you're on, not where badge was earned](https://meta.stackexchange.com/q/233517)
* [mse169225: Why does the bounty award button appear on deleted answers?](https://meta.stackexchange.com/q/169225)
* **[mse84296: RTL text can mess up comment timestamps](https://meta.stackexchange.com/q/84296)**
* [mse249859: &lt;kbd&gt; tags in headings are too small](https://meta.stackexchange.com/q/249859)
* [mse248156: What's the purpose of the tagline in the Bounties section of the profile?](https://meta.stackexchange.com/q/248156)
* [mso284049: Small bugs in the Stack Overflow editor](https://meta.stackoverflow.com/q/284049)
* [mse250081: Retract close vote UI](https://meta.stackexchange.com/q/250081)
* **[mso287222: Clicking between lines fails](https://meta.stackoverflow.com/q/287222)**
* [mso297678: Comment anchor links get “visited” highlighting](https://meta.stackoverflow.com/q/297678)
* [mse242944: Long display name with no spaces breaks design of review history pages](https://meta.stackexchange.com/q/242944)
* [mse266258: Left side markdown diff outside of its area](https://meta.stackexchange.com/q/266258)
* [mso342634: “Hot Meta Posts” with a 4-digit score wrap onto a second line](https://meta.stackoverflow.com/q/342634)
* [mse186748: Duplicate dialog close button causes preview to be too narrow](https://meta.stackexchange.com/q/186748)
* [mse290496: Minor alignment issue in few of the Badge page's “Awarded to” text](https://meta.stackexchange.com/q/290496)
* [mse291623: Links that are italics and bold not showing as links in Mobile Web](https://meta.stackexchange.com/q/291623)
* [mse287196: Tick sign is not centered on single badge page](https://meta.stackexchange.com/q/287196)
* [mse302580: Printing an SE page in Firefox shows only the first page](https://meta.stackexchange.com/q/302580)
* [mse302569: Alignment improvement in the flag dialog](https://meta.stackexchange.com/q/302569)
* [mse304096: Comments and answers have huge right margins when printed](https://meta.stackexchange.com/q/304096)

### Site-specific CSS fixes

These pure CSS fixes are for issues specific to certain sites on the Stack Exchange network.  Most of them are restricted to the affected site(s), but a few are applied globally, even though the issue they fix is only apparent on some sites.

* [math12803: “Sign up for the newsletter” button overflows the frame on Firefox / Linux](https://math.meta.stackexchange.com/q/12803) (partially applied globally)
* **[codegolf959: Add line-height shortener to the ascii-art tag](https://codegolf.meta.stackexchange.com/q/959)**
* [math12902: Visited questions are practically indistinguishable in search results](https://math.meta.stackexchange.com/q/12902)
* [math16559: Typo in site CSS disables visited link color in community bulletin](https://math.meta.stackexchange.com/q/16559)
* [electronics3162: Error for profile less info](https://electronics.meta.stackexchange.com/q/3162)
* [electronics4038: About Me box on user page not in the right place](https://electronics.meta.stackexchange.com/q/4038) (applied globally)
* [mso286009: Change \[Ask Question\] button style](https://meta.stackoverflow.com/q/286009)
* [mse250407: User signature cards on old revisions look funny](https://meta.stackexchange.com/q/250407) (applied globally)
* [cooking2049: Ads are cut off on the right](https://cooking.meta.stackexchange.com/q/2049)
* [movies1652: /users and profile pages (/users/…) space the link to the current profile (in the top bar) differently](https://movies.meta.stackexchange.com/q/1652) (also on [workplace](https://workplace.meta.stackexchange.com/q/4917))
* [graphicdesign2415: Design Bug: Tag alert CSS](https://graphicdesign.meta.stackexchange.com/q/2415)
* [mse244587: “Top Network Users” should contain themselves!](https://meta.stackexchange.com/q/244587)
* [rpg5812: Post as a guest: CSS bug](https://rpg.meta.stackexchange.com/q/5812) (applied globally)
* [mse294574: Unbroken line in preview text causes whole post block to side scroll](https://meta.stackexchange.com/q/294574)

### Chat-only fixes

These fixes apply only to the [Stack Exchange Network chat](https://chat.stackexchange.com "Stack Exchange Network chat").

* [mse155308: Ignoring somebody screws up the avatar list](https://meta.stackexchange.com/q/155308)
* [mse216760: The reply buttons in chat shouldn't reposition themselves on pinged messages](https://meta.stackexchange.com/q/216760)
* [mse222509: Getting Red Line under tags](https://meta.stackexchange.com/q/222509)
* [mse134268: U+0008 inserted into chat @-pings](https://meta.stackexchange.com/q/134268)
* [mse224233: Problem in css style loading in Search Bar after refresh page when using FF](https://meta.stackexchange.com/q/224233)
* [mso342361: Minor (funny) chat star bug for Hebrew text](https://meta.stackoverflow.com/q/342361)

### General fixes

* **[mse217779: The CSS for spoilers is a mess. Let's fix it!](https://meta.stackexchange.com/q/217779)**
* [mse78989: Clicking on tags broken?](https://meta.stackexchange.com/q/78989)
* **[mse261721: Un-fade low-score answers on click/tap too](https://meta.stackexchange.com/q/261721)**
* [mse66646: Confirming context menu entries via Enter triggers comment to be posted](https://meta.stackexchange.com/q/66646)
* [mse210132: New top bar should render avatar with a transparent background](https://meta.stackexchange.com/q/210132)
* [mse220337: Election comments have no permalink link](https://meta.stackexchange.com/q/220337)
* [mse224533: Soft-hyphen hides subsequent text when using Opera 12.16](https://meta.stackexchange.com/q/224533)
* **[mse115702: Option to delete an answer only visible after a reload](https://meta.stackexchange.com/q/115702)**
* [mse231150: Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher](https://meta.stackexchange.com/q/231150)
* **[mse234680: Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode](https://meta.stackexchange.com/q/234680)**
* [mse266852: Bar between “add a comment” and “show more comments” is inconsistent](https://meta.stackoverflow.com/q/266852)
* [mse239549: Mobile user profile page sort selectors stop working after first change](https://meta.stackexchange.com/q/239549)
* [mse240417: Should moderator diamonds be inside or outside the highlight box?](https://meta.stackoverflow.com/q/240417)
* [mse243519: Dangling signature dash in comments](https://meta.stackoverflow.com/q/243519)
* [mse220611: Blue background on nominee comments only when expanded](https://meta.stackexchange.com/q/220611)
* [mse121682: Links to election nominations don't work after nominations close](https://meta.stackexchange.com/q/121682)
* [mse230536: Large down-vote count doesn't display negative sign](https://meta.stackexchange.com/q/230536)
* [mse248646: Comments left by the author of a spam/offensive post should be deleted from the post too](https://meta.stackexchange.com/q/248646)
* [mso284223: Newly upvoted cool comments get an uncolored score](https://meta.stackoverflow.com/q/284223)
* **[mso295666: Disable annoying autofocus when clicking preview](https://meta.stackoverflow.com/questions/295666)**
* [mse240787: Inconsistent reputation mouse-over text](https://meta.stackexchange.com/q/240787)
* **[mso300679: Please block posts containing unsupported HTML](https://meta.stackoverflow.com/q/300679)**
* [mse266034: Link the title of the linked questions sidebar to the list of linked questions](https://meta.stackexchange.com/q/266034)
* [mse265889: Improve answer navigation for screen readers](https://meta.stackexchange.com/q/265889)
* [mse266523: Uploading an image from the web can leave paste broken in editor](https://meta.stackexchange.com/q/266523)
* [mse264307: Down arrow key won't work after using the Hyperlink button](https://meta.stackexchange.com/q/264307)
* [mse170970: Occasionally, the Unicode character sequence U+200C U+200B (ZWNJ ZWSP) is inserted into comments](https://meta.stackexchange.com/q/170970)
* [mse153528: Don't ask for a comment when downvoting, if the user just voted on a comment](https://meta.stackexchange.com/q/153528)
* [mse259325: Answer flashes orange when I click the “edit (1)” link to review a suggested edit](https://meta.stackexchange.com/q/259325)
* [mso306552: Votes cast has upvote-like symbol and is confusing](https://meta.stackoverflow.com/q/306552)
* [mse268584: When a user is deleted, OP highlighting is lost](https://meta.stackexchange.com/q/268584)
* [mso310158: Right to left marker in comment shouldn't cause the rest of the line to change](https://meta.stackoverflow.com/q/310158)
* [mse223737: Inbox heading should be a link](https://meta.stackexchange.com/q/223737)
* [mso313853: “Per page” pagination returns no results when increasing limit on last page](https://meta.stackoverflow.com/q/313853)
* **[mse74274: Privacy leak in permalink?](https://meta.stackexchange.com/q/74274)**
* [mso338932: Touch laptop – “The snippet editor does not support touch devices.”](https://meta.stackoverflow.com/q/338932)
* [mse287473: Tooltip banner blinking for question closed by the user with the golden badge in small screens](https://meta.stackexchange.com/q/287473)
* [mse135710: Please show changed titles separately in edit diffs](https://meta.stackexchange.com/q/135710)
* **[mse223725: All internal links on Stack Exchange sites should be protocol-relative](https://meta.stackexchange.com/q/223725)**
* **[mse299086: HTTPS certificate error for meta redirect pages (meta.&lt;site&gt;.stackexchange.com)](https://meta.stackexchange.com/q/299086)**
* [mse295065: Clicking “flags remaining” should link to a user's flag history page](https://meta.stackexchange.com/q/295065)
* [mso345590: The Stack Exchange menu is partly covered by the scrollbar when the window is too narrow](https://meta.stackoverflow.com/q/345590)
* [mse213709: Allow flagging comments on mobile site](https://meta.stackexchange.com/q/213709)
* [mse303599: The “Flag” modal keeps going down](https://meta.stackexchange.com/q/303599)
* [mse90713: Show “this question has an active bounty and cannot be closed” earlier, when it applies](https://meta.stackexchange.com/q/9071)
* [mso358862: 5 seconds is too long, but if it must be, then give me a visual cue](https://meta.stackoverflow.com/q/358862)

### Site-specific fixes

These non-CSS fixes are applied only on specific SE sites.  There's a lot fewer of these, since the SE JavaScript framework is shared between all sites, whereas CSS is different for each site.  Thus, these fixes generally involve either rare site-specific customizations, or simply design fixes that cannot be implemented in pure CSS.

* **[boardgames1152: Can the Magic card auto link feature be improved?](https://boardgames.meta.stackexchange.com/q/1152)**
* [french347: Make spaces unbreakable when it's obvious that a line-break should not occur](https://french.meta.stackexchange.com/q/347)
* [mse264171: SE new blog: Broken link on 'serverfault.com' and 'superuser.com' under 'TAGS'](https://meta.stackexchange.com/q/264171)
* **[mse299082: Display embedded YouTube videos in markdown preview](https://meta.stackexchange.com/q/299082)** (on aviation, bicycles, gaming, movies, music, scifi, space and video)

### Review fixes

These fixes apply to the post review interface.  I've listed them separately here, since they include some of the more notable interface tweaks in SOUP.

* **[mse172931: Please put answers underneath questions in Close review queue](https://meta.stackexchange.com/q/172931)**
* [mso297489: Add close option to the “Help and Improvement” queue to avoid cluttering flags?](https://meta.stackoverflow.com/q/297489)
* [mso356880: “This post has been edited x time since you began” persists after saving the question](https://meta.stackoverflow.com/q/356880)

### MathJax-related fixes:

These fixes apply only to sites using [MathJax](https://www.mathjax.org) for LaTeX math rendering.

* [mse209393: Render MathJax in the 10k tools](https://meta.stackexchange.com/q/209393)
* [math11036: Can we have the suggested questions' titles parsed by default?](https://math.meta.stackexchange.com/q/11036)
* **[math4130: The scope of \newcommand is the entire page](https://math.meta.stackexchange.com/q/4130)**
* [mse229363: Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions](https://meta.stackexchange.com/q/229363)
* **[math19650: Post with many lines of display math takes up most of the Questions page](https://math.meta.stackexchange.com/q/19650)**


License
-------

SOUP is distributed under the [ISC license][ISC], a permissive BSD-style open source license.

In addition, permission is given to Stack Exchange, Inc. to make use of SOUP code in any way they see fit, including but not limited to incorporating all or parts of it within the Stack Exchange codebase, with or without credit.

This SOUP version includes a copy of the [punycode.js](https://mths.be/punycode) library v1.2.4 by [Mathias Bynens](https://mathiasbynens.be/), distributed under the [MIT license][MIT].  The additional permissions granted above do not apply to this library.


Credits
-------

SOUP is currently maintained by [Ilmari Karonen][vyznev].  Some of the fixes are based on suggestions or earlier user scripts made by others; see the [source code][source] and/or the meta.SO links above for details.


Contributing
------------

If you know a user script or stylesheet patch for SO or other SE sites that would be suitable for inclusion in SOUP, or an unfixed issue that you believe might be worth patching, please let me know (e.g. by posting a comment or an answer the [SOUP page on Stack Apps][SA]).

If you'd like to help me out by contributing new fixes directly to SOUP, the [SOUP wiki on GitHub][wiki] has some useful tips.  Any and all contributions will be appreciated!

See also
--------

* [SE Modifications — Username autocomplete in comments, inline revision source, and utility links](https://stackapps.com/questions/2138/se-modifications-username-autocomplete-in-comments-inline-revision-source-a)
* [SE Chat Modifications — Keyboard navigation and commands for chat](https://stackapps.com/questions/2105/se-chat-modifications-keyboard-navigation-and-commands-for-chat)
* [Official keyboard shortcuts](https://stackapps.com/questions/2567/official-keyboard-shortcuts)
* [SE Additional Optional Features](https://stackapps.com/questions/6091/se-additional-optional-features)
* ...and other [popular user scripts on Stack Apps](https://stackapps.com/?tab=scripts)

   [SO]: https://stackoverflow.com/ "Stack Overflow"
   [SE]: https://stackexchange.com/ "Stack Exchange Network"
   [github]: https://github.com/vyznev/soup "SOUP repository on GitHub"
   [DL]: https://github.com/vyznev/soup/raw/master/SOUP.user.js "Download / install SOUP from GitHub"
   [source]: https://github.com/vyznev/soup/blob/master/SOUP.user.js "View SOUP source code"
   [devel]: https://github.com/vyznev/soup/tree/devel "SOUP development branch on GitHub"
   [devsrc]: https://github.com/vyznev/soup/blob/devel/SOUP.user.js "View SOUP development branch source code"
   [devDL]: https://github.com/vyznev/soup/raw/devel/SOUP.user.js "Download / install SOUP (development branch) from GitHub"
   [wiki]: https://github.com/vyznev/soup/wiki "SOUP wiki on GitHub"
   [GM]: https://addons.mozilla.org/firefox/addon/greasemonkey/ "Mozilla add-ons: Greasemonkey"
   [TM]: https://tampermonkey.net/ "Tampermonkey"
   [chrome-ext]: https://support.google.com/chrome/answer/187443 "Chrome > Help > Manage your extensions"
   [vyznev]: https://meta.stackexchange.com/users/174699/ilmari-karonen "User Ilmari Karonen - Meta Stack Exchange"
   [SA]: https://stackapps.com/questions/4486/stack-overflow-unofficial-patch "Stack Overflow Unofficial Patch on Stack Apps"
   [ISC]: https://opensource.org/licenses/ISC "ISC license text at the Open Source Initiative"
   [MIT]: https://opensource.org/licenses/ISC "MIT license text at the Open Source Initiative"
