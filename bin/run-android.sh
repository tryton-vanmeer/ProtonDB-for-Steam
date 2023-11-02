#!/usr/bin/bash

id="$(adb devices | tail -2 | head -1 | cut -f 1)"

npx web-ext run --target firefox-android --source-dir ./src --android-device "$id"
