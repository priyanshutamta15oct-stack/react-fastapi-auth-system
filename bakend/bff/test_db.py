import sqlite3

conn = sqlite3.connect("auth.db")

cursor = conn.cursor()

cursor.execute("SELECT * FROM users")

print(cursor.fetchall())

conn.close()