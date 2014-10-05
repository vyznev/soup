#!/usr/bin/perl
use strict;
use warnings;

push @ARGV, grep -f, "SOUP.user.js" unless @ARGV;
my $sourcefile = join(" and ", @ARGV) || "the main user script";

while (<>) {
	next unless m(^// ==UserScript==\s*$) .. m(^// ==/UserScript==\s*$);
	print if m(^\s*//\s*(\@|==));
}

print "\n", <<"END";
// This metadata block is automatically extracted from $sourcefile.
// Any changes made to it will be overridden by extract-metadata.pl.
END
