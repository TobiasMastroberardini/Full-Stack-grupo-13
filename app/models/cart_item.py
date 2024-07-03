
class CartItem:
    def __init__(self, cart_items_id, cart_id, product_id, quantity):
        self.cart_items_id = cart_items_id
        self.cart_id = cart_id
        self.product_id = product_id
        self.quantity = quantity

    @staticmethod
    def from_dict(data):
        return CartItem(
            cart_items_id=data.get('cart_items_id'),
            cart_id=data.get('cart_id'),
            product_id=data.get('product_id'),
            quantity=data.get('quantity')
        )

    def to_dict(self):
        return {
            'cart_items_id': self.cart_items_id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }