---
to: src/design/components/<%= h.changeCase.param(name) %>/index.tsx
sh: prettier --write src/design/components/<%= h.changeCase.param(name) %>/index.tsx
---
import React from 'react';
import { mapModifiers } from "../../libs/components";

export interface <%= h.changeCase.pascal(name) %>Props {
  children: React.ReactNode,
  modifiers?: 'red';
}

export const <%= h.changeCase.pascal(name) %>: React.FC<<%= h.changeCase.pascal(name) %>Props> = (props) => (
  <div className={mapModifiers('c-<%= h.changeCase.param(name) %>', props.modifiers)}>
    {props.children}
  </div>
);
