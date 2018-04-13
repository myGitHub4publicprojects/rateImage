# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Image(models.Model):
    url = models.URLField()
    score_number = models.IntegerField()
    score_sum = models.IntegerField()
    def get_rating(self):
        res = float(self.score_sum) / self.score_number
        return round(res, 1)
