release-zip:
  bin/zip_for_release.sh

lint:
  npx web-ext lint --source-dir ./src
