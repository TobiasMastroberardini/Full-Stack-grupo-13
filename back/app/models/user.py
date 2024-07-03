class User:
    def __init__(self, user_id, name, last_name, phone, email, password, is_admin):
        self.user_id = user_id
        self.name = name
        self.last_name = last_name
        self.phone = phone
        self.email = email
        self.password = password
        self.is_admin = is_admin

    @staticmethod
    def from_dict(data):
        return User(
            user_id=data.get('user_id'),
            name=data.get('name'),
            last_name=data.get('last_name'),
            phone=data.get('phone'),
            email=data.get('email'),
            password=data.get('password'),
            is_admin=data.get('is_admin')
        )

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'last_name': self.last_name,
            'phone': self.phone,
            'email': self.email,
            'password': self.password,
            'is_admin': self.is_admin
        }