yarn install && yarn run build --mode production
# yarn install && yarn run lint --no-fix && yarn run build --mode $ENV

$public_dir = '../AntiFraud/alchemy/web/public'
if (Test-Path $public_dir) {
    Remove-Item -r -fo $public_dir
}
mv dist $public_dir