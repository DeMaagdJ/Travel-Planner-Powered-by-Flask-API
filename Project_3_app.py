from flask import Flask, render_template
import sqlite3


app = Flask(__name__)

def get_db():
    conn = sqlite3.connect('project3.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
@app.route('/index')
def index():
    sql ="SELECT Name FROM hotels_geo"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql)
    result= [dict(row) for row in cursor.fetchall()]
    conn.close()
    return result



if __name__ == '__main__':
    app.run(debug = True)