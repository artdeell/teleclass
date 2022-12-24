from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('class', '0002_alter_child_parent'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Pizdos',
        ),
        migrations.AlterField(
            model_name='child',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='parent',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
