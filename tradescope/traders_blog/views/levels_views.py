from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator

from traders_blog.models import LevelSpotBybit, LevelsTag
# Create your views here.

def get_home(request):
    return render(
        request,
        'traders_blog/index.html',
        context={
            'title': 'Главная страница',
            'active_page': 'home'
        }
    )

def level_detail(request, id):
    level = get_object_or_404(LevelSpotBybit, pk=id)
    return render(
        request,
        'traders_blog/levels/level_details.html',
        {
            'level': level,
            'active_page': 'levels'
        }
    )

def levels_list(request):
    instrument = request.GET.get('instrument')
    tags = request.GET.getlist('tags')

    if instrument and tags:
        levels_list = (LevelSpotBybit.objects
                  .filter(instrument__symbol=instrument)
                  .filter(tags__name__in=tags))
        levels_tags = LevelsTag.objects.filter(name__in=tags)
    elif instrument:
        levels_list = LevelSpotBybit.objects.filter(
            instrument__symbol=instrument
        )
        levels_tags = LevelsTag.objects.filter(
            instruments__in=levels_list
        ).distinct()
    else:
        levels_list = LevelSpotBybit.objects.all()
        levels_tags = LevelsTag.objects.all()

    paginator = Paginator(levels_list, 4)
    page_number = request.GET.get('page', 1)
    levels = paginator.page(page_number)

    #получаем общее количество страниц
    total_pages = paginator.num_pages
    # получаем текущую страницу
    current_page = levels.number

    start_page = max(current_page - 1, 1) # 1
    end_page = min(start_page + 2, total_pages) # 2

    # корректировка если мы в конце
    if end_page - start_page < 2 and start_page > 1:
        start_page = max(end_page - 2, 1)

    page_range = range(start_page, end_page + 1)

    if total_pages <=3:
        page_range = range(1, total_pages + 1)


    return render(
        request,
        'traders_blog/levels/levels_list.html',
        {
            'levels': levels,
            'levels_tags': levels_tags,
            'active_page': 'levels',
            'page_range': page_range,
        }
    )