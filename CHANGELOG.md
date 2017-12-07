This is a list of new fixes and other changes made to SOUP during its continued development.

SOUP version numbering generally follows the _major.minor.patch_ scheme.  Odd minor versions (1.1.x, 1.3.x, 1.5.x, etc.) are reserved for unstable development versions ("devel" branch on [GitHub][github]), while even ones denote stable releases ("master" branch on [GitHub][github]).  The change log below thus only includes even version numbers, as changes between development versions are too numerous to list.


1.49 (development)
====

**New fixes in 1.49.x:**

* [mse213709: Allow flagging comments on mobile site](https://meta.stackexchange.com/q/213709)
* [mso356880: “This post has been edited x time since you began” persists after saving the question](https://meta.stackoverflow.com/q/356880)
* [mse299082: Display embedded YouTube videos in markdown preview](https://meta.stackexchange.com/q/299082) (on aviation, bicycles, gaming, movies, music, scifi, space and video)
* [mse291623: Links that are italics and bold not showing as links in Mobile Web](https://meta.stackexchange.com/q/291623) (for mobile view)
* [mse287196: Tick sign is not centered on single badge page](https://meta.stackexchange.com/q/287196)
* [mse303599: The “Flag” modal keeps going down](https://meta.stackexchange.com/q/303599)
* [mse90713: Show “this question has an active bounty and cannot be closed” earlier, when it applies](https://meta.stackexchange.com/q/9071)
* [mse302580: Printing an SE page in Firefox shows only the first page](https://meta.stackexchange.com/q/302580)
* [mse302569: Alignment improvement in the flag dialog](https://meta.stackexchange.com/q/302569)
* [mse304096: Comments and answers have huge right margins when printed](https://meta.stackexchange.com/q/304096)

**Removed fixes:**

* [mse143973: Images can be pushed outside the boundaries of a post by using nested lists](https://meta.stackexchange.com/q/143973) (fixed)
* [mse210165: Extra blue line appearing in the top bar (Firefox only)](https://meta.stackexchange.com/q/210165) (fixed by new top bar)
* [mse240710: Was the fringe always there on the up-rep icon?](https://meta.stackexchange.com/q/240710) (obsolete due to new top bar)
* [mse207526: Cannot navigate into the multicollider with keyboard](https://meta.stackexchange.com/q/207526) (no longer works with new top bar, removed pending possible rewrite)

**Other changes:**

* [mse299086](https://meta.stackexchange.com/q/299086) fix no longer breaks old links to metas of renamed sites (like http://meta.programmers.stackexchange.com).
* Add `@noframes` to userscript header to avoid needlessly loading the script for child frames.  (SOUP has already refused to actually injects its code into child frames since v1.40.)
* Rewrite [mse243519](https://meta.stackoverflow.com/q/243519) fix to work also in Chrome and to avoid layout jumps ([issue #30](https://github.com/vyznev/soup/issues/30)).
* Update [movies1652](https://movies.meta.stackexchange.com/q/1652), [mse210132](https://meta.stackexchange.com/q/210132), [mse121682](https://meta.stackexchange.com/q/121682) and [mse223737](https://meta.stackexchange.com/q/223737) CSS / query selectors for new top bar structure.
* Remove klugy `SOUP.userRep` property in favor of `StackExchange.options.user.rep`.
* Rewrite [mso338932](https://meta.stackoverflow.com/q/338932) fix without using `touchstart` events to avoid [scroll performance issues](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#the-problem).
* Enabled the [movies1652](https://movies.meta.stackexchange.com/q/1652) fix also on workplace.SE, per https://workplace.meta.stackexchange.com/q/4917.
* [mse217779](https://meta.stackexchange.com/q/217779): Make spoilers visible in print.


1.48 (20 Sep 2017)
====

This release fixes a regression that broke the mhchem MathJax extension on sites that use it, and also contains several updates related to the recent switch to HTTPS and the upcoming top bar redesign.  Expect to possibly see a new stable release shortly, after the new top bar has been deployed to all SE sites.

**New fixes in 1.48.0:**

* [mso342634: “Hot Meta Posts” with a 4-digit score wrap onto a second line](https://meta.stackoverflow.com/q/342634) (CSS)
* [mso342361: Minor (funny) chat star bug for Hebrew text](https://meta.stackoverflow.com/q/342361) (CSS, chat only)
* [mso338932: Touch laptop – “The snippet editor does not support touch devices.”](https://meta.stackoverflow.com/q/338932)
* [mse294574: Unbroken line in preview text causes whole post block to side scroll](https://meta.stackexchange.com/q/294574) (CSS, SE.com main site only)
* [mse186748: Duplicate dialog close button causes preview to be too narrow](https://meta.stackexchange.com/q/186748) (CSS)
* [mse287473: Tooltip banner blinking for question closed by the user with the golden badge in small screens](https://meta.stackexchange.com/q/287473)
* [mse135710: Please show changed titles separately in edit diffs](https://meta.stackexchange.com/q/135710)
* [mse299086: HTTPS certificate error for meta redirect pages (meta.&lt;site&gt;.stackexchange.com)](https://meta.stackexchange.com/q/299086)
* [mse290496: Minor alignment issue in few of the Badge page's “Awarded to” text](https://meta.stackexchange.com/q/290496) (CSS)
* [mse295065: Clicking “flags remaining” should link to a user's flag history page](https://meta.stackexchange.com/q/295065)
* [mso345590: The Stack Exchange menu is partly covered by the scrollbar when the window is too narrow](https://meta.stackoverflow.com/q/345590)

**Removed fixes:**

* [mse221304: Make all i.stack.imgur.com links protocol-relative](https://meta.stackexchange.com/q/221304) (no longer needed)
* [mso306325: The yellow star in the sprites.svg image looks “unfinished”](https://meta.stackoverflow.com/q/306325) (no longer needed)
* [mse275976: Unable to see completed badges](https://meta.stackexchange.com/q/275976) (fixed)

**Other changes:**

* Update all URLs in code and documentation to use HTTPS where possible.
* Per-site metas have moved from `meta.*.stackexchange.com` to `*.meta.stackexchange.com`, update URLs and regexps to match.
* Simplify the [mse223725](https://meta.stackexchange.com/q/223725) HTTPS link fix, enable it regardless of current protocol and move it into general fixes.
* Slightly tweak the rounding algorithm for [mso313853](https://meta.stackoverflow.com/q/313853) to round the page number up when the page size is decreased (and down when it is increased).
* Fix: content filters were not always properly applied to content diffs in edit review and post histories.
* [mse217779](https://meta.stackexchange.com/q/217779): Only partially fade out spoilers in diffs, as per https://meta.stackexchange.com/a/300859.
* [math4130](https://math.meta.stackexchange.com/q/4130): Don't break the loading of other extensions like mhchem on [chemistry.SE](https://chemistry.stackexchange.com).  (Possible regression due to MathJax upgrade.)
* Add `SOUP.getEventHandlers()` utility wrapper for the undocumented `jQuery._data()` function.

**Changes in 1.48.1:**

* Re-enable [mso345590](https://meta.stackoverflow.com/q/345590) fix after a class name change effectively disabled it.

**Changes in 1.48.2:**

* Limit [graphicdesign2415](https://graphicdesign.meta.stackexchange.com/q/2415) CSS fix to graphicdesign.SE only and exclude tag links per https://rpg.meta.stackexchange.com/q/7486.

**Changes in 1.48.3:**

* Work around [GreaseMonkey 4 bug](https://github.com/greasemonkey/greasemonkey/issues/2670) that breaks scripts ending in a `//`-style comment with no newline.

**Changes in 1.48.4:**

* Rewrite over-broad selector in [math11036](https://math.meta.stackexchange.com/q/11036) fix that caused [display math not to work in review](https://math.meta.stackexchange.com/q/27195).


1.46 (11 Feb 2017)
====

It's been over a year since the last stable SOUP release, and this release consists mostly of the backlog of changes accumulated in the development branch during that time.

Unfortunately, I haven't had as much time to devote to maintaining SOUP lately as I had in the past.  When I started this project, I was hoping that others would join in to actively contribute patches to SOUP and maybe even become co-developers, so that I could eventually focus my efforts on coordination and quality control.  Alas, except for a couple of notable exceptions, this hasn't really happened, and so the development rate of SOUP remains limited by my personal free time and interest.  If you'd be interested in contributing to SOUP, or have any suggestions on how to make the project more accessible to new contributors, please let me know!

In particular, I haven't had time to do the extensive cross-browser pre-release testing of each fix that I used to do before each stable release.  I'm confident that none of the new fixes should have any major issues on either Chrome or Firefox, since I've been using them personally on both browsers for most of a year, but it's possible and even likely that some of the fixes in this release may have been made redundant in the mean time.  The best I can say is that at least this release is more up to date than v1.44. :)  Please report any problems or obsolete fixes that you may find, either on [GitHub](https://github.com/vyznev/soup/issues) or at [Stack Apps](https://stackapps.com/a/4488).

A major new feature in this release is that SOUP v1.46 will be the first stable SOUP release available as a browser extension on Chrome and Firefox.  A snapshot of the v1.45 development branch has been experimentally available as a browser extension for some time, but with this release, SOUP-as-an-extension is finally going official.  In particular, this means that you can now install SOUP on Firefox for Android!  Expect more mobile-specific fixes in future SOUP releases, and again, please report any and all problems you may observe.

**New fixes in 1.46.0:**

* [mse275976: Unable to see completed badges](https://meta.stackexchange.com/q/275976) (credit: Patrick Hofman)
* [mse74274: Privacy leak in permalink?](https://meta.stackexchange.com/q/74274) (incomplete)

**Removed fixes:**
* [mse229797: You are here, but where's here?](https://meta.stackexchange.com/q/229797) (meta.SE only)
* [math11392: MathJax preview broken when equations contain `\\label`s](https://math.meta.stackexchange.com/q/11392)
* [mse259692: Reputation for graph is off by a day](https://meta.stackexchange.com/q/259692)
* [mso315436: The open source ads preview page is still using the old size; ads appear distorted as a result](https://meta.stackoverflow.com/q/315436)

**Other changes:**

* **SOUP can now be installed as a Firefox / Chrome extension.** (Thanks to Peanut for help and for prodding me into actually doing this!)
* Use a less hacky way to obtain the site and question IDs for realtime update subscription. (Thanks, enki-code!)
* Improved [mse259692](https://meta.stackexchange.com/q/259692) fix by hacking the JS Date constructor and methods to pretend that local time is UTC.
* Tweaked [mse217779](https://meta.stackexchange.com/q/217779) CSS to slightly slow down spoiler fade-in per [request](https://meta.stackexchange.com/q/278935) and to add a notice text to spoilers per [another request](https://meta.stackexchange.com/q/104085).
* Rewrote the [math19650](https://math.meta.stackexchange.com/q/19650) fix to handle any display math syntax (including e.g. `\begin{equation}` ... `\end{equation}`) and to selectively disable display math in elements that should not contain it (currently comments, post summaries, question titles and the sidebar).
* Update [mse240417](https://meta.stackoverflow.com/q/240417) fix title.
* Content filters are now properly applied to the top bar menus (site switcher, inbox and achievements) loaded via Ajax.
* Re-enable [mse22372](https://meta.stackexchange.com/q/22372) HTTPS link rewriting for per-site metas (disabled in v1.42 due to [issues with Cloudflare](https://meta.stackexchange.com/q/265918)).
* [mse172931](https://meta.stackexchange.com/q/172931) fix now uses DOMParser instead of an ugly jQuery hack to extract answers from the question page HTML.
* [mse234680](https://meta.stackexchange.com/q/234680) fix handles optional link titles correctly (and fixes [a bug with non-BMP Unicode characters in URLs](https://meta.stackexchange.com/q/285366) as a side effect).
* Rewrote [mse66646](https://meta.stackexchange.com/q/66646) fix for compatibility with new SE code.  (The [related IME issue](https://meta.stackexchange.com/q/216834) seems to have been fixed, but this can still be triggered e.g. by the Firefox spell checker menu.)
* Disabled the [mse207526](https://meta.stackexchange.com/q/207526) fix when the [new topbar](https://meta.stackoverflow.com/q/343103) is enabled, to avoid issues with dialog positioning.  (Thanks, mjpieters!)

**Changes in 1.46.1:**

* Removed **[mse221304: Make all i.stack.imgur.com links protocol-relative](http://meta.stackexchange.com/q/221304)** (no longer needed)
* Prepare for the renaming of per-site meta hostnames from `meta.*.stackexchange.com` to `*.meta.stackexchange.com`, make sure fixes continue to run on the correct sites.
* Don't auto-rewrite links to the old meta hostnames to use HTTPS, since they have broken certs.


1.44 (5 Feb 2016)
====

Another somewhat delayed release.  A few fixes added, a few removed.  I'm trying out a new release strategy that should *hopefully* make the branch history easier to follow in the future.

**New fixes in 1.44.0:**

* [mse223737: Inbox heading should be a link](https://meta.stackexchange.com/q/223737)
* [mso313853: “Per page” pagination returns no results when increasing limit on last page](https://meta.stackoverflow.com/q/313853)
* [mse259692: Reputation for graph is off by a day](https://meta.stackexchange.com/q/259692) (partial fix)
* [mso315436: The open source ads preview page is still using the old size; ads appear distorted as a result](https://meta.stackoverflow.com/q/315436)

**Removed fixes:**

* [rpg3554: Skin does not handle read-only mode well](https://rpg.meta.stackexchange.com/q/3554)
* [cs537: Missing MathJaX in the duplicate subtab of the close review queue](https://cs.meta.stackexchange.com/q/537) (original bug has been fixed; the SOUP fix was causing broken math rendering in various places, such as in the "vote to close as duplicate" dialog)
* [mse139175: When starring a message from the star board, it's not reflected in the main chat window](https://meta.stackexchange.com/q/139175)
* [mso295276: Username filter does not abort old pending Ajax requests](https://meta.stackoverflow.com/q/295276)
* [mso308672: Alerts no longer work in StackOverflow snippets in Chrome 46+](https://meta.stackoverflow.com/q/308672)

**Other changes:**

* [mse234680](https://meta.stackexchange.com/q/234680): Be less picky about what constitutes a valid hostname, rely on the browser to reject invalid ones.
* [mse153528](https://meta.stackexchange.com/q/153528), [mso310158](https://meta.stackoverflow.com/q/310158): Avoid a ReferenceError if the StackExchange object is unavailable.
* [mse265889](https://meta.stackexchange.com/q/265889): Move heading to just before the answer text (but after the vote buttons); tweak heading format to emphasize score more.  (Thanks to Samuli Kärkkäinen for feedback.)
* Make the [mse115702](https://meta.stackexchange.com/q/115702) fix work in first posts / late answers review again (was broken since v1.38).
* [mse172931](https://meta.stackexchange.com/q/172931): Fix broken MathJax rendering in Ajax-loaded answers.
* Add optional `path` regexp to fixes, to allow CSS fixes to be active only on certain pages; edit existing fixes with in-code path filtering to use it.
* Rewrite [mse66646](https://meta.stackexchange.com/q/66646) to accommodate changes to SE code.

**Changes in v1.44.1:**

* Add `disabled` flag to temporarily turn off fixes.
* Temporarily disable [mso306325](https://meta.stackoverflow.com/q/306325) fix due to reported [issues](https://github.com/vyznev/soup/issues/24) on Firefox ESR.

**Changes in v1.44.2:**

* Remove [mse229797: You are here, but where's here?](https://meta.stackexchange.com/q/229797), fixed by SE (and interfering with SOUP fix).

**Changes in v1.44.3:**

* The [mse234680](https://meta.stackexchange.com/q/234680) fix broke on jQuery v1.12.4, fixed. (Reported by DavidPostill, thanks!)

**Changes in v1.44.4:**

* Update [mse66646](http://meta.stackexchange.com/q/66646) fix for jQuery v1.12.4 compatibility.


1.42 (2 Dec 2015)
====

**New fixes in 1.42.0:**

* [mse264171: SE new blog: Broken link on 'serverfault.com' and 'superuser.com' under 'TAGS'](https://meta.stackexchange.com/q/264171) (SE blogs only)
* [mse268584: When a user is deleted, OP highlighting is lost](https://meta.stackexchange.com/q/268584)
* [mso310158: Right to left marker in comment shouldn't cause the rest of the line to change](https://meta.stackoverflow.com/q/310158)

**Removed fixes:**

* [mso308513: Styling issue on upvoted comments by diamond moderators](https://meta.stackoverflow.com/q/308513) (CSS)

**Other changes:**

* Don't even try to run late setup and normal script fixes unless jQuery is available; it won't work.  Early (and mathjax) script fixes still run.
* Extended [codegolf959](https://codegolf.meta.stackexchange.com/q/959) fix (reduce line height in code blocks) also to puzzling.SE.
* [mse22372](https://meta.stackexchange.com/q/22372): Don't rewrite links to per-site metas (meta.*.stackexchange.com) to use HTTPS; they [currently return a 403 Forbidden error.](https://meta.stackexchange.com/q/265918)


1.40 (25 Oct 2015)
====

Just a bunch of new fixes, nothing too special this time.  The [mso308513](https://meta.stackoverflow.com/q/308513) issue has already been marked "status-completed" by SE, but it hasn't been deployed quite yet and having the style twice should do no harm, so I'm leaving it in for this release.

**New fixes in 1.40.0:**

* [rpg5812: Post as a guest: CSS bug](https://rpg.meta.stackexchange.com/q/5812) (CSS)
* [mso308513: Styling issue on upvoted comments by diamond moderators](https://meta.stackoverflow.com/q/308513) (CSS)
* [mse139175: When starring a message from the star board, it's not reflected in the main chat window](https://meta.stackexchange.com/q/139175) (chat)
* [mse153528: Don't ask for a comment when downvoting, if the user just voted on a comment](https://meta.stackexchange.com/q/153528)
* [mse259325: Answer flashes orange when I click the “edit (1)” link to review a suggested edit](https://meta.stackexchange.com/q/259325)
* [mso306552: Votes cast has upvote-like symbol and is confusing](https://meta.stackoverflow.com/q/306552) (credit: AgeDeO and misterManSam)
* [mso308672: Alerts no longer work in StackOverflow snippets in Chrome 46+](https://meta.stackoverflow.com/q/308672)

**Removed fixes:**

* [mso283939: Flag for diamond moderator textarea breaks out of the dialog](https://meta.stackoverflow.com/q/283939)

**Other changes:**

* SOUP no longer injects its code into `<iframe>`s.  While there have been no reported bugs caused by this, it's still useless and unintentional behavior.


1.38 (3 Oct 2015)
====

This release contains a couple of fixes to the image upload dialog (mse266523, mse264307 and mse266779), a few CSS fixes and one rather interesting accessibility fix ([mse265889](https://meta.stackexchange.com/q/265889)) which should actually be invisible to everyone, but audible to people using a screen reader.  There's also a bunch of changes to the "SOUP framework" that should make certain kinds of fixes faster, more reliable and easier to implement.

**New fixes in 1.38.0:**

* [mse265889: Improve answer navigation for screen readers](https://meta.stackexchange.com/q/265889)
* [mse266258: Left side markdown diff outside of its area](https://meta.stackexchange.com/q/266258) (CSS)
* [mse266523: Uploading an image from the web can leave paste broken in editor](https://meta.stackexchange.com/q/266523)
* [mse264307: Down arrow key won't work after using the Hyperlink button](https://meta.stackexchange.com/q/264307)
* [mse170970: Occasionally, the Unicode character sequence U+200C U+200B (ZWNJ ZWSP) is inserted into comments](https://meta.stackexchange.com/q/170970)
* [mso306325: The yellow star in the sprites.svg image looks “unfinished”](https://meta.stackoverflow.com/q/306325) (CSS, SO only)
* [mse266747: Amazing! All sites have blogs!](https://meta.stackexchange.com/q/266747) (CSS)
* [mse266779: Upload image not working after providing wrong URL](https://meta.stackexchange.com/q/266779)

**Other changes:**

* Content filters are now (hopefully) applied correctly to edited posts reloaded via Ajax.
* Content filters applied to new / updated posts no longer need to reprocess all posts on the page.
* The content filter Ajax hook regexp is no longer exposed as `SOUP.contentFilterRegexp` (because we now use several hooks with different regexps).
* Ajax hooks can now receive the result of their regexp match as a fourth parameter.
* New `SOUP.subscribeToQuestion()` helper method for subscribing to realtime events (votes, accepts, etc.) on question pages.
* The [mse115702](https://meta.stackexchange.com/q/115702) fix (enable delete link when downvoting an answer to -1) now uses the realtime event feed.
* The `SOUP.forEachTextNode()` method now passes the text content of each node as a parameter to the callback, and assigns any returned value back to the node.  The implementation should also be more efficient now, using native DOM traversal instead of recursive jQuery calls.

**Changes in 1.38.1:**

This point release fixes a bug that caused content filters not to run in the Markdown editor preview pane.

**Changes in 1.38.2:**

Removed the following fixes, as they're no longer needed:

* [mso302336: Don't fail LQP review audits just for looking at the deletion popup](https://meta.stackoverflow.com/q/302336)
* [mse266747: Amazing! All sites have blogs!](https://meta.stackexchange.com/q/266747)
* [mse266779: Upload image not working after providing wrong URL](https://meta.stackexchange.com/q/266779)
* [mso297171: Comment warning appears on next comment](https://meta.stackoverflow.com/q/297171)
* [mso283939: Flag for diamond moderator textarea breaks out of the dialog](https://meta.stackoverflow.com/q/283939)


1.36 (13 Sep 2015)
====

Another incremental release featuring two new fixes (and the expansion of one older fix to all sites).

**New fixes in 1.36.0:**

* [mso300679: Please block posts containing unsupported HTML](https://meta.stackoverflow.com/q/300679)
* [mse266034: Link the title of the linked questions sidebar to the list of linked questions](https://meta.stackexchange.com/q/266034)

**Other changes:**

* The [graphicdesign2415](https://graphicdesign.meta.stackexchange.com/q/2415) CSS fix (for links in post warnings) is now applied globally.
* Some notable fixes are now **highlighted** in the README.

1.34 (31 Aug 2015)
====

Just a couple of new fixes in this release.  I'm trying to return to a somewhat faster and more regular schedule for stable releases, hence this second release this month.  The reorganization planned for 2.0 is currently on the back burner.

**New fixes in 1.34.0:**

* [mso302336: Don't fail LQP review audits just for looking at the deletion popup](https://meta.stackoverflow.com/q/302336)
* [mse242944: Long display name with no spaces breaks design of review history pages](https://meta.stackexchange.com/q/242944) (CSS)
* [mse244587: “Top Network Users” should contain themselves!](https://meta.stackexchange.com/q/244587) (CSS, stackexchange.com base site only)
* [rpg3554: Skin does not handle read-only mode well](https://rpg.meta.stackexchange.com/q/3554) (CSS, RPG.SE only)
* [mse240787: Inconsistent reputation mouse-over text](https://meta.stackexchange.com/q/240787)

**Other changes:**

* Run content filters on expanded user cards (needed for [mse240787](https://meta.stackexchange.com/q/240787)), add new `usercard` content filter type.

1.32 (13 Aug 2015)
====

This is mainly a cleanup release, removing several obsolete fixes for design bugs that have been quietly fixed by SE.  That said, a few new fixes are also included.

**New fixes in 1.32.0:**

* [mso297489: Add close option to the “Help and Improvement” queue to avoid cluttering flags?](https://meta.stackoverflow.com/q/297489)
* [mso295276: Username filter does not abort old pending Ajax requests](https://meta.stackoverflow.com/q/295276)
* [mso297171: Comment warning appears on next comment](https://meta.stackoverflow.com/q/297171)
* [mso295666: Disable annoying autofocus when clicking preview](https://meta.stackoverflow.com/questions/295666) (thanks, Oriol!)
* [mso297678: Comment anchor links get “visited” highlighting](https://meta.stackoverflow.com/q/297678) (CSS)
* [mse261721: Un-fade low-score answers on click/tap too](https://meta.stackexchange.com/q/261721) (replaces [mse129593](https://meta.stackexchange.com/q/129593))

**Removed CSS fixes:**

* [mse138685: Layout fix for Firefox in “Zoom text only” mode](https://meta.stackexchange.com/q/138685)
* [mse217120: Ugly overflows when editing a deleted answer inline](https://meta.stackexchange.com/q/217120)
* [mse219740: Add spacing / padding to “Protected By…” and “Not the answer you're looking for”](https://meta.stackexchange.com/q/219740)
* [mse231981: Overly long user location entry breaks mobile users view](https://meta.stackexchange.com/q/231981)
* [mse167975: Bug in textarea in bounty creation popup](https://meta.stackexchange.com/q/167975)
* [math19587: When editing tags, the bottom of the tag popup is invisible](https://math.meta.stackexchange.com/q/19587)
* [skeptics2636: Links in promotion ads are black on black, thus invisible](https://skeptics.meta.stackexchange.com/q/2636)
* [japanese1023: Preformatted text in Japanese doesn't line up properly](https://japanese.meta.stackexchange.com/q/1023)
* [gaming8530: Hovering over the community links changes the header height](https://gaming.meta.stackexchange.com/q/8530)
* [english4719: Background of long OP username looks ugly in comments](https://english.meta.stackexchange.com/q/4719)
* [skeptics2747: Links are not visible in On Hold message](https://skeptics.meta.stackexchange.com/q/2747)
* [mse229751: Related questions with over 99 score display incorrectly](https://meta.stackexchange.com/q/229751)
* [math16552: Using \[tag:\] markup in posts creates an ugly gap between lines](https://math.meta.stackexchange.com/q/16552)
* [mse239223: Spacing between reputation change and question title on user page sometimes missing](https://meta.stackexchange.com/q/239223)
* [salesforce836: Div containing 2 minute tour button not big enough](https://salesforce.meta.stackexchange.com/q/836)
* [mso285884: Boxes around sponsored tags have inconsistent height](https://meta.stackoverflow.com/q/285884)
* [mso283617: The re-design has borked the user flag history page](https://meta.stackoverflow.com/q/283617)
* [mse250407: User signature cards on old revisions look funny](https://meta.stackexchange.com/q/250407) (meta.SE-specific part only)
* [movies1670: “Upload image” alignment issue](https://movies.meta.stackexchange.com/q/1670)
* [workplace2938: Tags cut off, Similar Questions overflowing](https://workplace.meta.stackexchange.com/q/2938)
* [mse243133: CSS z-index causes part of tags to show through notifications on webmasters, web applications, gaming, and gamedev](https://meta.stackexchange.com/q/243133)

**Removed JS fixes:**

* [mse214706: The branch prediction answer is overflowing](https://meta.stackexchange.com/q/214706)
* [mse223866: Add thousand separator for helpful flags count in user profiles](https://meta.stackexchange.com/q/223866)
* [mse227975: Why does the logo not show up when signing up for a site and confirming the account?](https://meta.stackexchange.com/q/227975)
* [mse240102: Lightbox sometimes doesn't go away when popup is closed in user profile editor](https://meta.stackoverflow.com/q/240102)
* [mse226343: Chat link in top bar isn't site-specific when using HTTPS](https://meta.stackexchange.com/q/226343)
* [mse220470: CSS for daily site access calendar on profile page fails to load over HTTPS](https://meta.stackexchange.com/q/220470)
* [mse129593: Un-fade low-score answers on rollover or click](https://meta.stackexchange.com/q/129593) (replaced by [mse261721](https://meta.stackexchange.com/q/261721))

**Other changes:**

* Run content filters and the [math11036](https://math.meta.stackexchange.com/q/11036) fix for expanded posts in the user profile activity tab.
* Tweak the link color for [graphicdesign2415](https://graphicdesign.meta.stackexchange.com/q/2415) slightly to match the background hue.
* Extend [mse84296](https://meta.stackexchange.com/q/84296) BiDi isolation fix to also apply to [usernames under posts](https://meta.stackoverflow.com/q/299339).
* Documentation fix: The [mse243519](https://meta.stackoverflow.com/q/243519) fix was mistakenly identified as [mse240790](https://meta.stackoverflow.com/q/240790) (and linked to the wrong post).
* Tweaked [math4130](https://math.meta.stackexchange.com/q/4130) fix to hopefully be more robust.

**Changes in 1.32.1:**

This point release fixes a few minor bugs that crept into 1.32.0:

* [mse172931](https://meta.stackexchange.com/q/172931): Strip `<script>` tags from the async-loaded question page more cleanly, to avoid accidentally parsing their content as HTML.
* [mse229363](https://meta.stackexchange.com/q/229363): Hot question titles from [Data Science](https://datascience.stackexchange.com) Stack Exchange are now eligible for MathJax parsing.
* [mso297489](https://meta.stackoverflow.com/q/297489): Fix a regexp typo causing the "close" link to sometimes appear only after the review page is reloaded.


1.30 (22 Jun 2015)
====

This is another late I-forgot-to-release-this-earlier version. :(  I've been quite busy since spring and haven't had much time to work on SOUP much, and the big SE redesign earlier this year made too many things into moving targets.  Anyway, all these fixes have been in the devel branch for several months, so at least they should be thoroughly tested. :)

My future plans involve doing another big testing session to see which old fixes can be safely removed, now that the new design has mostly stabilized, in preparation for SOUP v2.0.  (This is somewhat complicated by the fact that some of the issue have only been fixed partially.)  The 2.0 version, planned for sometime in August or September, will feature a more modular design, with the actual user script being built from many individual scriptlet files.  This should hopefully simplify editing and contributing new fixes, and also allow e.g. compiling SOUP into a stand-alone Chrome / Firefox extension.

**New fixes in 1.30.0:**

* [mse249859: &lt;kbd&gt; tags in headings are too small](https://meta.stackexchange.com/q/249859) (CSS)
* [mse248156: What's the purpose of the tagline in the Bounties section of the profile?](https://meta.stackexchange.com/q/248156) (CSS)
* [mse248646: Comments left by the author of a spam/offensive post should be deleted from the post too](https://meta.stackexchange.com/q/248646)
* [mso286009: Change \[Ask Question\] button style](https://meta.stackoverflow.com/q/286009) (CSS, SO only)
* [mso284049: Small bugs in the Stack Overflow editor](https://meta.stackoverflow.com/q/284049) (CSS)
* [mso285884: Boxes around sponsored tags have inconsistent height](https://meta.stackoverflow.com/q/285884) (CSS, SO only)
* [mso284223: Newly upvoted cool comments get an uncolored score](https://meta.stackoverflow.com/q/284223)
* [mso283939: Flag for diamond moderator textarea breaks out of the dialog](https://meta.stackoverflow.com/q/283939) (CSS)
* [mso283617: The re-design has borked the user flag history page](https://meta.stackoverflow.com/q/283617) (CSS, SO only)
* [mse250081: Retract close vote UI](https://meta.stackexchange.com/q/250081) (CSS)
* [mse250407: User signature cards on old revisions look funny](https://meta.stackexchange.com/q/250407) (CSS)
* [movies1670: “Upload image” alignment issue](https://movies.meta.stackexchange.com/q/1670) (CSS, movies.SE only)
* [workplace2938: Tags cut off, Similar Questions overflowing](https://workplace.meta.stackexchange.com/q/2938) (CSS, workplace.SE only)
* [cooking2049: Ads are cut off on the right](https://cooking.meta.stackexchange.com/q/2049) (CSS, cooking.SE only)
* [mse243133: CSS z-index causes part of tags to show through notifications on webmasters, web applications, gaming, and gamedev](https://meta.stackexchange.com/q/243133) (CSS, listed sites only)
* [movies1652: /users and profile pages (/users/…) space the link to the current profile (in the top bar) differently](https://movies.meta.stackexchange.com/q/1652) (CSS, movies.SE only)
* [graphicdesign2415: Design Bug: Tag alert CSS](https://graphicdesign.meta.stackexchange.com/q/2415) (CSS, graphicdesign.SE only)
* [math19650: Post with many lines of display math takes up most of the Questions page](https://math.meta.stackexchange.com/q/19650) (math)
* [math19587: When editing tags, the bottom of the tag popup is invisible](https://math.meta.stackexchange.com/q/19587) (CSS)
* [mso287222: Clicking between lines fails](https://meta.stackoverflow.com/q/287222) (CSS)

**Other changes:**

* Improved the [mse154788](https://meta.stackexchange.com/q/154788) fix by adding `word-wrap: break-word` to comment styles; this should avoid the need for scroll bars in many cases.

1.28 (3 Feb 2015)
====

This version mainly features some older styling fixes that didn't make it into 1.26, released in preparation for a bunch of new fixes involving the Stack Overflow redesign.

**New fixes in 1.28.0:**

* [mse121682: Links to election nominations don't work after nominations close](https://meta.stackexchange.com/q/121682)
* [mse230536: Large down-vote count doesn't display negative sign](https://meta.stackexchange.com/q/230536)
* [math12902: Visited questions are practically indistinguishable in search results](https://math.meta.stackexchange.com/q/12902) (CSS, math.SE only)
* [math16559: Typo in site CSS disables visited link color in community bulletin](https://math.meta.stackexchange.com/q/16559) (CSS, math.SE only)
* [electronics3162: Error for profile less info](https://electronics.meta.stackexchange.com/q/3162) (CSS, electronics.SE only)
* [electronics4038: About Me box on user page not in the right place](https://electronics.meta.stackexchange.com/q/4038) (CSS)

**Other changes:**

* Tweaked the [mse227975](https://meta.stackexchange.com/q/227975) fix to look better on the new login page.
* Tweaked comment body padding for [mse154788](https://meta.stackexchange.com/q/154788) to avoid link underlines sometimes being hidden on meta.SO.

**Changes in 1.28.1 (17 Mar 2015):**

* Fixed beta site detection after SE design change.

**Changes in 1.28.2 (10 Apr 2015):**

* [mse223725](https://meta.stackexchange.com/q/223725): Don't try to convert links to [elections.stackexchange.com](https://elections.stackexchange.com/) to HTTPS.  (Thanks to Martijn Pieters for reporting this issue!)

1.26 (10 Dec 2014)
====

It's been a while since the last stable release, again.  I'd been meaning to carry out more systematic browser compatibility and regression testing before the next release, and to find and prune away fixes that may have become unnecessary, but I never got around to finishing that.  However, I've been using the devel version myself on both Firefox and Chrome long enough that I can probably consider it pretty well tested by now.  Opera compatibility is currently untested; if you're using SOUP on Opera and find any issues with it, please let me know!

Most of the changes in this version are back-end tweaks meant to improve performance and stability.  I've also partially rewritten the README page, and started documenting the SOUP internal structure and API at the [SOUP wiki on GitHub](https://github.com/vyznev/soup/wiki) to make third-party contributions easier.  Any feedback is welcome!

**New fixes in 1.26.0:**

* [salesforce836: Div containing 2 minute tour button not big enough](https://salesforce.meta.stackexchange.com/q/836) (CSS, salesforce.SE only)
* [mse240417: Inside or outside?](https://meta.stackoverflow.com/q/240417)
* [mse240102: Lightbox sometimes doesn't go away when popup is closed in user profile editor](https://meta.stackoverflow.com/q/240102)
* [mse240710: Was the fringe always there on the up-rep icon?](https://meta.stackexchange.com/q/240710) (CSS)
* [mse243519: Dangling signature dash in comments](https://meta.stackoverflow.com/q/243519)
* [mse84296: RTL text can mess up comment timestamps](https://meta.stackexchange.com/q/84296) (CSS)

**Removed fixes:**

* [mse240486: Snippets editor won't insert and close on SO](https://meta.stackexchange.com/q/240486)
* [mse240485: “Show more comments” link breaks for unregistered users if a comment is posted after page load](https://meta.stackexchange.com/q/240485)

**Other changes:**

* Content filters are now applied to new comments loaded via Ajax.
* Made the content filter mechanism more flexible, so that filters can be made to run only on specific events.
* Made Ajax hooks run immediately by default to minimize flicker; let's see if this breaks anything...
* Content filters are now applied to answers loaded in review by the [mse172931](https://meta.stackexchange.com/q/172931) fix.
* New utility function `SOUP.hookChat()` for monitoring chat events.
* Chat content filters now use the page visibility API to only run in active tabs.
* Removed unused `SOUP.requestAnimationFrame()` compatibility wrapper.
* The fix list in README.md is now grouped into sections, just like in the source.
* The license section now contains an explicit "do whatever you want" license grant to SE, Inc. in addition to the general ISC license.
* Various other README.md changes, including a direct install link for the devel branch and a link to the SOUP wiki on GitHub.

**New fixes in 1.26.1:**

This is a quick single-fix releast for the math.SE moderator election.

* [mse220611: Blue background on nominee comments only when expanded](https://meta.stackexchange.com/q/220611)

**Changes in 1.26.2:**

* Fixed a silly SOUP bug causing JS fixes to run before DOM was fully loaded on some browsers.

**Changes in 1.26.3:**

* The [mse217779](https://meta.stackexchange.com/q/217779) spoiler fix no longer breaks clicking the spoiler to toggle visibility.

1.24 (7 Oct 2014)
====

A relatively fast-track release for [mse240485](https://meta.stackexchange.com/q/240485) and [mse240486](https://meta.stackexchange.com/q/240486), which both involve loss of UI functionality.  Also includes a couple of new lower priority fixes, and one internal fix to a SOUP-induced UI regression on Chrome.

**Changes in 1.24.2:**

* Added `max-width: 100%` to the `<kbd>` tag style ([mse58760](https://meta.stackexchange.com/q/58760)), just in case someone does something silly like [sticking a huge image inside `<kbd>` tags](https://meta.stackoverflow.com/q/273103).

**Changes in 1.24.1:**

* Removed the [mse240553](https://meta.stackexchange.com/q/240553) fix added in 1.24.0, as it's no longer needed.

**New fixes in 1.24.0:**

* [mse239549: Mobile user profile page sort selectors stop working after first change](https://meta.stackexchange.com/q/239549)
* [mse239223: Spacing between reputation change and question title on user page sometimes missing](https://meta.stackexchange.com/q/239223) (CSS, meta.SE only)
* [mse240553: start a bounty --> learn more… gives a 404](https://meta.stackexchange.com/q/240553)
* [mse240486: Snippets editor won't insert and close on SO](https://meta.stackexchange.com/q/240486)
* [mse240485: “Show more comments” link breaks for unregistered users if a comment is posted after page load](https://meta.stackexchange.com/q/240485)

**Removed fixes:**

* [mse233470: Answer lock notice runs into text below](https://meta.stackexchange.com/q/233470) (CSS, fixed)

**Other changes:**

* Redesignated the [stats1987](https://stats.meta.stackexchange.com/q/1987) fix as [mse154788](https://meta.stackexchange.com/q/154788), since that post has a more comprehensive description of the issue.  Tweaked the CSS to avoid [occasional spurious scroll bars in Chrome](https://meta.stackexchange.com/q/240352).

1.22 (15 Sep 2014)
====

This is just an incremental release to push out a few updates that missed v1.20 and were stuck in the devel branch.  More active development may or may not resume later in the year.  As always, contributions are welcome.

**New fixes in 1.22.0:**

* [math16552: Using \[tag:\] markup in posts creates an ugly gap between lines](https://math.meta.stackexchange.com/q/16552) (CSS, math.SE only)

**Other changes:**

* Improved and simplified the [stats1987](https://stats.meta.stackexchange.com/q/1987) fix by using `max-width` instead of `table-layout: fixed`.  This fixes [a minor layout issue with large vote counts](https://meta.stackexchange.com/q/229830) and adds scroll bars to over-wide comments.
* Added release dates to change log.  Trying out short release notes as well.
* Added `@homepageURL`, `@copyright` and `@license` metadata lines.

1.20 (28 Jul 2014)
====

**New fixes in 1.20.0:**

* [mse169225: Why does the bounty award button appear on deleted answers?](https://meta.stackexchange.com/q/169225) (CSS)
* [mse266852: Bar between “add a comment” and “show more comments” is inconsistent](https://meta.stackoverflow.com/q/266852)

**Removed fixes:**

* [mse104184: Allow flagging a comment after upvoting it](https://meta.stackexchange.com/q/104184) (fixed by SE)

**Other changes:**

* SOUP now hooks the WebSocket interface to detect chat events instead of polling for them.
* [mse229363](https://meta.stackexchange.com/q/229363): Hot question titles from the [Aviation](https://aviation.stackexchange.com) and [Puzzling](https://puzzling.stackexchange.com) sites are now eligible for MathJax parsing.

1.18 (5 Jul 2014)
====

**New fixes in 1.18.0:**

* [mse234680: Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode](https://meta.stackexchange.com/q/234680)

**Other changes:**

* The sidebar question score wrap fix ([mse229751](https://meta.stackexchange.com/q/229751)) is split into a global part and a site-specific part.
* The mobile link cursor fix ([mse108046](https://meta.stackexchange.com/q/108046)) is applied to all links without `name` attributes.
* The HTTPS link rewrite fix ([mse221304](https://meta.stackexchange.com/q/221304)) is now applied also to chat and area51 links.
* Content filters now work properly on chat (using brute-force 0.5s interval polling, since there's no proper hook for chat updates).
* `SOUP.isChat()` and `SOUP.isMeta()` are now set already during early setup.
* Devel branch versions should now auto-update properly (and not just when a new master release is made).
* Update checking is optimized by duplicating the script metadata in `SOUP.meta.js` and pointing `@updateURL` to it instead of the main script.

1.16 (26 Jun 2014)
====

**Changes in 1.16.1:**

* The [mse229759](https://meta.stackexchange.com/q/229759) fix has been made redundant, only a few hours after v1.16.0 was released.

**New fixes in 1.16.0:**

* [boardgames1152: Can the Magic card auto link feature be improved?](https://boardgames.meta.stackexchange.com/q/1152) (boardgames.SE only)
* [mse229751: Related questions with over 99 score display incorrectly](https://meta.stackexchange.com/q/229751) (CSS, meta.SE only)
* [mse231150: Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher](https://meta.stackexchange.com/q/231150)
* [mse224185: Links sometimes float above text in vote-to-close dialog on Firefox](https://meta.stackexchange.com/q/224185) (CSS)
* [mse233470: Answer lock notice runs into text below](https://meta.stackexchange.com/q/233470) (CSS)
* [mse231981: Overly long user location entry breaks mobile users view](https://meta.stackexchange.com/q/231981) (CSS, mobile view only)
* [mse167975: Bug in textarea in bounty creation popup](https://meta.stackexchange.com/q/167975) (CSS)
* [mse229759: You can't see the question owner's special color](https://meta.stackexchange.com/q/229759) (CSS, meta.SE only)
* [mse233517: Badge symbol in notification is of the site you're on, not where badge was earned](https://meta.stackexchange.com/q/233517) (CSS)
* [mse115702: Option to delete an answer only visible after a reload](https://meta.stackexchange.com/q/115702)
* [mse229797: You are here, but where's here?](https://meta.stackexchange.com/q/229797) (CSS, meta.SE only)
* [french347: Make spaces unbreakable when it's obvious that a line-break should not occur](https://french.meta.stackexchange.com/q/347) (french.SE only)

**Other changes:**

* The [mse230607](https://meta.stackexchange.com/q/230607) fix is no longer needed, and has been removed.
* The [mse224628](https://meta.stackexchange.com/q/224628) fix is no longer relevant, since the 10k flag review page no longer exists; the code has been adapted for [mse115702](https://meta.stackexchange.com/q/115702) instead.
* [mse229363](https://meta.stackexchange.com/q/229363): MathJax is now also parsed in hot question titles from earthscience.SE.
* The [math12803](https://math.meta.stackexchange.com/q/12803) fix is now split into two parts, of which one is math.SE specific and the other is applied on all sites.
* The [mse215473](https://meta.stackexchange.com/q/215473) styles are no longer incorrectly applied to links in popups created from the post menu.
* Fixes can now run scripts early, before the document loads, by specifying them with the `early` property.  Note that jQuery is typically not yet available at that stage.
* New `SOUP.addContentFilter()` utility method to simplify fixes that manipulate post content.
* Fancy new icon.

1.14 (11 May 2014)
====

**Changes in 1.14.1:**

* The [mse230607](https://meta.stackexchange.com/q/230607) fix is now applied on academia.SE too.

**New fixes in 1.14.0:**

* [mse221304: Make all i.stack.imgur.com links protocol-relative](https://meta.stackexchange.com/q/221304)
* [codegolf959: Add line-height shortener to the ascii-art tag](https://codegolf.meta.stackexchange.com/q/959) (CSS, codegolf.SE only)
* [mse227975: Why does the logo not show up when signing up for a site and confirming the account?](https://meta.stackexchange.com/q/227975)
* [mse230607: There's something funky about some titles in revision histories here on meta](https://meta.stackexchange.com/q/230607) (CSS, meta.SE only)
* [mse214830: Selecting text in profile activity comments causes unexpected clipping](https://meta.stackexchange.com/q/214830) (CSS)
* [mse230392: Layout bug while viewing vote count in Meta Stackexchange](https://meta.stackexchange.com/q/230392) (CSS)
* [english4719: Background of long OP username looks ugly in comments](https://english.meta.stackexchange.com/q/4719) (CSS, english.SE only)
* [physics5773: Bounty icon is poorly placed](https://physics.meta.stackexchange.com/q/5773) (CSS)
* [skeptics2747: Links are not visible in On Hold message](https://skeptics.meta.stackexchange.com/q/2747) (CSS, skeptics.SE only)

**Other changes:**

* Fix IDs and links now reflect the [MSO/MSE split](https://blog.stackoverflow.com/2014/04/announcing-the-launch-of-meta-stack-exchange/).
* Site matching now uses regexps for extra flexibility.
* The [mse229363](https://meta.stackexchange.com/q/229363) fix now applies to hot questions from all sites except those [explicitly known to use MathJax](https://meta.stackexchange.com/a/216607).

1.12 (15 Apr 2014)
====

**New fixes in 1.12.0:**

* [math12803: “Sign up for the newsletter” button overflows the frame on Firefox / Linux](https://math.meta.stackexchange.com/q/12803) (CSS, math.SE only)
* [japanese1023: Preformatted text in Japanese doesn't line up properly](https://japanese.meta.stackexchange.com/q/1023) (CSS, japanese.SE only)
* [gaming8530: Hovering over the community links changes the header height](https://gaming.meta.stackexchange.com/q/8530) (CSS)
* [mse226343: Chat link in top bar isn't site-specific when using HTTPS](https://meta.stackexchange.com/q/226343)
* [mse229363: Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions](https://meta.stackexchange.com/q/229363) (math)

**Other changes:**

* The fixes for [mse114636](https://meta.stackexchange.com/q/114636), [mse211547](https://meta.stackexchange.com/q/211547), [mse136589](https://meta.stackexchange.com/q/136589), [mse112305](https://meta.stackexchange.com/q/112305), [mse60390](https://meta.stackexchange.com/q/60390), [mse224411](https://meta.stackexchange.com/q/224411), [mse215450](https://meta.stackexchange.com/q/215450) and [mse224328](https://meta.stackexchange.com/q/224328) are no longer needed, and have been removed.
* Fixes can now be more easily limited to or excluded from specific sites.
* Caught exceptions are no longer stringified before logging.

1.10 (10 Mar 2014)
====

**Changes in 1.10.2:**

* Removed [workplace2437](https://workplace.meta.stackexchange.com/q/2437) CSS fix, no longer needed.
* The fix for [mse223866](https://meta.stackexchange.com/q/223866) caused a formatting regression for moderators, rewrote the code to be more careful. (Thanks, Monica Cellio!)

**Changes in 1.10.1:**

* Fixed minor issue with [stats1987](https://stats.meta.stackexchange.com/q/1987) causing vote counts on self-posted comments to be misaligned. (Thanks, Jonathan Hobbs!)

**New fixes in 1.10.0:**

* [mse223725: All internal links on Stack Exchange sites should be protocol-relative](https://meta.stackexchange.com/q/223725)
* [mse172931: Please put answers underneath questions in Close review queue](https://meta.stackexchange.com/q/172931)
* [mse224533: Soft-hyphen hides subsequent text when using Opera 12.16](https://meta.stackexchange.com/q/224533)
* [mse224411: Old top bar site icons are too big in chat lobby](https://meta.stackexchange.com/q/224411) (CSS)
* [mse224328: Enter from password field doesn't submit SE login form](https://meta.stackexchange.com/q/224328)
* [mse224233: Problem in css style loading in Search Bar after refresh page when using FF](https://meta.stackexchange.com/q/224233) (chat)
* [mse223866: Add thousand separator for helpful flags count in user profiles](https://meta.stackexchange.com/q/223866)
* [mse224628: Add delete button on-the-fly when reviewing flags](https://meta.stackexchange.com/q/224628)
* [mse203405: Excerpt of privilege is below privilege instead of in front](https://meta.stackexchange.com/q/203405) (CSS)
* [mse210165: Extra blue line appearing in the top bar (Firefox only)](https://meta.stackexchange.com/q/210165) (CSS)
* [stats1987: Long math expressions cause comments to overlap sidebar](https://stats.meta.stackexchange.com/q/1987) (CSS)
* [workplace2437: Add image doesn't work on Chrome](https://workplace.meta.stackexchange.com/q/2437) (CSS, workplace.SE only)
* [skeptics2636: Links in promotion ads are black on black, thus invisible](https://skeptics.meta.stackexchange.com/q/2636) (CSS, skeptics.SE only)

**Other changes:**

* JS fixes are now isolated from each other, one fix failing will no longer break others.
* New utility function `SOUP.forEachTextNode()` for easier page text manipulation.
* New `SOUP.userRep`, `SOUP.isBeta` and `SOUP.isMeta` properties for user privilege checking.
* Bugfix: SOUP no longer leaks variable or runs outside the SE network on Opera.

1.8 (24 Feb 2014)
===

**Changes in 1.8.3:**

* The fix for [mse160338](https://meta.stackexchange.com/q/160338) is no longer needed, and has been removed.  (Thanks, Manish!)

**Changes in 1.8.2:**

* The fix for [mse150069](https://meta.stackexchange.com/q/150069) is no longer needed, and has been removed.

**Changes in 1.8.1:**

* The fix for [mse212372](https://meta.stackexchange.com/q/212372) is no longer needed, and has been removed.
* The fix for [mse104184](https://meta.stackexchange.com/q/104184) is no longer applied in the mobile view; see [this feature request](https://meta.stackexchange.com/q/213709) for details.
* The README Markdown has been simplified for better compatibility between GitHub, StackApps and UserScripts.org.

**New fixes in 1.8.0:**

* [mse60390: Inconsistent padding of inline code](https://meta.stackexchange.com/q/60390) (CSS)
* [mse219740: Add spacing / padding to “Protected By…” and “Not the answer you're looking for”](https://meta.stackexchange.com/q/219740) (CSS)
* [mse212372: Top bar should be consistent on all sites… but it's not](https://meta.stackexchange.com/q/212372) (CSS)
* [mse222509: Getting Red Line under tags](https://meta.stackexchange.com/q/222509) (CSS, chat) (partial fix)
* [mse220470: CSS for daily site access calendar on profile page fails to load over HTTPS](https://meta.stackexchange.com/q/220470)
* [mse220337: Election comments have no permalink link](https://meta.stackexchange.com/q/220337)

**Other changes:**

* The code has been reorganized into self-contained modules, each corresponding to one bugfix / workaround.  Currently, this has little effect on functionality, but it could be used e.g. to allow toggling individual fixes on/off.
* Utility functions like <code>hookAjax()</code> are now contained in a page-global <code>SOUP</code> object.
* A new <code>SOUP.hookEditPreview()</code> utility function has been added to allow easier editing fixes.
* CSS fixes are now injected before the document is loaded, reducing the risk of "flickering".  As a side effect, a few selectors had to be adjusted to increase their specificity over conflicting SE default styles.
* Added a change log, with retroactive logging for earlier releases.

1.6 (10 Feb 2014)
===

**Changes in 1.6.1:**

* The fix for [mse216760](https://meta.stackexchange.com/q/216760) caused a [regression](https://meta.stackexchange.com/q/221733) in the chat transcript view.  This has been fixed.

**New fixes in 1.6.0:**

* [mse136589: The monospace formatting in a spoiler quote on a beta site is evil](https://meta.stackexchange.com/q/136589) (CSS)
* [mse112305: Code samples inside of spoilers are still visible on some sites](https://meta.stackexchange.com/q/112305) (CSS)
* [mse110566: Does the spoiler markdown work on images?](https://meta.stackexchange.com/q/110566) (CSS)
* [mse217779: The CSS for spoilers is a mess. Let's fix it!](https://meta.stackexchange.com/q/217779) (*not* CSS only, supersedes above three fixes)
* [mse58760: &lt;kbd&gt; (yes, still &lt;kbd&gt;) doesn't play nice with lists](https://meta.stackexchange.com/q/58760) (CSS)
* [mse160338: Allow moderators to reply to a flag](https://meta.stackexchange.com/q/160338) (mod)
* [cs537: Missing MathJaX in the duplicate subtab of the close review queue](https://cs.meta.stackexchange.com/q/537) (math)

1.4 (24 Jan 2014)
===

**New fixes in 1.4.0:**

* [mse143973: Images can be pushed outside the boundaries of a post by using nested lists](https://meta.stackexchange.com/q/143973) (CSS)
* [mse217120: Ugly overflows when editing a deleted answer inline](https://meta.stackexchange.com/q/217120) (CSS)
* [mse145819: &lt;hr/&gt;'s do not get rendered in deleted answers](https://meta.stackexchange.com/q/145819) (CSS)
* [mse108046: Mouse cursor doesn't change to pointer when hovering “full site” on mobile](https://meta.stackexchange.com/q/108046) (CSS)
* [mse216760: The reply buttons in chat shouldn't reposition themselves on pinged messages](https://meta.stackexchange.com/q/216760) (CSS, chat)
* [mse134268: U+0008 inserted into chat @-pings](https://meta.stackexchange.com/q/134268) (chat)
* [mse78989: Clicking on tags broken?](https://meta.stackexchange.com/q/78989)
* [mse214706: The branch prediction answer is overflowing](https://meta.stackexchange.com/q/214706)
* [mse66646: Confirming context menu entries via Enter triggers comment to be posted](https://meta.stackexchange.com/q/66646)
* [mse210132: New top bar should render avatar with a transparent background](https://meta.stackexchange.com/q/210132)
* [mse150069: Can we have the "50 more" link return items of the same type, please?](https://meta.stackexchange.com/q/150069) 
* [math11392: MathJax preview broken when equations contain `\label`s](https://math.meta.stackexchange.com/q/11392) (math)

1.2 (17 Jan 2014)
===

**New fixes in 1.2.0:**

* [math4130: The scope of \newcommand is the entire page](https://math.meta.stackexchange.com/q/4130) (math)
* [mse114109: Background in OP's user name can obscure text in multiline comments](https://meta.stackexchange.com/q/114109) (CSS)
* [math11036: Can we have the suggested questions' titles parsed by default?](https://math.meta.stackexchange.com/q/11036) (math)

1.0 (12 Jan 2014)
===

**Fixes included in the 1.0.x branch:**

* [mse114636: All Stack Exchange sites in a small window causing display problems?](https://meta.stackexchange.com/q/114636) (CSS)
* [mse215473: Add a non-breaking space to “reopen (1)” and its ilk](https://meta.stackexchange.com/q/215473) (CSS)
* [mse155308: Ignoring somebody screws up the avatar list](https://meta.stackexchange.com/q/155308) (CSS, chat)
* [mse138685: Layout fix for Firefox in “Zoom text only” mode](https://meta.stackexchange.com/q/138685) (CSS)
* [mse207526: Cannot navigate into the multicollider with keyboard](https://meta.stackexchange.com/q/207526)
* [mse129593: Un-fade low-score answers on rollover or click](https://meta.stackexchange.com/q/129593)
* [mse104184: Allow flagging a comment after upvoting it](https://meta.stackexchange.com/q/104184)
* [mse215450: SSL breaks TeX rendering](https://meta.stackexchange.com/q/215450)
* [mse150069: Can we have the "50 more" link return items of the same type, please?](https://meta.stackexchange.com/q/150069) (10k)
* [mse209393: Render MathJax in the 10k tools](https://meta.stackexchange.com/q/209393) (10k)

   [github]: https://github.com/vyznev/soup "SOUP repository on GitHub"
