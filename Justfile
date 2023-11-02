steam_url := "https://store.steampowered.com/app/1817070/Marvels_SpiderMan_Remastered"

release-zip:
  bin/zip_for_release.sh

lint:
  npx web-ext lint --source-dir ./src

run:
  npx web-ext run -t firefox-desktop --source-dir ./src --url {{ steam_url }}
