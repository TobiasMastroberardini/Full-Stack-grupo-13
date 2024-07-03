class Cart:
    def __init__(self, id, user_id, estado=None):
        self.id = id
        self.user_id = user_id
        self.estado = estado

    @staticmethod
    def from_dict(data):
        return Cart(
            id=data.get('id'),
            user_id=data.get('user_id'),
            estado=data.get('estado')
        )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'estado': self.estado
        }