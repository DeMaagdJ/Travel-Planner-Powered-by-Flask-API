from flask import Flask, render_template
import sqlite3


app = Flask(__name__)

def get_db():
    conn = sqlite3.connect("/Users/Justin/Documents/Bootcamp_Home folder/Project_3_JD/project3.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
@app.route('/index')
def index():
    sql ="SELECT Departure FROM tickets"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql)
    result= [dict(row) for row in cursor.fetchall()]
    conn.close()
    return result

@app.route('/hotel_loc')
def hotel():
    sql ="SELECT * FROM hotels_geo"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql)
    result= [dict(row) for row in cursor.fetchall()]
    conn.close()
    return result





if __name__ == '__main__':
    app.run(debug = True)