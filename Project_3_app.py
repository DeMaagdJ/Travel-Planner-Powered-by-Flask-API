from flask import Flask, render_template
import sqlite3
from flask_cors import CORS


app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": ["http://localhost:8001"]}})

def get_db():
    conn = sqlite3.connect("./project3.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/', methods=['GET', 'POST'])
def base():
    hotels = get_hotels()
    tickets = get_tickets()
    return render_template("index.html", hotels=hotels, tickets=tickets)

def get_hotels():
    sql ="SELECT * FROM hotels_geo"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql)
    result= [dict(row) for row in cursor.fetchall()]
    conn.close()
    return result

def get_tickets():
    sql ="SELECT * FROM tickets"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql)
    result= [dict(row) for row in cursor.fetchall()]
    conn.close()
    return result

if __name__ == '__main__':
    app.run(debug = True, port=8001)