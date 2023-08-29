yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* agenciaboz:/home/cooperativasion/adesao.cooperativasion.com.br
ssh -p 22022 agenciaboz "chown -R cooperativasion:cooperativasion /home/cooperativasion/adesao.cooperativasion.com.br/*"
