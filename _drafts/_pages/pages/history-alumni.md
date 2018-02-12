---
title: History/Alumni
layout: default
date: 2018-02-11 22:09:44 +0000
bodyId: ''
---
<h1> Sponsor List </h1>

{% for sponsor_group in site.data.sponsors %}
<div class="sponsor-group">
  <h3> {{ sponsor_group.group }} </h3>
  <ul>
    {% for sponsor in sponsor_group.sponsors %}
      {% if sponsor.url == "" %}
        <li>{{sponsor.name}}</li>
      {% else %}
        <li><a href={{sponsor.url}} target="_blank">{{sponsor.name}}</a></li>
      {% endif %}
    {% endfor %}
  </ul>
</div>
{% endfor %}