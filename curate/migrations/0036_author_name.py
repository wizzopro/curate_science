# Generated by Django 2.1.7 on 2019-02-26 03:57

from django.db import migrations, models

def touch_authors(apps, schema_editor):
    Author = apps.get_model('curate', 'Author')
    for instance in Author.objects.all():
        instance.name = ' '.join(
            [x for x in [instance.first_name, instance.middle_name, instance.last_name]
             if x is not None]
        )
        instance.save() # Will trigger name update

class Migration(migrations.Migration):

    dependencies = [
        ('curate', '0035_auto_20190224_2214'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='name',
            field=models.CharField(null=True, blank=True, max_length=255),
        ),
        migrations.RunPython(
            touch_authors,
            migrations.RunPython.noop,
        )
    ]
