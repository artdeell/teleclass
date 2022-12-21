from django.db import models as djmodels

def create_obj(mod: djmodels, **qwargs):
    new_mod = mod(**qwargs)
    new_mod.save()
    return new_mod

def search_obj(mod: djmodels, **qwargs):
    search = mod.objects.filter(**qwargs)
    if len(search) == 0:
        return None
    return search