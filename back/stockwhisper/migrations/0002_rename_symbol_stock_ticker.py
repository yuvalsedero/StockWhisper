# Generated by Django 4.0.4 on 2024-06-05 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stockwhisper', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stock',
            old_name='symbol',
            new_name='ticker',
        ),
    ]
