# Generated by Django 5.0.6 on 2024-06-06 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockwhisper', '0006_alter_stock_period'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='company_name',
            field=models.CharField(default='', max_length=255),
        ),
    ]
