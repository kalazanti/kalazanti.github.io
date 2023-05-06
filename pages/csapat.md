---
pages: !file csapat.yaml
---

<section class="two columns">
{{#pages}}
<a href="../{{url}}">
<div class="{{color}} card">
<strong>{{name}}</strong>
</div>
{{/pages}}
</section>
