#!/bin/sh
npm run build
aws s3 sync build s3://webtoonguru-build-jjy
aws cloudfront create-invalidation \
    --distribution-id E2YWR897836OK8 \
    --paths "/*"
