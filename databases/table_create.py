import sqlite3
import os

# Create and verify the "prescripts" database and table
def create_prescripts_db():
    db_path = "prescripts.db"
    if not os.path.exists(db_path):
        print(f"Creating database file: {db_path}")
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS prescripts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number INTEGER,
            name TEXT,
            medicine TEXT,
            dosage TEXT,
            frequency TEXT
        )
    """)

    connection.commit()
    connection.close()

# Create and verify the "diagnosis" database and table
def create_diagnosis_db():
    db_path = "diagnosis.db"
    if not os.path.exists(db_path):
        print(f"Creating database file: {db_path}")
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS diagnosis (
            datetime TEXT,
            diagnosis TEXT,
            image_file TEXT,
            status TEXT
        )
    """)

    connection.commit()
    connection.close()

# Check if database files are created
def verify_db_files():
    for db_name in ["prescripts.db", "diagnosis.db"]:
        if os.path.exists(db_name):
            print(f"{db_name} exists in the directory.")
        else:
            print(f"ERROR: {db_name} does not exist!")

# Run the functions
create_prescripts_db()
create_diagnosis_db()
verify_db_files()