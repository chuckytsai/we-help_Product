from flask import *
from markupsafe import escape
import mysql.connector
from flask import session
import urllib.parse as urlparse
from urllib.parse import parse_qs
from mysql.connector import Error
from flask_sqlalchemy import SQLAlchemy
import datetime
import json
import requests

app = Flask(
    __name__,
    static_folder="material",
    static_url_path="/OnedayTrip"
)

app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.secret_key ="aaa"

# SQL
db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    passwd="",
    db='taipeionday',
    charset='utf8')

cursor = db.cursor()

cursor.execute("SELECT * FROM information id")
dataTaipei = cursor.fetchall()

cursor.execute("SELECT * FROM userinfo id")
userInfo = cursor.fetchall()

# 刪除過期的預約
today=datetime.date.today()
cursor.execute("SELECT * FROM  booking ")
yetPay = cursor.fetchall()
for x in yetPay:
    if (x[4])<=str(today):
        cursor.execute("DELETE FROM  booking WHERE id='%s'" % (x[0]))
        db.commit()

# Pages
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")

@app.route("/booking")
def booking():
    return render_template("booking.html")

@app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")

# 要取得的分頁，每頁 12 筆資料
@app.route("/api/attractions")
def apiAttractions():
    page = request.args.get('page', 0)
    if request.args.get('keyword') == None:
        page=int(page)
        view=12
        viewData =view*page
        cursor.execute("SELECT * FROM information limit %s,%s",(viewData,view))
        dataTaipei = cursor.fetchall()
        dataArreys=[]
        for wantData in dataTaipei:
            nextPage = page+1
            data_dic = {
                "id": wantData[0],
                "name": wantData[1],
                "category": wantData[2],
                "description":wantData[3].decode("utf8"),
                "address":wantData[9],
                "transport": wantData[4].decode("utf8"),
                "mrt":wantData[5].decode("utf8"),
                "latitude": wantData[6],
                "longitude": wantData[7],
                "images":[wantData[8].decode("utf8")]
            }
            data = data_dic.copy()
            dataArreys.append(data)
            # print(nextPage)
        return json.dumps({"nextPage": nextPage,"data":dataArreys},ensure_ascii=False)

    else:
        return apiAttractionName()

# 尋找keyword
def apiAttractionName():
    searchText = request.args.get('keyword', '%%')
    searchText = str(searchText)
    page = request.args.get('page', 0)
    page=int(page)
    # dataRange(page)
    view=12
    viewData =view*page
    TaiStitle = "%"+searchText+"%"
    cursor.execute("SELECT * FROM information WHERE stitle LIKE %s limit %s,%s",(TaiStitle,viewData,view))
    dataTaipei = cursor.fetchall()
    dataArreys=[]
    for wantData in dataTaipei:
        nextPage = page+1
        data_dic = {
            "id": wantData[0],
            "name": wantData[1],
            "category": wantData[2],
            "description":wantData[3].decode("utf8"),
            "address":wantData[9],
            "transport": wantData[4].decode("utf8"),
            "mrt":wantData[5].decode("utf8"),
            "latitude": wantData[6],
            "longitude": wantData[7],
            "images":[wantData[8].decode("utf8")]
        }
        data = data_dic.copy()
        dataArreys.append(data)

    return json.dumps({"nextPage": nextPage,"data":dataArreys},ensure_ascii=False)

# 根據景點id
@app.route("/api/attraction/<attractionId>")
def apiAttraction(attractionId):
    TaiID = attractionId
    TaipeiID = 'SELECT id FROM information WHERE id= %(val)s'
    cursor.execute(TaipeiID, {'val': TaiID})
    TaipeiID = cursor.fetchall()
    TaiID = int(TaiID)-1
    if len(dataTaipei) < TaiID:
        return render_template("error.json")
    else:
        data = {
            "data": [
                {
                    "id": dataTaipei[TaiID][0],
                    "name": dataTaipei[TaiID][1],
                    "category": dataTaipei[TaiID][2],
                    "description":dataTaipei[TaiID][3].decode("utf8"),
                    "address":dataTaipei[TaiID][9],
                    "transport": dataTaipei[TaiID][4].decode("utf8"),
                    "mrt":dataTaipei[TaiID][5].decode("utf8"),
                    "latitude": dataTaipei[TaiID][6],
                    "longitude": dataTaipei[TaiID][7],
                    "images":
                        dataTaipei[TaiID][8].decode("utf8")
                    
                }
            ]
        }
        response = app.response_class(
            response=json.dumps(data, ensure_ascii=False),
            mimetype='application/json'
        )
        return response

