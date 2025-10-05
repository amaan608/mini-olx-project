from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    title = models.CharField(max_length=255) # [cite: 25]
    description = models.TextField() # [cite: 25]
    price = models.DecimalField(max_digits=10, decimal_places=2) # [cite: 25]
    category = models.CharField(max_length=100) # [cite: 25]
    image = models.ImageField(upload_to='products/', null=True, blank=True) # [cite: 25]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products') # [cite: 25]
    created_at = models.DateTimeField(auto_now_add=True) # [cite: 25]
    updated_at = models.DateTimeField(auto_now=True) # [cite: 25]

    def __str__(self):
        return self.title
