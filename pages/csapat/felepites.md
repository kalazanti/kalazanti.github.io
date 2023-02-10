---
oregek: !file felepites-oregek.yml
fiatalok: !file felepites-fiatalok.yml
kicsik: !file felepites-kicsik.yml
---
# Csapatfelépítés


<section class="columns">
    {{#oregek}}
        <article class="primary">
            <strong>{{name}}</strong>
            <div class="three columns">
                {{#members}}
                    <div class="{{color}} card">
                        {{member}}<br>
                        <em>{{detail}}</em>
                    </div>
                {{/members}}
            </div>
        </article>
    {{/oregek}}
</section>
<section class="two columns">
    {{#fiatalok}}
        <article class="primary">
            <strong>{{name}}</strong>
            <div class="two columns">
                {{#members}}
                    <div class="{{color}} card">
                        {{member}} {{detail}}
                    </div>
                {{/members}}
            </div>
        </article>
    {{/fiatalok}}
</section>
<section class="columns">
    {{#kicsik}}
        <article class="primary">
            <strong>{{name}}</strong>
            <div class="two columns">
                {{#members}}
                    <div class="{{color}} card">
                        {{member}} {{detail}}
                    </div>
                {{/members}}
            </div>
        </article>
    {{/kicsik}}
</section>