# 使用者登入
@app.route("/api/user", methods=["GET", "POST", "PATCH", "DELETE"])
def loginPage():
	if request.method == "PATCH":
		userData = request.get_json()
		userEmail = userData['email']
		userPassword = userData['password']
		cursor.execute ("SELECT * FROM userInfo WHERE email = '%s'" % (userEmail))
		loginData = cursor.fetchone()
		# print ('測試',loginData[0],userPassword)
		try:
			if loginData != None:
				if userPassword == loginData[3]:
					session["userInfo"] = loginData[2]
					return jsonify ({
						"data": {
							"id": loginData[0],
							"name": loginData[1],
							"email": loginData[2]
						}
					}), 200
				else:
					return jsonify ({
						"error": True,
						"message": "輸入密碼錯誤"
					}), 400

		except:
			return jsonify ({
				"error": True,
				"message": "查無帳號"
			}), 500

	elif request.method == "POST":
		userData = request.get_json()
		userName = userData['name']
		userEmail = userData['email']
		userPassword = userData ['password']
		cursor.execute ("SELECT * FROM userInfo WHERE email = '%s'" % (userEmail))
		registerResult = cursor.fetchone()

		try:
			if registerResult == None:
				if len(userName)==0 or len(userEmail)==0 or len(userPassword)==0:
					return jsonify({
						"error": True,
						"message": "資料未正確"
					}),400
				else:
					cursor.execute("INSERT INTO userInfo(name, email, password) VALUES (%s, %s, %s)", (userName, userEmail, userPassword))
					db.commit()
					return jsonify({
						"ok": True,
						"message": "註冊成功"
					}),200

			else:
				return jsonify ({
					"error": True,
					"message": "Email已重複註冊過",
					}),400
				
			
		except:
			return jsonify ({
				"error": True,
				"message": "Error"
			}),500

	elif request.method == "GET":
		if "userInfo" in session:
			return jsonify({
				"data": True,
			})
		else:
			return jsonify({
				"data": None,
			})

	elif request.method == "DELETE":
		session.pop("userInfo", None)
		return jsonify({
			"ok": True,
		})

# 預約行程
@app.route("/api/booking", methods=["GET", "POST","DELETE"])
def wantBooking():
    if "userInfo" not in session:
        return jsonify({
			    "data": None,
           	    "message": "還未登入帳號"
		}),403

    if request.method=="POST":
        try:
            data=request.get_json()
            attractionid = data.get("attractionid")
            name = data.get("name")
            address = data.get("address")
            imges = data.get("imges")
            date = data.get("date")
            time = data.get("time")
            price = data.get("price")
            buyer = session["userInfo"]
            pay=data.get("payMoney")
            if len(name)==0 or len(address)==0 or len(imges)==0:
                return jsonify ({
			    "error": True,
                "message":"建立失敗,資料格式錯誤"
		        }),400
            cursor.execute("SELECT * FROM booking WHERE buyer= '%s' AND name='%s'" % (session["userInfo"],name))
            bookInfo = cursor.fetchall()
            if len(bookInfo)==0:
                cursor.execute("INSERT INTO booking (name,address,imges,date,time,price,attractionid,buyer,pay) VALUES (%s,%s, %s, %s, %s,%s, %s, %s,%s)",
                (name, address, imges, date,time,price,attractionid,buyer,pay))
                db.commit()
                return jsonify ({
			        "ok!": True,
			        }),200
            else:
                return jsonify ({
			       "error": True,
                   "message":"伺服器內部錯誤"
			        }),500
        except:
            cursor.execute("SELECT * FROM  booking WHERE buyer='%s' order by id desc LIMIT 1" % (session["userInfo"]))
            yetPay = cursor.fetchone()
            cursor.execute("SELECT * FROM  booking WHERE buyer= '%s'AND pay='no'" % (session["userInfo"]))
            DT = cursor.fetchall()
            if len(DT)<1:
                return jsonify ({
			    "no": True, 
                "message":'目前沒有預約任何行程',
                "user":session["userInfo"]
			}),200
            else:
                return jsonify ({
			    "ok": True,
                "message":DT,
                "yetPay":yetPay
			}),200
            
    elif request.method == "DELETE":
        cursor.execute("DELETE FROM  booking WHERE buyer='%s' order by id desc LIMIT 1" % (session["userInfo"]))
        db.commit()
        return jsonify ({
			"ok": True,
			}),200

