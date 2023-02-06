---
hirek: !file news.yaml
pages: !file pages.yaml
---

<section class="two columns hidden" id="submenu-csapatunk">
{{#pages}}
<a href="{{url}}">
<div class="{{color}} card">
<strong>{{name}}</strong>
</div>
</a>
{{/pages}}
</section>

# Aktuális

<section class="two columns">
{{#hirek}}
<div class="card">
<strong>{{cim}}</strong>
<p>{{tartalom}}</p>
<p>{{datum}}</p>
</div>
{{/hirek}}
</section>

## Rólunk

Cserkészcsapatunk 1989. április 23-án, Szent György nap előestéjén alakult meg, és azóta folyamatosan aktív. Székhelyünk Budapesten, a XVI. kerületben, Mátyásföldön van. Jelenleg több, mint 300 taggal büszkélkedhetünk.
