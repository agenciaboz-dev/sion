yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* root@agenciaboz.com.br:/home/cooperativasion/public_html/
ssh -p 22022 root@agenciaboz.com.br "chown -R cooperativasion:cooperativasion /home/cooperativasion/public_html/*"
