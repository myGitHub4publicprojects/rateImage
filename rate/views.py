# -*- coding: utf-8 -*-
from django.views.generic.list import ListView
from django.http import JsonResponse
from rate.models import Image

class HomeView(ListView):
    model = Image
    template_name = 'index.html'

def edit(request, pk):
    rating = request.POST.get('rating')
    if rating:
        image = Image.objects.get(pk=pk)
        image.score_number += 1
        image.score_sum += int(rating)
        image.save()
        data = {'number': image.score_number,
                'score': image.get_rating(),
                'id': image.id}
        return JsonResponse(data)