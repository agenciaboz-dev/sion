yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* root@agenciazop.com.br:/home/sbop/app.sbop.com.br/
ssh -p 22022 root@agenciazop.com.br "chown -R sbop:sbop /home/sbop/app.sbop.com.br/*"