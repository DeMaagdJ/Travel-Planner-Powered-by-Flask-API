from flask import Flask, render_template, request
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import datetime

conn = sqlite3.connect("/Users/Justin/Documents/Bootcamp_Home folder/Project_3_JD/project3.db")
conn.row_factory = sqlite3.Row

#QUERY HOTEL DATA
cur = conn.cursor()
cur.execute("SELECT Name FROM hotels_geo")
Hotel = cur.fetchall()

#QUERY AIRLINE DATA
cur2 = conn.cursor()
cur2.execute("SELECT Departure, Airline, Price FROM tickets")
Airline = cur2.fetchall()

#CODE DOES NOT WORK!
#cur3 = conn.cursor()
#cur3.execute("SELECT time, tvag_farh FROM meteostat_data" )
#time = []
#tvag_farh = []
#for row in cur.fetchall():
    #time.append(row[0])
    #tvag_farh.append(row[1])

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def hotel():
    return render_template('index.html', Hotel=Hotel, Airline= Airline)

#DO NOT UNHASH....CODE CAUSES APP TO CRASH
#@app.route('/graph')
#def graph():
    
   
    #plt.plot_date(time, tvag_farh)   
    #plt.title("Historical Temperature")
    #plt.show()







if __name__ == '__main__':
    app.run(debug = True)