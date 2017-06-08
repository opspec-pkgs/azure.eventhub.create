#!/usr/bin/env sh

echo "installing deps"
apk -U add gettext

case "$sku" in
          Basic)
            export sku=1
            ;;
          Standard)
            export sku=2
            ;;
        esac

echo "substituting environment variables in parameters file"       
cat /parametersTemplate.json | envsubst > /parameters.json