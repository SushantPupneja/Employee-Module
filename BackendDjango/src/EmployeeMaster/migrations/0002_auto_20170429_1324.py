# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-29 13:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeMaster', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='lastname',
            new_name='lastName',
        ),
        migrations.AlterField(
            model_name='employee',
            name='pin_code',
            field=models.CharField(max_length=20),
        ),
    ]