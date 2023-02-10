---
pages: !file pages.yaml
---

<section class="three columns">
{{#pages}}
<a href="../{{url}}">
<div class="{{color}} card">
<strong>{{name}}</strong>
</div>
{{/pages}}
</section>
