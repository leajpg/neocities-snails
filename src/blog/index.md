---
layout: main
title: Blog
permalink: /blog/
nesting: "../"
eleventyExcludeFromCollections: true
eleventyNavigation:
  key: Blog
  order: 1
---


# Blog <small><a href="/blog/feed.xml"><i class="bi bi-rss-fill"></i></a></small>

<h3>Browse by tag:</h3>
  <div class="tag-list">
    {% for tag in collections.tagList %}
      <a href="/blog/tags/{{ tag | slug }}/">#{{ tag }}</a>{% if not loop.last %}, {% endif %}
    {% endfor %}
  </div>





<ul class="post-list">
{% for post in collections.blog %}
  <li class="post-item">
    <h2>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </h2>
    <i class="bi bi-calendar-heart"></i> <time datetime="{{ post.date | dateIso }}">{{ post.date | dateReadable }}</time> | <i class="bi bi-stopwatch"></i> {{ post | readingTime }}
    {% if post.data.excerpt %}
      <p>{{ post.data.excerpt }}</p>
    {% endif %}
  </li>
{% endfor %}
</ul>