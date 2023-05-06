---
senior: !file org-chart/senior.yml
youth: !file org-chart/youth.yml
junior: !file org-chart/junior.yml
---

# Csapatfelépítés

<section class="columns">
    {{#senior}}
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
    {{/senior}}
</section>
<section class="two columns">
    {{#youth}}
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
    {{/youth}}
</section>
<section class="columns">
    {{#junior}}
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
    {{/junior}}
</section>
