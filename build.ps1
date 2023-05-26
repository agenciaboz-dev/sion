$user = "cooperativasion"
$subdomain = "public_html"
$path = "/home/$user/$subdomain"

yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* agenciaboz:/home/cooperativasion/public_html/
ssh -p 22022 agenciaboz "chown -R cooperativasion:cooperativasion /home/cooperativasion/public_html/*"
