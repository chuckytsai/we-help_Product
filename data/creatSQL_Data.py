import json
import mysql.connector
from flask_sqlalchemy import SQLAlchemy

# 讀取Json檔案
with open("data/taipei-attractions.json", mode="r" ,encoding="utf-8")as file:
    data = json.load(file)

db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    passwd="pm2021pm",
    db='taipeionday',
    charset='utf8')

cursor = db.cursor()


# 創建
for wantIndex in range(len(data["result"]["results"])):
    PicList=[]
    for urlSeclect in range(len(data["result"]["results"][wantIndex]["file"].split('http://'))): # 撈到全部景點照片網址
        PicUrl = data["result"]["results"][wantIndex]["file"].split('http://')[urlSeclect]
        textJPG = ".JPG"
        textjpg = ".jpg"
        textpng = ".png"
        textPNG = ".PNG"
        if PicUrl.endswith(textjpg):
            PicList.append(PicUrl)
        elif PicUrl.endswith(textJPG):
            PicList.append(PicUrl)
        elif PicUrl.endswith(textpng):
            PicList.append(PicUrl)
        elif PicUrl.endswith(textPNG):
            PicList.append(PicUrl)
        else :
            continue
    ID = data["result"]["results"][wantIndex]["_id"]  # 景點id
    stitle = data["result"]["results"][wantIndex]["stitle"]  # 景點名稱
    cat2 = data["result"]["results"][wantIndex]["CAT2"]  # 景點CAT2
    xbody = data["result"]["results"][wantIndex]["xbody"]  # 景點xbody
    address = data["result"]["results"][wantIndex]["address"]  # 景點address
    info = data["result"]["results"][wantIndex]["info"]  # 景點info
    MRT = data["result"]["results"][wantIndex]["MRT"]  # 景點捷運站
    latitude = data["result"]["results"][wantIndex]["latitude"]  # 景點緯度
    longitude = data["result"]["results"][wantIndex]["longitude"]  # 景點經度
    sql = "INSERT INTO information(ID, stitle, CAT2, xbody, info, MRT, address, latitude, longitude , PicUrl) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (str(ID), str(stitle), str(cat2), str(xbody), str(address), str(info), str(MRT), str(latitude), str(longitude), str(PicList))
    cursor.execute(sql, val)
    db.commit()

# 查看 表單全部值
cursor.execute("SELECT id FROM information")
myresult=cursor.fetchall()


