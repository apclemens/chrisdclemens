set PATH=%PATH%;C:\Program Files\Git\cmd
git pull origin master
python .\main.py
git add .
git commit -m "update content"
git push origin master