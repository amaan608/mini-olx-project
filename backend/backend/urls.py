"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
# These two imports are essential for serving media files
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import (
    MyTokenObtainPairView, 
    UserCreate, 
    ProductListCreate, 
    ProductDetail
)

# This is the list of your API endpoints
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', UserCreate.as_view(), name='user_create'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/products/', ProductListCreate.as_view(), name='product_list_create'),
    path('api/products/<int:pk>/', ProductDetail.as_view(), name='product_detail'),
]

# This is the crucial part that was missing or incorrect.
# It tells Django: "In development mode, serve the files from the media folder."
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)