

Домашнее задание
Разработка скрипта и проведение теста в k6.io

Цель:
Разрабатываем скрипт в средстве НТ, подготавливаем сценарий, проводим тест и анализируем результаты


Описание/Пошаговая инструкция выполнения домашнего задания:
======================================================================
===============Разработка скрипта======================================
======================================================================
Для выполнения скрипта необходимо зарегистрировать персонального пользователя на сайте
http://webtours.load-test.ru:1080/webtours/
Необходимо разработать скрипт, выполняющий следующие действия:

Открытие страницы http://webtours.load-test.ru:1080/webtours/
Вход в систему под вашим пользователем.
Переход на страницу "Flights", выбор случайного города отправления и прибытия.
Выбор случайного рейса по данному направлению из 4х предложенных
Покупка билета
Переход на корневую страницу
===================Проведение теста===================================
Необходимо создать 2 сценария (реализовать все в 1 файле - скрипте и выполняться они должны одновременно), содержащей по одному http запросу:
Первая открывает ya.ru
Вторая открывает www.ru
Необходимо подать следующую нагрузку:
В течение 5 минут разгоняемся до 100% профиля
В течение 10 минут подаём равномерную нагрузку в 100% профиля
В течение 5 минут разгоняемся до 120% профиля
В течение 10 минут подаём 120% профиля
100% профиля выглядит так:
ya.ru = 60 запросов в минуту
www.ru = 120 запросов в минуту
Задание:
Разработать нагрузочные тесты на k6 (webtours) и провести тестирование сайтов (ya.ru и www.ru) -> Результаты в Influx, ссылку на Grafana (можно приложить скриншоты с локального запуска) и архив скриптов/ссылку на репозиторий