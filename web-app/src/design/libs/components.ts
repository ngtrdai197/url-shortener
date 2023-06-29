type MapModifiersModifier = string | false | null | undefined | Array<string | false | null | undefined>;

function generateModifierClassNameArray(baseClassName: string, ...modifiers: MapModifiersModifier[]): string[] {
  let classNameArray: string[] = [];

  for (const modifier of modifiers) {
    if (Array.isArray(modifier)) {
      classNameArray = classNameArray.concat(generateModifierClassNameArray(baseClassName, ...modifier));
    } else if (typeof modifier === 'string' && modifier.length > 0) {
      classNameArray.push(baseClassName + '--' + modifier);
    }
  }

  return classNameArray;
}

/**
 * Generate `className` from base class name and modifiers, based on MindBEMing.
 */
export function mapModifiers(baseClassName: string, ...modifiers: MapModifiersModifier[]): string {
  return (
    baseClassName +
    ' ' +
    generateModifierClassNameArray(baseClassName, ...modifiers)
      .join(' ')
      .trim()
  ).trim();
}
