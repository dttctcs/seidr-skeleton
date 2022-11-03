from app import app

app.appbuilder.sm.add_user(
    "admin", "admin", "admin", "admin@for.bar", app.appbuilder.sm.find_role("Admin"), "admin"
)
app.run(host="0.0.0.0", port=6060, debug=True)
