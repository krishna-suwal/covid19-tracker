=== Covid19 Tracker ===
Contributors: krishnasuwal
Tags: covid, 19, covid19, stats, graph, table, map
Requires at least: 4.9
Tested up to: 5.5
Requires PHP: 5.6
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Allows you to embed covid 19 stats, map, graph etc on your website.

== Description ==

Allows you to embed covid 19 stats, map, graph etc on your website.

**FEATURES:**

* Show Covid 19 stats in map
* Show Covid 19 stats in graph
* Show Covid 19 stats in table

**SHORTCODES:**

* `c19t_map`
Show Covid 19 stats in map. Attributes: `title`

* `c19t_graph`
Show Covid 19 stats in graph. Currently only worldwide stats are shown. Attributes: `title`, `type`, `isincremental`.

- type: one of "cases", "recovered" and "deaths"
- isincremental: "yes" or "no". If "yes" is given, stat values will be incremental, otherwise it will show number of records for individual day.

* `c19t_table`
Show Covid 19 stats in a table with a list of countries. Attributes: `title`

== Installation ==

Go to Plugins > Add New > Search for the plugin and click install, or download and extract the plugin, and copy the the plugin folder into your wp-content/plugins directory and activate.
You can also upload the Zip file and install from your Plugins > Add New section.

== Frequently Asked Questions ==

= Can I contribute? =

Sure you can. Here's the GitHub [repository](https://github.com/krishna-suwal/covid19-tracker). Go ahead and create some PRs :)

== Changelog ==

= 1.0.0 - 2020-xx-xx =
* Initial Release