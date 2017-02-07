# speed-log

CLI utility to test and log internet speed.

## Logging results

`speed-log log` - test current internet speed using `speedtest.net` and log results to local database.

## Reviewing results

`speed-log list [options]` - review saved test results.

Options:

* `-v, --verbose` - display extended result information
* `-d, --download [mbit]` - show only results where download speed is below this value
* `-u, --upload [mbit]` - show only results where upload speed is below this value
* `-p, --ping [ms]` - show only results where ping is above this value
