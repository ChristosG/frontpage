#backend

docker build -t backend-image ./backend
docker run -it --rm -v $(pwd)/backend:/app backend-image bash
django-admin startproject backend .
python manage.py startapp users

docker compose build backend
docker compose run backend python manage.py makemigrations
docker compose run backend python manage.py migrate



#frontend
npx create-react-app frontend

yarn add axios react-router-dom
yarn add antd
yarn add react-hook-form @hookform/resolvers yup
yarn add js-cookie


#Build all
docker compose up --build
docker compose run backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser