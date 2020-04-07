#!/usr/bin/env python3

import urllib3
from bs4.element import Tag
from bs4 import BeautifulSoup

URL = "https://steamdb.info/app/891390/info/"

def get_soup() -> BeautifulSoup:
    http = urllib3.PoolManager()
    request = http.request("GET", URL)

    return BeautifulSoup(request.data, features="lxml")

def get_whitelist_table(soup: BeautifulSoup) -> Tag:
    selector = "h2:contains('SteamPlay App Mappings')+div.table-responsive"

    return soup.select(selector)[0].find("table")

def get_whitelisted_appids(table: Tag) -> list:
    rows = table.find("tbody").find_all("tr")

    appids = []

    for row in rows:
        cells = row.find_all("td")
        appids.append(cells[0].get_text())

    return appids

def write_file(appids: list):
    with open("whitelist.js", mode="w") as file:
        file.write("// SteamPlay Whitelist\n")
        file.write("whitelist = [\n")

        for appid in appids:
            file.write(f"{appid},\n")

        file.write("]")

if __name__ == "__main__":
    table = get_whitelist_table(get_soup())
    appids = get_whitelisted_appids(table)

    write_file(appids)