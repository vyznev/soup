Stack Overflow Unofficial Patch
===============================

The Stack Overflow Unofficial Patch (SOUP) is a collection of minor client-side bugfixes, work-arounds and usability improvements for [Stack Overflow][SO] and other Q&A sites on the [Stack Exchange Network][SE].

The purpose of this script is not to make any substantial or controversial changes to the Stack Exchange user interface, but to fix minor problems and omissions that the SE developers have overlooked or haven't got around to fixing yet.  By combining these minor patches into a single user script, they become easier to install and maintain.


Installing
----------

### [<kbd>Download / Install</kbd>][DL] ###
[View source][source]

SOUP is currently supported on Mozilla Firefox and Google Chrome.  It may work on other browsers with compatible user script functionality &mdash; if you get it working, please let me know (and, if necessary, send a patch).

**Firefox:**

To use user scripts like SOUP with Firefox, you need the [GreaseMonkey][GM] add-on (or another add-on that provides the same functionality).

1. Install [GreaseMonkey][GM], if you don't have it already.
2. Click the [download / install][DL] link.  GreaseMonkey should ask if you want to install the user script.  Answer "yes".

**Chrome:**

Chrome supports user scripts out of the box, but in its default configuration refuses to install them directly from sites other than the Chrome Web Store.  Since SOUP is not (yet!) available via the Web Store, a workaround is needed:

1. Click the [download / install][DL] link.  Normally, Chrome should refuse to install the script, and will download it instead.
2. Open the [extensions page][chrome-ext] and drag and drop the downloaded script into it (either from the downloads bar or from your downloads folder).  Chrome should now ask if you want to install it.  Answer "yes".

Alternatively, you can use a Chrome extension like [Tampermonkey][TM], which will allow you to install SOUP directly from the [download / install][DL] page.


Included fixes
--------------

Currently, SOUP includes fixes or workarounds for the following issues:

* [All Stack Exchange sites in a small window causing display problems?](http://meta.stackoverflow.com/q/114636) ([CSS][CSS])
* [Add a non-breaking space to “reopen (1)” and its ilk](http://meta.stackoverflow.com/q/215473) ([CSS][CSS])
* [Ignoring somebody screws up the avatar list](http://meta.stackoverflow.com/q/155308) ([CSS][CSS], [chat][chat])
* [Layout fix for Firefox in “Zoom text only” mode](http://meta.stackoverflow.com/q/138685) ([CSS][CSS])
* [Cannot navigate into the multicollider with keyboard](http://meta.stackoverflow.com/q/207526)
* [Un-fade low-score answers on rollover or click](http://meta.stackoverflow.com/q/129593)
* [Allow flagging a comment after upvoting it](http://meta.stackoverflow.com/q/104184)
* [Can we have the "50 more" link return items of the same type, please?](http://meta.stackoverflow.com/q/150069) ([10k][10k])
* [Render MathJax in the 10k tools](http://meta.stackoverflow.com/q/209393) ([10k][10k])

Notes:

* <b id="note-css">CSS</b>: This is a pure CSS fix.  It will be applied even if site JavaScript is disabled.
* <b id="note-chat">chat</b>: This fix applies to the [Stack Exchange Network chat](http://chat.stackexchange.com "Stack Exchange Network chat").
* <b id="note-10k">10k</b>: This fix applies to the "moderator tools" interface available to users with 10,000+ rep (3,000+ on beta sites).


Credits
-------

SOUP is maintained by [Ilmari Karonen][vyznev].  Several of the fixes are based on suggestions or earlier user scripts made by others; see the [source code][source] and/or the meta.SO links above for details.


   [SO]: http://stackoverflow.com/ "Stack Overflow"
   [SE]: http://stackexchange.com/ "Stack Exchange Network"
   [DL]: https://github.com/vyznev/soup/raw/master/SOUP.user.js "Download / install SOUP from GitHub"
   [source]: https://github.com/vyznev/soup/blob/master/SOUP.user.js "View SOUP source code"
   [GM]: https://addons.mozilla.org/firefox/addon/greasemonkey/ "Mozilla add-ons: GreaseMonkey"
   [TM]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Chrome Web Store: Tampermonkey"
   [chrome-ext]: https://support.google.com/chrome/answer/187443 "Chrome > Help > Manage your extensions"
   [CSS]: #note-css "This is a pure CSS fix.  It will be applied even if site JavaScript is disabled."
   [chat]: #note-chat "This fix applies to the Stack Exchange Network chat (chat.stackexchange.com)."
   [10k]: #note-10k " This fix applies to the "moderator tools" interface available to users with 10,000+ rep (3,000+ on beta sites)."
   [vyznev]: http://meta.stackoverflow.com/users/174699/ilmari-karonen "User Ilmari Karonen - Meta Stack Overflow"
