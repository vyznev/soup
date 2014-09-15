This is a list of new fixes and other changes made to SOUP during its continued development.

SOUP version numbering generally follows the _major.minor.patch_ scheme.  Odd minor versions (1.1.x, 1.3.x, 1.5.x, etc.) are reserved for unstable development versions ("devel" branch on [GitHub][github]), while even ones denote stable releases ("master" branch on [GitHub][github]).  The change log below thus only includes even version numbers, as changes between development versions are too numerous to list.

1.23 (development)
====

**New fixes in 1.23.x:**

* [Earned bounties layout is broken](http://meta.stackexchange.com/q/239382)

1.22 (15 Sep 2014)
====

This is just an incremental release to push out a few updates that missed v1.20 and were stuck in the devel branch.  More active development may or may not resume later in the year.  As always, contributions are welcome.

**New fixes in 1.22.0:**

* [math16552: Using \[tag:\] markup in posts creates an ugly gap between lines](http://meta.math.stackexchange.com/q/16552) (CSS, math.SE only)

**Other changes:**

* Improved and simplified the [stats1987](http://meta.stats.stackexchange.com/q/1987) fix by using `max-width` instead of `table-layout: fixed`.  This fixes [a minor layout issue with large vote counts](http://meta.stackexchange.com/q/229830) and adds scroll bars to over-wide comments.
* Added release dates to change log.  Trying out short release notes as well.
* Added `@homepageURL`, `@copyright` and `@license` metadata lines.

1.20 (28 Jul 2014)
====

**New fixes in 1.20.0:**

* [mse169225: Why does the bounty award button appear on deleted answers?](http://meta.stackexchange.com/q/169225) (CSS)
* [mse266852: Bar between “add a comment” and “show more comments” is inconsistent](http://meta.stackoverflow.com/q/266852)

**Removed fixes:**

* [mse104184: Allow flagging a comment after upvoting it](http://meta.stackexchange.com/q/104184) (fixed by SE)

**Other changes:**

* SOUP now hooks the WebSocket interface to detect chat events instead of polling for them.
* [mse229363](http://meta.stackexchange.com/q/229363): Hot question titles from the [Aviation](http://aviation.stackexchange.com) and [Puzzling](http://puzzling.stackexchange.com) sites are now eligible for MathJax parsing.

1.18 (5 Jul 2014)
====

**New fixes in 1.18.0:**

* [mse234680: Domain names in an URL are incorrectly encoded as escaped ASCII characters instead of punycode](http://meta.stackexchange.com/q/234680)

**Other changes:**

* The sidebar question score wrap fix ([mse229751](http://meta.stackexchange.com/q/229751)) is split into a global part and a site-specific part.
* The mobile link cursor fix ([mse108046](http://meta.stackexchange.com/q/108046)) is applied to all links without `name` attributes.
* The HTTPS link rewrite fix ([mse221304](http://meta.stackexchange.com/q/221304)) is now applied also to chat and area51 links.
* Content filters now work properly on chat (using brute-force 0.5s interval polling, since there's no proper hook for chat updates).
* `SOUP.isChat()` and `SOUP.isMeta()` are now set already during early setup.
* Devel branch versions should now auto-update properly (and not just when a new master release is made).
* Update checking is optimized by duplicating the script metadata in `SOUP.meta.js` and pointing `@updateURL` to it instead of the main script.

1.16 (26 Jun 2014)
====

**Changes in 1.16.1:**

* The [mse229759](http://meta.stackexchange.com/q/229759) fix has been made redundant, only a few hours after v1.16.0 was released.

**New fixes in 1.16.0:**

* [boardgames1152: Can the Magic card auto link feature be improved?](http://meta.boardgames.stackexchange.com/q/1152) (boardgames.SE only)
* [mse229751: Related questions with over 99 score display incorrectly](http://meta.stackexchange.com/q/229751) (CSS, meta.SE only)
* [mse231150: Clicking the top bar sometimes loads the SE homepage, sometimes shows the site switcher](http://meta.stackexchange.com/q/231150)
* [mse224185: Links sometimes float above text in vote-to-close dialog on Firefox](http://meta.stackexchange.com/q/224185) (CSS)
* [mse233470: Answer lock notice runs into text below](http://meta.stackexchange.com/q/233470) (CSS)
* [mse231981: Overly long user location entry breaks mobile users view](http://meta.stackexchange.com/q/231981) (CSS, mobile view only)
* [mse167975: Bug in textarea in bounty creation popup](http://meta.stackexchange.com/q/167975) (CSS)
* [mse229759: You can't see the question owner's special color](http://meta.stackexchange.com/q/229759) (CSS, meta.SE only)
* [mse233517: Badge symbol in notification is of the site you're on, not where badge was earned](http://meta.stackexchange.com/q/233517) (CSS)
* [mse115702: Option to delete an answer only visible after a reload](http://meta.stackexchange.com/q/115702)
* [mse229797: You are here, but where's here?](http://meta.stackexchange.com/q/229797) (CSS, meta.SE only)
* [french347: Make spaces unbreakable when it's obvious that a line-break should not occur](http://meta.french.stackexchange.com/q/347) (french.SE only)

**Other changes:**

* The [mse230607](http://meta.stackexchange.com/q/230607) fix is no longer needed, and has been removed.
* The [mse224628](http://meta.stackexchange.com/q/224628) fix is no longer relevant, since the 10k flag review page no longer exists; the code has been adapted for [mse115702](http://meta.stackexchange.com/q/115702) instead.
* [mse229363](http://meta.stackexchange.com/q/229363): MathJax is now also parsed in hot question titles from earthscience.SE.
* The [math12803](http://meta.math.stackexchange.com/q/12803) fix is now split into two parts, of which one is math.SE specific and the other is applied on all sites.
* The [mse215473](http://meta.stackexchange.com/q/215473) styles are no longer incorrectly applied to links in popups created from the post menu.
* Fixes can now run scripts early, before the document loads, by specifying them with the `early` property.  Note that jQuery is typically not yet available at that stage.
* New `SOUP.addContentFilter()` utility method to simplify fixes that manipulate post content.
* Fancy new icon.

1.14 (11 May 2014)
====

**Changes in 1.14.1:**

* The [mse230607](http://meta.stackexchange.com/q/230607) fix is now applied on academia.SE too.

**New fixes in 1.14.0:**

* [mse221304: Make all i.stack.imgur.com links protocol-relative](http://meta.stackexchange.com/q/221304)
* [codegolf959: Add line-height shortener to the ascii-art tag](http://meta.codegolf.stackexchange.com/q/959) (CSS, codegolf.SE only)
* [mse227975: Why does the logo not show up when signing up for a site and confirming the account?](http://meta.stackexchange.com/q/227975)
* [mse230607: There's something funky about some titles in revision histories here on meta](http://meta.stackexchange.com/q/230607) (CSS, meta.SE only)
* [mse214830: Selecting text in profile activity comments causes unexpected clipping](http://meta.stackexchange.com/q/214830) (CSS)
* [mse230392: Layout bug while viewing vote count in Meta Stackexchange](http://meta.stackexchange.com/q/230392) (CSS)
* [english4719: Background of long OP username looks ugly in comments](http://meta.english.stackexchange.com/q/4719) (CSS, english.SE only)
* [physics5773: Bounty icon is poorly placed](http://meta.physics.stackexchange.com/q/5773) (CSS)
* [skeptics2747: Links are not visible in On Hold message](http://meta.skeptics.stackexchange.com/q/2747) (CSS, skeptics.SE only)

**Other changes:**

* Fix IDs and links now reflect the [MSO/MSE split](http://blog.stackoverflow.com/2014/04/announcing-the-launch-of-meta-stack-exchange/).
* Site matching now uses regexps for extra flexibility.
* The [mse229363](http://meta.stackexchange.com/q/229363) fix now applies to hot questions from all sites except those [explicitly known to use MathJax](http://meta.stackexchange.com/a/216607).

1.12 (15 Apr 2014)
====

**New fixes in 1.12.0:**

* [math12803: “Sign up for the newsletter” button overflows the frame on Firefox / Linux](http://meta.math.stackexchange.com/q/12803) (CSS, math.SE only)
* [japanese1023: Preformatted text in Japanese doesn't line up properly](http://meta.japanese.stackexchange.com/q/1023) (CSS, japanese.SE only)
* [gaming8530: Hovering over the community links changes the header height](http://meta.gaming.stackexchange.com/q/8530) (CSS)
* [mse226343: Chat link in top bar isn't site-specific when using HTTPS](http://meta.stackexchange.com/q/226343)
* [mse229363: Exclude TeX.SE question titles from MathJax parsing in Hot Network Questions](http://meta.stackexchange.com/q/229363) (math)

**Other changes:**

* The fixes for [mse114636](http://meta.stackexchange.com/q/114636), [mse211547](http://meta.stackexchange.com/q/211547), [mse136589](http://meta.stackexchange.com/q/136589), [mse112305](http://meta.stackexchange.com/q/112305), [mse60390](http://meta.stackexchange.com/q/60390), [mse224411](http://meta.stackexchange.com/q/224411), [mse215450](http://meta.stackexchange.com/q/215450) and [mse224328](http://meta.stackexchange.com/q/224328) are no longer needed, and have been removed.
* Fixes can now be more easily limited to or excluded from specific sites.
* Caught exceptions are no longer stringified before logging.

1.10 (10 Mar 2014)
====

**Changes in 1.10.2:**

* Removed [workplace2437](http://meta.workplace.stackexchange.com/q/2437) CSS fix, no longer needed.
* The fix for [mse223866](http://meta.stackexchange.com/q/223866) caused a formatting regression for moderators, rewrote the code to be more careful. (Thanks, Monica Cellio!)

**Changes in 1.10.1:**

* Fixed minor issue with [stats1987](http://meta.stats.stackexchange.com/q/1987) causing vote counts on self-posted comments to be misaligned. (Thanks, Jonathan Hobbs!)

**New fixes in 1.10.0:**

* [mse223725: All internal links on Stack Exchange sites should be protocol-relative](http://meta.stackexchange.com/q/223725)
* [mse172931: Please put answers underneath questions in Close review queue](http://meta.stackexchange.com/q/172931)
* [mse224533: Soft-hyphen hides subsequent text when using Opera 12.16](http://meta.stackexchange.com/q/224533)
* [mse224411: Old top bar site icons are too big in chat lobby](http://meta.stackexchange.com/q/224411) (CSS)
* [mse224328: Enter from password field doesn't submit SE login form](http://meta.stackexchange.com/q/224328)
* [mse224233: Problem in css style loading in Search Bar after refresh page when using FF](http://meta.stackexchange.com/q/224233) (chat)
* [mse223866: Add thousand separator for helpful flags count in user profiles](http://meta.stackexchange.com/q/223866)
* [mse224628: Add delete button on-the-fly when reviewing flags](http://meta.stackexchange.com/q/224628)
* [mse203405: Excerpt of privilege is below privilege instead of in front](http://meta.stackexchange.com/q/203405) (CSS)
* [mse210165: Extra blue line appearing in the top bar (Firefox only)](http://meta.stackexchange.com/q/210165) (CSS)
* [stats1987: Long math expressions cause comments to overlap sidebar](http://meta.stats.stackexchange.com/q/1987) (CSS)
* [workplace2437: Add image doesn't work on Chrome](http://meta.workplace.stackexchange.com/q/2437) (CSS, workplace.SE only)
* [skeptics2636: Links in promotion ads are black on black, thus invisible](http://meta.skeptics.stackexchange.com/q/2636) (CSS, skeptics.SE only)

**Other changes:**

* JS fixes are now isolated from each other, one fix failing will no longer break others.
* New utility function `SOUP.forEachTextNode()` for easier page text manipulation.
* New `SOUP.userRep`, `SOUP.isBeta` and `SOUP.isMeta` properties for user privilege checking.
* Bugfix: SOUP no longer leaks variable or runs outside the SE network on Opera.

1.8 (24 Feb 2014)
===

**Changes in 1.8.3:**

* The fix for [mse160338](http://meta.stackexchange.com/q/160338) is no longer needed, and has been removed.  (Thanks, Manish!)

**Changes in 1.8.2:**

* The fix for [mse150069](http://meta.stackexchange.com/q/150069) is no longer needed, and has been removed.

**Changes in 1.8.1:**

* The fix for [mse212372](http://meta.stackexchange.com/q/212372) is no longer needed, and has been removed.
* The fix for [mse104184](http://meta.stackexchange.com/q/104184) is no longer applied in the mobile view; see [this feature request](http://meta.stackexchange.com/q/213709) for details.
* The README Markdown has been simplified for better compatibility between GitHub, StackApps and UserScripts.org.

**New fixes in 1.8.0:**

* [mse60390: Inconsistent padding of inline code](http://meta.stackexchange.com/q/60390) (CSS)
* [mse219740: Add spacing / padding to “Protected By…” and “Not the answer you're looking for”](http://meta.stackexchange.com/q/219740) (CSS)
* [mse212372: Top bar should be consistent on all sites… but it's not](http://meta.stackexchange.com/q/212372) (CSS)
* [mse222509: Getting Red Line under tags](http://meta.stackexchange.com/q/222509) (CSS, chat) (partial fix)
* [mse220470: CSS for daily site access calendar on profile page fails to load over HTTPS](http://meta.stackexchange.com/q/220470)
* [mse220337: Election comments have no permalink link](http://meta.stackexchange.com/q/220337)

**Other changes:**

* The code has been reorganized into self-contained modules, each corresponding to one bugfix / workaround.  Currently, this has little effect on functionality, but it could be used e.g. to allow toggling individual fixes on/off.
* Utility functions like <code>hookAjax()</code> are now contained in a page-global <code>SOUP</code> object.
* A new <code>SOUP.hookEditPreview()</code> utility function has been added to allow easier editing fixes.
* CSS fixes are now injected before the document is loaded, reducing the risk of "flickering".  As a side effect, a few selectors had to be adjusted to increase their specificity over conflicting SE default styles.
* Added a change log, with retroactive logging for earlier releases.

1.6 (10 Feb 2014)
===

**Changes in 1.6.1:**

* The fix for [mse216760](http://meta.stackexchange.com/q/216760) caused a [regression](http://meta.stackexchange.com/q/221733) in the chat transcript view.  This has been fixed.

**New fixes in 1.6.0:**

* [mse136589: The monospace formatting in a spoiler quote on a beta site is evil](http://meta.stackexchange.com/q/136589) (CSS)
* [mse112305: Code samples inside of spoilers are still visible on some sites](http://meta.stackexchange.com/q/112305) (CSS)
* [mse110566: Does the spoiler markdown work on images?](http://meta.stackexchange.com/q/110566) (CSS)
* [mse217779: The CSS for spoilers is a mess. Let's fix it!](http://meta.stackexchange.com/q/217779) (*not* CSS only, supersedes above three fixes)
* [mse58760: &lt;kbd&gt; (yes, still &lt;kbd&gt;) doesn't play nice with lists](http://meta.stackexchange.com/q/58760) (CSS)
* [mse160338: Allow moderators to reply to a flag](http://meta.stackexchange.com/q/160338) (mod)
* [cs537: Missing MathJaX in the duplicate subtab of the close review queue](http://meta.cs.stackexchange.com/q/537) (math)

1.4 (24 Jan 2014)
===

**New fixes in 1.4.0:**

* [mse143973: Images can be pushed outside the boundaries of a post by using nested lists](http://meta.stackexchange.com/q/143973) (CSS)
* [mse217120: Ugly overflows when editing a deleted answer inline](http://meta.stackexchange.com/q/217120) (CSS)
* [mse145819: &lt;hr/&gt;'s do not get rendered in deleted answers](http://meta.stackexchange.com/q/145819) (CSS)
* [mse108046: Mouse cursor doesn't change to pointer when hovering “full site” on mobile](http://meta.stackexchange.com/q/108046) (CSS)
* [mse216760: The reply buttons in chat shouldn't reposition themselves on pinged messages](http://meta.stackexchange.com/q/216760) (CSS, chat)
* [mse134268: U+0008 inserted into chat @-pings](http://meta.stackexchange.com/q/134268) (chat)
* [mse78989: Clicking on tags broken?](http://meta.stackexchange.com/q/78989)
* [mse214706: The branch prediction answer is overflowing](http://meta.stackexchange.com/q/214706)
* [mse66646: Confirming context menu entries via Enter triggers comment to be posted](http://meta.stackexchange.com/q/66646)
* [mse210132: New top bar should render avatar with a transparent background](http://meta.stackexchange.com/q/210132)
* [mse150069: Can we have the "50 more" link return items of the same type, please?](http://meta.stackexchange.com/q/150069) 
* [math11392: MathJax preview broken when equations contain `\label`s](http://meta.math.stackexchange.com/q/11392) (math)

1.2 (17 Jan 2014)
===

**New fixes in 1.2.0:**

* [math4130: The scope of \newcommand is the entire page](http://meta.math.stackexchange.com/q/4130) (math)
* [mse114109: Background in OP's user name can obscure text in multiline comments](http://meta.stackexchange.com/q/114109) (CSS)
* [math11036: Can we have the suggested questions' titles parsed by default?](http://meta.math.stackexchange.com/q/11036) (math)

1.0 (12 Jan 2014)
===

**Fixes included in the 1.0.x branch:**

* [mse114636: All Stack Exchange sites in a small window causing display problems?](http://meta.stackexchange.com/q/114636) (CSS)
* [mse215473: Add a non-breaking space to “reopen (1)” and its ilk](http://meta.stackexchange.com/q/215473) (CSS)
* [mse155308: Ignoring somebody screws up the avatar list](http://meta.stackexchange.com/q/155308) (CSS, chat)
* [mse138685: Layout fix for Firefox in “Zoom text only” mode](http://meta.stackexchange.com/q/138685) (CSS)
* [mse207526: Cannot navigate into the multicollider with keyboard](http://meta.stackexchange.com/q/207526)
* [mse129593: Un-fade low-score answers on rollover or click](http://meta.stackexchange.com/q/129593)
* [mse104184: Allow flagging a comment after upvoting it](http://meta.stackexchange.com/q/104184)
* [mse215450: SSL breaks TeX rendering](http://meta.stackexchange.com/q/215450)
* [mse150069: Can we have the "50 more" link return items of the same type, please?](http://meta.stackexchange.com/q/150069) (10k)
* [mse209393: Render MathJax in the 10k tools](http://meta.stackexchange.com/q/209393) (10k)

   [github]: https://github.com/vyznev/soup "SOUP repository on GitHub"
