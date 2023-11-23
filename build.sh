#!/bin/bash

ssh_profile="root@agencyboz"
user="coope8746"
domain="cooperativasion.com.br"
subdomain="public_html"

path="/home/${domain}/${subdomain}"

yarn build
echo 'Uploading build to server'
scp -r dist/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
