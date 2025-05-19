from django.db import models


# Модель для Клиента
class Client(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    contact_info = models.CharField(max_length=255, verbose_name="Контактная информация")
    interaction_history = models.TextField(verbose_name="История взаимодействий")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"


# Модель для Сотрудника
class Employee(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    position = models.CharField(max_length=100, verbose_name="Должность")
    contact_info = models.CharField(max_length=255, verbose_name="Контактная информация")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Сотрудник"
        verbose_name_plural = "Сотрудники"


# Модель для Услуги
class Service(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    category = models.CharField(max_length=100, verbose_name="Категория")
    cost = models.FloatField(verbose_name="Стоимость")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"


# Модель для Проекта
class Project(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    deadline = models.DateTimeField(verbose_name="Сроки выполнения")
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, verbose_name="Сотрудник")
    budget = models.FloatField(verbose_name="Бюджет")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


# Модель для Кампании
class Campaign(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    goal = models.CharField(max_length=255, verbose_name="Цель")
    deadline = models.DateTimeField(verbose_name="Сроки выполнения")
    budget = models.FloatField(verbose_name="Бюджет")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Кампания"
        verbose_name_plural = "Кампании"


# Модель для Заявки
class Request(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, verbose_name="Клиент")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Проект")
    service \
        = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name="Услуга")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
    cost = models.FloatField(verbose_name="Стоимость", null=True, blank=True)

    def __str__(self):
        return f"Заявка от {self.client} на {self.service}"

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"


# Модель для Отчёта
class Report(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="Проект")
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, verbose_name="Кампания")
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, verbose_name="Сотрудник")
    performance_metrics = models.TextField(verbose_name="Показатель эффективности")
    financial_flow = models.TextField(verbose_name="Движение денежных средств")
    conclusions = models.TextField(verbose_name="Выводы и рекомендации")

    def __str__(self):
        return f"Отчёт по проекту {self.project} и кампании {self.campaign}"

    class Meta:
        verbose_name = "Отчёт"
        verbose_name_plural = "Отчёты"
