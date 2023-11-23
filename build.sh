#!/bin/bash

ssh_profile="root@agencyboz"
user="coope8746"
domain="cooperativasion.com.br"
subdomain="adesao.cooperativasion.com.br"

path="/home/${domain}/${subdomain}"

yarn build
echo 'Uploading build to server'
scp -r build/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
