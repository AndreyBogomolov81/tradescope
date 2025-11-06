from django.shortcuts import render
from django.db.models import Case, When, Value, IntegerField

from traders_blog.models import CategoryTheory, Article


def get_theory(request, slug):
    # приходит slug статьи articles
    # категории нужны для вывода меню
    categories = CategoryTheory.objects.all()

    # получаем статью
    article = Article.objects.get(slug=slug)

    # selected_category = CategoryTheory.objects.get(slug=slug)
    return render(
        request,
        'traders_blog/theory/theory_blog.html',
        context={
            'active_page': 'theory',
            'categories': categories,
            'article': article
        }
    )
