#!/usr/bin/env sh

EXT_NAME="ProtonDB-for-Steam"
EXT_VERSION=$(jq --raw-output .version src/manifest.json)

cd src/ || exit
zip -r "../${EXT_NAME}-${EXT_VERSION}.zip" ./*