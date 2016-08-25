#!/usr/bin/perl
use strict;
use warnings;

# read input from SOUP.user.js if no input files are given on command line
push @ARGV, grep -f, "SOUP.user.js" unless @ARGV;

# build source file list for manifest (needs to be done before input loop)
my $sources = join ", ", map qq("$_"), @ARGV;
$sources =~ s/\.meta\.js"/.user.js"/g;

# skip input until start of metadata block
while (<>) {
	last if m(^// ==UserScript==\s*$);
}

# read metadata into hash of arrays
my %metadata;
while (<>) {
	last if m(^// ==/UserScript==\s*$);
	die "Unrecognized metadata line \"$_\"" unless m(^\s*//\s*\@(\S+)\s+(.*));
	push @{ $metadata{$1} }, $2;
}

# odd-numbered minor versions belong to the devel branch
my $version_name = $metadata{version}[0];
$version_name .= " (development)" if (split /\./, $version_name)[1] % 2 == 1;

# build URL match list for manifest
my $matches = join ",\n\t\t\t", map qq("$_"), @{ $metadata{match} };

# output manifest (TODO: escape JSON strings properly)
print <<"END";
{
	"manifest_version": 2,
	"name":		"$metadata{name}[0]",
	"short_name":	"SOUP",
	"description":	"$metadata{description}[0]",
	"author":	"$metadata{author}[0]",
	"version":	"$metadata{version}[0]",
	"version_name":	"$version_name",
	"homepage_url":	"$metadata{homepageURL}[0]",
	"icons": {
		"16":	"icon/SOUP_icon_16.png",
		"32":	"icon/SOUP_icon_32.png",
		"48":	"icon/SOUP_icon_48.png",
		"64":	"icon/SOUP_icon_64.png",
		"128":	"icon/SOUP_icon_128.png"
	},
	"content_scripts": [ {
		"js":        [ $sources ],
		"matches":   [
			$matches
		],
		"run_at":    "document_start"
	} ]
}
END

