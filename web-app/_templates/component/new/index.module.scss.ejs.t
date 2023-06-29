---
to: src/design/components/<%= h.changeCase.param(name) %>/index.module.scss
sh: prettier --write src/design/components/<%= h.changeCase.param(name) %>/index.module.scss
---
.c-<%= h.changeCase.param(name) %> {
  color: black;
  background-color: white;

  &--red {
    color: red;
  }

  &--green {
    color: green;
  }

  &--blue {
    color: blue;
  }
}


