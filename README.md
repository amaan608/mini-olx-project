# mini-olx-project
SWC_recruitment_task
1.Download the zip, extract.
2.Open the mini-olx-project folder in VS code
3.Open terminal , cd backend , create virtual environment( python -m venv venv  ) and activate virtual environment( .\venv\Scripts\Activate  ).
4.Install dependencies for backend ( pip install -r requirements.txt).
5.Run  python manage.py migrate ,  python manage.py makemigrations , python manage.py runserver to start the backend
6.Open another terminal , cd frontend , run npm install and then npm start.

Note:if you try to open the  http://127.0.0.1:8000/ in browser, it will show a 404 page because my backend don't have a homepage , homepage is set in frontend , you can see the admin panel on  http://127.0.0.1:8000/admin.

