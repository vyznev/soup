![](https://i.stack.imgur.com/IzzhJ.png "SOUP logo")

The [Stack Overflow Unofficial Patch (SOUP)][SA] is a project to collect various minor client-side bug fixes, work-arounds and usability improvements for [Stack Overflow][SO] and other Q&A sites on the [Stack Exchange Network][SE] into a single user script.

The intent of SOUP is not to make any substantial or controversial changes to the Stack Exchange user interface, but to fix minor problems and omissions that the SE developers have overlooked or haven't got around to fixing yet.  By combining these minor patches into a single user script, they become easier to install and maintain.


Installing
----------

SOUP can be installed either as a stand-alone browser extension or via a user script manager such as [Greasemonkey][GM], [Tampermonkey][TM] or [Violentmonkey][VM].

SOUP has been mainly developed and tested on Firefox and Chrome.  It may also run on other browsers with user script support (via Tampermonkey or other compatible extensions), but has not been fully tested on them.  Any reports of cross-browser issues are welcome.


### Installing as a browser extension

Users of Chrome or Firefox (including Firefox Mobile) can install SOUP as a browser extension:

* [**SOUP on Firefox Add-ons**][firefox-ext]
* [**SOUP on Chrome Web Store**][chrome-ext]

Note that updates to the extension packages available at Firefox Add-ons and Chrome Web Store may take a few days to appear, even after a new stable user script version is released, due to review and other delays.


### Installing as a user script

To install SOUP as a user script, you first need to install a  user script manager such as [Greasemonkey][GM] (for Firefox), [Tampermonkey][TM] or [Violentmonkey][VM].  (Other Greasemonkey compatible user script managers should also work.)  After installing the extension, clicking the ["download / install"][DL] button below should bring up a dialog asking you if you want to install SOUP.  Answer "yes".

> ### [<kbd>Download / Install SOUP</kbd>][DL]  
> <sup>[View source][source] / [List of fixes][fixes] / [Change log][changes] / [GitHub repo][github]</sup>

> <sup>NOTE: Tampermonkey on Chrome may suffer from [a race condition](https://github.com/Tampermonkey/tampermonkey/issues/211) that can cause some fixes that rely on early loading to fail to apply properly.  To avoid this, you should either use the stand-alone [SOUP Chrome extension][chrome-ext] or set Inject Mode to "Instant" in Tampermonkey preferences (in the Experimental section, only visible when Config Mode is set to "Advanced" above).  Other user script managers on Chrome may also be subject to similar issues.</sup>


### Installing the development version

If you like living on the edge, you can also install the development version of SOUP, which gets all the latest fixes and updates as soon as they're written.  Of course, it also gets all the latest bugs, too.  If you do install the development version, please report any bugs or regressions you may find in it below!

> ### [<kbd>Download / Install SOUP (development branch)</kbd>][devDL]  
> <sup>[View source][devsrc] / [List of fixes][devfixes] / [Change log][devchanges] / [GitHub repo][devel]</sup>

Note that the development version of SOUP is currently only available as a user script.


Included fixes
--------------

The list of issues fixed by the latest version of SOUP is [available on GitHub][fixes] (also [for the development branch][devfixes]).  You can also browse the [change log][changes] ([development][devchanges]) to see which fixes have been added and removed in recent versions of SOUP.


License
-------

SOUP is distributed under the [ISC license][ISC], a permissive BSD-style open source license.

In addition, permission is given to Stack Exchange, Inc. to make use of SOUP code in any way they see fit, including but not limited to incorporating all or parts of it within the Stack Exchange codebase, with or without credit.

SOUP includes a copy of the [punycode.js](https://mths.be/punycode) library v1.2.4 by [Mathias Bynens](https://mathiasbynens.be/), distributed under the [MIT license][MIT].  The additional permissions granted above do not apply to this library.


Credits
-------

SOUP is currently maintained by [Ilmari Karonen][vyznev].  Some of the fixes are based on suggestions or earlier user scripts made by others; see the [source code][source] and/or the meta.SO links above for details.


Contributing
------------

If you know a user script or stylesheet patch for SO or other SE sites that would be suitable for inclusion in SOUP, or an unfixed issue that you believe might be worth patching, please let me know (e.g. by posting a comment or an answer the [SOUP page on Stack Apps][SA]).

If you'd like to help me out by contributing new fixes directly to SOUP, the [SOUP wiki on GitHub][wiki] has some useful tips.  Any and all contributions will be appreciated!


See also
--------

* [SE Chat Modifications — Keyboard navigation and commands for chat](https://stackapps.com/questions/2105/se-chat-modifications-keyboard-navigation-and-commands-for-chat)
* [Stack Overflow Extras (SOX)](https://stackapps.com/q/6091)
* ...and other [popular user scripts on Stack Apps](https://stackapps.com/?tab=scripts)


   [SO]: https://stackoverflow.com/ "Stack Overflow"
   [SE]: https://stackexchange.com/ "Stack Exchange Network"
   [github]: https://github.com/vyznev/soup "SOUP repository on GitHub"
   [DL]: https://github.com/vyznev/soup/raw/master/SOUP.user.js "Download / install SOUP from GitHub"
   [source]: https://github.com/vyznev/soup/blob/master/SOUP.user.js "View SOUP source code"
   [fixes]: https://github.com/vyznev/soup/blob/master/CONTENTS.md "List of fixes in the latest stable version of SOUP on GitHub"
   [changes]: https://github.com/vyznev/soup/blob/master/CHANGELOG.md "SOUP change log on GitHub"
   [devel]: https://github.com/vyznev/soup/tree/devel "SOUP development branch on GitHub"
   [devDL]: https://github.com/vyznev/soup/raw/devel/SOUP.user.js "Download / install SOUP (development branch) from GitHub"
   [devsrc]: https://github.com/vyznev/soup/blob/devel/SOUP.user.js "View SOUP development branch source code"
   [devfixes]: https://github.com/vyznev/soup/blob/devel/CONTENTS.md "List of fixes in the latest development version of SOUP on GitHub"
   [devchanges]: https://github.com/vyznev/soup/blob/devel/CHANGELOG.md "SOUP development branch change log on GitHub"
   [wiki]: https://github.com/vyznev/soup/wiki "SOUP wiki on GitHub"
   [GM]: https://addons.mozilla.org/firefox/addon/greasemonkey/ "Mozilla add-ons: Greasemonkey"
   [TM]: https://tampermonkey.net/ "Tampermonkey"
   [VM]: https://violentmonkey.github.io/about/ "Violentmonkey"
   [vyznev]: https://meta.stackexchange.com/users/174699/ilmari-karonen "User Ilmari Karonen - Meta Stack Exchange"
   [SA]: https://stackapps.com/questions/4486/stack-overflow-unofficial-patch "Stack Overflow Unofficial Patch on Stack Apps"
   [firefox-ext]: https://addons.mozilla.org/en-US/firefox/addon/so-unofficial-patch-soup/ "SOUP on Firefox Add-ons"
   [chrome-ext]: https://chrome.google.com/webstore/detail/stack-overflow-unofficial/bagdnnmjfkaolcegcgeohpboeocfalpj "SOUP on Chrome Web Store"
   [ISC]: https://opensource.org/licenses/ISC "ISC license text at the Open Source Initiative"
   [MIT]: https://opensource.org/licenses/ISC "MIT license text at the Open Source Initiative"
