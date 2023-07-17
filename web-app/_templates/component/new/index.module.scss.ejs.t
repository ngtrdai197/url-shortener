---
to: src/design/components/<%= h.changeCase.param(name) %>/index.module.scss
sh: prettier --write src/design/components/<%= h.changeCase.param(name) %>/index.module.scss
---
.c-<%= h.changeCase.param(name) %> {
  color: $color-black;
  background-color: $color-white;

  &--red {
    color: $color-red;
  }
}


