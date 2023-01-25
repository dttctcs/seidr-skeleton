from app import app

user = app.appbuilder.sm.find_user(username="admin")
if not user:
    app.appbuilder.sm.add_user(
        username="admin",
        first_name="admin",
        last_name="admin",
        email="admin@for.bar",
        role=app.appbuilder.sm.find_role("Admin"),
        password="admin"
    )
app.run(host="0.0.0.0", port=6060, debug=True)
