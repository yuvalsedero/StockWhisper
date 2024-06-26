# Generated by Django 4.0.4 on 2024-06-04 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=10, unique=True)),
                ('company_name', models.CharField(max_length=255)),
                ('current_price', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('historical_data', models.JSONField(blank=True, null=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
