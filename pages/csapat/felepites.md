---
onecol: !file felepites-oregek.yml
twocol: !file felepites-fiatalok.yml
---
# Csapatfelépítés


<section class="columns">
    {{#onecol}}
        <article class="{{color}} card">
            <strong>{{name}}</strong>
            <div class="four columns">
                tagok...
            </div>
        </article>
    {{/onecol}}
</section>
<section class="two columns">
    {{#twocol}}
        <article class="{{color}} card">
            <strong>{{name}}</strong>
            <div class="four columns">
                tagok...
            </div>
        </article>
    {{/twocol}}
</section>