@app.route("/api/orders", methods=["POST"])
def orders():
    data = request.get_json()
    prime = data["prime"]
    price = data["order"]["price"].split(" ")[1]
    urlId = data["order"]["trip"]["attraction"]["id"]
    attName = data["order"]["trip"]["attraction"]["name"]
    attAddress = data["order"]["trip"]["attraction"]["address"]
    attImg = data["order"]["trip"]["attraction"]["image"]
    date = data["order"]["trip"]["date"]
    time = data["order"]["trip"]["time"]
    name = data["order"]["contact"]["name"]
    phone = data["order"]["contact"]["phone"]
    email = data["order"]["contact"]["email"]

    try:
        if "memberEmail" in session:

            header = {
                "content-type": "application/json",
                "x-api-key": "partner_OtrrpSMtKFJs2sLwOinIlalAmvGfNQK5q96S6LOSlD80RMEMNZ8hVvs6"
            }

            body = {
                "prime": prime,
                "partner_key": "partner_OtrrpSMtKFJs2sLwOinIlalAmvGfNQK5q96S6LOSlD80RMEMNZ8hVvs6",
                "merchant_id": "家裡宅有限公司",
                "details": json.dumps({
                    "id": urlId,
                    "date": date,
                    "time": time
                }),
                "amount": price,
                "cardholder": {
                    "phone_number": phone,
                    "name": name,
                    "email": email,
                },
            }

            r = requests.post("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",
                              data=json.dumps(body), headers=header)
            result = json.loads(r.text)
            print(result)

            if result["status"] == 0:
                return jsonify({
                    "data": {
                        "number": result["bank_transaction_id"],
                        "payment": {
                            "status": 0,
                            "message": "付款成功"
                        }
                    }
                }), 200
            else:
                return jsonify({
                    "error": True,
                    "message": "訂單建立失敗"
                })
        else:
            return jsonify({
                "error": True,
                "message": "未登入系統, 拒絕存取"
            }), 403
    except:
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500

@app.route("/api/order/<orderNumber>", methods=["GET"])
def orderNumber(orderNumber):

    header = {
        "content-type": "application/json",
        "x-api-key": "partner_OtrrpSMtKFJs2sLwOinIlalAmvGfNQK5q96S6LOSlD80RMEMNZ8hVvs6"
    }

    body = {
        "partner_key": "partner_OtrrpSMtKFJs2sLwOinIlalAmvGfNQK5q96S6LOSlD80RMEMNZ8hVvs6"
    }

    x = requests.post("https://sandbox.tappaysdk.com/tpc/transaction/query",
                      data=json.dumps(body), headers=header)
    res = json.loads(x.text)
    # print(res)

    transactionList = res["trade_records"]
    theOne = next(
        item for item in transactionList if item["bank_transaction_id"] == orderNumber)
    # print(theOne)

    orderId = json.loads(theOne["details"])["id"]
    cursor.execute("SELECT * FROM information WHERE id = '%s'" % (orderId))
    orderResult = cursor.fetchone()
    # print(orderResult)

    if "memberEmail" in session:
        return jsonify({
            "data": {
                "price": theOne["amount"],
                "trip": {
                    "id": json.loads(theOne["details"])["id"],
                    "name": orderResult[1],
                    "address": orderResult[4],
                    "image": orderResult[9].split(",")[0]
                },
                "date": json.loads(theOne["details"])["date"],
                "time": json.loads(theOne["details"])["time"]
            },
            "contact": {
                "name": theOne["cardholder"]["name"],
                "email": theOne["cardholder"]["email"],
                "phone": theOne["cardholder"]["phone_number"]
            },
            "status": theOne["record_status"]
        }),200

    else:
        return jsonify({
            "error": True,
            "message": "未登入系統，拒絕存取"
        }),403
        
app.run(port=3000,debug=True)




