#!/usr/bin/perl
use strict;
use warnings;
use JSON qw(decode_json);

my $archive = shift || "soup-browser-extension.zip";
my $manifest = "manifest.json";

open my $fh, '<:raw', $manifest  or die "Cannot open $manifest: $!\n";
my $json = do { local $/; <$fh> };
my $data = decode_json( $json );

# build list of files to include
my @files = ($manifest);
foreach my $script ( @{ $data->{content_scripts} } ) {
	push @files, @{ $script->{js} }   if $script->{js};
	push @files, @{ $script->{css} }  if $script->{css};
}
push @files, values %{ $data->{icons} }   if $data->{icons};

# run zip command to create archive
warn "Building $archive from: @files\n";
exec "zip", $archive, @files or die "Failed to execute zip: $!\n";

